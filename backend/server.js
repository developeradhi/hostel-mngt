const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

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
  const { email, password, role } = req.body;
  
  try {
    // For demo, if user doesn't exist, create them instantly to simulate a working environment
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      const passwordHash = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          role: role || 'student',
          fullName: email.split('@')[0].toUpperCase(),
        }
      });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role, fullName: user.fullName }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { _id: user.id, email: user.email, role: user.role, fullName: user.fullName } });
  } catch (error) {
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
    const totalOccupants = await prisma.user.count({ where: { role: 'student', roomId: { not: null } } });
    const totalCapacity = await prisma.room.aggregate({ _sum: { capacity: true } });
    
    // Send fallback data if DB is empty
    res.json({
      totalOccupants: totalOccupants || 184,
      totalCapacity: totalCapacity._sum.capacity || 200,
      occupancyRate: Math.round(((totalOccupants || 184) / (totalCapacity._sum.capacity || 200)) * 100),
      pendingFees: 45000,
      openComplaints: 8,
      passesToday: 24
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/dashboard/analytics', authenticateToken, (req, res) => {
  res.json({
    feeChart: [
      { name: 'Paid', value: 80 },
      { name: 'Pending', value: 20 }
    ],
    complaintChart: [
      { name: 'Electrical', count: 5 },
      { name: 'Plumbing', count: 2 },
      { name: 'Wi-Fi', count: 1 }
    ]
  });
});

app.get('/api/dashboard/student', authenticateToken, (req, res) => {
  res.json({
    roomNumber: '204',
    feeDue: 0,
    activePasses: 1,
    recentAnnouncements: [{ title: 'Hostel Maintenance', date: 'Today' }]
  });
});

// --- FEES ROUTES ---
app.get('/api/fees/:userId', authenticateToken, async (req, res) => {
  try {
    const fees = await prisma.fee.findMany({ where: { userId: req.params.userId } });
    if (fees.length === 0) {
      // Mock fee for demo
      return res.json([{
        _id: '1', month: 'June', year: 2026, amountDue: 5000, amountPaid: 0, dueDate: new Date(), status: 'pending'
      }]);
    }
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// --- PASSES ROUTES ---
app.get('/api/passes/:userId', authenticateToken, async (req, res) => {
  try {
    const passes = await prisma.pass.findMany({ where: { userId: req.params.userId } });
    if (passes.length === 0) {
      return res.json([{
        _id: '1', visitorName: 'John Doe', purpose: 'Family', visitDate: new Date(), visitTime: '10:00 AM', qrCode: 'PASS123', status: 'active'
      }]);
    }
    res.json(passes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/passes', authenticateToken, async (req, res) => {
  try {
    const pass = await prisma.pass.create({
      data: {
        visitorName: req.body.visitorName,
        purpose: req.body.purpose,
        visitDate: new Date(req.body.visitDate),
        visitTime: req.body.visitTime,
        qrCode: 'PASS-' + Math.random().toString(36).substr(2, 9),
        userId: req.user.id
      }
    });
    res.json(pass);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Secure Postgres API running on port ${PORT}`));
