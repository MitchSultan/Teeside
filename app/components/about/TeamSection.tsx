'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Briefcase, Award, Building, Globe2, ShieldCheck, Phone } from 'lucide-react';

const teamMembers = [
  {
    name: 'Geoffrey Mwangombe',
    role: 'Managing Director & Founder',
    experience: '15+ Years Experience',
    desc: 'Specializing in real estate development, property portfolio management, and strategic market expansion across Nairobi Metropolitan Area.',
    photo: '/images/jeff.PNG',
    isLead: true,
  },
  {
    name: 'Mrs. Grace Mwaniki',
    role: 'Co-Founder & Director',
    experience: '40+ Years Experience',
    desc: 'Veteran in sales, property management, and construction oversight with a track record of driving ethical standards.',
    photo: null,
    isLead: true,
  },
  {
    name: 'Sarah Wanjiku',
    role: 'Head of Property Management',
    experience: '500+ Units Managed',
    desc: 'Oversees day-to-day operations, tenant relations, and facility maintenance across residential and commercial portfolios.',
    photo: null,
    isLead: false,
  },
  {
    name: 'Grace Otieno',
    role: 'Head of Sales & Acquisitions',
    experience: 'KES 2B+ Transactions',
    desc: 'Expert property broker specializing in high-yield investments, land parcels, and luxury prime listings.',
    photo: null,
    isLead: false,
  },
  {
    name: 'Peter Kamau',
    role: 'Head of Diaspora Services',
    experience: '12+ Countries Served',
    desc: 'Dedicated liaison guiding Kenyans in the diaspora to securely invest, construct, and manage properties back home.',
    photo: null,
    isLead: false,
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 lg:py-24 bg-(--color-bg-secondary) relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Part Layout: Content Part & Photo Part */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* CONTENT PART (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--color-gold)/15 border border-(--color-gold)/30 text-(--color-gold-dark) text-xs font-semibold uppercase tracking-wider">
              <Users size={14} className="text-(--color-gold)" />
              Our Leadership &amp; Team
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--color-text-primary) leading-tight" style={{ fontFamily: 'var(--font-inter)' }}>
              Driven by Experience, <br className="hidden sm:inline" />
              <span className="text-(--color-gold)">Guided by Integrity</span>
            </h2>

            <p className="text-(--color-text-secondary) leading-relaxed text-sm sm:text-base">
              At Teeside Management Ltd, our team brings together over 40+ years of combined experience across real estate sales, property management, land development, and diaspora investment advisory in Kenya.
            </p>

            <p className="text-(--color-text-secondary) leading-relaxed text-sm sm:text-base">
              We operate as a cohesive unit dedicated to protecting your assets, optimizing tenant satisfaction, and delivering transparent real estate solutions that exceed expectations.
            </p>

            {/* Department Highlights */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-200/60 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-(--color-navy) text-(--color-gold) flex items-center justify-center shrink-0">
                  <Building size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-(--color-text-primary)">
                    Full-Lifecycle Property Management
                  </h4>
                  <p className="text-xs text-(--color-text-muted) mt-0.5">
                    From tenant vetting to maintenance, rent collection, and financial reporting.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-200/60 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-(--color-navy) text-(--color-gold) flex items-center justify-center shrink-0">
                  <Globe2 size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-(--color-text-primary)">
                    Dedicated Diaspora Desk
                  </h4>
                  <p className="text-xs text-(--color-text-muted) mt-0.5">
                    End-to-end verified property acquisition and management for clients abroad.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PHOTO PART (7 Columns) - Team Cards Grid & Spotlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >

            <div className='bg-[url(/images/about-hero.jpg)] bg-no-repeat bg-center bg-cover w-112 h-96'></div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`group relative rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-300 ${
                    member.isLead ? 'sm:col-span-1 border-(--color-gold)/40' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-(--color-navy) to-slate-950 flex items-center justify-center text-white">
                          <Users size={24} className="text-(--color-gold)" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-(--color-gold)/10 text-(--color-gold-dark) mb-1">
                        {member.experience}
                      </span>
                      <h3 className="text-sm font-bold text-(--color-text-primary) truncate" style={{ fontFamily: 'var(--font-inter)' }}>
                        {member.name}
                      </h3>
                      <p className="text-xs text-(--color-navy) font-medium truncate">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-(--color-text-secondary) leading-relaxed mt-3 pt-3 border-t border-slate-100">
                    {member.desc}
                  </p>
                </motion.div>
              ))}
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
