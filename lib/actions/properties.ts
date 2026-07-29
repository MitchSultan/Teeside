'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { propertySchema, type PropertyFormValues } from '@/lib/validations/property'

export async function createProperty(values: PropertyFormValues) {
  const parsed = propertySchema.safeParse(values)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase.from('properties').insert({
    ...parsed.data,
    created_by: user.id,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/properties')
  revalidatePath('/properties')
  return { success: true }
}

export async function updateProperty(id: string, values: PropertyFormValues) {
  const parsed = propertySchema.safeParse(values)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('properties')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/properties')
  revalidatePath(`/admin/properties/${id}`)
  revalidatePath('/properties')
  revalidatePath(`/properties/${id}`)
  return { success: true }
}

export async function deleteProperty(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/properties')
  revalidatePath('/properties')
  return { success: true }
}

export async function uploadPropertyImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const file = formData.get('file') as File | null
  if (!file) return { error: 'No file provided' }

  const ext = file.name.split('.').pop()
  const path = `${user.id}/${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('property-images')
    .upload(path, file, { upsert: false })

  if (error) return { error: error.message }

  const { data: { publicUrl } } = supabase.storage
    .from('property-images')
    .getPublicUrl(path)

  return { url: publicUrl }
}
