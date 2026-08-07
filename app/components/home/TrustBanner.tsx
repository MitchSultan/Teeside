'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, CheckCircle } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'EARB Registered',
    description: 'Licensed by the Estate Agents Registration Board of Kenya',
    color: 'var(--color-navy)',
  },
  {
    icon: Award,
    title: 'KPDA Member',
    description: 'Kenya Property Developers Association accredited',
    color: 'var(--color-gold)',
  },
  {
    icon: CheckCircle,
    title: 'ArdhiSasa Verified',
    description: 'Digital title deed verification via ArdhiSasa platform',
    color: 'var(--color-success)',
  },
];

const stats = [
  { value: '12+', label: 'Years in Nairobi Market' },
  { value: '25+', label: 'Properties Listed' },
  { value: '4.8/5', label: 'Client Satisfaction' },
  { value: 'KES 1.2B', label: 'Portfolio Value' },
];

export default function TrustBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-14 lg:py-20 bg-[var(--color-bg-tertiary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className=" flex flex-col md:flex-row justify-between text-left md:text-center mb-10"
        >
          <h2 className="section-title ">Trusted by <br></br><span className="text-(--color-gold)"> Thousands </span></h2>
          <p className=" text-left  mt-2">
            Fully licensed, verified, and committed to transparency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="shadow-md p-6 text-center"
            >
              <div
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `color-mix(in srgb, ${badge.color} 10%, transparent)` }}
              >
                <badge.icon size={28} style={{ color: badge.color }} />
              </div>
              <h3
                className="text-base font-semibold text-[var(--color-text-primary)] mb-1"
                style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
              >
                {badge.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">{badge.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="shadow-md p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)]"
                  style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
