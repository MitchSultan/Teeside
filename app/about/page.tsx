'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Target, Eye, Heart } from 'lucide-react';
import MDDeclaration from '@/app/components/about/MDDeclaration';
import TeamSection from '@/app/components/about/TeamSection';

const values = [
  { icon: Shield, title: 'Trust & Transparency', desc: 'Every property verified. Every document authenticated. Every transaction tracked.' },
  { icon: Target, title: 'Our Vision', desc: 'To provide quality services that exceed the expectation of our esteemed customers in line with ethical practices within the industry.' },
  { icon: Eye, title: 'Our Goal', desc: 'To be a reputable leader in the real estate industry through regional expansion.' },
  { icon: Heart, title: 'Our Mission', desc: 'To build long term relationships with our customers and clients providing the most unique and comprehensive customer service.' },
];

export default function AboutPage() {
  return (
    <div className="pt-20 lg:pt-24 pb-16">
      {/* Hero */}
      <section className="bg-[url('/images/night.jpg')] bg-no-repeat bg-top bg-cover py-16 lg:py-24 relative overflow-hidden">
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
              { value: '25+', label: 'Properties Listed' },
              { value: '12+', label: 'Happy Clients' },
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
              <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-2 block">About Us</span>
              <h2 className="section-title mb-4">We have over 12 yrs of property management experience</h2>
              <p className="text-(--color-text-secondary) leading-relaxed mb-4">
                 Teeside Mangement Ltd was incorporated in Kenya in 2014. The directors are Geoffrey Wangombe and Mrs Grace Mwaniki. They both have over 40+ yrs in sales and property management with a rich background in real estates development and construction. </p>
                  <p className="text-(--color-text-secondary) leading-relaxed">
                We believe in doing whatever is required to  earn the right to be your agent and we let our actions speak for themselves. You get the results you expected because we focus on your individual needs.
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

      {/* MD Declaration Section */}
      <MDDeclaration />

      {/* Team Section */}
      <TeamSection />

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
