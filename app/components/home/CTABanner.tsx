'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Search, Building, ArrowRight } from 'lucide-react';

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-steel) 50%, var(--color-navy-light) 100%)',
          }}
        >
          {/* Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Glow Effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-gold)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[var(--color-steel-light)]/10 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Tenant CTA */}
            <div className="p-8 sm:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                <Search size={24} className="text-[var(--color-gold)]" />
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight"
                style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
              >
                Looking for Your
                <br />
                <span className="text-[var(--color-gold)]">Next Home?</span>
              </h3>
              <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
                Browse 2,500+ verified properties across the Nairobi Metropolitan Area. Find apartments, villas, and plots tailored to your budget.
              </p>
              <Link href="/properties" className="btn-primary inline-flex">
                Browse Properties
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Landlord CTA */}
            <div className="p-8 sm:p-12 lg:p-14">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                <Building size={24} className="text-[var(--color-gold)]" />
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight"
                style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
              >
                Own a Property?
                <br />
                <span className="text-[var(--color-gold)]">Let Us Manage It.</span>
              </h3>
              <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
                Join Nairobi&apos;s top property management platform. We handle tenants, maintenance, and rent collection — you enjoy passive income.
              </p>
              <Link href="/#landlord" className="btn-primary inline-flex">
                Partner With Us
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
