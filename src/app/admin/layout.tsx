export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin ha il suo layout senza navbar e footer pubblici
  return <>{children}</>
}
