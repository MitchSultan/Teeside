'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  Compass,
  ChevronRight,
  CheckCircle2,
  Phone,
  Mail,
  PieChart,
  FileSpreadsheet,
  ShieldCheck,
  Scale,
  Building,
  HelpCircle,
} from 'lucide-react'
import { submitContact } from '@/lib/actions/contacts'

const advisoryAreas = [
  {
    icon: PieChart,
    title: 'Rental Yield & ROI Forecasting',
    desc: 'Algorithmic market rent modeling and cash-flow projections for buy-to-let investors across Kilimani, Ruaka, and Westlands.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Development Feasibility Studies',
    desc: 'Comprehensive site analysis, density zoning, construction cost estimation, and IRR sensitivity models for developers.',
  },
  {
    icon: ShieldCheck,
    title: 'ArdhiSasa Land Due Diligence',
    desc: 'Deep digital title searches, beacon verification, county zoning clearance, and historical ownership tracing.',
  },
  {
    icon: Scale,
    title: 'Real Estate Tax & Compliance',
    desc: 'Advisory on Capital Gains Tax (CGT 15%), Stamp Duty exemptions, Monthly Rental Income Tax (MRI 7.5%), and KRA compliance.',
  },
]

const faqs = [
  {
    q: 'What is included in a Real Estate Feasibility Study?',
    a: 'Our feasibility reports include site survey analysis, county zoning rules, financial modeling (NPV, IRR, Payback Period), competitive rent benchmark, and target buyer demographics.',
  },
  {
    q: 'How do you charge for consultancy services?',
    a: 'We offer fixed-rate advisory packages for land due diligence and bespoke project fees for full development feasibility studies.',
  },
  {
    q: 'Can you advise diaspora clients on tax optimization in Kenya?',
    a: 'Yes, we provide structured guidance on cross-border money transfers, double taxation treaties, and KRA tax registration for diaspora investors.',
  },
]

export default function ConsultancyPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [consultancyType, setConsultancyType] = useState('Investment Advisory')
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
      subject: `Consultancy Inquiry: ${consultancyType}`,
      message: `Type: ${consultancyType}\n\n${message}`,
    })
    setSubmitting(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success('Consultancy request sent successfully!')
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
          <span className="text-[var(--color-gold-dark)] font-medium">Real Estate Consultancy</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-[url('/images/hero1.jpg')] bg-no-repeat bg-center bg-cover py-16 lg:py-24 relative overflow-hidden my-4">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] bg-white/10 px-3.5 py-1.5 rounded-full mb-4">
              <Compass size={14} /> Institutional Strategic Advisory
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
              Real Estate Consultancy <br />
              <span className="text-[var(--color-gold)]">Data-Backed Growth & Compliance</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mb-8">
              Strategic advisory for high-net-worth individuals, property developers, and diaspora buyers seeking high returns, legal certainty, and yield optimization across Kenya.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#consultation" className="btn-primary !px-6 !py-3">
                Book Advisory Session
              </a>
              <a href="#advisory" className="btn-secondary !px-6 !py-3">
                View Advisory Capabilities
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-[var(--color-warm-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { title: '12+ Years', label: 'Market Expertise' },
              { title: '100+', label: 'Feasibility Reports Delivered' },
              { title: 'ArdhiSasa', label: 'Digital Legal Verification' },
              { title: 'KES 5B+', label: 'Advisored Asset Portfolio' },
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

      {/* Advisory Areas */}
      <section id="advisory" className="py-16 lg:py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Capabilities
            </span>
            <h2 className="section-title text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
              Our Advisory Pillars
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Transforming complex real estate decisions into clear, actionable, high-yield investment strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advisoryAreas.map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-navy)] text-[var(--color-gold)] flex items-center justify-center shrink-0">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
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
              FAQ
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
                Advisory Desk
              </span>
              <h2 className="section-title text-3xl sm:text-4xl font-bold text-[var(--color-navy)] mb-4">
                Book a Strategy Session
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Get direct access to senior real estate strategists and tax advisors in Kenya.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <Phone size={20} className="text-[var(--color-gold-dark)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">Direct Advisory Line</p>
                    <p className="text-sm font-bold text-[var(--color-navy)]">+254 722 841 455</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <Mail size={20} className="text-[var(--color-gold-dark)] shrink-0" />
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)]">Email Advisory</p>
                    <p className="text-sm font-bold text-[var(--color-navy)]">teesidemanagementltd@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
              <h3 className="text-xl font-bold text-[var(--color-navy)] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                Advisory Request Form
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
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Advisory Area</label>
                  <select
                    value={consultancyType}
                    onChange={(e) => setConsultancyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none text-[var(--color-text-primary)]"
                  >
                    <option value="Investment Advisory">Investment & Yield Advisory</option>
                    <option value="Development Feasibility">Development Feasibility Study</option>
                    <option value="Title Due Diligence">ArdhiSasa Title Deed Search</option>
                    <option value="Tax & Compliance">Tax & Compliance Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">Project Summary / Investment Scope *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your investment goals, land location, or project scale..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none resize-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                  {submitting ? 'Submitting Request…' : 'Schedule Strategy Session'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
