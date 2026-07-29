'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Shield, Award, Users, TrendingUp, Target, Eye, Heart, MapPin, Phone, Mail } from 'lucide-react';

const values = [
  { icon: Shield, title: 'Trust & Transparency', desc: 'Every property verified. Every document authenticated. Every transaction tracked.' },
  { icon: Target, title: 'Client-First Approach', desc: 'Whether you\'re a first-time renter or a seasoned investor, your goals drive everything we do.' },
  { icon: Eye, title: 'Market Intelligence', desc: 'Data-driven insights to help you make informed property decisions in the NMA.' },
  { icon: Heart, title: 'Community Impact', desc: 'We believe quality housing transforms communities. We build partnerships, not just portfolios.' },
];

const team = [
  { name: 'Geoffery Mwangombe', role: 'CEO & Founder', desc: '15+ years in Nairobi real estate' },
  { name: 'Sarah Wanjiku', role: 'Head of Property Management', desc: 'Managing 500+ units across NMA' },
  { name: 'Grace Otieno', role: 'Head of Sales', desc: 'KES 2B+ in closed transactions' },
  { name: 'Peter Kamau', role: 'Head of Diaspora Services', desc: 'Connecting investors from 12 countries' },
];

export default function AboutPage() {
  return (
    <div className="pt-20 lg:pt-24 pb-16">
      {/* Hero */}
      <section className="bg-[url('/images/hero1.jpg')] bg-no-repeat bg-center bg-cover py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-3 block">About Teeside</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
              Nairobi&apos;s Most Trusted <br></br><span className="text-(--color-gold)">Property Managers</span>
            </h1>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Since 2014, Teeside Management Ltd  has been bridging the gap between property owners and tenants across the Nairobi Metropolitan Area — with integrity, innovation, and results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-(--color-bg-primary)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: '12+', label: 'Years in Market' },
              { value: '2,5+', label: 'Properties Listed' },
              { value: '1,2+', label: 'Happy Clients' },
              { value: 'KES 1.2B', label: 'Portfolio Value' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="shadow-md p-5 text-center">
                <p className="text-2xl font-bold text-(--color-navy)" style={{ fontFamily: 'var(--font-inter)' }}>{s.value}</p>
                <p className="text-xs text-(--color-text-muted) mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24 bg-(--color-bg-secondary)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-2 block">Our Mission</span>
              <h2 className="section-title mb-4">Making Nairobi Property Accessible to Everyone</h2>
              <p className="text-(--color-text-secondary) leading-relaxed mb-4">
                We exist to democratize real estate in the Nairobi Metropolitan Area. From a young professional looking for their first bedsitter in Kitengela, to a diaspora investor seeking a verified villa in Kileleshwa — we serve every segment with equal dedication.
              </p>
              <p className="text-(--color-text-secondary) leading-relaxed">
                Our dual-focus model uniquely positions us: we find the best tenants for landlords, and the best homes for tenants. This alignment of interests creates a virtuous cycle of trust, occupancy, and returns.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="shadow-md p-5">
                  <v.icon size={24} className="text-(--color-gold) mb-3" />
                  <h3 className="text-sm font-semibold text-(--color-text-primary) mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{v.title}</h3>
                  <p className="text-xs text-(--color-text-muted) leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-(--color-bg-primary)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-2 block">Leadership</span>
            <h2 className="section-title">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="shadow-md p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-(--color-bg-tertiary) mx-auto mb-4 flex items-center justify-center">
                  <Users size={28} className="text-(--color-navy)" />
                </div>
                <h3 className="text-base font-semibold text-(--color-text-primary)" style={{ fontFamily: 'var(--font-inter)' }}>{t.name}</h3>
                <p className="text-xs text-(--color-gold) font-medium mb-2">{t.role}</p>
                <p className="text-xs text-(--color-text-muted)">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-(--color-navy)">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
            Ready to Get <span className="text-(--color-gold)">Started?</span>
          </h2>
          <p className="text-white/60 mb-8">Whether you&apos;re buying, renting, or listing — we&apos;re here to help.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="btn-primary">Browse Properties</Link>
            <Link href="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
