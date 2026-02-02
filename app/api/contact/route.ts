import { NextRequest, NextResponse } from 'next/server'
import { sendContact } from '@/actions/contact'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    await sendContact(payload)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 })
  }
}
