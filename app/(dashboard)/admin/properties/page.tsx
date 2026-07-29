import Link from 'next/link'
import Image from 'next/image'
import { AdminHeader } from '@/components/dashboard/AdminHeader'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAdminProperties } from '@/lib/queries/properties'
import { formatPrice, getPropertyTypeLabel, getStatusLabel } from '@/lib/utils/format'
import { PropertiesFilters } from './properties-filters'
import { DeletePropertyButton } from './delete-button'

export default async function AdminPropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; type?: string; page?: string }>
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const result = await getAdminProperties({
    search: params.search,
    status: params.status,
    type: params.type,
    page,
  })

  return (
    <>
      <AdminHeader title="Properties" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <PropertiesFilters />
          <Button render={<Link href="/admin/properties/new" />}>Add Property</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No properties found
                  </TableCell>
                </TableRow>
              ) : (
                result.data.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 rounded overflow-hidden bg-muted shrink-0">
                          {property.images[0] ? (
                            <Image
                              src={property.images[0]}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          ) : null}
                        </div>
                        <span className="font-medium line-clamp-1">{property.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getPropertyTypeLabel(property.property_type)}</TableCell>
                    <TableCell>{property.city}</TableCell>
                    <TableCell>{formatPrice(property.price)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{getStatusLabel(property.status)}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" render={<Link href={`/admin/properties/${property.id}`} />}>
                        Edit
                      </Button>
                      <DeletePropertyButton id={property.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {result.totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                size="sm"
                variant={p === page ? 'default' : 'outline'}
                render={<Link href={`/admin/properties?page=${p}`} />}
              >
                {p}
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
