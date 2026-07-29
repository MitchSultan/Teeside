import { z } from 'zod'

export const propertySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  property_type: z.enum(['residential', 'commercial', 'land']),
  status: z.enum(['available', 'rented', 'under-maintenance']),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  county: z.string().min(2, 'County is required'),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
  bedrooms: z.coerce.number().int().min(0).optional().nullable(),
  bathrooms: z.coerce.number().min(0).optional().nullable(),
  square_feet: z.coerce.number().int().min(0).optional().nullable(),
  price: z.coerce.number().positive('Price must be positive'),
  rental_price: z.coerce.number().positive().optional().nullable(),
  images: z.array(z.string()).default([]),
  features: z.record(z.string(), z.unknown()).default({}),
})

export type PropertyFormValues = z.infer<typeof propertySchema>

export const agentSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  bio: z.string().optional(),
  profile_image: z.string().optional(),
  license_number: z.string().optional(),
  experience_years: z.coerce.number().int().min(0).optional().nullable(),
  is_active: z.boolean().default(true),
  social_links: z.record(z.string(), z.string()).default({}),
})

export type AgentFormValues = z.infer<typeof agentSchema>

export const contactSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  property_id: z.string().uuid().optional().nullable(),
})

export type ContactFormValues = z.infer<typeof contactSchema>

export const newsletterSchema = z.object({
  email: z.string().email('Valid email required'),
})

export type NewsletterFormValues = z.infer<typeof newsletterSchema>

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
