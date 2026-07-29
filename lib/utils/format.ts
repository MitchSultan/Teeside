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
  }
  return labels[type]
}

export function getStatusLabel(status: PropertyStatus): string {
  const labels: Record<PropertyStatus, string> = {
    available: 'Available',
    rented: 'Rented',
    'under-maintenance': 'Under Maintenance',
  }
  return labels[status]
}

export function getStatusColor(status: PropertyStatus): string {
  const colors: Record<PropertyStatus, string> = {
    available: '#16a34a',
    rented: '#2563eb',
    'under-maintenance': '#d97706',
  }
  return colors[status]
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
