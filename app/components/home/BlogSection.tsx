'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Calendar, User, Newspaper } from 'lucide-react'
import type { Blog } from '@/types'
import { Badge } from '@/components/ui/badge'

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
  if (!blogs || blogs.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-[var(--color-bg-secondary)] relative overflow-hidden border-t border-[var(--color-warm-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
              <Newspaper size={14} /> Market Intelligence & Guides
            </span>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-navy)] tracking-tight">
              Latest <span className="text-[var(--color-gold)]">Market Insights</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-navy)] hover:text-[var(--color-gold-dark)] transition-colors group"
          >
            View All Articles
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-black/5 hover:shadow-xl hover:border-[var(--color-gold)]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-[var(--color-navy)]">
                  <img
                    src={blog.cover_image || '/images/hero1.jpg'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[var(--color-navy)] text-[var(--color-gold)] text-[10px] font-bold px-3 py-1 border border-[var(--color-gold)]/30">
                      {blog.category}
                    </Badge>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-[var(--color-gold-dark)]" />
                      {new Date(blog.published_at).toLocaleDateString('en-KE', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-[var(--color-gold-dark)]" />
                      {blog.read_time}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-navy)] mb-2 group-hover:text-[var(--color-gold-dark)] transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>

                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 mb-6">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-[var(--color-warm-gray)] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={blog.author_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'}
                    alt={blog.author_name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-[var(--color-navy)]">
                    {blog.author_name}
                  </span>
                </div>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-xs font-bold text-[var(--color-navy)] group-hover:text-[var(--color-gold-dark)] inline-flex items-center gap-1"
                >
                  Read
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
