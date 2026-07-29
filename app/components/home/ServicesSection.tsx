'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Building2, KeyRound, TrendingUp, Compass, ArrowRight, CheckCircle2 } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const services = [
  {
    id: 'property-management',
    icon: Building2,
    title: 'Property Management',
    tagline: 'End-to-end asset care & maximum occupancy',
    description:
      'Full landlord representation including tenant vetting, rent collection via automated M-Pesa/Bank APIs, maintenance dispatch, and quarterly financial statements.',
    features: [
      'Automated rent collection & reconciliation',
      '24/7 emergency repair dispatch',
      'Tenant vetting & background checks',
      'Digital lease agreement management',
    ],
    highlight: '0% Vacancy Strategy',
  },
  {
    id: 'letting',
    icon: KeyRound,
    title: 'Letting & Leasing',
    tagline: 'Fast placement of qualified tenants',
    description:
      'We market your property across high-traffic digital platforms, conduct structured viewings (including virtual HD walkthroughs for diaspora), and negotiate optimal lease terms.',
    features: [
      'Multi-channel listing exposure',
      'ArdhiSasa verified documentation',
      'Structured tenant onboarding',
      'Deposit escrow management',
    ],
    highlight: 'Avg. 14 Days to Let',
  },
  {
    id: 'sales',
    icon: TrendingUp,
    title: 'Property Sales',
    tagline: 'Maximum market valuation & swift closing',
    description:
      'From valuation analysis to final title deed transfer, we handle commercial and residential sales across the Nairobi Metropolitan Area with complete legal transparency.',
    features: [
      'Data-backed market valuation',
      'Dedicated advocate oversight',
      'International diaspora desk',
      'Transparent escrow settlement',
    ],
    highlight: 'KES 2B+ Sales Closed',
  },
  {
    id: 'consultancy',
    icon: Compass,
    title: 'Real Estate Consultancy',
    tagline: 'Strategic advisory for investors & developers',
    description:
      'Feasibility studies, yield optimization, land acquisition due diligence, and capital growth advisory tailored for high-net-worth investors and diaspora buyers.',
    features: [
      'ArdhiSasa title verification reports',
      'Rental yield & ROI forecasting',
      'Tax & compliance guidance',
      'Development feasibility studies',
    ],
    highlight: 'Institutional Guidance',
  },
]

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const Icon = service.icon
  return (
    <div className="shadow-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-[var(--color-gold)]/40 transition-all duration-300 h-full bg-white">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-navy)] text-white flex items-center justify-center shadow-lg group-hover:bg-[var(--color-gold-dark)] transition-colors duration-300">
            <Icon size={28} />
          </div>
          <span className="text-xs font-bold text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3 py-1 rounded-full border border-[var(--color-gold)]/20">
            {service.highlight}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[var(--color-navy)] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
          {service.title}
        </h3>
        <p className="text-xs font-semibold text-[var(--color-gold-dark)] mb-4">
          {service.tagline}
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="space-y-2.5 mb-8 border-t border-[var(--color-warm-gray)] pt-5">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5 text-xs text-[var(--color-text-primary)] font-medium">
              <CheckCircle2 size={16} className="text-[var(--color-success)] shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-navy)] group-hover:text-[var(--color-gold-dark)] transition-colors pt-2"
      >
        Learn More About {service.title}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--color-bg-secondary)] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--color-gold)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-full flex flex-col md:flex-row justify-between mb-8 gap-4">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-navy)] tracking-tight">
            Our Core <br className="hidden sm:inline" /> <span className="text-[var(--color-gold-dark)]">Services</span>
          </h2>
          <p className="section-subtitle text-base sm:text-lg text-[var(--color-text-secondary)] max-w-xl">
            Comprehensive real estate solutions engineered for peace of mind, maximum yield, and total legal transparency across Kenya.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {services.map((service) => (
                <CarouselItem key={service.id} className="basis-[90%] sm:basis-[80%]">
                  <ServiceCard service={service} />
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
