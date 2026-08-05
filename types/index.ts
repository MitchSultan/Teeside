export type PropertyType = 'residential' | 'commercial' | 'land';
export type PropertyStatus = 'available' | 'rented' | 'under-maintenance';
export type ContactStatus = 'new' | 'read' | 'replied';
export type RentalStatus = 'active' | 'expired' | 'terminated';

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  role: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  title: string;
  description: string | null;
  property_type: PropertyType;
  status: PropertyStatus;
  address: string;
  city: string;
  county: string;
  latitude: number | null;
  longitude: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  price: number;
  rental_price: number | null;
  images: string[];
  features: Record<string, unknown>;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  profile_image: string | null;
  license_number: string | null;
  experience_years: number | null;
  is_active: boolean;
  social_links: Record<string, string>;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  property_id: string | null;
  status: ContactStatus;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

export type TourStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type BlogStatus = 'published' | 'draft';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  author_name: string;
  author_avatar: string | null;
  read_time: string;
  published_at: string;
  status: BlogStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface VirtualTourBooking {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  timezone: string | null;
  platform: string | null;
  preferred_date: string | null;
  property_id: string | null;
  notes: string | null;
  status: TourStatus;
  created_at: string;
}

export interface PaginatedResult<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

