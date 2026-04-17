import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import AdminClient from './AdminClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin_auth')
  if (auth?.value !== 'gabry07_authenticated') {
    redirect('/admin/login')
  }
  return <AdminClient />
}
