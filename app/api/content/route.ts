import { NextRequest, NextResponse } from 'next/server'
import { getContent, setContent } from '@/actions/content'

export async function GET() {
  try {
    const content = await getContent()
    return NextResponse.json(content)
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookie = request.headers.get('cookie') || ''
    if (!cookie.includes('admin=1')) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    await setContent(body)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 })
  }
}
