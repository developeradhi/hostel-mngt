const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const app = express();
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    
    // Auto-create student for demo purposes if account doesn't exist
    if (!user && email !== 'adhiam') {
      const passwordHash = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          role: 'student',
          fullName: email.split('@')[0].toUpperCase(),
        }
      });
    }

    if (!user) return res.status(401).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role, fullName: user.fullName }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { _id: user.id, email: user.email, role: user.role, fullName: user.fullName } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user: { _id: user.id, email: user.email, role: user.role, fullName: user.fullName } });
});

// --- DASHBOARD ROUTES ---
app.get('/api/dashboard/admin', authenticateToken, async (req, res) => {
  try {
    const totalOccupants = await prisma.user.count({ where: { role: 'student' } });
    res.json({
      totalOccupants: totalOccupants || 184,
      totalCapacity: 200,
      occupancyRate: Math.round(((totalOccupants || 184) / 200) * 100),
      pendingFees: 45000,
      openComplaints: await prisma.complaint.count({ where: { status: 'open' } }),
      passesToday: await prisma.pass.count({ where: { status: 'active' } })
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/dashboard/analytics', authenticateToken, (req, res) => {
  res.json({
    feeChart: [ { name: 'Paid', value: 80 }, { name: 'Pending', value: 20 } ],
    complaintChart: [ { name: 'Electrical', count: 5 }, { name: 'Plumbing', count: 2 }, { name: 'Wi-Fi', count: 1 } ]
  });
});

app.get('/api/dashboard/student', authenticateToken, (req, res) => {
  res.json({ roomNumber: '204', feeDue: 0, activePasses: 1, recentAnnouncements: [{ title: 'Hostel Maintenance', date: 'Today' }] });
});

app.get('/api/dashboard/warden', authenticateToken, async (req, res) => {
  res.json({
    activeStudents: 184,
    pendingLeaves: 5,
    openComplaints: await prisma.complaint.count({ where: { status: 'open' } }),
    recentActivity: [{ log: 'Student checked in', time: '10 mins ago' }]
  });
});

// --- CORE COMPONENTS ROUTES ---
app.get('/api/rooms', authenticateToken, async (req, res) => {
  res.json([
    { _id: '1', roomNumber: '101', blockName: 'Block A', capacity: 2, occupants: ['STU001'], status: 'available' },
    { _id: '2', roomNumber: '102', blockName: 'Block A', capacity: 2, occupants: ['STU002', 'STU003'], status: 'full' }
  ]);
});

app.get('/api/students', authenticateToken, async (req, res) => {
  const students = await prisma.user.findMany({ where: { role: 'student' } });
  res.json(students.map(s => ({ _id: s.id, name: s.fullName, email: s.email, room: '101', status: 'active' })));
});

app.get('/api/students/:id/room', authenticateToken, (req, res) => {
  res.json({ number: '101', roommates: ['John Doe'], facilities: ['AC', 'Wi-Fi'] });
});

// --- COMPLAINTS ROUTES ---
app.get('/api/complaints', authenticateToken, async (req, res) => {
  const filter = req.user.role === 'student' ? { userId: req.user.id } : {};
  const complaints = await prisma.complaint.findMany({ where: filter });
  if (complaints.length === 0) {
    return res.json([{ _id: '1', title: 'Leaking tap', description: 'Bathroom tap leaking', status: 'open', createdAt: new Date() }]);
  }
  res.json(complaints);
});

app.post('/api/complaints', authenticateToken, async (req, res) => {
  const complaint = await prisma.complaint.create({
    data: { title: req.body.title, description: req.body.description, userId: req.user.id }
  });
  res.json(complaint);
});

// --- LEAVES ROUTES ---
app.get('/api/leaves', authenticateToken, async (req, res) => {
  res.json([{ _id: '1', reason: 'Going home', fromDate: new Date(), toDate: new Date(), status: 'pending' }]);
});
app.post('/api/leaves', authenticateToken, (req, res) => res.json({ success: true }));

// --- FEES ROUTES ---
app.get('/api/fees/:userId', authenticateToken, async (req, res) => {
  const fees = await prisma.fee.findMany({ where: { userId: req.params.userId } });
  if (fees.length === 0) {
    return res.json([{ _id: '1', month: 'June', year: 2026, amountDue: 5000, amountPaid: 0, dueDate: new Date(), status: 'pending' }]);
  }
  res.json(fees);
});

// --- PASSES ROUTES ---
app.get('/api/passes/:userId', authenticateToken, async (req, res) => {
  const passes = await prisma.pass.findMany({ where: { userId: req.params.userId } });
  if (passes.length === 0) {
    return res.json([{ _id: '1', visitorName: 'John Doe', purpose: 'Family', visitDate: new Date(), visitTime: '10:00 AM', qrCode: 'PASS123', status: 'active' }]);
  }
  res.json(passes);
});

app.post('/api/passes', authenticateToken, async (req, res) => {
  const pass = await prisma.pass.create({
    data: { visitorName: req.body.visitorName, purpose: req.body.purpose, visitDate: new Date(req.body.visitDate), visitTime: req.body.visitTime, qrCode: 'PASS-' + Math.random().toString(36).substr(2, 9), userId: req.user.id }
  });
  res.json(pass);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Secure Postgres API running on port ${PORT}`));
