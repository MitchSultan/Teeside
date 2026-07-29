'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { deleteAgent } from '@/lib/actions/agents'

export function DeleteAgentButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Delete this agent?')) return
    const result = await deleteAgent(id)
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success('Agent deleted')
    router.refresh()
  }

  return (
    <Button size="sm" variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  )
}
