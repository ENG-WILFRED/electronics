import type { NextApiRequest, NextApiResponse } from 'next'
import { getContent, setContent } from '../../actions/content'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const content = await getContent()
    return res.json(content)
  }
  if (req.method === 'POST') {
    const cookie = req.headers.cookie || ''
    if (!cookie.includes('admin=1')) return res.status(401).json({ ok: false, error: 'unauthorized' })
    try {
      await setContent(req.body)
      return res.json({ ok: true })
    } catch (e:any) {
      return res.status(500).json({ ok: false, error: e.message })
    }
  }
  res.status(405).end()
}
