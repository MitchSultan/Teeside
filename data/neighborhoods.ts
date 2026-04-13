export interface Neighborhood {
  name: string;
  slug: string;
  image: string;
  avgPrice: number;
  priceLabel: string;
  propertyCount: number;
  description: string;
  lat: number;
  lng: number;
  highlights: string[];
}

export const neighborhoods: Neighborhood[] = [
  {
    name: 'Kilimani',
    slug: 'kilimani',
    image: '/neighborhood-kilimani.png',
    avgPrice: 15000000,
    priceLabel: 'KES 15M avg',
    propertyCount: 142,
    description: 'Premium residential area with modern apartments, restaurants, and nightlife. Walking distance to Yaya Centre.',
    lat: -1.2891,
    lng: 36.7834,
    highlights: ['Yaya Centre', 'Prestige Plaza', 'Nairobi Hospital'],
  },
  {
    name: 'Westlands',
    slug: 'westlands',
    image: '/neighborhood-westlands.png',
    avgPrice: 12000000,
    priceLabel: 'KES 12M avg',
    propertyCount: 198,
    description: 'Nairobi\'s commercial hub with mixed-use developments, international restaurants, and vibrant nightlife.',
    lat: -1.2636,
    lng: 36.8031,
    highlights: ['Sarit Centre', 'Two Rivers Mall', 'Westgate'],
  },
  {
    name: 'Kileleshwa',
    slug: 'kileleshwa',
    image: '/neighborhood-kilimani.png',
    avgPrice: 22000000,
    priceLabel: 'KES 22M avg',
    propertyCount: 87,
    description: 'Leafy, upscale residential neighborhood favored by families and diplomats. Excellent schools nearby.',
    lat: -1.2780,
    lng: 36.7725,
    highlights: ['Valley Arcade', 'International Schools', 'Green Spaces'],
  },
  {
    name: 'Ruaka',
    slug: 'ruaka',
    image: '/neighborhood-westlands.png',
    avgPrice: 7500000,
    priceLabel: 'KES 7.5M avg',
    propertyCount: 256,
    description: 'Fast-growing satellite town along the Northern Bypass. Affordable options with high appreciation potential.',
    lat: -1.2018,
    lng: 36.7635,
    highlights: ['Northern Bypass', 'Two Rivers Proximity', 'Rapid Growth'],
  },
  {
    name: 'Kitengela',
    slug: 'kitengela',
    image: '/hero-nairobi.png',
    avgPrice: 4200000,
    priceLabel: 'KES 4.2M avg',
    propertyCount: 312,
    description: 'Affordable gateway to Nairobi with massive development activity. Ideal for first-time buyers and rental investments.',
    lat: -1.4726,
    lng: 36.9608,
    highlights: ['Namanga Road', 'SGR Access', 'EPZ Proximity'],
  },
  {
    name: 'Upperhill',
    slug: 'upperhill',
    image: '/neighborhood-westlands.png',
    avgPrice: 18000000,
    priceLabel: 'KES 18M avg',
    propertyCount: 64,
    description: 'Nairobi\'s premier business district. Home to major banks, hospitals, and government offices.',
    lat: -1.2980,
    lng: 36.8155,
    highlights: ['Kenyatta Hospital', 'Central Bank', 'Nairobi Expressway'],
  },
  {
    name: 'Syokimau',
    slug: 'syokimau',
    image: '/hero-nairobi.png',
    avgPrice: 5500000,
    priceLabel: 'KES 5.5M avg',
    propertyCount: 178,
    description: 'Connected to the city via the Syokimau SGR station. Growing residential hub with modern apartment complexes.',
    lat: -1.3580,
    lng: 36.9285,
    highlights: ['SGR Station', 'Mombasa Road', 'Gateway Mall'],
  },
  {
    name: 'Lavington',
    slug: 'lavington',
    image: '/neighborhood-kilimani.png',
    avgPrice: 28000000,
    priceLabel: 'KES 28M avg',
    propertyCount: 53,
    description: 'Exclusive residential area known for spacious homes, diplomatic residences, and proximity to the Village Market.',
    lat: -1.2785,
    lng: 36.7656,
    highlights: ['Lavington Mall', 'International Schools', 'Embassies'],
  },
];
