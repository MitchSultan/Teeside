
'use client'
import React from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, Shield, Award, Users, TrendingUp, Target, Eye, Heart, MapPin, Phone, Mail } from 'lucide-react';

const values = [
  {
    icon: Building2,
    title: "Verified Properties",
    desc: "All our listings are thoroughly vetted for quality and authenticity."
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    desc: "We prioritize the safety and security of all our users."
  },
  {
    icon: Award,
    title: "Industry Recognition",
    desc: "Our commitment to excellence has earned us recognition in the market."
  },
  {
    icon: Users,
    title: "Diverse Clientele",
    desc: "We serve a wide range of clients from first-time buyers to seasoned investors."
  }
];

export default function AboutSection() {
  return (
    <div>
         <section className="py-16 lg:py-24 bg-(--color-bg-secondary)">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-sm font-semibold text-(--color-gold) uppercase tracking-wider mb-2 block">About Us</span>
                  <h2 className="section-title mb-4">We offer solutions to property owners problems </h2>
                  <p className="text-(--color-text-secondary) leading-relaxed mb-4">
                 Teeside Mangement Ltd was incorporated in Kenya in 2014. The directors are Geoffrey Wangombe and Mrs Grace Mwaniki. They both have over 40+ yrs in sales and property management with a rich background in real estates development and construction. </p>
                  <p className="text-(--color-text-secondary) leading-relaxed">
                We believe in doing whatever is required to  earn the right to be your agent and we let our actions speak for themselves. You get the results you expected because we focus on your individual needs.
                  </p>
                  <a href="/about"><button className="btn-primary mt-4">
                    More about us
                  </button></a>
                </div>
                <div className="bg-[url(/images/about-hero.jpg)] bg-cover bg-center rounded-2xl h-80 lg:h-112">
                  {/* {values.map((v, i) => (
                    <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="neu-raised-sm p-5">
                      <v.icon size={24} className="text-[var(--color-gold)] mb-3" />
                      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{v.title}</h3>
                      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{v.desc}</p>
                    </motion.div>
                  ))} */}
                </div>
              </div>
            </div>
          </section>
          </div>
  )
}
