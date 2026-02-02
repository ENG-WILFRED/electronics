import { NextRequest, NextResponse } from 'next/server'
import { checkAdmin, createAdminCookie } from '@/actions/login'

export async function POST(request: NextRequest) {
  try {
    const { user, pass } = await request.json()
    const isValid = await checkAdmin(user, pass)
    if (isValid) {
      const response = NextResponse.json({ ok: true })
      response.headers.set('Set-Cookie', createAdminCookie())
      return response
    }
    return NextResponse.json({ ok: false }, { status: 401 })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message }, { status: 500 })
  }
}
