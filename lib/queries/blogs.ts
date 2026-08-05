import { createClient } from '@/lib/supabase/server'
import type { Blog, PaginatedResult } from '@/types'
import { mockBlogs } from '@/data/blogs'

export async function getPublicBlogs(filters?: {
  search?: string
  category?: string
  page?: number
  pageSize?: number
}): Promise<PaginatedResult<Blog>> {
  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 6
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  try {
    const supabase = await createClient()
    let query = supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,category.ilike.%${filters.search}%`
      )
    }
    if (filters?.category && filters.category !== 'All') {
      query = query.ilike('category', filters.category)
    }

    const { data, count, error } = await query.range(from, to)

    if (error || !data || data.length === 0) {
      return getFilteredMockBlogs(filters)
    }

    return {
      data: data as Blog[],
      count: count ?? data.length,
      page,
      pageSize,
      totalPages: Math.ceil((count ?? data.length) / pageSize),
    }
  } catch {
    return getFilteredMockBlogs(filters)
  }
}

export async function getPublicBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      return mockBlogs.find((b) => b.slug === slug && b.status === 'published') || null
    }

    return data as Blog
  } catch {
    return mockBlogs.find((b) => b.slug === slug && b.status === 'published') || null
  }
}

export async function getFeaturedBlogs(limit = 3): Promise<Blog[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('featured', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error || !data || data.length === 0) {
      return mockBlogs.filter((b) => b.status === 'published').slice(0, limit)
    }

    return data as Blog[]
  } catch {
    return mockBlogs.filter((b) => b.status === 'published').slice(0, limit)
  }
}

export async function getAdminBlogs(filters?: {
  search?: string
  category?: string
  status?: string
  page?: number
  pageSize?: number
}): Promise<PaginatedResult<Blog>> {
  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  try {
    const supabase = await createClient()
    let query = supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (filters?.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,category.ilike.%${filters.search}%,author_name.ilike.%${filters.search}%`
      )
    }
    if (filters?.category && filters.category !== 'All') {
      query = query.ilike('category', filters.category)
    }
    if (filters?.status && filters.status !== 'All') {
      query = query.eq('status', filters.status)
    }

    const { data, count, error } = await query.range(from, to)

    if (error || !data || data.length === 0) {
      return getFilteredAdminMockBlogs(filters)
    }

    return {
      data: data as Blog[],
      count: count ?? data.length,
      page,
      pageSize,
      totalPages: Math.ceil((count ?? data.length) / pageSize),
    }
  } catch {
    return getFilteredAdminMockBlogs(filters)
  }
}

export async function getAdminBlog(id: string): Promise<Blog | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return mockBlogs.find((b) => b.id === id) || null
    }

    return data as Blog
  } catch {
    return mockBlogs.find((b) => b.id === id) || null
  }
}

function getFilteredMockBlogs(filters?: {
  search?: string
  category?: string
  page?: number
  pageSize?: number
}): PaginatedResult<Blog> {
  let list = mockBlogs.filter((b) => b.status === 'published')

  if (filters?.search) {
    const s = filters.search.toLowerCase()
    list = list.filter(
      (b) =>
        b.title.toLowerCase().includes(s) ||
        b.excerpt.toLowerCase().includes(s) ||
        b.category.toLowerCase().includes(s)
    )
  }

  if (filters?.category && filters.category !== 'All') {
    list = list.filter((b) => b.category.toLowerCase() === filters.category!.toLowerCase())
  }

  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 6
  const total = list.length
  const startIndex = (page - 1) * pageSize
  const paginated = list.slice(startIndex, startIndex + pageSize)

  return {
    data: paginated,
    count: total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  }
}

function getFilteredAdminMockBlogs(filters?: {
  search?: string
  category?: string
  status?: string
  page?: number
  pageSize?: number
}): PaginatedResult<Blog> {
  let list = [...mockBlogs]

  if (filters?.search) {
    const s = filters.search.toLowerCase()
    list = list.filter(
      (b) =>
        b.title.toLowerCase().includes(s) ||
        b.category.toLowerCase().includes(s) ||
        b.author_name.toLowerCase().includes(s)
    )
  }

  if (filters?.category && filters.category !== 'All') {
    list = list.filter((b) => b.category.toLowerCase() === filters.category!.toLowerCase())
  }

  if (filters?.status && filters.status !== 'All') {
    list = list.filter((b) => b.status === filters.status)
  }

  const page = filters?.page ?? 1
  const pageSize = filters?.pageSize ?? 10
  const total = list.length
  const startIndex = (page - 1) * pageSize
  const paginated = list.slice(startIndex, startIndex + pageSize)

  return {
    data: paginated,
    count: total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  }
}
