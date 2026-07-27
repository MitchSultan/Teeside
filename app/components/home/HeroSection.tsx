'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Home, Building, TrendingUp, Users } from 'lucide-react';

export default function HeroSection() {
  const [audience, setAudience] = useState<'tenant' | 'landlord'>('tenant');

  const stats = [
    { icon: Building, value: '2,500+', label: 'Properties' },
    { icon: TrendingUp, value: '98%', label: 'Occupancy' },
    { icon: Users, value: '1,200+', label: 'Happy Clients' },
    { icon: Home, value: 'KES 4.2B', label: 'Under Management' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Nairobi skyline — Westlands and Upperhill business district at golden hour"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/70 via-[var(--color-navy)]/50 to-[var(--color-navy)]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 lg:pt-32 lg:pb-40 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-success-light)] animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              Nairobi&apos;s Most Trusted Property Partner
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
          >
            Your Gateway to{' '}
            <span className="text-[var(--color-gold)]">Nairobi&apos;s</span>{' '}
            Finest Properties
          </motion.h1>

          {/* Audience Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex rounded-full p-1 bg-white/10 backdrop-blur-md border border-white/15">
              <button
                onClick={() => setAudience('tenant')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  audience === 'tenant'
                    ? 'bg-white text-[var(--color-navy)] shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                I&apos;m Looking for a Home
              </button>
              <button
                onClick={() => setAudience('landlord')}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  audience === 'landlord'
                    ? 'bg-white text-[var(--color-navy)] shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                I&apos;m a Property Owner
              </button>
            </div>
          </motion.div>

          {/* Dynamic Sub-copy */}
          <motion.p
            key={audience}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 max-w-2xl"
          >
            {audience === 'tenant'
              ? 'Discover verified apartments, villas, and plots across the Nairobi Metropolitan Area. From Kilimani penthouses to Ruaka starter homes — find your perfect match with ArdhiSasa-verified listings.'
              : 'Partner with Nairobi\'s most trusted property management team. We handle tenant vetting, rent collection, maintenance, and legal compliance — so you can earn passive income with zero hassle.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {audience === 'tenant' ? (
              <>
                <Link href="/properties" className="btn-primary !text-base !py-4 !px-8">
                  <Search size={20} />
                  Browse Properties
                  <ArrowRight size={18} />
                </Link>
                <Link href="/diaspora" className="btn-secondary !text-base !py-4 !px-8">
                  Diaspora? Start Here
                </Link>
              </>
            ) : (
              <>
                <Link href="/#landlord" className="btn-primary !text-base !py-4 !px-8">
                  <Building size={20} />
                  List Your Property
                  <ArrowRight size={18} />
                </Link>
                <Link href="tel:+254700000000" className="btn-secondary !text-base !py-4 !px-8">
                  Call Us: +254 700 000 000
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Floating Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 lg:pb-10">
          <div className="glass rounded-2xl p-4 sm:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-gold)]/10 flex items-center justify-center shrink-0">
                    <stat.icon size={20} className="text-[var(--color-gold)]" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/60">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
