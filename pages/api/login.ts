import type { NextApiRequest, NextApiResponse } from 'next'
import { createAdminCookie, checkAdmin } from '../../actions/login'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { user, pass } = req.body
  const isValid = await checkAdmin(user, pass)
  if (isValid) {
    res.setHeader('Set-Cookie', createAdminCookie())
    return res.json({ ok: true })
  }
  return res.status(401).json({ ok: false })
}
