'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Shield, Banknote, Wrench, Scale, UserCheck, BarChart3, ArrowRight, Phone } from 'lucide-react';

const benefits = [
  {
    icon: UserCheck,
    title: 'Tenant Vetting',
    description: 'Rigorous screening with credit checks, employment verification, and reference validation to ensure reliable tenants.',
  },
  {
    icon: Banknote,
    title: 'Rent Collection',
    description: 'Automated M-Pesa and bank collections with real-time tracking. 98% on-time collection rate.',
  },
  {
    icon: Wrench,
    title: 'Property Maintenance',
    description: 'Staff handles all maintenance requests, routine inspections, and emergency repairs with vetted contractors.',
  },
  {
    icon: Scale,
    title: 'Legal Compliance',
    description: 'We handle lease agreements, dispute resolution, and compliance with Kenyan tenancy laws — so you don\'t have to.',
  },
  {
    icon: BarChart3,
    title: 'Financial Reporting',
    description: 'Monthly income statements, occupancy reports, and market analysis delivered to your dashboard.',
  },
  {
    icon: Shield,
    title: 'Insurance & Risk',
    description: 'Comprehensive property insurance facilitation and risk mitigation strategies for your portfolio.',
  },
];

export default function LandlordCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} id="landlord" className="py-16 lg:py-24 bg-[var(--color-navy)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-3 block">
              For Property Owners
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
            >
              Let Us Manage Your
              <br />
              <span className="text-[var(--color-gold)]">Property Portfolio</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
              Join 50+ landlords who trust Teeside to maximize their rental income. Our full-service property management handles everything from tenant acquisition to maintenance — while you earn passive income.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary !text-base">
                {/* <Phone size={18} /> */}
                Contact Us
                <ArrowRight size={18} />
              </Link>
              <Link href="tel:+254722841455" className="btn-secondary !text-base">
                Call: +254 722 841 455
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6">
              <div>
                <p className="text-2xl font-bold text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-inter)' }}>500+</p>
                <p className="text-xs text-white/50">Properties Managed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-inter)' }}>98%</p>
                <p className="text-xs text-white/50">Occupancy Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-inter)' }}>24hrs</p>
                <p className="text-xs text-white/50">Avg. Maintenance Response</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-white/15 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--color-gold)]/20 transition-colors">
                  <benefit.icon size={20} className="text-[var(--color-gold)]" />
                </div>
                <h3
                  className="text-sm font-semibold text-white mb-1.5"
                  style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
                >
                  {benefit.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
