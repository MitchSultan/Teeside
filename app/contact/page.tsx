'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageSquare, Building2 } from 'lucide-react'
import { contactSchema, type ContactFormValues } from '@/lib/validations/property'
import { submitContact } from '@/lib/actions/contacts'

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(values: ContactFormValues) {
    const result = await submitContact({
      ...values,
      subject: values.subject || 'General enquiry',
    })
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success('Message sent! We will reply within 24 hours.')
    reset()
  }

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-2 block">Get in Touch</span>
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle mx-auto mt-2">Have a question? We&apos;d love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-5">
            {[
              { icon: Phone, title: 'Phone', info: '+254 722 841 455', sub: 'Mon-Sat, 8am-6pm EAT', href: 'tel:+254722841455' },
              { icon: Mail, title: 'Email', info: 'teesidemanagementltd@gmail.com', sub: 'We reply within 24 hours', href: 'mailto:teesidemanagementltd@gmail.com' },
              { icon: MapPin, title: 'Office', info: 'Northern Bypass, Nairobi', sub: 'Ergon Plaza, 1st Floor', href: '#' },
              { icon: Clock, title: 'Hours', info: 'Mon-Fri: 8am-6pm', sub: 'Sat: 9am-2pm | Sun: Closed', href: '#' },
              { icon: MessageSquare, title: 'WhatsApp', info: '+254 722 841 455', sub: 'Quick responses guaranteed', href: 'https://wa.me/254722841455' },
              { icon: Building2, title: 'Diaspora Desk', info: '+254 722 841 455', sub: 'Available across all timezones', href: 'tel:+254722841455' },
            ].map((item, i) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-4 neu-flat group"
              >
                <div className="w-10 h-10 rounded-xl bg-(--color-gold)/10 flex items-center justify-center shrink-0 group-hover:bg-(--color-gold)/20 transition-colors">
                  <item.icon size={20} className="text-(--color-gold)" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--color-text-primary)">{item.title}</p>
                  <p className="text-sm text-(--color-navy) font-medium">{item.info}</p>
                  <p className="text-xs text-(--color-text-muted)">{item.sub}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="shadow-md p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-(--color-navy) mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                Send Us a Message
              </h2>
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-(--color-text-secondary) mb-1.5">Full Name *</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-(--color-bg-tertiary) text-sm outline-none focus:ring-2 focus:ring-(--color-gold)/30 transition-all" {...register('full_name')} />
                    {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-(--color-text-secondary) mb-1.5">Phone Number</label>
                    <input type="tel" placeholder="+254 7XX XXX XXX" className="w-full px-4 py-3 rounded-xl bg-(--color-bg-tertiary) text-sm outline-none focus:ring-2 focus:ring-(--color-gold)/30 transition-all" {...register('phone')} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-(--color-text-secondary) mb-1.5">Email Address *</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-(--color-bg-tertiary) text-sm outline-none focus:ring-2 focus:ring-(--color-gold)/30 transition-all" {...register('email')} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-(--color-text-secondary) mb-1.5">Subject</label>
                  <input type="text" placeholder="How can we help?" className="w-full px-4 py-3 rounded-xl bg-(--color-bg-tertiary) text-sm outline-none focus:ring-2 focus:ring-(--color-gold)/30 transition-all" {...register('subject')} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Message *</label>
                  <textarea rows={5} placeholder="Tell us how we can help..." className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none resize-none focus:ring-2 focus:ring-[var(--color-gold)]/30 transition-all" {...register('message')} />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto disabled:opacity-50">
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
