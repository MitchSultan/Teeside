'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { TourStatus } from '@/types'

export interface VirtualTourInput {
  full_name: string
  email: string
  phone: string
  timezone?: string
  platform?: string
  preferred_date?: string
  property_id?: string
  notes?: string
}

export async function submitVirtualTourBooking(input: VirtualTourInput) {
  try {
    const supabase = await createClient()

    if (!input.full_name || !input.email || !input.phone) {
      return { error: 'Name, email, and phone/WhatsApp number are required' }
    }

    const { error } = await supabase.from('virtual_tour_bookings').insert({
      full_name: input.full_name,
      email: input.email,
      phone: input.phone,
      timezone: input.timezone || null,
      platform: input.platform || 'Zoom',
      preferred_date: input.preferred_date || null,
      property_id: input.property_id || null,
      notes: input.notes || null,
      status: 'pending',
    })

    if (error) {
      console.error('Error inserting virtual tour booking:', error)
      return { error: 'Failed to record booking. Please try again.' }
    }

    revalidatePath('/admin/tours')
    return { success: true }
  } catch (err) {
    console.error('Unexpected error submitting tour booking:', err)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}

export async function updateTourStatus(id: string, status: TourStatus) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('virtual_tour_bookings')
      .update({ status })
      .eq('id', id)

    if (error) {
      return { error: 'Failed to update booking status' }
    }

    revalidatePath('/admin/tours')
    return { success: true }
  } catch (err) {
    return { error: 'Failed to update status' }
  }
}
