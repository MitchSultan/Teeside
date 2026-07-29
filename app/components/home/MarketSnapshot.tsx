'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, ArrowRight, BarChart3, Home as HomeIcon, Percent } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const metrics = [
  {
    icon: TrendingUp,
    label: 'Avg. Capital Appreciation',
    value: '+12.4%',
    change: '+2.1% from last year',
    positive: true,
    sparkline: [35, 42, 38, 55, 48, 62, 58, 72, 68, 78, 85, 92],
  },
  {
    icon: HomeIcon,
    label: 'Avg. Rent (2BR Apartment)',
    value: 'KES 65,000',
    change: '+8.3% YoY growth',
    positive: true,
    sparkline: [40, 42, 44, 43, 48, 50, 52, 55, 54, 58, 61, 65],
  },
  {
    icon: Percent,
    label: 'Avg. Rental Yield',
    value: '6.8%',
    change: 'Stable across NMA',
    positive: true,
    sparkline: [6.2, 6.4, 6.5, 6.3, 6.6, 6.7, 6.5, 6.8, 6.7, 6.9, 6.8, 6.8],
  },
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 40;
  const padding = 2;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y = padding + (1 - (val - min) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={`sparkGrad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#sparkGrad-${color.replace('#', '')})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetricCard({ metric }: { metric: (typeof metrics)[number] }) {
  const Icon = metric.icon
  return (
    <div className="shadow-md bg-white p-5 sm:p-6 rounded-2xl h-full flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-navy)]/5 flex items-center justify-center">
          <Icon size={20} className="text-[var(--color-navy)]" />
        </div>
        <MiniSparkline data={metric.sparkline} color={metric.positive ? '#1B7A4A' : '#D94040'} />
      </div>

      <div>
        <p className="text-xs text-[var(--color-text-muted)] mb-1">{metric.label}</p>
        <p
          className="text-2xl font-bold text-[var(--color-navy)] mb-1"
          style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
        >
          {metric.value}
        </p>
        <p className={`text-xs font-medium ${metric.positive ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}`}>
          {metric.change}
        </p>
      </div>
    </div>
  )
}

export default function MarketSnapshot() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-[var(--color-bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-2 block">
              Market Intelligence
            </span>
            <h2 className="section-title">Nairobi Price Index</h2>
            <p className="section-subtitle mt-2">
              Real-time market trends to inform your investment decisions
            </p>
          </div>
          <Link
            href="/market"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-steel-light)] transition-colors group"
          >
            <BarChart3 size={16} />
            Full Market Report
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-5">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {metrics.map((metric) => (
                <CarouselItem key={metric.label} className="basis-[85%]">
                  <MetricCard metric={metric} />
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
  );
}
