-- Teeside Management Ltd — initial schema (Phase 1)

-- PROFILES (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'admin',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- PROPERTIES
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL CHECK (property_type IN ('residential','commercial','land','apartment','house','penthouse','bedsitter','studio','townhouse','villa')),
  status TEXT DEFAULT 'available' CHECK (status IN ('available','rented','under-maintenance','ready','off-plan','repossessed','for-sale','sold')),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  county TEXT NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  bedrooms INTEGER,
  bathrooms DECIMAL(3,1),
  square_feet INTEGER,
  price DECIMAL(12,2) NOT NULL,
  rental_price DECIMAL(12,2),
  images TEXT[] DEFAULT '{}',
  features JSONB DEFAULT '{}',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_type ON properties(property_type);
CREATE INDEX idx_properties_city ON properties(city);

-- AGENTS
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  bio TEXT,
  profile_image TEXT,
  license_number TEXT,
  experience_years INTEGER,
  is_active BOOLEAN DEFAULT true,
  social_links JSONB DEFAULT '{}',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE agent_properties (
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  PRIMARY KEY (agent_id, property_id)
);

-- CONTACT SUBMISSIONS
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  property_id UUID REFERENCES properties(id),
  status TEXT DEFAULT 'new' CHECK (status IN ('new','read','replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NEWSLETTER
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- RENTAL AGREEMENTS (Phase 2)
CREATE TABLE rental_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) NOT NULL,
  tenant_name TEXT NOT NULL,
  tenant_email TEXT NOT NULL,
  tenant_phone TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  monthly_rent DECIMAL(12,2) NOT NULL,
  deposit_amount DECIMAL(12,2),
  terms_and_conditions TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','expired','terminated')),
  document_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAGE VIEWS (Phase 3)
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url TEXT NOT NULL,
  visitor_id TEXT,
  country TEXT,
  device_type TEXT CHECK (device_type IN ('mobile','desktop','tablet')),
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Storage bucket for property images
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_agreements ENABLE ROW LEVEL SECURITY;

-- Admin (authenticated users) full access
CREATE POLICY "admin_full_access_properties" ON properties FOR ALL
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin_full_access_agents" ON agents FOR ALL
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin_full_access_agent_properties" ON agent_properties FOR ALL
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin_full_access_contacts" ON contact_submissions FOR ALL
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin_full_access_newsletter" ON newsletter_subscribers FOR ALL
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin_full_access_rentals" ON rental_agreements FOR ALL
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "admin_view_own_profile" ON profiles FOR SELECT
  USING (auth.uid() = id);
CREATE POLICY "admin_update_own_profile" ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Public read/write
CREATE POLICY "public_read_available_properties" ON properties FOR SELECT
  USING (status = 'available');
CREATE POLICY "public_read_active_agents" ON agents FOR SELECT
  USING (is_active = true);
CREATE POLICY "public_insert_contact" ON contact_submissions FOR INSERT
  WITH CHECK (true);
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Storage policies
CREATE POLICY "public_read_property_images" ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');
CREATE POLICY "admin_upload_property_images" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "admin_update_property_images" ON storage.objects FOR UPDATE
  USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "admin_delete_property_images" ON storage.objects FOR DELETE
  USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);
