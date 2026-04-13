'use client';

import { Home, Search, Heart, Globe, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '/properties' },
  { icon: Heart, label: 'Favorites', href: '/favorites' },
  { icon: Globe, label: 'Diaspora', href: '/diaspora' },
  { icon: MoreHorizontal, label: 'More', href: '/more' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div
        className="bg-white/95 backdrop-blur-xl border-t border-[var(--color-warm-gray)]"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          boxShadow: '0 -4px 20px rgba(11, 29, 58, 0.06)',
        }}
      >
        <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative flex flex-col items-center justify-center gap-1 w-16 h-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileNavIndicator"
                    className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[var(--color-gold)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-[var(--color-navy)]' : 'text-[var(--color-text-muted)]'
                  }`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span
                  className={`text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-[var(--color-navy)]' : 'text-[var(--color-text-muted)]'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
