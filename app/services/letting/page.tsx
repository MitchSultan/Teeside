'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  KeyRound,
  ChevronRight,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Video,
  Search,
  FileCheck,
  Building,
  HelpCircle,
} from 'lucide-react'
import { submitContact } from '@/lib/actions/contacts'

const lettingSteps = [
  {
    step: '01',
    title: 'Valuation & Staging',
    desc: 'We analyze real-time market data across Nairobi to price your property competitively and take high-res photographs & virtual 3D tours.',
  },
  {
    step: '02',
    title: 'Multi-Channel Exposure',
    desc: 'Featured promotion on Teeside portal, social channels, diaspora network, and top regional real estate marketplaces.',
  },
  {
    step: '03',
    title: 'Vetting & Onboarding',
    desc: 'Rigorous background, income, and CRB screening for prospective tenants prior to lease signing.',
  },
  {
    step: '04',
    title: 'Lease & Deposit Escrow',
    desc: 'Execution of legally binding tenancy contracts under Kenyan law and secure deposit escrow placement.',
  },
]

const faqs = [
  {
    q: 'How long does it take to place a qualified tenant?',
    a: 'Our average placement time is 14 days thanks to our pre-qualified tenant waitlist and targeted digital marketing campaigns.',
  },
  {
    q: 'What are your letting commission rates?',
    a: 'Our standard letting fee is equivalent to 1 month’s rent upon successful placement and lease execution. There are zero upfront listing fees.',
  },
  {
    q: 'Do you offer virtual walkthroughs for diaspora tenants?',
    a: 'Yes! We conduct HD live virtual tours and 3D walkthroughs for diaspora clients and relocating expatriates.',
  },
]

export default function LettingPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [propertyType, setPropertyType] = useState('Residential Apartment')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fullName || !email || !message) {
      toast.error('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    const result = await submitContact({
      full_name: fullName,
      email,
      phone: phone || undefined,
      subject: `Letting Inquiry: ${propertyType}`,
      message: `Property Type: ${propertyType}\n\n${message}`,
    })
    setSubmitting(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success('Letting consultation request sent successfully!')
    setFullName('')
    setEmail('')
    setPhone('')
    setMessage('')
  }

  return (
    <div className="pt-20 lg:pt-24 pb-16 bg-[var(--color-bg-primary)]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <Link href="/" className="hover:text-[var(--color-navy)]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/services" className="hover:text-[var(--color-navy)]">Services</Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-gold-dark)] font-medium">Letting & Leasing</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-[url('/images/serbg.jpeg')] bg-no-repeat bg-center bg-cover py-16 lg:py-24 relative overflow-hidden my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] bg-white/10 px-3.5 py-1.5 rounded-full mb-4">
              <KeyRound size={14} /> Rapid Tenant Placement
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
              Letting & Leasing Services <br />
              <span className="text-[var(--color-gold)]">Qualified Tenants in 14 Days</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mb-8">
              We connect landlords with reliable, fully vetted residential and commercial tenants across Nairobi Metropolitan Area through multi-channel digital campaigns and verified legal contracts.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#consultation" className="btn-primary !px-6 !py-3">
                List Your Property
              </a>
              <a href="#process" className="btn-secondary !px-6 !py-3">
                Our Letting Process
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Letting Highlights */}
      <section className="py-12 bg-white border-y border-[var(--color-warm-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { title: '14 Days', label: 'Average Time to Let' },
              { title: '100%', label: 'CRB & Income Screened' },
              { title: 'ArdhiSasa', label: 'Verified Documentation' },
              { title: 'Zero', label: 'Upfront Listing Fees' },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <p className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
                  {stat.title}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Pipeline */}
      <section id="process" className="py-16 lg:py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Proven Workflow
            </span>
            <h2 className="section-title text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
              How We Let Your Property Faster
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              A structured 4-step pipeline designed to maximize monthly rental value and eliminate vacancy gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {lettingSteps.map((step) => (
              <div key={step.step} className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 relative">
                <span className="text-4xl font-extrabold text-[var(--color-gold)]/30 mb-4 block" style={{ fontFamily: 'var(--font-inter)' }}>
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Clarifications
            </span>
            <h2 className="section-title text-3xl font-bold text-[var(--color-navy)]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-[var(--color-bg-secondary)] rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-[var(--color-navy)] mb-2 flex items-center gap-2">
                  <HelpCircle size={18} className="text-[var(--color-gold-dark)] shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Request Form */}
      <section id="consultation" className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                List Property
              </span>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
                Request Letting Services
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Have a vacant apartment, villa, or office space in Nairobi? Talk to our letting specialists today.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <Phone size={20} className="text-[var(--color-gold-dark)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">Direct Hotline</p>
                    <p className="text-sm font-bold text-[var(--color-navy)]">+254 722 841 455</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <Mail size={20} className="text-[var(--color-gold-dark)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">Email Inquiries</p>
                    <p className="text-sm font-bold text-[var(--color-navy)]">teesidemanagementltd@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
              <h3 className="text-xl font-bold text-[var(--color-navy)] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                Property Letting Form
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
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
                      placeholder="jane@example.com"
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
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none text-[var(--color-text-primary)]"
                  >
                    <option value="Residential Apartment">Residential Apartment</option>
                    <option value="Townhouse / Villa">Townhouse / Villa</option>
                    <option value="Commercial Office Space">Commercial Office Space</option>
                    <option value="Retail / Warehouse">Retail / Warehouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Property Details & Expected Monthly Rent *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe location, number of bedrooms, and target monthly rental price..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none resize-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                  {submitting ? 'Submitting Request…' : 'Submit Letting Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
