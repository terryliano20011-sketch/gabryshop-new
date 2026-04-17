import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  // Verifica auth
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin_auth')
  if (auth?.value !== 'gabry07_authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error

    return NextResponse.json({ orders: orders || [] })
  } catch (err: any) {
    console.error('Admin orders error:', err)
    return NextResponse.json({ orders: [], error: err.message }, { status: 500 })
  }
}
