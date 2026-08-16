export interface Property {
  id: string;
  title: string;
  slug: string;
  type: 'apartment' | 'house' | 'penthouse' | 'bedsitter' | 'studio' | 'townhouse' | 'villa' | 'commercial' | 'hostel' | 'land';
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
    title: 'Executive 2-Bedroom Apartment-Northlands estate,  ',
    slug: 'executive-2br',
    type: 'apartment',
    status: 'ready',
    price: 25000,
    currency: 'KES',
    pricePerSqft: 12800,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1445,
    constructionYear: 2024,
    neighborhood: 'Kamakis',
    neighborhoodSlug: 'thika-road',
    address: 'Northlands Estate, Thika Road, Nairobi',
    description: 'Exquisite modern apartment in the heart of Thika Road featuring floor-to-ceiling windows, Italian marble finishes, and a private balcony overlooking the city skyline. Walking distance to Yaya Centre and Junction Mall.',
    features: ['Swimming Pool', 'Gym', '24/7 Security', 'Backup Generator', 'CCTV', 'Covered Parking', 'Fiber Internet', 'Elevator'],
    images: ['/images/hero.jpg'],
    verified: true,
    edgeCertified: true,
    lat: -1.2891,
    lng: 36.7834,
    rentalYield: 6.2,
    capitalAppreciation: 8.5,
    listedAt: '2025-12-15',
    agent: { name: 'Geoffrey Wangombe', phone: '+254722841455', email: 'teesidemanagementltd@gmail.com', avatar: '' },
  },
  {
    id: '2',
    title: 'Executive 2-Bedroom Apartment in Membley',
    slug: 'executive-2br-membley',
    type: 'apartment',
    status: 'ready',
    price: 20000,
    currency: 'KES',
    pricePerSqft: 1300,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 500,
    constructionYear: 2025,
    neighborhood: ' Membley',
    neighborhoodSlug: 'membley',
    address: 'Northern Bypass, Membley, Nairobi',
    description: 'Sleek studio apartment in the vibrant Membley area. Perfect for professionals seeking proximity to the CBD, Sarit Centre, and nightlife. Fully fitted kitchen with modern appliances.',
    features: ['Rooftop Terrace', 'Gym', '24/7 Security', 'Fiber Internet', 'Smart Home System'],
    images: ['/images/her.jpg'],
    verified: true,
    edgeCertified: false,
    lat: -1.2636,
    lng: 36.8031,
    rentalYield: 7.1,
    capitalAppreciation: 9.2,
    listedAt: '2026-01-20',
    agent: { name: 'Geoffrey Wangombe', phone: '+254722841455', email: 'teesidemanagementltd@gmail.com', avatar: '' },
  },
  {
    id: '3',
    title: 'Ergon plaza',
    slug: 'ergon-plaza-ruiru',
    type: 'apartment',
    status: 'ready',
    price: 32000,
    currency: 'KES',
    pricePerSqft: 1125,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 4000,
    constructionYear: 2023,
    neighborhood: 'Ruiru',
    neighborhoodSlug: 'ruiru',
    address: ' Ruiru, Nairobi',
    description: 'A stunning apartment with modern amenities. Features a gym, and en-suite master bedroom.',
    features: ['Garden', 'Private Parking', 'Servant Quarter', 'Borehole', 'Solar Panels', 'CCTV', 'Electric Fence'],
    images: ['/images/ergon.jpg'],
    verified: true,
    edgeCertified: true,
    lat: -1.2780,
    lng: 36.7725,
    rentalYield: 5.4,
    capitalAppreciation: 7.8,
    listedAt: '2025-11-08',
    agent: { name: 'Geoffrey Wangombe', phone: '+254722841455', email: 'teesidemanagementltd@gmail.com', avatar: '' },
  },
  {
    id: '4',
    title: 'Erma heights',
    slug: 'erma-heights-thika',
    type: 'apartment',
    status: 'off-plan',
    price: 25000,
    currency: 'KES',
    pricePerSqft: 9750,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 800,
    constructionYear: 2027,
    neighborhood: 'Thika',
    neighborhoodSlug: 'thika',
    address: 'Hospital Road, Thika, Nairobi',
    description: 'A modern design with open-plan living, master en-suite, and communal amenities. Expected completion Q4 2027.',
    features: ['Swimming Pool', 'Clubhouse', 'Children\'s Play Area', 'Commercial Centre', 'Backup Generator'],
    images: ['/images/erma.jpg'],
    verified: true,
    edgeCertified: false,
    lat: -1.2018,
    lng: 36.7635,
    rentalYield: 8.3,
    capitalAppreciation: 12.1,
    listedAt: '2026-02-01',
    agent: { name: 'Geoffrey Wangombe', phone: '+254722841455', email: 'teesidemanagementltd@gmail.com', avatar: '' },
  },
  {
    id: '5',
    title: 'Golden skies',
    slug: 'executive-2br',
    type: 'apartment',
    status: 'ready',
    price: 25000,
    currency: 'KES',
    pricePerSqft: 13100,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 702,
    constructionYear: 2024,
    neighborhood: 'Thika',
    neighborhoodSlug: 'thika',
    address: 'Hospital Road, Thika, Nairobi',
    description: 'Premium executive apartment in Thika. Ideal for corporate lets with proximity to major hospitals, embassies, and the CBD. High-end finishes throughout.',
    features: ['Concierge', 'Business Centre', 'Gym', '24/7 Security', 'Covered Parking', 'Elevator'],
    images: ['/images/golden.jpg'],
    verified: true,
    edgeCertified: true,
    lat: -1.2980,
    lng: 36.8155,
    rentalYield: 6.8,
    capitalAppreciation: 7.5,
    listedAt: '2026-01-10',
    agent: { name: 'Geoffrey Wangombe', phone: '+254722841455', email: 'teesidemanagementltd@gmail.com', avatar: '' },
  },
  {
    id: '6',
    title: 'Winners Hostel K.m area',
    slug:'winners-hostel-k.m-area',
    type: 'hostel',
    status: 'ready',
    price: 9100,
    currency: 'KES',
    pricePerSqft: 8800,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 250,
    constructionYear: 2025,
    neighborhood:'KM area',
    neighborhoodSlug: 'km-area',
    address: 'kM area, KU, Nairobi',
    description: 'Great for students. Self-contained bedsitter with fitted kitchen, ample natural light, and access to communal facilities.',
    features: ['Water Tank', 'Security Guard', 'Parking', 'Shopping Nearby'],
    images: ['/images/winners.jpg'],
    verified: false,
    edgeCertified: false,
    lat: -1.4726,
    lng: 36.9608,
    rentalYield: 9.5,
    capitalAppreciation: 14.2,
    listedAt: '2026-03-05',
    agent: { name: 'Geoffrey Wangombe', phone: '+254722841455', email: 'teesidemanagementltd@gmail.com', avatar: '' },
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
    hostel: 'Hostel',
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
