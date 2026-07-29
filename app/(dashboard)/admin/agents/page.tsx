import Link from 'next/link'
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
import { getAdminAgents } from '@/lib/queries/properties'
import { DeleteAgentButton } from './delete-button'

export default async function AdminAgentsPage() {
  const agents = await getAdminAgents()

  return (
    <>
      <AdminHeader title="Agents" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="flex justify-end">
          <Button render={<Link href="/admin/agents/new" />}>Add Agent</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No agents found
                  </TableCell>
                </TableRow>
              ) : (
                agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.full_name}</TableCell>
                    <TableCell>{agent.email}</TableCell>
                    <TableCell>{agent.phone ?? '—'}</TableCell>
                    <TableCell>
                      <Badge variant={agent.is_active ? 'default' : 'secondary'}>
                        {agent.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline" render={<Link href={`/admin/agents/${agent.id}`} />}>
                        Edit
                      </Button>
                      <DeleteAgentButton id={agent.id} />
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
