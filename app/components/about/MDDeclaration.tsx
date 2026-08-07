'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, ShieldCheck, Award, CheckCircle2, Mail, PhoneCall } from 'lucide-react';

export default function MDDeclaration() {
  return (
    <section className="py-16 lg:py-24 bg-(--color-navy) text-white relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.4) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* PHOTO PART (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Glow & Border */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-(--color-gold)/40 via-amber-500/20 to-transparent blur-lg opacity-70" />

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-(--color-gold)/30 shadow-2xl">
                <div className="aspect-[4/5] relative w-full">
                  <Image
                    src="/images/jeff.PNG"
                    alt="Geoffrey Mwangombe - Managing Director, Teeside Management Ltd"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                </div>

                {/* Floating MD Info Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-(--color-gold) text-slate-950 uppercase tracking-wider">
                      Managing Director
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
                    Geoffrey Mwangombe
                  </h3>
                  <p className="text-xs text-white/70 mt-0.5">
                    Founder &amp; MD, Teeside Management Ltd
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute -bottom-5 -right-3 sm:-right-5 bg-slate-900/95 border border-(--color-gold)/40 p-4 rounded-xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-(--color-gold)/20 flex items-center justify-center text-(--color-gold)">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">15+ Years</p>
                  <p className="text-[11px] text-white/60">Real Estate Leadership</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CONTENT PART (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--color-gold)/15 border border-(--color-gold)/30 text-(--color-gold) text-xs font-semibold uppercase tracking-wider">
              <Quote size={14} className="text-(--color-gold)" />
              Managing Director&apos;s Declaration
            </div>

            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              A Personal Promise of <span className="text-(--color-gold)">Integrity &amp; Excellence</span>
            </h2>

            <div className="space-y-4 text-white/80 leading-relaxed text-sm sm:text-base">
              <p>
              If appointed your managing agents, we promise to undertake, reperesent and protect all interest relevant to your property to the best of our knowledgeand ability.</p>
              <p>
              We will ensure your investments return profits and are maximized so that the best services maybe rendered to your tenants. </p>
              <p>
             Finally we thank you in advance for this opportunity to serve you. If verbal interview is desired, we can be contacted on phone and we will avail ourselves for further deliberations. </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2">
              {[
                '100% Verified Accounting',
                'Ethical Governance',
                'Personalized Client Care',
              ].map((pillar) => (
                <div
                  key={pillar}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/90"
                >
                  <CheckCircle2 size={16} className="text-(--color-gold) shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>

            {/* Signature & Direct Contact Block */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif italic text-lg sm:text-xl text-(--color-gold) tracking-wide">
                  Geoffrey Mwangombe
                </p>
                <p className="text-xs text-white/60 font-medium">
                  Managing Director, Teeside Management Ltd
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-(--color-gold) text-slate-950 font-semibold text-xs transition-transform hover:scale-[1.02] shadow-md"
                >
                  <Mail size={15} />
                  Contact MD Office
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
