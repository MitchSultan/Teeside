import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/dashboard/AdminSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase.from('profiles').select('*').eq('id', user.id).single()
    : { data: null }

  const sidebarUser = {
    name: profile?.full_name ?? user?.email?.split('@')[0] ?? 'Admin',
    email: user?.email ?? '',
    avatar: profile?.avatar_url ?? '',
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AdminSidebar variant="inset" user={sidebarUser} />
      <SidebarInset className="min-h-svh bg-background">{children}</SidebarInset>
    </SidebarProvider>
  )
}
