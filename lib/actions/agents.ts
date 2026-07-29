'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { agentSchema, type AgentFormValues } from '@/lib/validations/property'

export async function createAgent(values: AgentFormValues) {
  const parsed = agentSchema.safeParse(values)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase.from('agents').insert({
    ...parsed.data,
    created_by: user.id,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/agents')
  return { success: true }
}

export async function updateAgent(id: string, values: AgentFormValues) {
  const parsed = agentSchema.safeParse(values)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('agents')
    .update({ ...parsed.data, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/agents')
  revalidatePath(`/admin/agents/${id}`)
  return { success: true }
}

export async function deleteAgent(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase.from('agents').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/agents')
  return { success: true }
}

export async function uploadAgentImage(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const file = formData.get('file') as File | null
  if (!file) return { error: 'No file provided' }

  const ext = file.name.split('.').pop()
  const path = `agents/${user.id}/${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('property-images')
    .upload(path, file, { upsert: false })

  if (error) return { error: error.message }

  const { data: { publicUrl } } = supabase.storage
    .from('property-images')
    .getPublicUrl(path)

  return { url: publicUrl }
}
