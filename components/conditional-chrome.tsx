'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import MobileNav from '@/app/components/MobileNav'
import Footer from '@/app/components/Footer'

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideChrome =
    pathname?.startsWith('/admin') || pathname?.startsWith('/login')

  if (hideChrome) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 mobile-nav-safe">{children}</main>
      <Footer />
      <MobileNav />
    </>
  )
}
