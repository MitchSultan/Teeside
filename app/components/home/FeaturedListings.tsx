'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Bed, Bath, Maximize, ChevronLeft, ChevronRight, ArrowRight, Shield } from 'lucide-react';
import { properties, formatPrice, getPropertyTypeLabel, getStatusLabel, getStatusColor } from '@/data/properties';

export default function FeaturedListings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const featured = properties.slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 360;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? cardWidth : -cardWidth,
        behavior: 'smooth',
      });
    }
  };

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
            {/* <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-2 block">
              Curated Selection
            </span> */}
            <h2 className="section-title">Managed  <br></br> <span className="text-[var(--color-gold)]">Properties</span></h2>
            <p className="section-subtitle mt-2">
              Some of the properties we manage around Nairobi Metropolitan Area. 
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] hover:text-[var(--color-steel-light)] transition-colors group"
          >
            View All Properties
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Scroll Controls */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-bg-tertiary)] transition-colors hidden lg:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-bg-tertiary)] transition-colors hidden lg:flex"
          >
            <ChevronRight size={20} />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-0 sm:px-0"
          >
            {featured.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="snap-start shrink-0 w-[320px] sm:w-[340px]"
              >
                <Link href={`/properties/${property.id}`} className="block h-full">
                  {/* Full-bleed image card with glassmorphism content overlay */}
                  <div className="relative rounded-2xl overflow-hidden shadow-lg group h-[420px] cursor-pointer">

                    {/* Background Image — covers entire card */}
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="340px"
                    />

                    {/* Dark scrim so text is always readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 transition-opacity duration-300 group-hover:from-black/85" />

                    {/* ── Top badges ── */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
                        style={{ backgroundColor: getStatusColor(property.status) }}
                      >
                        {getStatusLabel(property.status)}
                      </div>

                      {property.verified && (
                        <div className="verified-badge !bg-white/90 !text-[var(--color-success)] backdrop-blur-sm">
                          <Shield size={12} />
                          ArdhiSasa
                        </div>
                      )}
                    </div>

                    {/* ── Glassmorphism content panel ── */}
                    <div
                      className="absolute bottom-0 left-0 right-0 z-10 p-4 rounded-b-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.10)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        borderTop: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      {/* Type chip + neighbourhood */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: 'rgba(192,34,49,0.85)',
                            color: '#fff',
                          }}
                        >
                          {getPropertyTypeLabel(property.type)}
                        </span>
                        <span className="text-[11px] text-white/70 truncate">
                          {property.neighborhood}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-3 group-hover:text-white/90 transition-colors">
                        {property.title}
                      </h3>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 text-white/75 mb-3">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center gap-1">
                            <Bed size={13} />
                            <span className="text-xs">{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Bath size={13} />
                          <span className="text-xs">{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Maximize size={13} />
                          <span className="text-xs">{property.sqft.toLocaleString()} sqft</span>
                        </div>
                      </div>

                      {/* Price row */}
                      <div
                        className="flex items-center justify-between pt-2.5"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{ color: 'var(--color-gold-light)' }}
                        >
                          {formatPrice(property.price, property.currency)}
                          <span className="text-xs font-normal text-white/60 ml-0.5">/mo</span>
                        </span>
                        <div className="flex items-center gap-2">
                          {property.rentalYield && property.rentalYield > 0 && (
                            <span className="text-xs font-semibold text-emerald-400">
                              {property.rentalYield}% yield
                            </span>
                          )}
                          <span className="text-[11px] text-white/50">
                            KES {property.pricePerSqft.toLocaleString()}/sqft
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
