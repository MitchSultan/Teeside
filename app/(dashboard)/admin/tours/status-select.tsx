'use client'

import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateTourStatus } from '@/lib/actions/tours'
import type { TourStatus } from '@/types'

export function TourStatusSelect({
  id,
  status,
}: {
  id: string
  status: TourStatus
}) {
  async function handleChange(value: string | null) {
    if (!value) return
    const result = await updateTourStatus(id, value as TourStatus)
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success('Tour booking status updated')
  }

  return (
    <Select defaultValue={status} onValueChange={handleChange}>
      <SelectTrigger className="w-32 h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="confirmed">Confirmed</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  )
}
