const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

async function main() {
  const prisma = new PrismaClient()
  const user = process.env.ADMIN_USER || 'admin'
  const pass = process.env.ADMIN_PASS || 'password'
  const email = process.env.ADMIN_EMAIL || null
  const existing = await prisma.admin.findUnique({ where: { username: user } })
  if (!existing) {
    const hash = bcrypt.hashSync(pass, 10)
    await prisma.admin.create({ data: { username: user, password: hash, email } })
    console.log('Seeded admin user')
  } else {
    console.log('Admin already exists')
  }
  await prisma.$disconnect()
}

main().catch(e=>{ console.error(e); process.exit(1) })
