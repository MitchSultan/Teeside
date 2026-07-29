import { AdminHeader } from '@/components/dashboard/AdminHeader'
import { AgentForm } from '@/components/forms/AgentForm'

export default function NewAgentPage() {
  return (
    <>
      <AdminHeader title="New Agent" />
      <div className="flex flex-1 flex-col p-4 lg:p-6">
        <AgentForm />
      </div>
    </>
  )
}
