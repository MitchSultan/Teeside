import { createClient } from '@/lib/supabase/server'
import type { Property, Agent, PaginatedResult } from '@/types'

export async function getPublicProperties(filters?: {
  search?: string
  type?: string
  city?: string
  page?: number
  pageSize?: number
}): Promise<PaginatedResult<Property>> {
  const supabase = await createClient()
  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 12
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .in('status', ['available', 'ready', 'for-sale'])
    .order('created_at', { ascending: false })

  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,address.ilike.%${filters.search}%,city.ilike.%${filters.search}%`
    )
  }
  if (filters?.type && filters.type !== 'All') {
    query = query.eq('property_type', filters.type.toLowerCase())
  }
  if (filters?.city && filters.city !== 'All') {
    query = query.ilike('city', filters.city)
  }

  const { data, count, error } = await query.range(from, to)

  if (error) throw error

  return {
    data: (data ?? []) as Property[],
    count: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  }
}

export async function getPublicProperty(id: string): Promise<Property | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .in('status', ['available', 'ready', 'for-sale'])
    .single()

  if (error) return null
  return data as Property
}

export async function getAdminProperties(filters?: {
  search?: string
  status?: string
  type?: string
  page?: number
  pageSize?: number
}): Promise<PaginatedResult<Property>> {
  const supabase = await createClient()
  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 20
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,address.ilike.%${filters.search}%,city.ilike.%${filters.search}%`
    )
  }
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.type) query = query.eq('property_type', filters.type)

  const { data, count, error } = await query.range(from, to)
  if (error) throw error

  return {
    data: (data ?? []) as Property[],
    count: count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  }
}

export async function getAdminProperty(id: string): Promise<Property | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Property
}

export async function getActiveAgents(): Promise<Agent[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('is_active', true)
    .order('full_name')

  if (error) return []
  return (data ?? []) as Agent[]
}

export async function getAdminAgents(): Promise<Agent[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .order('full_name')

  if (error) return []
  return (data ?? []) as Agent[]
}

export async function getAdminAgent(id: string): Promise<Agent | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Agent
}

export async function getAdminStats() {
  const supabase = await createClient()

  const [properties, agents, contacts, subscribers] = await Promise.all([
    supabase.from('properties').select('*', { count: 'exact', head: true }),
    supabase.from('agents').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
  ])

  return {
    properties: properties.count ?? 0,
    agents: agents.count ?? 0,
    contacts: contacts.count ?? 0,
    subscribers: subscribers.count ?? 0,
  }
}
