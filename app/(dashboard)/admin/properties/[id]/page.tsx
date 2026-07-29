import { notFound } from 'next/navigation'
import { AdminHeader } from '@/components/dashboard/AdminHeader'
import { PropertyForm } from '@/components/forms/PropertyForm'
import { getAdminProperty } from '@/lib/queries/properties'

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = await getAdminProperty(id)

  if (!property) notFound()

  return (
    <>
      <AdminHeader title="Edit Property" />
      <div className="flex flex-1 flex-col p-4 lg:p-6">
        <PropertyForm property={property} />
      </div>
    </>
  )
}
