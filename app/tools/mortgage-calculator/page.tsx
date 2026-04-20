'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Calendar, Percent, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const banks = [
  { name: 'KCB Bank', rate: 13.0 },
  { name: 'Equity Bank', rate: 13.5 },
  { name: 'Cooperative Bank', rate: 13.0 },
  { name: 'Stanbic Bank', rate: 12.5 },
  { name: 'NCBA', rate: 13.5 },
  { name: 'Absa Kenya', rate: 12.8 },
  { name: 'Standard Chartered', rate: 12.5 },
  { name: 'Custom Rate', rate: 0 },
];

export default function MortgageCalculatorPage() {
  const [price, setPrice] = useState(10000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [selectedBank, setSelectedBank] = useState('Equity Bank');
  const [customRate, setCustomRate] = useState(13.5);
  const [tenure, setTenure] = useState(20);
  const [mode, setMode] = useState<'mortgage' | 'tps'>('mortgage');

  const rate = selectedBank === 'Custom Rate'
    ? customRate
    : banks.find(b => b.name === selectedBank)?.rate || 13.5;

  const result = useMemo(() => {
    const downPayment = price * (downPaymentPercent / 100);
    const loanAmount = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const totalMonths = tenure * 12;

    if (monthlyRate === 0) {
      const monthlyPayment = loanAmount / totalMonths;
      return { loanAmount, downPayment, monthlyPayment, totalInterest: 0, totalPayment: loanAmount, monthlyRate: 0, totalMonths };
    }

    const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - loanAmount;

    return { loanAmount, downPayment, monthlyPayment, totalInterest, totalPayment, monthlyRate, totalMonths };
  }, [price, downPaymentPercent, rate, tenure]);

  const fmt = (n: number) => `KES ${Math.round(n).toLocaleString()}`;

  // TPS: Rent-to-own over tenure
  const tpsMonthly = useMemo(() => {
    if (mode !== 'tps') return 0;
    // Simplified: total price + 15% markup over tenure
    return (price * 1.15) / (tenure * 12);
  }, [price, tenure, mode]);

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-2 block">Financial Tools</span>
          <h1 className="section-title">Mortgage & TPS Calculator</h1>
          <p className="section-subtitle mt-2">Calculate your monthly payments based on current Kenyan bank rates</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setMode('mortgage')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === 'mortgage' ? 'bg-[var(--color-navy)] text-white shadow-lg' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
            }`}
          >
            <Calculator size={16} className="inline mr-2" />
            Mortgage Calculator
          </button>
          <button
            onClick={() => setMode('tps')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === 'tps' ? 'bg-[var(--color-navy)] text-white shadow-lg' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
            }`}
          >
            <Building2 size={16} className="inline mr-2" />
            Tenant-Purchase Scheme
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-3 space-y-6">
            <div className="neu-raised p-6 sm:p-8">
              {/* Property Price */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[var(--color-navy)] mb-2">Property Price (KES)</label>
                <input
                  type="range"
                  min={1000000}
                  max={200000000}
                  step={500000}
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full accent-[var(--color-gold)] mb-2"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--color-text-muted)]">KES 1M</span>
                  <div className="flex-1 text-center">
                    <input
                      type="number"
                      value={price}
                      onChange={e => setPrice(Number(e.target.value))}
                      className="text-center text-lg font-bold text-[var(--color-navy)] bg-[var(--color-bg-tertiary)] rounded-xl px-4 py-2 w-48 outline-none"
                    />
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)]">KES 200M</span>
                </div>
              </div>

              {/* Down Payment */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[var(--color-navy)] mb-2">
                  Down Payment: {downPaymentPercent}% ({fmt(price * downPaymentPercent / 100)})
                </label>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={e => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[var(--color-gold)]"
                />
                <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
                  <span>10%</span><span>50%</span>
                </div>
              </div>

              {mode === 'mortgage' && (
                <>
                  {/* Bank / Rate */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[var(--color-navy)] mb-2">Bank / Interest Rate</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {banks.map(b => (
                        <button
                          key={b.name}
                          onClick={() => setSelectedBank(b.name)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-center ${
                            selectedBank === b.name ? 'bg-[var(--color-navy)] text-white' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-warm-gray)]'
                          }`}
                        >
                          {b.name}
                          {b.rate > 0 && <span className="block text-[10px] opacity-70">{b.rate}% p.a.</span>}
                        </button>
                      ))}
                    </div>
                    {selectedBank === 'Custom Rate' && (
                      <div className="mt-3">
                        <input
                          type="number"
                          step={0.1}
                          value={customRate}
                          onChange={e => setCustomRate(Number(e.target.value))}
                          className="px-4 py-2 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none w-32"
                          placeholder="e.g. 13.5"
                        />
                        <span className="text-xs text-[var(--color-text-muted)] ml-2">% per annum</span>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Tenure */}
              <div>
                <label className="block text-sm font-semibold text-[var(--color-navy)] mb-2">
                  Loan Tenure: {tenure} years
                </label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenure}
                  onChange={e => setTenure(Number(e.target.value))}
                  className="w-full accent-[var(--color-gold)]"
                />
                <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
                  <span>5 years</span><span>30 years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-5">
            <motion.div
              key={`${mode}-${price}-${downPaymentPercent}-${rate}-${tenure}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="neu-raised p-6 sm:p-8"
            >
              <h3 className="text-base font-semibold text-[var(--color-navy)] mb-5" style={{ fontFamily: 'var(--font-inter)' }}>
                {mode === 'mortgage' ? 'Mortgage Summary' : 'TPS Summary'}
              </h3>

              <div className="text-center mb-6 p-5 rounded-2xl bg-[var(--color-navy)]">
                <p className="text-xs text-white/60 mb-1">Monthly Payment</p>
                <p className="text-3xl font-bold text-[var(--color-gold)]" style={{ fontFamily: 'var(--font-inter)' }}>
                  {mode === 'mortgage' ? fmt(result.monthlyPayment) : fmt(tpsMonthly)}
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-[var(--color-warm-gray)]">
                  <span className="text-[var(--color-text-muted)]">Property Price</span>
                  <span className="font-semibold">{fmt(price)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[var(--color-warm-gray)]">
                  <span className="text-[var(--color-text-muted)]">Down Payment ({downPaymentPercent}%)</span>
                  <span className="font-semibold">{fmt(result.downPayment)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[var(--color-warm-gray)]">
                  <span className="text-[var(--color-text-muted)]">Loan Amount</span>
                  <span className="font-semibold">{fmt(result.loanAmount)}</span>
                </div>
                {mode === 'mortgage' && (
                  <>
                    <div className="flex items-center justify-between py-2 border-b border-[var(--color-warm-gray)]">
                      <span className="text-[var(--color-text-muted)]">Interest Rate</span>
                      <span className="font-semibold">{rate}% p.a.</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[var(--color-warm-gray)]">
                      <span className="text-[var(--color-text-muted)]">Total Interest</span>
                      <span className="font-semibold text-[var(--color-error)]">{fmt(result.totalInterest)}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="font-semibold text-[var(--color-navy)]">Total Payment</span>
                      <span className="font-bold text-[var(--color-navy)]">{fmt(result.totalPayment)}</span>
                    </div>
                  </>
                )}
                {mode === 'tps' && (
                  <div className="flex items-center justify-between py-2">
                    <span className="font-semibold text-[var(--color-navy)]">Total Payment</span>
                    <span className="font-bold text-[var(--color-navy)]">{fmt(tpsMonthly * tenure * 12)}</span>
                  </div>
                )}
              </div>
            </motion.div>

            <div className="p-4 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-warm-gray)]">
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                <strong>Note:</strong> This calculator provides estimates only. Actual rates and terms may vary. Contact our team for personalized financing advice.
              </p>
            </div>

            <Link href="/properties" className="btn-navy w-full text-center">
              Browse Properties <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
