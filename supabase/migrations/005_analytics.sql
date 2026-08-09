-- Create analytics_daily_metrics table
CREATE TABLE IF NOT EXISTS public.analytics_daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  active_users INT NOT NULL DEFAULT 0,
  event_count INT NOT NULL DEFAULT 0,
  new_users INT NOT NULL DEFAULT 0,
  key_events INT NOT NULL DEFAULT 0,
  sessions INT NOT NULL DEFAULT 0,
  page_views INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create analytics_realtime_metrics table
CREATE TABLE IF NOT EXISTS public.analytics_realtime_metrics (
  id TEXT PRIMARY KEY DEFAULT 'current',
  active_users_30m INT NOT NULL DEFAULT 0,
  per_minute JSONB NOT NULL DEFAULT '[]'::jsonb,
  country_breakdown JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create analytics_suggested_breakdowns table
CREATE TABLE IF NOT EXISTS public.analytics_suggested_breakdowns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.analytics_daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_realtime_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_suggested_breakdowns ENABLE ROW LEVEL SECURITY;

-- Read policies for authenticated/anon dashboard view
CREATE POLICY "Allow public read access to analytics_daily_metrics"
  ON public.analytics_daily_metrics FOR SELECT USING (true);

CREATE POLICY "Allow public read access to analytics_realtime_metrics"
  ON public.analytics_realtime_metrics FOR SELECT USING (true);

CREATE POLICY "Allow public read access to analytics_suggested_breakdowns"
  ON public.analytics_suggested_breakdowns FOR SELECT USING (true);

-- Service role write policies
CREATE POLICY "Allow service role all access to analytics_daily_metrics"
  ON public.analytics_daily_metrics FOR ALL USING (true);

CREATE POLICY "Allow service role all access to analytics_realtime_metrics"
  ON public.analytics_realtime_metrics FOR ALL USING (true);

CREATE POLICY "Allow service role all access to analytics_suggested_breakdowns"
  ON public.analytics_suggested_breakdowns FOR ALL USING (true);

-- Seed initial real-estate fallback data for instant preview
INSERT INTO public.analytics_daily_metrics (date, active_users, event_count, new_users, key_events, sessions, page_views)
VALUES 
  (CURRENT_DATE - INTERVAL '6 days', 1, 4, 1, 0, 1, 4),
  (CURRENT_DATE - INTERVAL '5 days', 1, 5, 0, 0, 1, 5),
  (CURRENT_DATE - INTERVAL '4 days', 1, 3, 0, 0, 1, 3),
  (CURRENT_DATE - INTERVAL '3 days', 2, 8, 1, 0, 2, 8),
  (CURRENT_DATE - INTERVAL '2 days', 2, 9, 0, 0, 2, 9),
  (CURRENT_DATE - INTERVAL '1 day', 2, 12, 1, 0, 2, 12),
  (CURRENT_DATE, 3, 18, 3, 0, 3, 18)
ON CONFLICT (date) DO UPDATE SET
  active_users = EXCLUDED.active_users,
  event_count = EXCLUDED.event_count,
  new_users = EXCLUDED.new_users,
  key_events = EXCLUDED.key_events,
  updated_at = NOW();

INSERT INTO public.analytics_realtime_metrics (id, active_users_30m, per_minute, country_breakdown)
VALUES (
  'current',
  3,
  '[
    {"minute": "30m ago", "count": 0},
    {"minute": "25m ago", "count": 0},
    {"minute": "20m ago", "count": 1},
    {"minute": "15m ago", "count": 0},
    {"minute": "10m ago", "count": 1},
    {"minute": "5m ago", "count": 1},
    {"minute": "Just now", "count": 2}
  ]'::jsonb,
  '[{"country": "Kenya", "active_users": 1}, {"country": "United States", "active_users": 1}, {"country": "United Kingdom", "active_users": 1}]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  active_users_30m = EXCLUDED.active_users_30m,
  per_minute = EXCLUDED.per_minute,
  country_breakdown = EXCLUDED.country_breakdown,
  updated_at = NOW();

INSERT INTO public.analytics_suggested_breakdowns (category, title, items)
VALUES
  (
    'listing_location',
    'Active Users by Listing Location',
    '[{"label": "Nairobi", "value": 1}, {"label": "Kilimani", "value": 1}, {"label": "Westlands", "value": 1}]'::jsonb
  ),
  (
    'property_page_views',
    'Views by Property Page',
    '[{"label": "3BR Kilimani Apartment", "value": 11}, {"label": "4BR Westlands Villa", "value": 5}, {"label": "Ruaka Studio Apartment", "value": 2}]'::jsonb
  ),
  (
    'traffic_sources',
    'Sessions by Traffic Source',
    '[{"label": "Direct", "value": 3}, {"label": "Organic Search", "value": 1}, {"label": "Social / Diaspora", "value": 1}]'::jsonb
  )
ON CONFLICT (category) DO UPDATE SET
  title = EXCLUDED.title,
  items = EXCLUDED.items,
  updated_at = NOW();
