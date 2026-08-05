import { z } from 'zod'

export const blogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  cover_image: z.string().optional().nullable(),
  category: z.string().min(1, 'Please select or enter a category'),
  author_name: z.string().min(2, 'Author name is required'),
  author_avatar: z.string().optional().nullable(),
  read_time: z.string().default('5 min read'),
  published_at: z.string().optional(),
  status: z.enum(['published', 'draft']).default('published'),
  featured: z.boolean().default(false),
})

export type BlogFormValues = z.infer<typeof blogSchema>
