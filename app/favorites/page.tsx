'use client';

import { Heart, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FavoritesPage() {
  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="section-title">Saved Properties</h1>
          <p className="section-subtitle mt-2">Your favorite listings in one place</p>
        </div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mb-6">
            <Heart size={36} className="text-[var(--color-warm-gray-dark)]" />
          </div>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
            No saved properties yet
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-sm mb-8">
            Start browsing and tap the heart icon on any listing to save it here for easy access later.
          </p>
          <Link href="/properties" className="btn-primary">
            <Search size={18} />
            Browse Properties
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
