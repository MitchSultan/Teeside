import type { PropertyStatus, PropertyType } from '@/types'

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(price)
}

export function getPropertyTypeLabel(type: PropertyType): string {
  const labels: Record<PropertyType, string> = {
    residential: 'Residential',
    commercial: 'Commercial',
    land: 'Land',
    apartment: 'Apartment',
    house: 'House',
    penthouse: 'Penthouse',
    bedsitter: 'Bedsitter',
    studio: 'Studio',
    townhouse: 'Townhouse',
    villa: 'Villa',
  }
  return labels[type] ?? String(type)
}

export function getStatusLabel(status: PropertyStatus): string {
  const labels: Record<PropertyStatus, string> = {
    available: 'Available',
    ready: 'Ready for Occupation',
    'off-plan': 'Off-Plan',
    rented: 'Rented',
    'under-maintenance': 'Under Maintenance',
    repossessed: 'Repossessed',
    'for-sale': 'For Sale',
    sold: 'Sold',
  }
  return labels[status] ?? String(status)
}

export function getStatusColor(status: PropertyStatus): string {
  const colors: Record<PropertyStatus, string> = {
    available: '#16a34a',
    ready: '#16a34a',
    'off-plan': '#2563eb',
    rented: '#2563eb',
    'under-maintenance': '#d97706',
    repossessed: '#dc2626',
    'for-sale': '#059669',
    sold: '#4b5563',
  }
  return colors[status] ?? '#6b7280'
}

export function exportToCsv<T extends Record<string, unknown>>(
  rows: T[],
  columns: { key: keyof T; label: string }[]
): string {
  const header = columns.map((c) => c.label).join(',')
  const body = rows
    .map((row) =>
      columns
        .map((c) => {
          const val = row[c.key]
          const str = val == null ? '' : String(val)
          return `"${str.replace(/"/g, '""')}"`
        })
        .join(',')
    )
    .join('\n')
  return `${header}\n${body}`
}
