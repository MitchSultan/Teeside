'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Home, Percent, BarChart3, MapPin, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { neighborhoods } from '@/data/neighborhoods';

const yearlyData = [
  { year: '2020', avgPrice: 8200000, rent: 45000, yield: 6.1 },
  { year: '2021', avgPrice: 9100000, rent: 48000, yield: 6.3 },
  { year: '2022', avgPrice: 10500000, rent: 52000, yield: 6.5 },
  { year: '2023', avgPrice: 11800000, rent: 56000, yield: 6.4 },
  { year: '2024', avgPrice: 13200000, rent: 60000, yield: 6.6 },
  { year: '2025', avgPrice: 14800000, rent: 65000, yield: 6.8 },
];

const neighborhoodMetrics = [
  { name: 'Kilimani', avgPrice: 'KES 15M', yield: '6.2%', appreciation: '+8.5%', trend: 'up' as const },
  { name: 'Westlands', avgPrice: 'KES 12M', yield: '7.1%', appreciation: '+9.2%', trend: 'up' as const },
  { name: 'Kileleshwa', avgPrice: 'KES 22M', yield: '5.4%', appreciation: '+7.8%', trend: 'up' as const },
  { name: 'Ruaka', avgPrice: 'KES 7.5M', yield: '8.3%', appreciation: '+12.1%', trend: 'up' as const },
  { name: 'Kitengela', avgPrice: 'KES 4.2M', yield: '9.5%', appreciation: '+14.2%', trend: 'up' as const },
  { name: 'Upperhill', avgPrice: 'KES 18M', yield: '6.8%', appreciation: '+7.5%', trend: 'up' as const },
  { name: 'Syokimau', avgPrice: 'KES 5.5M', yield: '7.8%', appreciation: '+11.3%', trend: 'up' as const },
  { name: 'Lavington', avgPrice: 'KES 28M', yield: '5.1%', appreciation: '+6.8%', trend: 'up' as const },
];

function SimpleBarChart({ data }: { data: typeof yearlyData }) {
  const maxPrice = Math.max(...data.map(d => d.avgPrice));
  return (
    <div className="flex items-end gap-2 sm:gap-4 h-48 mt-4">
      {data.map((d) => {
        const height = (d.avgPrice / maxPrice) * 100;
        return (
          <div key={d.year} className="flex-1 flex flex-col items-center gap-2">
            <span className="text-xs font-semibold text-(--color-navy)">
              {(d.avgPrice / 1000000).toFixed(1)}M
            </span>
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full rounded-t-lg"
              style={{ background: 'linear-gradient(to top, var(--color-navy), var(--color-steel-light))' }}
            />
            <span className="text-xs text-(--color-text-muted)">{d.year}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function MarketPage() {
  const [selectedMetric, setSelectedMetric] = useState<'price' | 'rent' | 'yield'>('price');

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-2 block">Market Intelligence</span>
          <h1 className="section-title">Nairobi Price Index</h1>
          <p className="section-subtitle mt-2">Historical data and trends for the Nairobi Metropolitan Area real estate market</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[
            { icon: TrendingUp, label: 'Avg. Capital Appreciation', value: '+12.4%', sub: 'NMA Average 2025', color: 'var(--color-success)' },
            { icon: Home, label: 'Avg. Rent (2BR)', value: 'KES 65,000', sub: 'Per month across NMA', color: 'var(--color-navy)' },
            { icon: Percent, label: 'Avg. Rental Yield', value: '6.8%', sub: 'Gross yield 2025', color: 'var(--color-gold)' },
          ].map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, ${m.color} 10%, transparent)` }}>
                  <m.icon size={22} style={{ color: m.color }} />
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">{m.label}</span>
              </div>
              <p className="text-2xl font-bold text-[var(--color-navy)]" style={{ fontFamily: 'var(--font-inter)' }}>{m.value}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{m.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Price Trends Chart */}
        <div className="shadow-md p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--color-navy)]" style={{ fontFamily: 'var(--font-inter)' }}>Average Property Prices (NMA)</h2>
              <p className="text-sm text-[var(--color-text-muted)]">2-bedroom apartment prices over the last 6 years</p>
            </div>
            <div className="flex gap-2">
              {(['price', 'rent', 'yield'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMetric(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedMetric === m ? 'bg-[var(--color-navy)] text-white' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  {m === 'price' ? 'Prices' : m === 'rent' ? 'Rents' : 'Yields'}
                </button>
              ))}
            </div>
          </div>
          <SimpleBarChart data={yearlyData} />
        </div>

        {/* Neighborhood Comparison */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 size={24} className="text-[var(--color-navy)]" />
            <h2 className="text-xl font-bold text-[var(--color-navy)]" style={{ fontFamily: 'var(--font-inter)' }}>Neighborhood Comparison</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[var(--color-warm-gray)]">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Neighborhood</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Avg. Price</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Rental Yield</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">Appreciation</th>
                </tr>
              </thead>
              <tbody>
                {neighborhoodMetrics.map((n, i) => (
                  <motion.tr
                    key={n.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-[var(--color-warm-gray)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[var(--color-gold)]" />
                        <span className="text-sm font-semibold text-[var(--color-text-primary)]">{n.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 text-sm font-medium text-[var(--color-text-primary)]">{n.avgPrice}</td>
                    <td className="text-right py-3 px-4 text-sm font-medium text-[var(--color-navy)]">{n.yield}</td>
                    <td className="text-right py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-success)]">
                        {n.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {n.appreciation}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-warm-gray)]">
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            <strong>Disclaimer:</strong> Market data is compiled from multiple sources including the Hass Property Index, Kenya Bankers Association, and Teeside internal transaction data. Past performance does not guarantee future returns. All figures are indicative and should not be used as the sole basis for investment decisions. Always consult a qualified financial advisor.
          </p>
        </div>
      </div>
    </div>
  );
}
