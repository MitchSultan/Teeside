import HeroSection from './components/home/HeroSection';
import FeaturedListings from './components/home/FeaturedListings';
import AboutSection from './components/home/AboutSection';
import TeamSection from './components/home/TeamSection';
import NeighborhoodExplorer from './components/home/NeighborhoodExplorer';
import LandlordCTA from './components/home/LandlordCTA';
import TrustBanner from './components/home/TrustBanner';
import MarketSnapshot from './components/home/MarketSnapshot';
import TestimonialSection from './components/home/TestimonialSection';
import CTABanner from './components/home/CTABanner';
import SearchBar from './components/SearchBar';

export default function Home() {
  return (
    <>
      {/* Hero with Nairobi skyline */}
      <HeroSection />

      {/* Search Section */}
      <section className="relative -mt-8 z-20 pb-8 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
      </section>

      <AboutSection />

      {/* Featured Listings */}
      <FeaturedListings />

      {/* Neighborhood Explorer */}
      <NeighborhoodExplorer />

      <TeamSection/>

      {/* Market Snapshot */}
      <MarketSnapshot />

      {/* Landlord CTA */}
      <LandlordCTA />

      {/* Trust & Credibility */}
      <TrustBanner />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Final Conversion CTA */}
      <CTABanner />
    </>
  );
}
