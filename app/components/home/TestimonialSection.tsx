'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, User } from 'lucide-react';
import { testimonials } from '@/data/properties';

const roleLabels: Record<string, string> = {
  tenant: 'Tenant',
  landlord: 'Landlord',
  buyer: 'Buyer',
  diaspora: 'Diaspora Investor',
};

const roleColors: Record<string, string> = {
  tenant: 'var(--color-info)',
  landlord: 'var(--color-gold)',
  buyer: 'var(--color-success)',
  diaspora: 'var(--color-steel)',
};

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-[var(--color-bg-secondary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-2 block">
            Client Stories
          </span>
          <h2 className="section-title">What Our Clients Say</h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="shadow-md p-8 sm:p-10 relative"
        >
          {/* Quote Icon */}
          <div className="absolute -top-4 left-8 w-10 h-10 rounded-xl bg-[var(--color-gold)] flex items-center justify-center shadow-lg">
            <Quote size={20} className="text-[var(--color-navy)]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="pt-4"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? 'text-[var(--color-gold)] fill-current' : 'text-[var(--color-warm-gray)]'}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg sm:text-xl text-[var(--color-text-primary)] leading-relaxed mb-6 font-medium">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                  <User size={24} className="text-[var(--color-text-muted)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-inter)' }}>
                    {testimonial.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${roleColors[testimonial.role]} 10%, transparent)`,
                        color: roleColors[testimonial.role],
                      }}
                    >
                      {roleLabels[testimonial.role]}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {testimonial.property}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--color-warm-gray)]">
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 bg-[var(--color-gold)]'
                      : 'bg-[var(--color-warm-gray-dark)] hover:bg-[var(--color-text-muted)]'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center hover:bg-[var(--color-warm-gray)] transition-colors"
              >
                <ChevronLeft size={18} className="text-[var(--color-text-secondary)]" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center hover:bg-[var(--color-warm-gray)] transition-colors"
              >
                <ChevronRight size={18} className="text-[var(--color-text-secondary)]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
