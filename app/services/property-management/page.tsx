'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  Clock,
  Wrench,
  BadgePercent,
  FileText,
  UserCheck,
  HelpCircle,
} from 'lucide-react'
import { submitContact } from '@/lib/actions/contacts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const packages = [
  {
    name: 'Standard Management',
    rate: '7.5%',
    period: 'of monthly collected rent',
    description: 'Ideal for single-property owners seeking hands-free rent collection & tenant management.',
    features: [
      'Automated M-Pesa & Bank rent collection',
      'Basic tenant background & CRB checks',
      '24/7 emergency repair dispatch',
      'Quarterly digital financial statements',
      'Standard lease agreement drafting',
    ],
    highlight: false,
  },
  {
    name: 'Premium Portfolio Care',
    rate: '6.0%',
    period: 'of monthly collected rent (3+ units)',
    description: 'Tailored for multi-unit landlords & apartment blocks looking for maximum yield & 0% vacancy.',
    features: [
      'Everything in Standard Management',
      'Dedicated Property Manager & Desk',
      '0% Vacancy marketing priority',
      'ArdhiSasa legal title & tax compliance',
      'Monthly physical site audits & inspections',
      'Free eviction & dispute advocacy support',
    ],
    highlight: true,
  },
  {
    name: 'Commercial & Mixed-Use',
    rate: 'Custom',
    period: 'Based on GLA & asset size',
    description: 'Designed for commercial office towers, retail centers, and industrial parks across NMA.',
    features: [
      'Triple-net (NNN) lease structuring',
      'Service charge budget & reconciliation',
      'Facility & security staff management',
      'Corporate tenant vetting & VAT compliance',
      'Bespoke institutional reporting',
    ],
    highlight: false,
  },
]

const faqs = [
  {
    q: 'How do you collect rent and ensure timely tenant payments?',
    a: 'We integrate automated M-Pesa Paybill and direct bank APIs. Tenants receive automated SMS reminders 5 days prior to the due date. Over 98% of rent is collected by the 5th of every month.',
  },
  {
    q: 'What happens if a tenant defaults or breaks lease terms?',
    a: 'Our legal team initiates formal notice in compliance with the Landlord and Tenant Act. If default persists, we handle swift dispute resolution and tenant replacement with minimal loss of income.',
  },
  {
    q: 'How are property maintenance and repairs handled?',
    a: 'For minor repairs under a pre-agreed threshold (e.g. KES 5,000), we dispatch pre-vetted contractors immediately. For major items, we provide competitive quotes for landlord approval prior to work.',
  },
  {
    q: 'How quickly can Teeside take over management of my property?',
    a: 'Onboarding takes less than 48 hours. We conduct a physical condition audit, audit current leases, notify existing tenants, and set up your landlord portal.',
  },
]

export default function PropertyManagementPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [units, setUnits] = useState('1-5 Units')
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
      subject: `Property Management Inquiry (${units})`,
      message: `Property Units: ${units}\n\n${message}`,
    })
    setSubmitting(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success('Property Management consultation request sent successfully!')
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
          <span className="text-[var(--color-gold-dark)] font-medium">Property Management</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-[url('/images/hero1.jpg')] bg-no-repeat bg-center bg-cover py-16 lg:py-24 relative overflow-hidden my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] bg-white/10 px-3.5 py-1.5 rounded-full mb-4">
              <Building2 size={14} /> Full-Service Asset Care
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
              Property Management <br />
              <span className="text-[var(--color-gold)]">Engineered for 0% Vacancy</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mb-8">
              Maximize your rental yield and protect your physical assets in Nairobi with automated rent disbursement, pre-screened tenants, 24/7 maintenance, and complete legal compliance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#consultation" className="btn-primary !px-6 !py-3">
                Request Property Assessment
              </a>
              {/* <a href="#packages" className="btn-secondary !px-6 !py-3">
                View Management Fees
              </a> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Metrics */}
      <section className="py-12 bg-white border-y border-[var(--color-warm-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { title: '98.5%', label: 'On-Time Rent Collection' },
              { title: '0% Vacancy', label: 'Target Strategy' },
              { title: '< 24 Hours', label: 'Maintenance Dispatch' },
              { title: '500+ Units', label: 'Managed Across NMA' },
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

      {/* Core Management Features */}
      <section className="py-16 lg:py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Comprehensive Care
            </span>
            <h2 className="section-title text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
              What Our Property Management Service Includes
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              From tenant onboarding to legal compliance, we handle every operational detail so you enjoy passive monthly returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BadgePercent,
                title: 'Automated Rent Collection',
                desc: 'Direct M-Pesa & Bank API integration with instant landlord transfers and zero delays.',
              },
              {
                icon: UserCheck,
                title: 'Rigorous Tenant Vetting',
                desc: 'Comprehensive ID verification, employment audits, and CRB checks to eliminate rent default risks.',
              },
              {
                icon: Wrench,
                title: '24/7 Facility Maintenance',
                desc: 'Emergency repair dispatch, routine plumbing/electrical audits, and vetted local technician network.',
              },
              {
                icon: FileText,
                title: 'Digital Leases & Legal Contracts',
                desc: 'Compliant contracts under Kenyan Land Laws, deposit escrow, and automated renewal tracking.',
              },
              {
                icon: TrendingUp,
                title: 'Yield Optimization',
                desc: 'Regular market rent benchmarking across Kilimani, Westlands, Ruaka, and Syokimau.',
              },
              {
                icon: ShieldCheck,
                title: 'Landlord Portal & Reports',
                desc: 'Transparent monthly income/expense ledgers and year-end tax summary statements.',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-[var(--color-gold)]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-navy)] text-[var(--color-gold)] flex items-center justify-center mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Packages */}
      {/* <section id="packages" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Transparent Pricing
            </span>
            <h2 className="section-title text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
              Management Fee Packages
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              No hidden fees. You only pay when your property generates rental income.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-8 flex flex-col justify-between border transition-all duration-300 ${
                  pkg.highlight
                    ? 'border-[var(--color-gold)] bg-[var(--color-navy)] text-white shadow-xl relative scale-105'
                    : 'border-[var(--color-warm-gray)] bg-white text-[var(--color-navy)] shadow-sm'
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-[var(--color-gold)] text-[var(--color-navy)] px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${pkg.highlight ? 'text-white' : 'text-[var(--color-navy)]'}`}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1 my-4">
                    <span className={`text-4xl font-extrabold ${pkg.highlight ? 'text-[var(--color-gold)]' : 'text-[var(--color-navy)]'}`}>
                      {pkg.rate}
                    </span>
                    <span className={`text-xs ${pkg.highlight ? 'text-white/70' : 'text-[var(--color-text-muted)]'}`}>
                      {pkg.period}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed mb-6 ${pkg.highlight ? 'text-white/80' : 'text-[var(--color-text-secondary)]'}`}>
                    {pkg.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-current/10 mb-8">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-xs font-medium">
                        <CheckCircle2 size={16} className={pkg.highlight ? 'text-[var(--color-gold)]' : 'text-[var(--color-success)]'} />
                        <span className={pkg.highlight ? 'text-white/90' : 'text-[var(--color-text-primary)]'}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#consultation"
                  className={pkg.highlight ? 'btn-primary w-full text-center' : 'btn-navy w-full text-center'}
                >
                  Select Package
                </a>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Accordion */}
      <section className="py-16 lg:py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Got Questions?
            </span>
            <h2 className="section-title text-3xl font-bold text-[var(--color-navy)]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 shadow-sm border border-black/5">
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
      <section id="consultation" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Landlord Inquiry
              </span>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
                Schedule a Property Assessment
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Are you ready to enjoy hassle-free passive income? Speak with our head of property management today.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-[var(--color-bg-secondary)] rounded-xl">
                  <Phone size={20} className="text-[var(--color-gold-dark)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">Property Management Desk</p>
                    <p className="text-sm font-bold text-[var(--color-navy)]">+254 722 841 455</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[var(--color-bg-secondary)] rounded-xl">
                  <Mail size={20} className="text-[var(--color-gold-dark)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">Email Inquiries</p>
                    <p className="text-sm font-bold text-[var(--color-navy)]">teesidemanagementltd@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-bg-secondary)] p-8 rounded-2xl shadow-sm border border-black/5">
              <h3 className="text-xl font-bold text-[var(--color-navy)] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                Request Onsite Audit
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white text-sm outline-none border border-black/10 focus:ring-2 focus:ring-[var(--color-gold)]/30"
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
                      className="w-full px-4 py-3 rounded-xl bg-white text-sm outline-none border border-black/10 focus:ring-2 focus:ring-[var(--color-gold)]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl bg-white text-sm outline-none border border-black/10 focus:ring-2 focus:ring-[var(--color-gold)]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Number of Units</label>
                  <select
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white text-sm outline-none border border-black/10 text-[var(--color-text-primary)]"
                  >
                    <option value="1-5 Units">1-5 Residential Units</option>
                    <option value="6-20 Units">6-20 Residential Units</option>
                    <option value="20+ Units">20+ Apartment Block</option>
                    <option value="Commercial Building">Commercial Building</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Property Location & Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide neighborhood location (e.g. Kilimani, Ruaka) and current occupancy..."
                    className="w-full px-4 py-3 rounded-xl bg-white text-sm outline-none resize-none border border-black/10 focus:ring-2 focus:ring-[var(--color-gold)]/30"
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                  {submitting ? 'Submitting Request…' : 'Request Property Assessment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
