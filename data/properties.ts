export interface Property {
  id: string;
  title: string;
  slug: string;
  type: 'apartment' | 'house' | 'penthouse' | 'bedsitter' | 'studio' | 'townhouse' | 'villa' | 'commercial' | 'land';
  status: 'off-plan' | 'ready' | 'repossessed';
  price: number;
  currency: 'KES' | 'USD';
  pricePerSqft: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  constructionYear: number;
  neighborhood: string;
  neighborhoodSlug: string;
  address: string;
  description: string;
  features: string[];
  images: string[];
  verified: boolean;
  edgeCertified: boolean;
  virtualTourUrl?: string;
  videoUrl?: string;
  lat: number;
  lng: number;
  rentalYield?: number;
  capitalAppreciation?: number;
  listedAt: string;
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'tenant' | 'landlord' | 'buyer' | 'diaspora';
  property: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury 3-Bedroom Apartment with Panoramic City Views',
    slug: 'luxury-3br-kilimani-panoramic',
    type: 'apartment',
    status: 'ready',
    price: 18500000,
    currency: 'KES',
    pricePerSqft: 12800,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1445,
    constructionYear: 2024,
    neighborhood: 'Kilimani',
    neighborhoodSlug: 'kilimani',
    address: 'Rose Avenue, Kilimani, Nairobi',
    description: 'Exquisite modern apartment in the heart of Kilimani featuring floor-to-ceiling windows, Italian marble finishes, and a private balcony overlooking the city skyline. Walking distance to Yaya Centre and Junction Mall.',
    features: ['Swimming Pool', 'Gym', '24/7 Security', 'Backup Generator', 'CCTV', 'Covered Parking', 'Fiber Internet', 'Elevator'],
    images: ['/hero-nairobi.png'],
    verified: true,
    edgeCertified: true,
    lat: -1.2891,
    lng: 36.7834,
    rentalYield: 6.2,
    capitalAppreciation: 8.5,
    listedAt: '2025-12-15',
    agent: { name: 'Sarah Wanjiku', phone: '+254712345678', email: 'sarah@teeside.co.ke', avatar: '' },
  },
  {
    id: '2',
    title: 'Modern Studio Apartment — Ideal for Young Professionals',
    slug: 'modern-studio-westlands',
    type: 'studio',
    status: 'ready',
    price: 6500000,
    currency: 'KES',
    pricePerSqft: 13000,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 500,
    constructionYear: 2025,
    neighborhood: 'Westlands',
    neighborhoodSlug: 'westlands',
    address: 'Parklands Road, Westlands, Nairobi',
    description: 'Sleek studio apartment in the vibrant Westlands area. Perfect for professionals seeking proximity to the CBD, Sarit Centre, and nightlife. Fully fitted kitchen with modern appliances.',
    features: ['Rooftop Terrace', 'Gym', '24/7 Security', 'Fiber Internet', 'Smart Home System'],
    images: ['/neighborhood-westlands.png'],
    verified: true,
    edgeCertified: false,
    lat: -1.2636,
    lng: 36.8031,
    rentalYield: 7.1,
    capitalAppreciation: 9.2,
    listedAt: '2026-01-20',
    agent: { name: 'James Mwangi', phone: '+254723456789', email: 'james@teeside.co.ke', avatar: '' },
  },
  {
    id: '3',
    title: 'Spacious 4-Bedroom Villa in Gated Community',
    slug: 'spacious-4br-villa-kileleshwa',
    type: 'villa',
    status: 'ready',
    price: 45000000,
    currency: 'KES',
    pricePerSqft: 11250,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 4000,
    constructionYear: 2023,
    neighborhood: 'Kileleshwa',
    neighborhoodSlug: 'kileleshwa',
    address: 'Mandera Road, Kileleshwa, Nairobi',
    description: 'A stunning family villa set in a serene gated community. Features a landscaped garden, private parking for 3 cars, and en-suite master bedroom. Close to international schools and The Hub Karen.',
    features: ['Garden', 'Private Parking', 'Servant Quarter', 'Borehole', 'Solar Panels', 'CCTV', 'Electric Fence'],
    images: ['/neighborhood-kilimani.png'],
    verified: true,
    edgeCertified: true,
    lat: -1.2780,
    lng: 36.7725,
    rentalYield: 5.4,
    capitalAppreciation: 7.8,
    listedAt: '2025-11-08',
    agent: { name: 'Grace Otieno', phone: '+254734567890', email: 'grace@teeside.co.ke', avatar: '' },
  },
  {
    id: '4',
    title: 'Off-Plan 2-Bedroom Apartment — Early Bird Pricing',
    slug: 'offplan-2br-ruaka',
    type: 'apartment',
    status: 'off-plan',
    price: 7800000,
    currency: 'KES',
    pricePerSqft: 9750,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 800,
    constructionYear: 2027,
    neighborhood: 'Ruaka',
    neighborhoodSlug: 'ruaka',
    address: 'Limuru Road, Ruaka, Kiambu',
    description: 'Invest early in this upcoming development along the Northern Bypass corridor. Modern design with open-plan living, master en-suite, and communal amenities. Expected completion Q4 2027.',
    features: ['Swimming Pool', 'Clubhouse', 'Children\'s Play Area', 'Commercial Centre', 'Backup Generator'],
    images: ['/hero-nairobi.png'],
    verified: true,
    edgeCertified: false,
    lat: -1.2018,
    lng: 36.7635,
    rentalYield: 8.3,
    capitalAppreciation: 12.1,
    listedAt: '2026-02-01',
    agent: { name: 'Peter Kamau', phone: '+254745678901', email: 'peter@teeside.co.ke', avatar: '' },
  },
  {
    id: '5',
    title: 'Executive 1-Bedroom — Upperhill Business District',
    slug: 'executive-1br-upperhill',
    type: 'apartment',
    status: 'ready',
    price: 9200000,
    currency: 'KES',
    pricePerSqft: 13100,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 702,
    constructionYear: 2024,
    neighborhood: 'Upperhill',
    neighborhoodSlug: 'upperhill',
    address: 'Hospital Road, Upperhill, Nairobi',
    description: 'Premium executive apartment in Nairobi\'s prime business district. Ideal for corporate lets with proximity to major hospitals, embassies, and the CBD. High-end finishes throughout.',
    features: ['Concierge', 'Business Centre', 'Gym', '24/7 Security', 'Covered Parking', 'Elevator'],
    images: ['/neighborhood-westlands.png'],
    verified: true,
    edgeCertified: true,
    lat: -1.2980,
    lng: 36.8155,
    rentalYield: 6.8,
    capitalAppreciation: 7.5,
    listedAt: '2026-01-10',
    agent: { name: 'Sarah Wanjiku', phone: '+254712345678', email: 'sarah@teeside.co.ke', avatar: '' },
  },
  {
    id: '6',
    title: 'Affordable Bedsitter — Kitengela New Development',
    slug: 'affordable-bedsitter-kitengela',
    type: 'bedsitter',
    status: 'ready',
    price: 2200000,
    currency: 'KES',
    pricePerSqft: 8800,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 250,
    constructionYear: 2025,
    neighborhood: 'Kitengela',
    neighborhoodSlug: 'kitengela',
    address: 'Namanga Road, Kitengela, Kajiado',
    description: 'Great entry-level investment in Kitengela\'s fast-growing residential zone. Self-contained bedsitter with fitted kitchen, ample natural light, and access to communal facilities.',
    features: ['Water Tank', 'Security Guard', 'Parking', 'Shopping Nearby'],
    images: ['/hero-nairobi.png'],
    verified: false,
    edgeCertified: false,
    lat: -1.4726,
    lng: 36.9608,
    rentalYield: 9.5,
    capitalAppreciation: 14.2,
    listedAt: '2026-03-05',
    agent: { name: 'James Mwangi', phone: '+254723456789', email: 'james@teeside.co.ke', avatar: '' },
  },
  {
    id: '7',
    title: 'Premium 3-Bedroom Penthouse — Lavington',
    slug: 'premium-penthouse-lavington',
    type: 'penthouse',
    status: 'ready',
    price: 35000000,
    currency: 'KES',
    pricePerSqft: 14580,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2400,
    constructionYear: 2024,
    neighborhood: 'Lavington',
    neighborhoodSlug: 'lavington',
    address: 'James Gichuru Road, Lavington, Nairobi',
    description: 'Breathtaking penthouse with wraparound terrace overlooking Nairobi. Private rooftop access, imported German kitchen, underfloor heating, and dedicated elevator. The pinnacle of urban living.',
    features: ['Private Terrace', 'Dedicated Elevator', 'Smart Home', 'Wine Cellar', 'Gym', 'Infinity Pool', 'Staff Quarter'],
    images: ['/neighborhood-kilimani.png'],
    verified: true,
    edgeCertified: true,
    lat: -1.2785,
    lng: 36.7656,
    rentalYield: 5.1,
    capitalAppreciation: 6.8,
    listedAt: '2025-10-22',
    agent: { name: 'Grace Otieno', phone: '+254734567890', email: 'grace@teeside.co.ke', avatar: '' },
  },
  {
    id: '8',
    title: 'Commercial Plot — 0.5 Acre on Thika Superhighway',
    slug: 'commercial-plot-thika-road',
    type: 'land',
    status: 'ready',
    price: 120000000,
    currency: 'KES',
    pricePerSqft: 5600,
    bedrooms: 0,
    bathrooms: 0,
    sqft: 21780,
    constructionYear: 0,
    neighborhood: 'Ruiru',
    neighborhoodSlug: 'ruiru',
    address: 'Thika Superhighway, Ruiru, Kiambu',
    description: 'Prime commercial plot with direct frontage on Thika Superhighway. Ideal for mixed-use development, petrol station, or showroom. Clean title deed, ready for development. All approvals in place.',
    features: ['Road Frontage', 'Clean Title', 'All Approvals', 'Electricity', 'Water', 'Sewer Connection'],
    images: ['/hero-nairobi.png'],
    verified: true,
    edgeCertified: false,
    lat: -1.1478,
    lng: 36.9585,
    rentalYield: 0,
    capitalAppreciation: 18.5,
    listedAt: '2026-02-28',
    agent: { name: 'Peter Kamau', phone: '+254745678901', email: 'peter@teeside.co.ke', avatar: '' },
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ann Njeri',
    role: 'tenant',
    property: '2-BR Apartment, Kilimani',
    quote: 'Teeside made finding my dream apartment effortless. The virtual tour saved me time, and the team handled everything from viewing to lease signing. Best agency in Nairobi!',
    rating: 5,
    avatar: '',
  },
  {
    id: '2',
    name: 'David Ochieng',
    role: 'landlord',
    property: '6-Unit Block, Kileleshwa',
    quote: 'Since Teeside took over property management, my occupancy rate went from 70% to 98%. Their tenant vetting process is thorough and rent collection is always on time.',
    rating: 5,
    avatar: '',
  },
  {
    id: '3',
    name: 'Mary Akinyi',
    role: 'diaspora',
    property: '3-BR Apartment, Ruaka',
    quote: 'Living in the UK, I was nervous about investing back home. Teeside\'s diaspora portal and escrow system gave me total peace of mind. My property was delivered exactly as promised.',
    rating: 5,
    avatar: '',
  },
  {
    id: '4',
    name: 'John Mutai',
    role: 'buyer',
    property: 'Plot, Kitengela',
    quote: 'The ArdhiSasa verification badge gave me confidence that the title deed was legitimate. Teeside handled the entire transfer process professionally. Highly recommended!',
    rating: 4,
    avatar: '',
  },
];

export function formatPrice(price: number, currency: 'KES' | 'USD' = 'KES'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  }
  return `KES ${new Intl.NumberFormat('en-KE').format(price)}`;
}

export function getPropertyTypeLabel(type: Property['type']): string {
  const labels: Record<Property['type'], string> = {
    apartment: 'Apartment',
    house: 'House',
    penthouse: 'Penthouse',
    bedsitter: 'Bedsitter',
    studio: 'Studio',
    townhouse: 'Townhouse',
    villa: 'Villa',
    commercial: 'Commercial',
    land: 'Land',
  };
  return labels[type];
}

export function getStatusLabel(status: Property['status']): string {
  const labels: Record<Property['status'], string> = {
    'off-plan': 'Off-Plan',
    'ready': 'Ready for Occupation',
    'repossessed': 'Repossessed',
  };
  return labels[status];
}

export function getStatusColor(status: Property['status']): string {
  const colors: Record<Property['status'], string> = {
    'off-plan': '#3B82F6',
    'ready': '#1B7A4A',
    'repossessed': '#D94040',
  };
  return colors[status];
}
