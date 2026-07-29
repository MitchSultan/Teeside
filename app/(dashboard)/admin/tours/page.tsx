import { AdminHeader } from '@/components/dashboard/AdminHeader'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createClient } from '@/lib/supabase/server'
import { TourStatusSelect } from './status-select'
import type { VirtualTourBooking } from '@/types'

export default async function AdminToursPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('virtual_tour_bookings')
    .select('*')
    .order('created_at', { ascending: false })

  const tours = (data ?? []) as VirtualTourBooking[]

  return (
    <>
      <AdminHeader title="Virtual Tour Requests" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Email / Phone</TableHead>
                <TableHead>Timezone</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No virtual tour requests yet
                  </TableCell>
                </TableRow>
              ) : (
                tours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell className="font-medium">{tour.full_name}</TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p>{tour.email}</p>
                        <p className="text-muted-foreground">{tour.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{tour.timezone ?? '—'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{tour.platform ?? 'Zoom'}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-xs">
                      {tour.notes ?? '—'}
                    </TableCell>
                    <TableCell>
                      <TourStatusSelect id={tour.id} status={tour.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {new Date(tour.created_at).toLocaleDateString('en-KE')}
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
