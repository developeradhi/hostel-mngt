const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'adhiam';
  const passwordHash = await bcrypt.hash('temp123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: 'admin',
      fullName: 'Global Admin Adhiam'
    },
    create: {
      email,
      passwordHash,
      role: 'admin',
      fullName: 'Global Admin Adhiam'
    }
  });

  console.log('Successfully created/updated global admin:', admin.email);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
