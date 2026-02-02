import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const cookie = request.headers.get('cookie') || ''
  const isAuthed = cookie.includes('admin=1')
  return NextResponse.json({ ok: isAuthed })
}
