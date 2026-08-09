'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Phone, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Properties', href: '/properties' },
    { label: 'Services', href: '/services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Diaspora Portal', href: '/diaspora' },
    { label: 'Market Insights', href: '/market' },
    { label: 'Mortgage Calculator', href: '/tools/mortgage-calculator' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(11,29,58,0.08)]'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${scrolled
                    ? 'bg-[var(--color-navy)]'
                    : 'bg-white/20 backdrop-blur-sm border border-white/20'
                  }`}
              >
                <img src="/images/loog.jpg" alt="Logo" />
              </div>
              <span
                className={`text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-[var(--color-navy)]' : 'text-white'
                  }`}
                style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
              >
                Teeside{' '}
                {/* <span className={scrolled ? 'text-[var(--color-gold)]' : 'text-[var(--color-gold-light)]'}>
                  Properties
                </span> */}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${scrolled
                      ? 'text-(--color-text-secondary) hover:text-(--color-navy) hover:bg-(--color-bg-tertiary)'
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {/* <Link
                href="/properties"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${scrolled
                    ? 'text-[var(--color-navy)] border-2 border-[var(--color-navy)]/20 hover:border-[var(--color-navy)]/40 hover:bg-[var(--color-navy)]/5'
                    : 'text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10'
                  }`}
              >
                <Search size={16} />
                Find a Home
              </Link> */}
              <Link
                href="tel:+254722841455" 
                className="btn-primary !py-2.5 !px-5 !text-sm"
              >
                <Phone size={16} />
                Call Us
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-[var(--color-navy)]' : 'text-white'
                }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="text-xl font-bold text-[var(--color-navy)]"
                    style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
                  >
                    Teeside
                  </span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-bg-tertiary)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href="/properties"
                    onClick={() => setMenuOpen(false)}
                    className="btn-navy w-full text-center !text-sm"
                  >
                    <Search size={16} />
                    Find a Home
                  </Link>
                  <Link
                    href="/#landlord"
                    onClick={() => setMenuOpen(false)}
                    className="btn-primary w-full text-center !text-sm"
                  >
                    List Your Property
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--color-warm-gray)]">
                  <a
                    href="tel:+254722841455"
                    className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-[var(--color-navy)] transition-colors"
                  >
                    <Phone size={18} />
                    <span className="text-sm font-medium">+254 722 841 455</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
