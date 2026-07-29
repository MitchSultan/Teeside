'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const propertyTypes = ['All Types', 'Apartment', 'House', 'Penthouse', 'Bedsitter', 'Studio', 'Townhouse', 'Villa', 'Commercial', 'Land'];
const nmaNeighborhoods = ['Kilimani', 'Westlands', 'Kileleshwa', 'Lavington', 'Upperhill', 'Ruaka', 'Kitengela', 'Syokimau', 'Ruiru', 'Juja', 'Athi River', 'Karen', 'Langata', 'South B', 'South C'];
const bedroomOptions = ['Any', 'Bedsitter', '1', '2', '3', '4', '5+'];
const statusOptions = ['All Status', 'Ready for Occupation', 'Off-Plan', 'Repossessed'];

export default function SearchBar() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  const [neighborhood, setNeighborhood] = useState('');
  const [bedrooms, setBedrooms] = useState('Any');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [status, setStatus] = useState('All Status');
  const searchRef = useRef<HTMLDivElement>(null);

  function handleSearch() {
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (propertyType && propertyType !== 'All Types') params.set('type', propertyType.toLowerCase());
    if (neighborhood) params.set('city', neighborhood);
    router.push(`/properties?${params.toString()}`);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPriceLabel = (value: number) => {
    if (currency === 'KES') {
      if (value >= 1000000) return `KES ${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `KES ${(value / 1000).toFixed(0)}K`;
      return `KES ${value}`;
    }
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div ref={searchRef} className="w-full max-w-4xl mx-auto">
      {/* Main Search Input */}
      <div className="shadow-md bg-white !rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4">
          <Search size={20} className="text-[var(--color-text-muted)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            placeholder="Search by location, property name, or keyword..."
            className="flex-1 bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none text-base"
            onFocus={() => setExpanded(true)}
          />
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              expanded
                ? 'bg-[var(--color-navy)] text-white'
                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-warm-gray)]'
            }`}
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button onClick={handleSearch} className="btn-primary !py-2.5 !px-6 !text-sm">
            Search
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mt-3 neu-raised-sm !rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-sm font-semibold text-[var(--color-navy)]"
                style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
              >
                Advanced Filters
              </h3>
              <button
                onClick={() => setExpanded(false)}
                className="p-1 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Property Type */}
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                  Property Type
                </label>
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="neu-inset w-full !rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer outline-none text-[var(--color-text-primary)]"
                  >
                    {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                </div>
              </div>

              {/* Neighborhood */}
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                  Neighborhood
                </label>
                <div className="relative">
                  <select
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="neu-inset w-full !rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer outline-none text-[var(--color-text-primary)]"
                  >
                    <option value="">All Neighborhoods</option>
                    {nmaNeighborhoods.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                  Bedrooms
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {bedroomOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setBedrooms(opt)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        bedrooms === opt
                          ? 'bg-[var(--color-navy)] text-white shadow-md'
                          : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-warm-gray)]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="neu-inset w-full !rounded-lg px-3 py-2.5 text-sm appearance-none cursor-pointer outline-none text-[var(--color-text-primary)]"
                  >
                    {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-[var(--color-text-secondary)]">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrency('KES')}
                    className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                      currency === 'KES' ? 'bg-[var(--color-navy)] text-white' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
                    }`}
                  >
                    KES
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
                      currency === 'USD' ? 'bg-[var(--color-navy)] text-white' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
                    }`}
                  >
                    USD
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 neu-inset !rounded-lg px-3 py-2">
                  <span className="text-xs text-[var(--color-text-muted)]">Min</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full bg-transparent text-sm font-medium outline-none text-[var(--color-text-primary)]"
                    placeholder="0"
                  />
                </div>
                <span className="text-[var(--color-text-muted)] text-sm">—</span>
                <div className="flex-1 neu-inset !rounded-lg px-3 py-2">
                  <span className="text-xs text-[var(--color-text-muted)]">Max</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full bg-transparent text-sm font-medium outline-none text-[var(--color-text-primary)]"
                    placeholder="100,000,000"
                  />
                </div>
              </div>
              <div className="mt-2 text-xs text-[var(--color-text-muted)]">
                {formatPriceLabel(priceRange[0])} — {formatPriceLabel(priceRange[1])}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 flex items-center justify-between pt-4 border-t border-[var(--color-warm-gray)]">
              <button
                onClick={() => {
                  setQuery('');
                  setPropertyType('All Types');
                  setNeighborhood('');
                  setBedrooms('Any');
                  setPriceRange([0, 100000000]);
                  setStatus('All Status');
                }}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-navy)] transition-colors font-medium"
              >
                Clear all filters
              </button>
              <button onClick={handleSearch} className="btn-primary !py-2.5 !px-8 !text-sm">
                Show Results
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
