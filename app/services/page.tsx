'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Building2, KeyRound, TrendingUp, Compass, CheckCircle2, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import ServicesSection from '@/app/components/home/ServicesSection'
import WhyChooseUs from '@/app/components/home/WhyChooseUs'
import FeeStructure from '@/app/components/home/FeeStructure'
import { submitContact } from '@/lib/actions/contacts'

export default function ServicesPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceType, setServiceType] = useState('Property Management')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleConsultationSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fullName || !email || !message) {
      toast.error('Please fill in required fields (Name, Email, Message)')
      return
    }

    setSubmitting(true)
    const result = await submitContact({
      full_name: fullName,
      email,
      phone: phone || undefined,
      subject: `Service Inquiry: ${serviceType}`,
      message: `Selected Service: ${serviceType}\n\n${message}`,
    })
    setSubmitting(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success('Consultation request sent! We will contact you within 24 hours.')
    setFullName('')
    setEmail('')
    setPhone('')
    setMessage('')
  }

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      {/* Hero Header */}
      <section className="bg-[url('/images/erma.jpg')] bg-no-repeat bg-center bg-cover py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] bg-white/10 px-3 py-1 rounded-full mb-4 inline-block">
              Professional Real Estate Solutions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
              Tailored Services for <br />
              <span className="text-[var(--color-gold)]">Property Owners & Investors</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
              From full property management and rapid tenant placement to commercial sales and diaspora advisory — we deliver transparency, compliance, and guaranteed returns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main 4 Services Component */}
      <ServicesSection />

      {/* Fee Structure */}
      <FeeStructure />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Consultation Form Section */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Book a Meeting
              </span>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
                Request a Service Consultation
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Are you a landlord seeking hassle-free management, or an investor looking for high-yield properties in Nairobi? Talk directly to our specialists today.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4  rounded-xl">
                  <Phone size={20} className="text-[var(--color-gold-dark)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">Direct Desk</p>
                    <p className="text-sm font-bold text-[var(--color-navy)]">+254 722 841 455</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4  rounded-xl">
                  <Mail size={20} className="text-[var(--color-gold-dark)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">Email Inquiries</p>
                    <p className="text-sm font-bold text-[var(--color-navy)]">teesidemanagementltd@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="shadow-md p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-[var(--color-navy)] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                Schedule Consultation
              </h3>
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Service Required</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none text-[var(--color-text-primary)]"
                  >
                    <option value="Property Management">Property Management</option>
                    <option value="Letting & Leasing">Letting & Leasing</option>
                    <option value="Property Sales">Property Sales</option>
                    <option value="Real Estate Consultancy">Real Estate Consultancy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Message / Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your property or investment goal..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none resize-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                  {submitting ? 'Sending Request…' : 'Submit Consultation Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
