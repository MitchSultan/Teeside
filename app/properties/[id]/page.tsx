'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Bed, Bath, Maximize, MapPin, Shield, Calendar, Leaf, Phone, Mail, ChevronLeft, ChevronRight, Heart, Share2, CheckCircle, Building2 } from 'lucide-react';
import { properties, formatPrice, getPropertyTypeLabel, getStatusLabel, getStatusColor } from '@/data/properties';
import { notFound } from 'next/navigation';

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find(p => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);
  const [showContact, setShowContact] = useState(false);

  if (!property) {
    notFound();
  }

  const similar = properties.filter(p => p.id !== property.id && p.neighborhood === property.neighborhood).slice(0, 3);

  // Simple mortgage calc
  const loanAmount = property.price * 0.8;
  const rate = 13.5 / 100 / 12;
  const tenure = 20 * 12;
  const emi = loanAmount * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);

  return (
    <div className="pt-20 lg:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-navy)] transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-[28rem]">
              <Image
                src={property.images[currentImage]}
                alt={property.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Status */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: getStatusColor(property.status) }}>
                  {getStatusLabel(property.status)}
                </span>
                {property.verified && (
                  <span className="verified-badge !bg-white/90 !text-[var(--color-success)]">
                    <Shield size={12} />
                    ArdhiSasa Verified
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors">
                  <Heart size={18} className="text-[var(--color-navy)]" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors">
                  <Share2 size={18} className="text-[var(--color-navy)]" />
                </button>
              </div>

              {/* Image nav */}
              {property.images.length > 1 && (
                <>
                  <button onClick={() => setCurrentImage(i => Math.max(0, i - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center"><ChevronLeft size={20} /></button>
                  <button onClick={() => setCurrentImage(i => Math.min(property.images.length - 1, i + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center"><ChevronRight size={20} /></button>
                </>
              )}
            </div>

            {/* Title & Price */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-[var(--color-gold-dark)] bg-[var(--color-gold)]/10 px-2 py-0.5 rounded">{getPropertyTypeLabel(property.type)}</span>
                <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]"><MapPin size={12} />{property.address}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-navy)] leading-tight mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
                {property.title}
              </h1>
              <div className="price-badge text-xl">{formatPrice(property.price, property.currency)}</div>
            </div>

            {/* Key Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {property.bedrooms > 0 && (
                <div className="neu-raised-sm p-4 text-center">
                  <Bed size={22} className="mx-auto text-[var(--color-navy)] mb-1" />
                  <p className="text-lg font-bold text-[var(--color-text-primary)]">{property.bedrooms}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Bedrooms</p>
                </div>
              )}
              <div className="neu-raised-sm p-4 text-center">
                <Bath size={22} className="mx-auto text-[var(--color-navy)] mb-1" />
                <p className="text-lg font-bold text-[var(--color-text-primary)]">{property.bathrooms}</p>
                <p className="text-xs text-[var(--color-text-muted)]">Bathrooms</p>
              </div>
              <div className="neu-raised-sm p-4 text-center">
                <Maximize size={22} className="mx-auto text-[var(--color-navy)] mb-1" />
                <p className="text-lg font-bold text-[var(--color-text-primary)]">{property.sqft.toLocaleString()}</p>
                <p className="text-xs text-[var(--color-text-muted)]">Sq. Ft.</p>
              </div>
              {property.constructionYear > 0 && (
                <div className="neu-raised-sm p-4 text-center">
                  <Calendar size={22} className="mx-auto text-[var(--color-navy)] mb-1" />
                  <p className="text-lg font-bold text-[var(--color-text-primary)]">{property.constructionYear}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Year Built</p>
                </div>
              )}
            </div>

            {/* EDGE Certification */}
            {property.edgeCertified && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-success)]/5 border border-[var(--color-success)]/15">
                <Leaf size={22} className="text-[var(--color-success)] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[var(--color-success)]">EDGE Certified</p>
                  <p className="text-xs text-[var(--color-text-muted)]">This property meets international green building standards for energy efficiency</p>
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-navy)] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>About This Property</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-navy)] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {property.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                    <CheckCircle size={16} className="text-[var(--color-success)] shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Analysis */}
            <div className="neu-raised p-6">
              <h2 className="text-lg font-semibold text-[var(--color-navy)] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>Investment Snapshot</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Price per SQFT</p>
                  <p className="text-lg font-bold text-[var(--color-navy)]">KES {property.pricePerSqft.toLocaleString()}</p>
                </div>
                {property.rentalYield && property.rentalYield > 0 && (
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">Rental Yield</p>
                    <p className="text-lg font-bold text-[var(--color-success)]">{property.rentalYield}%</p>
                  </div>
                )}
                {property.capitalAppreciation && property.capitalAppreciation > 0 && (
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-1">Capital Appreciation</p>
                    <p className="text-lg font-bold text-[var(--color-success)]">+{property.capitalAppreciation}%</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">Est. Monthly (20yr)</p>
                  <p className="text-lg font-bold text-[var(--color-navy)]">KES {Math.round(emi).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <div className="neu-raised p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                  <Building2 size={24} className="text-[var(--color-navy)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">{property.agent.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Teeside Properties</p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-warm-gray)] transition-colors text-sm">
                  <Phone size={16} className="text-[var(--color-navy)]" />
                  {property.agent.phone}
                </a>
                <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-warm-gray)] transition-colors text-sm">
                  <Mail size={16} className="text-[var(--color-navy)]" />
                  {property.agent.email}
                </a>
              </div>

              <button
                onClick={() => setShowContact(true)}
                className="btn-primary w-full"
              >
                Schedule a Visit
              </button>
              <button className="btn-navy w-full mt-3">
                Request Virtual Tour
              </button>
            </div>

            {/* Mortgage Quick Calc */}
            <div className="neu-raised p-6">
              <h3 className="text-base font-semibold text-[var(--color-navy)] mb-3" style={{ fontFamily: 'var(--font-inter)' }}>Mortgage Estimate</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Property Price</span><span className="font-medium">{formatPrice(property.price)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Down Payment (20%)</span><span className="font-medium">{formatPrice(property.price * 0.2)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Interest Rate</span><span className="font-medium">13.5% p.a.</span></div>
                <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Tenure</span><span className="font-medium">20 years</span></div>
                <div className="h-px bg-[var(--color-warm-gray)] my-2" />
                <div className="flex justify-between"><span className="font-semibold text-[var(--color-navy)]">Monthly Payment</span><span className="font-bold text-[var(--color-gold-dark)]">KES {Math.round(emi).toLocaleString()}</span></div>
              </div>
              <Link href="/tools/mortgage-calculator" className="block mt-4 text-center text-xs font-semibold text-[var(--color-navy)] hover:text-[var(--color-steel-light)] transition-colors">
                → Full Mortgage Calculator
              </Link>
            </div>
          </div>
        </div>

        {/* Similar Listings */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title mb-6">Similar Properties in {property.neighborhood}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map(sp => (
                <Link key={sp.id} href={`/properties/${sp.id}`} className="block">
                  <div className="neu-raised overflow-hidden group">
                    <div className="relative h-48">
                      <Image src={sp.images[0]} alt={sp.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="33vw" />
                      <div className="absolute bottom-3 left-3 price-badge">{formatPrice(sp.price)}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold line-clamp-1 mb-2">{sp.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                        {sp.bedrooms > 0 && <span>{sp.bedrooms} Beds</span>}
                        <span>{sp.bathrooms} Baths</span>
                        <span>{sp.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {showContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowContact(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-xl font-bold text-[var(--color-navy)] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>Schedule a Visit</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-gold)]/30" />
                <select className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none">
                  <option>Preferred Visit Time</option>
                  <option>Morning (9am - 12pm)</option>
                  <option>Afternoon (12pm - 4pm)</option>
                  <option>Evening (4pm - 7pm)</option>
                  <option>Weekend</option>
                </select>
                <textarea placeholder="Any message (optional)" rows={3} className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-tertiary)] text-sm outline-none resize-none focus:ring-2 focus:ring-[var(--color-gold)]/30" />
                <button type="submit" className="btn-primary w-full">Send Request</button>
              </form>
              <button onClick={() => setShowContact(false)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]">✕</button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
