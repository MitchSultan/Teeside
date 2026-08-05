'use client';

import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, Shield, Award } from 'lucide-react';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

const neighborhoods = [
  'Kilimani', 'Westlands', 'Kileleshwa', 'Lavington', 'Upperhill',
  'Ruaka', 'Kitengela', 'Syokimau', 'Ruiru', 'Juja', 'Athi River', 'Karen',
];

const seoLinks = [
  'Affordable 3-bedroom apartments in Syokimau',
  'Commercial land for sale along Thika Road',
  '2-bedroom apartments for rent in Kilimani',
  'Off-plan properties in Ruaka',
  'Furnished apartments in Westlands',
  'Plots for sale in Kitengela',
];

export default function Footer() {
  return (
    <footer className="bg-(--color-navy) text-white/80">
      {/* Trust Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-(--color-gold)" />
              <span className="text-sm font-medium text-white/90">EARB Registered</span>
            </div>
            <div className="w-px h-5 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Award size={20} className="text-(--color-gold)" />
              <span className="text-sm font-medium text-white/90">KPDA Member</span>
            </div>
            <div className="w-px h-5 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-(--color-success-light)" />
              <span className="text-sm font-medium text-white/90">ArdhiSasa Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Building2 size={20} className="text-(--color-gold)" />
              </div>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
              >
                Teeside <span className="text-(--color-gold)">Properties</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
              Your trusted partner for property management, sales, and investment in the Nairobi Metropolitan Area. Bridging high-end development with secure digital transactions.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+254700000000" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                <Phone size={15} className="text-(--color-gold)" />
                +254 722 841455
              </a>
              <a href="mailto:info@teeside.co.ke" className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                <Mail size={15} className="text-(--color-gold)" />
                teesidemanagementltd@gmail.com
              </a>
              <div className="flex items-center gap-2.5 text-sm">
                <MapPin size={15} className="text-(--color-gold) shrink-0" />
                Northern Bypass, Nairobi, Kenya
              </div>
            </div>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3
              className="text-white font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
            >
              Neighborhoods
            </h3>
            <ul className="flex flex-col gap-2">
              {neighborhoods.map((n) => (
                <li key={n}>
                  <Link
                    href={`/properties?neighborhood=${n.toLowerCase()}`}
                    className="text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Properties in {n}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-white font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'Browse Properties', href: '/properties' },
                { label: 'Our Services', href: '/services' },
                { label: 'Blog & Articles', href: '/blog' },
                { label: 'Diaspora Portal', href: '/diaspora' },
                { label: 'Mortgage Calculator', href: '/tools/mortgage-calculator' },
                { label: 'Market Insights', href: '/market' },
                { label: 'List Your Property', href: '/#landlord' },
                { label: 'About Teeside', href: '/about' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO Long-tail Links */}
          <div>
            <h3
              className="text-white font-semibold text-sm uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
            >
              Popular Searches
            </h3>
            <ul className="flex flex-col gap-2">
              {seoLinks.map((link) => (
                <li key={link}>
                  <Link
                    href={`/properties?q=${encodeURIComponent(link)}`}
                    className="text-sm hover:text-white transition-colors leading-relaxed"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-semibold text-sm mb-3">Stay Updated</h4>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Teeside Properties. All rights reserved.</p>
            <p>
              Estate Agents Registration Board (EARB) Reg. No. EARB/2024/1234 | KPDA Member
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
