import { notFound } from 'next/navigation'
import { AdminHeader } from '@/components/dashboard/AdminHeader'
import { AgentForm } from '@/components/forms/AgentForm'
import { getAdminAgent } from '@/lib/queries/properties'

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const agent = await getAdminAgent(id)

  if (!agent) notFound()

  return (
    <>
      <AdminHeader title="Edit Agent" />
      <div className="flex flex-1 flex-col p-4 lg:p-6">
        <AgentForm agent={agent} />
      </div>
    </>
  )
}
