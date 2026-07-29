'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import {
  contactSchema,
  newsletterSchema,
  type ContactFormValues,
  type NewsletterFormValues,
} from '@/lib/validations/property'
import type { ContactStatus } from '@/types'

export async function submitContact(values: ContactFormValues) {
  const parsed = contactSchema.safeParse(values)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('contact_submissions').insert(parsed.data)

  if (error) return { error: error.message }
  return { success: true }
}

export async function subscribeNewsletter(values: NewsletterFormValues) {
  const parsed = newsletterSchema.safeParse(values)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid data' }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email: parsed.data.email })

  if (error) {
    if (error.code === '23505') {
      return { error: 'This email is already subscribed' }
    }
    return { error: error.message }
  }
  return { success: true }
}

export async function updateContactStatus(id: string, status: ContactStatus) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/contacts')
  return { success: true }
}
