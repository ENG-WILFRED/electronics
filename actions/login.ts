'use server'

import { serialize } from 'cookie'
import { prisma } from './db'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function checkAdmin(user: string, pass: string) {
  // prefer DB-stored admin
  const admin = await prisma.admin.findUnique({ where: { username: user } })
  if (admin) {
    return bcrypt.compareSync(pass, admin.password)
  }
  const ADMIN_USER = process.env.ADMIN_USER || 'admin'
  const ADMIN_PASS = process.env.ADMIN_PASS || 'password'
  return user === ADMIN_USER && pass === ADMIN_PASS
}

export async function loginAction(user: string, pass: string) {
  const isValid = await checkAdmin(user, pass)
  if (isValid) {
    const cookieStore = await cookies()
    cookieStore.set('admin', '1', { path: '/', httpOnly: true, sameSite: 'lax' })
    return { ok: true }
  }
  return { ok: false }
}

export async function checkAuthAction() {
  const cookieStore = await cookies()
  return { ok: !!cookieStore.get('admin') }
}

export async function ensureAdminFromEnv() {
  const ADMIN_USER = process.env.ADMIN_USER
  const ADMIN_PASS = process.env.ADMIN_PASS
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  if (ADMIN_USER && ADMIN_PASS) {
    const existing = await prisma.admin.findUnique({ where: { username: ADMIN_USER } })
    if (!existing) {
      const hash = bcrypt.hashSync(ADMIN_PASS, 10)
      await prisma.admin.create({ data: { username: ADMIN_USER, password: hash, email: ADMIN_EMAIL ?? null } })
    }
  }
}
