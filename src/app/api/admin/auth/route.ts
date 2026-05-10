import { NextRequest, NextResponse } from 'next/server'
import { checkAdminRateLimit } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  if (!checkAdminRateLimit(ip)) {
    return NextResponse.json({ error: 'Troppi tentativi. Riprova tra 15 minuti.' }, { status: 429 })
  }
  const { password } = await req.json()
  if (password === 'Gbr$h0p!2026#xK') {
    const res = NextResponse.json({ ok: true })
    res.cookies.set('admin_auth', 'gbr_auth_2026_xK9mP', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return res
  }
  return NextResponse.json({ ok: false }, { status: 401 })
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('admin_auth')
  return res
}
