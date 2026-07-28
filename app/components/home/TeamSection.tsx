'use client'
import React from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Shield, Award, Users, TrendingUp, Target, Eye, Heart, MapPin, Phone, Mail } from 'lucide-react';

const team = [
  { name: 'James Mwangi', role: 'CEO & Founder', desc: '15+ years in Nairobi real estate' },
  { name: 'Sarah Wanjiku', role: 'Head of Property Management', desc: 'Managing 500+ units across NMA' },
  { name: 'Grace Otieno', role: 'Head of Sales', desc: 'KES 2B+ in closed transactions' },
  { name: 'Peter Kamau', role: 'Head of Diaspora Services', desc: 'Connecting investors from 12 countries' },
];


export default function TeamSection() {
  return (
    <div>
        <section className="py-16 lg:py-24 bg-(--color-bg-primary)">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-2 block">Leadership</span>
                    <h2 className="section-title">Meet Our Team</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {team.map((t, i) => (
                      <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="shadow-md bg-tertiary p-6 text-center">
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
    </div>
  )
}
