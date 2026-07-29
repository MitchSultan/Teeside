'use client'

import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateContactStatus } from '@/lib/actions/contacts'
import type { ContactStatus } from '@/types'

export function ContactStatusSelect({
  id,
  status,
}: {
  id: string
  status: ContactStatus
}) {
  async function handleChange(value: string | null) {
    if (!value) return
    const result = await updateContactStatus(id, value as ContactStatus)
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success('Status updated')
  }

  return (
    <Select defaultValue={status} onValueChange={handleChange}>
      <SelectTrigger className="w-28 h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new">New</SelectItem>
        <SelectItem value="read">Read</SelectItem>
        <SelectItem value="replied">Replied</SelectItem>
      </SelectContent>
    </Select>
  )
}
