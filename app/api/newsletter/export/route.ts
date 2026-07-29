import { createClient } from '@/lib/supabase/server'
import { exportToCsv } from '@/lib/utils/format'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const csv = exportToCsv(data ?? [], [
    { key: 'email', label: 'Email' },
    { key: 'is_active', label: 'Active' },
    { key: 'subscribed_at', label: 'Subscribed At' },
    { key: 'unsubscribed_at', label: 'Unsubscribed At' },
  ])

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="newsletter-subscribers.csv"',
    },
  })
}
