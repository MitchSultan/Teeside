'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const team = [
  { name: 'James Mwangi', role: 'CEO & Founder', desc: '15+ years in Nairobi real estate' },
  { name: 'Sarah Wanjiku', role: 'Head of Property Management', desc: 'Managing 500+ units across NMA' },
  { name: 'Grace Otieno', role: 'Head of Sales', desc: 'KES 2B+ in closed transactions' },
  { name: 'Peter Kamau', role: 'Head of Diaspora Services', desc: 'Connecting investors from 12 countries' },
]

function TeamCard({ member }: { member: (typeof team)[number] }) {
  return (
    <div className="shadow-md rounded-2xl bg-white p-6 text-center h-full flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] mx-auto mb-4 flex items-center justify-center">
        <Users size={28} className="text-[var(--color-navy)]" />
      </div>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-inter)' }}>
        {member.name}
      </h3>
      <p className="text-xs text-[var(--color-gold-dark)] font-medium mb-2">{member.role}</p>
      <p className="text-xs text-[var(--color-text-muted)]">{member.desc}</p>
    </div>
  )
}

export default function TeamSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-2 block">Leadership</span>
          <h2 className="section-title">Meet Our Team</h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TeamCard member={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {team.map((t) => (
                <CarouselItem key={t.name} className="basis-[80%]">
                  <TeamCard member={t} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
