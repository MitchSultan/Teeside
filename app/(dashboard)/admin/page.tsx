import Link from 'next/link'
import { AdminHeader } from '@/components/dashboard/AdminHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAdminStats } from '@/lib/queries/properties'
import { Button } from '@/components/ui/button'

export default async function AdminOverviewPage() {
  const stats = await getAdminStats()

  const cards = [
    { label: 'Properties', value: stats.properties, href: '/admin/properties' },
    { label: 'Agents', value: stats.agents, href: '/admin/agents' },
    { label: 'Contact Submissions', value: stats.contacts, href: '/admin/contacts' },
    { label: 'Newsletter Subscribers', value: stats.subscribers, href: '/admin/newsletter' },
  ]

  return (
    <>
      <AdminHeader title="Overview" />
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{card.value}</p>
                <Button variant="link" className="px-0 mt-2" render={<Link href={card.href} />}>
                  View all
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
