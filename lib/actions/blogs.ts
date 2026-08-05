'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { blogSchema, type BlogFormValues } from '@/lib/validations/blog'

export async function createBlog(values: BlogFormValues) {
  const parsed = blogSchema.safeParse(values)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid blog data' }
  }

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('blogs').insert({
      ...parsed.data,
      published_at: parsed.data.status === 'published' ? new Date().toISOString() : null,
    })

    if (error) return { error: error.message }

    revalidatePath('/admin/blogs')
    revalidatePath('/blog')
    revalidatePath('/')
    return { success: true }
  } catch (err: unknown) {
    return { error: (err as Error)?.message || 'Failed to create blog post' }
  }
}

export async function updateBlog(id: string, values: BlogFormValues) {
  const parsed = blogSchema.safeParse(values)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid blog data' }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('blogs')
      .update({
        ...parsed.data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/blogs')
    revalidatePath('/blog')
    revalidatePath(`/blog/${parsed.data.slug}`)
    revalidatePath('/')
    return { success: true }
  } catch (err: unknown) {
    return { error: (err as Error)?.message || 'Failed to update blog post' }
  }
}

export async function deleteBlog(id: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (error) return { error: error.message }

    revalidatePath('/admin/blogs')
    revalidatePath('/blog')
    revalidatePath('/')
    return { success: true }
  } catch (err: unknown) {
    return { error: (err as Error)?.message || 'Failed to delete blog post' }
  }
}

export async function toggleBlogFeatured(id: string, currentFeatured: boolean) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('blogs')
      .update({ featured: !currentFeatured, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) return { error: error.message }

    revalidatePath('/admin/blogs')
    revalidatePath('/blog')
    revalidatePath('/')
    return { success: true }
  } catch (err: unknown) {
    return { error: (err as Error)?.message || 'Failed to toggle featured status' }
  }
}
