'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Globe, Calculator, BarChart3, Building2, Phone, Info, FileText, Heart, ChevronRight } from 'lucide-react';

const menuItems = [
  { icon: Search, label: 'Browse Properties', href: '/properties', desc: 'Find apartments, villas, and plots' },
  { icon: Heart, label: 'Saved Properties', href: '/favorites', desc: 'Your favorite listings' },
  { icon: Globe, label: 'Diaspora Portal', href: '/diaspora', desc: 'Invest from anywhere in the world' },
  { icon: BarChart3, label: 'Market Insights', href: '/market', desc: 'Nairobi Price Index & trends' },
  { icon: Calculator, label: 'Mortgage Calculator', href: '/tools/mortgage-calculator', desc: 'Calculate your payments' },
  { icon: Building2, label: 'List Your Property', href: '/#landlord', desc: 'Partner with us for management' },
  { icon: Info, label: 'About Teeside', href: '/about', desc: 'Our story and mission' },
  { icon: Phone, label: 'Contact Us', href: '/contact', desc: 'Get in touch with our team' },
  { icon: FileText, label: 'Privacy Policy', href: '/privacy', desc: 'How we protect your data' },
];

export default function MorePage() {
  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="section-title">More</h1>
          <p className="section-subtitle mt-2">Everything else in one place</p>
        </div>

        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={item.href} className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--color-bg-tertiary)] transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-gold)]/10 transition-colors">
                  <item.icon size={20} className="text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{item.label}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
                </div>
                <ChevronRight size={18} className="text-[var(--color-text-muted)] shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Contact Bar */}
        <div className="mt-8 p-5 neu-raised text-center">
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">Need help? Call us anytime</p>
          <a href="tel:+254700000000" className="btn-primary inline-flex">
            <Phone size={18} />
            +254 700 000 000
          </a>
        </div>
      </div>
    </div>
  );
}
