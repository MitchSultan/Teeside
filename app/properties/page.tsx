'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, Shield, MapPin, Grid3X3, List, SlidersHorizontal, ChevronDown, X, Search } from 'lucide-react';
import { properties, formatPrice, getPropertyTypeLabel, getStatusLabel, getStatusColor } from '@/data/properties';

const propertyTypes = ['All', 'Apartment', 'House', 'Penthouse', 'Bedsitter', 'Studio', 'Townhouse', 'Villa', 'Commercial', 'Land'];
const neighborhoods = ['All', 'Kilimani', 'Westlands', 'Kileleshwa', 'Lavington', 'Upperhill', 'Ruaka', 'Kitengela', 'Syokimau', 'Ruiru'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Most Popular'];

export default function PropertiesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [neighborhoodFilter, setNeighborhoodFilter] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...properties];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== 'All') {
      result = result.filter(p => getPropertyTypeLabel(p.type) === typeFilter);
    }
    if (neighborhoodFilter !== 'All') {
      result = result.filter(p => p.neighborhood === neighborhoodFilter);
    }
    if (sort === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    return result;
  }, [search, typeFilter, neighborhoodFilter, sort]);

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="section-title">Browse Properties</h1>
          <p className="section-subtitle mt-2">
            {filtered.length} properties across the Nairobi Metropolitan Area
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                showFilters ? 'bg-[var(--color-navy)] text-white' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-warm-gray)]'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-8 rounded-xl bg-[var(--color-bg-tertiary)] text-sm font-medium text-[var(--color-text-secondary)] outline-none cursor-pointer"
              >
                {sortOptions.map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-[var(--color-bg-tertiary)] rounded-xl p-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-white shadow-sm text-[var(--color-navy)]' : 'text-[var(--color-text-muted)]'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-white shadow-sm text-[var(--color-navy)]' : 'text-[var(--color-text-muted)]'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-5 neu-raised-sm !rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--color-navy)]" style={{ fontFamily: 'var(--font-inter)' }}>Filters</h3>
              <button onClick={() => setShowFilters(false)} className="p-1 rounded-lg hover:bg-[var(--color-bg-tertiary)]">
                <X size={16} className="text-[var(--color-text-muted)]" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Property Type</label>
                <div className="flex flex-wrap gap-1.5">
                  {propertyTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        typeFilter === t ? 'bg-[var(--color-navy)] text-white' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-warm-gray)]'
                      }`}
                    >{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">Neighborhood</label>
                <div className="flex flex-wrap gap-1.5">
                  {neighborhoods.map(n => (
                    <button
                      key={n}
                      onClick={() => setNeighborhoodFilter(n)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        neighborhoodFilter === n ? 'bg-[var(--color-navy)] text-white' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-warm-gray)]'
                      }`}
                    >{n}</button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search size={48} className="mx-auto text-[var(--color-warm-gray-dark)] mb-4" />
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">No properties found</h3>
            <p className="text-[var(--color-text-muted)]">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className={view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
            : 'flex flex-col gap-4'
          }>
            {filtered.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/properties/${property.id}`} className="block">
                  <div className={`neu-raised overflow-hidden group ${view === 'list' ? 'flex flex-col sm:flex-row' : ''}`}>
                    {/* Image */}
                    <div className={`relative overflow-hidden ${view === 'list' ? 'h-48 sm:h-auto sm:w-72 shrink-0' : 'h-52'}`}>
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes={view === 'list' ? '288px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: getStatusColor(property.status) }}
                      >
                        {getStatusLabel(property.status)}
                      </div>
                      {property.verified && (
                        <div className="absolute top-3 right-3 verified-badge !bg-white/90 !text-[var(--color-success)]">
                          <Shield size={12} />
                          ArdhiSasa
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 price-badge">
                        {formatPrice(property.price, property.currency)}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-4 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-2 py-0.5 rounded">{getPropertyTypeLabel(property.type)}</span>
                        <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]"><MapPin size={12} />{property.neighborhood}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug line-clamp-2 mb-3 group-hover:text-[var(--color-steel)] transition-colors">{property.title}</h3>
                      {view === 'list' && (
                        <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mb-3">{property.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-[var(--color-text-muted)]">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center gap-1"><Bed size={14} /><span className="text-xs">{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</span></div>
                        )}
                        <div className="flex items-center gap-1"><Bath size={14} /><span className="text-xs">{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</span></div>
                        <div className="flex items-center gap-1"><Maximize size={14} /><span className="text-xs">{property.sqft.toLocaleString()} sqft</span></div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[var(--color-warm-gray)] flex items-center justify-between">
                        <span className="text-xs text-[var(--color-text-muted)]">KES {property.pricePerSqft.toLocaleString()}/sqft</span>
                        {property.rentalYield && property.rentalYield > 0 && (
                          <span className="text-xs font-medium text-[var(--color-success)]">{property.rentalYield}% yield</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
