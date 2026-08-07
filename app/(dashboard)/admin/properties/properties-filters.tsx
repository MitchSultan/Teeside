'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function PropertiesFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function update(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') params.set(key, value)
    else params.delete(key)
    params.delete('page')
    router.push(`/admin/properties?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Input
        placeholder="Search properties…"
        className="w-48"
        defaultValue={searchParams.get('search') ?? ''}
        onKeyDown={(e) => {
          if (e.key === 'Enter') update('search', (e.target as HTMLInputElement).value)
        }}
      />
      <Select
        defaultValue={searchParams.get('status') ?? 'all'}
        onValueChange={(v) => update('status', v === 'all' ? '' : v)}
      >
        <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="ready">Ready</SelectItem>
          <SelectItem value="off-plan">Off-Plan</SelectItem>
          <SelectItem value="rented">Rented</SelectItem>
          <SelectItem value="under-maintenance">Under Maintenance</SelectItem>
          <SelectItem value="repossessed">Repossessed</SelectItem>
          <SelectItem value="for-sale">For Sale</SelectItem>
          <SelectItem value="sold">Sold</SelectItem>
        </SelectContent>
      </Select>
      <Select
        defaultValue={searchParams.get('type') ?? 'all'}
        onValueChange={(v) => update('type', v === 'all' ? '' : v)}
      >
        <SelectTrigger className="w-36"><SelectValue placeholder="Type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="residential">Residential</SelectItem>
          <SelectItem value="commercial">Commercial</SelectItem>
          <SelectItem value="land">Land</SelectItem>
          <SelectItem value="apartment">Apartment</SelectItem>
          <SelectItem value="house">House</SelectItem>
          <SelectItem value="penthouse">Penthouse</SelectItem>
          <SelectItem value="bedsitter">Bedsitter</SelectItem>
          <SelectItem value="studio">Studio</SelectItem>
          <SelectItem value="townhouse">Townhouse</SelectItem>
          <SelectItem value="villa">Villa</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
