'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* 404 Number */}
        <div className="mb-8">
          <span
            className="text-8xl sm:text-9xl font-bold text-[var(--color-navy)]/10"
            style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
          >
            404
          </span>
        </div>

        <h1
          className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] mb-3"
          style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
        >
          Page Not Found
        </h1>
        <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <Home size={18} />
            Go Home
          </Link>
          <Link href="/properties" className="btn-navy">
            <Search size={18} />
            Browse Properties
          </Link>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-navy)] transition-colors"
        >
          <ArrowLeft size={16} />
          Go back
        </button>
      </motion.div>
    </div>
  );
}
