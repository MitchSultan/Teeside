'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, HelpCircle } from 'lucide-react'

const feeCategories = [
  {
    category: 'Landlords & Property Owners',
    target: 'Full Management & Letting',
    fees: [
      { name: 'Urban commercial Buildings', rate: '5%', detail: 'Of gross collectible rent and service charge.' },
      { name: 'Residential properties ', rate: '7.5% of gross monthly rent', detail: 'Negotiable subject to a minimum of 7.5% of the gross monthly rent but in consideration to the condition and location of the property.' },
      { name: 'Letting Fees', rate: '50% of one month rent ,', detail: 'Propeties under Teesides management the fees shall be 50% of one months rent.' },
    ],
  },
  {
    category: 'Sales commision',
    target: 'rural & urban properties',
    fees: [
      { name: 'Rural properties', rate: '5%', detail: 'With regard to accessibility and distancefrom Nairobi. Our charges are 5% of the selling price.' },
      { name: 'Urban properties', rate: '2.5% - 5%', detail: 'Our charges for urban properties are based on the selling price. Our rate are 2.5% - 5%.' },
      { name: 'Tax consultation & Book Keeping', rate: 'Vary with work', detail: 'Our charges vary based on the complexity and time required for each engagement.Cliets with our propety management portfolio enjoy discounted rates.' },
    ],
  },
]

export default function FeeStructure() {
  return (
    <section className="py-20 lg:py-28 bg-[var(--color-navy)] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-gold)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className=" max-w-full flex flex-col md:flex-row justify-between md:items-center  mb-16">
          {/* <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Transparent Pricing
          </span> */}
          <h2 className="text-3xl text-left sm:text-4xl lg:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-inter)' }}>
            Our Clear <br></br> <span className="text-[var(--color-gold)]">Fee Structure</span>
          </h2>
          <p className="mt-4 max-w-xl text-base sm:text-lg text-white/70">
            No hidden costs. No surprise charges. Transparent percentages and flat fees so you always know your exact return.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {feeCategories.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="border-b border-white/10 pb-4 mb-6">
                  <span className="text-xs font-semibold text-[var(--color-gold)] uppercase tracking-wider block mb-1">
                    {group.target}
                  </span>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-inter)' }}>
                    {group.category}
                  </h3>
                </div>

                <div className="space-y-6">
                  {group.fees.map((fee) => (
                    <div key={fee.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                      <div>
                        <p className="text-sm font-semibold text-white flex items-center gap-2">
                          <Check size={16} className="text-[var(--color-gold)]" />
                          {fee.name}
                        </p>
                        <p className="text-xs text-white/60 mt-1 pl-6">
                          {fee.detail}
                        </p>
                      </div>
                      <div className="pl-6 sm:pl-0 shrink-0">
                        <span className="text-base font-bold text-[var(--color-gold)] bg-[var(--color-gold)]/10 px-3 py-1 rounded-lg border border-[var(--color-gold)]/20">
                          {fee.rate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 flex items-center gap-2 text-xs text-white/50">
                <HelpCircle size={14} className="text-[var(--color-gold)]" />
                <span>For custom portfolio discounts <a href="/contact" className="text-[var(--color-gold)] hover:underline">contact Us today</a>.</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
