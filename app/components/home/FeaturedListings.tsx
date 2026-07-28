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
            <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-2 block">
              Curated Selection
            </span>
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-subtitle mt-2">
              Handpicked listings across the Nairobi Metropolitan Area
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
                <Link href={`/properties/${property.id}`} className="block">
                  <div className="shadow-md bg-tertiary overflow-hidden group">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="340px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      {/* Status Badge */}
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: getStatusColor(property.status) }}
                      >
                        {getStatusLabel(property.status)}
                      </div>

                      {/* Verified Badge */}
                      {property.verified && (
                        <div className="absolute top-3 right-3 verified-badge !bg-white/90 !text-[var(--color-success)]">
                          <Shield size={12} />
                          ArdhiSasa
                        </div>
                      )}

                      {/* Price */}
                      <div className="absolute bottom-3 left-3 price-badge">
                        {formatPrice(property.price, property.currency)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-2 py-0.5 rounded">
                          {getPropertyTypeLabel(property.type)}
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)]">
                          {property.neighborhood}
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug line-clamp-2 mb-3 group-hover:text-[var(--color-steel)] transition-colors">
                        {property.title}
                      </h3>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-[var(--color-text-muted)]">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center gap-1">
                            <Bed size={14} />
                            <span className="text-xs">{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Bath size={14} />
                          <span className="text-xs">{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Maximize size={14} />
                          <span className="text-xs">{property.sqft.toLocaleString()} sqft</span>
                        </div>
                      </div>

                      {/* Price per sqft */}
                      <div className="mt-3 pt-3 border-t border-[var(--color-warm-gray)] flex items-center justify-between">
                        <span className="text-xs text-[var(--color-text-muted)]">
                          KES {property.pricePerSqft.toLocaleString()}/sqft
                        </span>
                        {property.rentalYield && property.rentalYield > 0 && (
                          <span className="text-xs font-medium text-[var(--color-success)]">
                            {property.rentalYield}% yield
                          </span>
                        )}
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
