'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Globe, Cpu, Award, FileSearch, Zap } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const features = [
  {
    icon: ShieldCheck,
    title: 'ArdhiSasa Digital Verification',
    description:
      'Every title deed and land document is cross-checked against Kenya’s official Ministry of Lands database before listing.',
  },
  {
    icon: Globe,
    title: 'Dedicated Diaspora Desk',
    description:
      'Power of Attorney guidance, live HD video tours, and multi-timezone consultations for Kenyans living abroad.',
  },
  {
    icon: Cpu,
    title: 'Automated Financial Tech',
    description:
      'M-Pesa Paybill & automated bank API reconciliations mean landlords receive instant monthly payout alerts.',
  },
  {
    icon: Award,
    title: '12+ Years Market Leadership',
    description:
      'Managing over 500+ units across Nairobi, Kitengela, Westlands, and Kilimani with KES 1.2B+ under management.',
  },
  {
    icon: FileSearch,
    title: 'Zero Hidden Fees',
    description:
      'Complete transparency in our fee structure. Clear breakdown of commission, management rates, and disbursements.',
  },
  {
    icon: Zap,
    title: 'Rapid Tenant Placement',
    description:
      'Advanced digital marketing and pre-screened tenant waitlists keep average property vacancy times under 14 days.',
  },
]

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  const Icon = feature.icon
  return (
    <div className=" p-6 rounded-2xl group hover:shadow-md transition-all duration-300 h-full bg-white flex flex-col justify-start">
      <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)]/10 text-[var(--color-gold-dark)] flex items-center justify-center mb-5 group-hover:bg-[var(--color-navy)] group-hover:text-white transition-colors duration-300 shrink-0">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
        {feature.title}
      </h3>
      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
        {feature.description}
      </p>
    </div>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" max-w-full flex flex-row justify-between items-center mx-auto mb-16">
          {/* <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            The Teeside Advantage
          </span> */}
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-navy)] tracking-tight">
            Why Choose <br></br> <span className="text-[var(--color-gold)]">Teeside Management Ltd</span>
          </h2>
          <p className="section-subtitle max-w-xl text-right mt-4 text-base sm:text-lg text-[var(--color-text-secondary)]">
            Bridging trust, technology, and real estate excellence across the Nairobi Metropolitan Area.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {features.map((feature) => (
                <CarouselItem key={feature.title} className="basis-[85%] sm:basis-[75%]">
                  <FeatureCard feature={feature} />
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
