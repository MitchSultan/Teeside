import Link from 'next/link'
import { AdminHeader } from '@/components/dashboard/AdminHeader'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createClient } from '@/lib/supabase/server'
import { ContactStatusSelect } from './status-select'
import type { ContactSubmission } from '@/types'

export default async function AdminContactsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  const contacts = (data ?? []) as ContactSubmission[]

  return (
    <>
      <AdminHeader title="Contact Submissions" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="flex justify-end">
          <Button variant="outline" render={<Link href="/api/contacts/export" />}>
            Export CSV
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No submissions yet
                  </TableCell>
                </TableRow>
              ) : (
                contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.full_name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.subject ?? '—'}</TableCell>
                    <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                    <TableCell>
                      <ContactStatusSelect id={contact.id} status={contact.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(contact.created_at).toLocaleDateString('en-KE')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
