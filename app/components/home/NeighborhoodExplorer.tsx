'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { neighborhoods } from '@/data/neighborhoods';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

function NeighborhoodCard({ hood }: { hood: (typeof neighborhoods)[number] }) {
  return (
    <Link href={`/properties?neighborhood=${hood.slug}`} className="block group">
      <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md">
        <Image
          src={hood.image}
          alt={`Properties in ${hood.name}, Nairobi`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-[var(--color-navy)]/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <MapPin size={14} className="text-[var(--color-gold)]" />
            <span className="text-xs text-white/70 font-medium">{hood.propertyCount} Properties</span>
          </div>
          <h3
            className="text-xl font-bold text-white mb-1"
            style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
          >
            {hood.name}
          </h3>
          <p className="text-sm text-[var(--color-gold-light)] font-semibold">
            {hood.priceLabel}
          </p>

          {/* Hover Reveal */}
          <div className="mt-3 flex items-center gap-1.5 text-white/90 sm:text-white/0 group-hover:text-white/90 transition-all duration-300">
            <span className="text-xs font-medium">Explore</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function NeighborhoodExplorer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} id="neighborhoods" className="py-16 lg:py-24 bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className=" flex flex-col md:flex-row justify-between text-center mb-12"
        >
          {/* <span className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-2 block">
            Explore by Location
          </span> */}
          <h2 className="section-title text-left">Explore by <br></br> <span className="text-(--color-gold)">Neighborhoods</span></h2>
          <p className="max-w-xl text-left md:text-right mt-3">
          We have properties all over Nairobi and its sorroundings.</p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {neighborhoods.map((hood, index) => (
            <motion.div
              key={hood.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <NeighborhoodCard hood={hood} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {neighborhoods.map((hood) => (
                <CarouselItem key={hood.slug} className="basis-[85%]">
                  <NeighborhoodCard hood={hood} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div> */}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
