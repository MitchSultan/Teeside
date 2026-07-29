-- VIRTUAL TOUR BOOKINGS (Diaspora)
CREATE TABLE IF NOT EXISTS virtual_tour_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  timezone TEXT,
  platform TEXT DEFAULT 'Zoom',
  preferred_date DATE,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE virtual_tour_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert_virtual_tours" ON virtual_tour_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "admin_full_access_virtual_tours" ON virtual_tour_bookings FOR ALL USING (auth.uid() IS NOT NULL);
