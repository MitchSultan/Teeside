'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { deleteProperty } from '@/lib/actions/properties'

export function DeletePropertyButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Delete this property?')) return
    const result = await deleteProperty(id)
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success('Property deleted')
    router.refresh()
  }

  return (
    <Button size="sm" variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  )
}
