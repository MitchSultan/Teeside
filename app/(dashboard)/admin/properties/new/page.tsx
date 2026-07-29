import { AdminHeader } from '@/components/dashboard/AdminHeader'
import { PropertyForm } from '@/components/forms/PropertyForm'

export default function NewPropertyPage() {
  return (
    <>
      <AdminHeader title="New Property" />
      <div className="flex flex-1 flex-col p-4 lg:p-6">
        <PropertyForm />
      </div>
    </>
  )
}
