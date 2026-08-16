'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { submitVirtualTourBooking } from '@/lib/actions/tours';
import { Globe, Video, Scale, Shield, CreditCard, Phone, Calendar, ChevronDown, ChevronUp, ArrowRight, Building2, Clock, CheckCircle, FileText } from 'lucide-react';

const faqs = [
  {
    q: 'How do I verify a property title deed from abroad?',
    a: 'All our properties with the "ArdhiSasa Verified" badge have undergone digital title deed verification through Kenya\'s official ArdhiSasa platform. We provide you with the verification report and can arrange for an independent legal review by our partner law firms.',
  },
  {
    q: 'Can I grant Power of Attorney for the purchase process?',
    a: 'Yes. We work with registered Kenyan advocates who can prepare a Power of Attorney (PoA) document. This can be signed at your nearest Kenyan embassy or consulate and apostilled for use in Kenya. We guide you through every step.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We support M-Pesa (Paybill), direct bank transfers (KCB, Equity, Cooperative Bank, Stanbic), and international wire transfers via SWIFT. All transactions go through a secure escrow account with real-time tracking.',
  },
  {
    q: 'How does the virtual inspection work?',
    a: 'We offer live video walkthroughs via Zoom/WhatsApp at a time that suits your timezone. Our agent physically visits the property with a high-quality camera, showing you every room, the neighborhood, and nearby amenities in real-time.',
  },
  {
    q: 'What are the legal requirements for diaspora property ownership in Kenya?',
    a: 'Kenyan citizens (including dual citizens) have full rights to own property. Foreign nationals can own property on leasehold terms (up to 99 years). We handle KRA PIN registration, stamp duty, and land registration.',
  },
];

const steps = [
  { icon: Globe, title: 'Browse & Select', desc: 'Explore verified listings online with detailed photos, videos, and virtual tours.' },
  { icon: Video, title: 'Virtual Inspection', desc: 'Schedule a live video walkthrough at a time convenient for your timezone.' },
  { icon: FileText, title: 'Legal & PoA', desc: 'Our partner advocates prepare all documents. Sign via your nearest Kenyan embassy.' },
  { icon: CreditCard, title: 'Secure Payment', desc: 'Pay through our escrow system with M-Pesa, bank transfer, or international wire.' },
  { icon: CheckCircle, title: 'Completion', desc: 'Title transfer handled digitally via ArdhiSasa. You receive your ownership documents.' },
];

export default function DiasporaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [fullName, setFullName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [timezone, setTimezone] = useState('')
  const [platform, setPlatform] = useState('Zoom')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleTourSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fullName || !whatsapp || !email) {
      toast.error('Please fill in your name, email, and WhatsApp number')
      return
    }

    setSubmitting(true)
    const result = await submitVirtualTourBooking({
      full_name: fullName,
      phone: whatsapp,
      email,
      timezone: timezone || undefined,
      platform,
      notes: notes || undefined,
    })
    setSubmitting(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success('Virtual inspection booked! Our diaspora agent will contact you shortly.')
    setFullName('')
    setWhatsapp('')
    setEmail('')
    setTimezone('')
    setNotes('')
  }

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      {/* Hero */}
      <section className="relative bg-[url(/images/house.jpg)] bg-no-repeat bg-cover bg-center py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-(--color-gold)/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mb-6">
              <Globe size={16} className="text-(--color-gold)" />
              <span className="text-sm font-medium text-white/90">For Kenyans Abroad</span>
            </motion.div> */}

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
              Invest in Nairobi Real Estate <br></br><span className="text-(--color-gold)">From Anywhere</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
              Whether you&apos;re in the UK, Canada, USA or Australia, we make buying and managing property back home simple, secure, and transparent. No surprises, no fraud, just results.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
              {/* <Link href="/properties" className="btn-primary">
                Browse Verified Properties <ArrowRight size={18} />
              </Link> */}
              <Link href="#virtual-inspection" className="btn-secondary">
                <Video size={18} /> Book Virtual Inspection
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-(--color-bg-primary)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-2 block">How It Works</span>
            <h2 className="section-title">5 Simple Steps to Own Property in Kenya</h2>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-5 gap-6">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-(--color-warm-gray)" />

            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-(--color-bg-tertiary) mx-auto mb-4 flex items-center justify-center relative z-10 border-4 border-[var(--color-bg-primary)]">
                  <step.icon size={28} className="text-(--color-navy)" />
                </div>
                <span className="text-xs font-bold text-(--color-gold) mb-1 block">Step {i + 1}</span>
                <h3 className="text-sm font-semibold text-(--color-text-primary) mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{step.title}</h3>
                <p className="text-xs text-(--color-text-muted) leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Inspection */}
      <section id="virtual-inspection" className="py-16 lg:py-24 bg-(--color-bg-secondary)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-2 block">Virtual Inspections</span>
              <h2 className="section-title mb-4">See Every Detail, Without Leaving Home</h2>
              <p className="section-subtitle mb-6">Book a live video walkthrough with our on-ground agents at a time that suits your timezone. Available 7 days a week.</p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Video, text: 'HD live video call via Zoom or WhatsApp' },
                  { icon: Clock, text: 'Available across all timezones (UK, US, UAE, AU)' },
                  { icon: Building2, text: 'Tour the property, neighborhood & amenities' },
                  { icon: Calendar, text: 'Flexible scheduling — weekdays & weekends' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-(--color-gold)/10 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-(--color-gold)" />
                    </div>
                    <span className="text-sm text-(--color-text-secondary)">{item.text}</span>
                  </div>
                ))}
              </div>

              <button className="btn-primary">
                <Calendar size={18} /> Book Inspection
              </button>
            </div>

            {/* Booking Form */}
            <div className="shadow-md p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-[var(--color-navy)] mb-5" style={{ fontFamily: 'var(--font-inter)' }}>Book Virtual Inspection</h3>
              <form className="space-y-4" onSubmit={handleTourSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                  />
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="WhatsApp Number *"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                  />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address *"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                />
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none text-[var(--color-text-secondary)]"
                >
                  <option value="">Select Timezone (optional)</option>
                  <option value="East Africa (EAT, UTC+3)">East Africa (EAT, UTC+3)</option>
                  <option value="United Kingdom (GMT/BST)">United Kingdom (GMT/BST)</option>
                  <option value="US Eastern (EST/EDT)">US Eastern (EST/EDT)</option>
                  <option value="US Pacific (PST/PDT)">US Pacific (PST/PDT)</option>
                  <option value="UAE (GST, UTC+4)">UAE (GST, UTC+4)</option>
                  <option value="Australia (AEST, UTC+10)">Australia (AEST, UTC+10)</option>
                </select>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none text-[var(--color-text-secondary)]"
                >
                  <option value="Zoom">Zoom</option>
                  <option value="WhatsApp Video">WhatsApp Video</option>
                  <option value="Google Meet">Google Meet</option>
                </select>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Property or Notes (optional)"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30"
                />
                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                  {submitting ? 'Submitting…' : 'Submit Booking Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Secure Payments */}
      <section className="py-16 lg:py-24 bg-(--color-bg-primary)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-2 block">System-Based Trust</span>
            <h2 className="section-title">Secure Payment Options</h2>
            <p className="section-subtitle mx-auto mt-3">Every shilling tracked, every transaction verified</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: CreditCard, title: 'M-Pesa Paybill', desc: 'Instant mobile money payments via Safaricom M-Pesa. Real-time confirmation and digital receipt.', color: 'var(--color-success)' },
              { icon: Building2, title: 'Bank APIs', desc: 'Direct transfers to our escrow account via KCB, Equity, Cooperative, or international SWIFT wire.', color: 'var(--color-navy)' },
              { icon: Shield, title: 'Escrow Tracking', desc: 'Funds held in a regulated escrow account until all conditions are met. Full transparency dashboard.', color: 'var(--color-gold)' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="shadow-md p-6 text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, ${item.color} 10%, transparent)` }}>
                  <item.icon size={28} style={{ color: item.color }} />
                </div>
                <h3 className="text-base font-semibold text-(--color-text-primary) mb-2" style={{ fontFamily: 'var(--font-inter)' }}>{item.title}</h3>
                <p className="text-sm text-(--color-text-muted) leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-(--color-bg-secondary)">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-2 block">Power of Attorney & Legal</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-(--color-text-primary) pr-4">{faq.q}</span>
                  {openFaq === i ? <ChevronUp size={18} className="text-(--color-text-muted) shrink-0" /> : <ChevronDown size={18} className="text-[var(--color-text-muted)] shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5">
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-navy)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
            Ready to Invest <span className="text-[var(--color-gold)]">Back Home?</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">Talk to our diaspora desk. We understand your concerns and have helped hundreds of Kenyans abroad secure property safely.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="btn-primary">Browse Properties</Link>
            <a href="tel:+254700000000" className="btn-secondary"><Phone size={18} /> Call Diaspora Desk</a>
          </div>
        </div>
      </section>
    </div>
  );
}
