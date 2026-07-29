'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { newsletterSchema, type NewsletterFormValues } from '@/lib/validations/property'
import { subscribeNewsletter } from '@/lib/actions/contacts'

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  })

  async function onSubmit(values: NewsletterFormValues) {
    const result = await subscribeNewsletter(values)
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success('Subscribed successfully!')
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return <p className="text-sm text-white/80">Thanks for subscribing!</p>
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-sm text-white placeholder-white/40 border border-white/10 focus:outline-none focus:border-[var(--color-gold)]/50 transition-colors"
        {...register('email')}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-navy)] text-sm font-semibold rounded-lg hover:bg-[var(--color-gold-light)] transition-colors disabled:opacity-50"
      >
        {isSubmitting ? '…' : 'Join'}
      </button>
    </form>
  )
}
