import type { NextApiRequest, NextApiResponse } from 'next'
import { sendContact } from '../../actions/contact'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  try {
    await sendContact(req.body)
    return res.json({ ok: true })
  } catch (e: any) {
    console.error(e)
    return res.status(500).json({ ok: false, error: e?.message })
  }
}
