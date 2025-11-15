-- =====================================================
-- PARTE 1: CREAR TABLAS Y ESTRUCTURA
-- Ejecutar PRIMERO
-- =====================================================

-- Limpiar todo (idempotente)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP TRIGGER IF EXISTS trigger_ensure_single_root ON public.pages CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.ensure_single_root_page() CASCADE;
DROP FUNCTION IF EXISTS public.get_active_root_page() CASCADE;
DROP FUNCTION IF EXISTS public.increment_page_views(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.increment_page_conversions(uuid) CASCADE;

DROP TABLE IF EXISTS public.product_sales CASCADE;
DROP TABLE IF EXISTS public.business_stats CASCADE;
DROP TABLE IF EXISTS public.system_config CASCADE;
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.treatments CASCADE;
DROP TABLE IF EXISTS public.crm_clients CASCADE;
DROP TABLE IF EXISTS public.social_posts CASCADE;
DROP TABLE IF EXISTS public.copy_templates CASCADE;
DROP TABLE IF EXISTS public.social_accounts CASCADE;
DROP TABLE IF EXISTS public.videos CASCADE;
DROP TABLE IF EXISTS public.credit_transactions CASCADE;
DROP TABLE IF EXISTS public.credit_purchase_requests CASCADE;
DROP TABLE IF EXISTS public.user_credits CASCADE;
DROP TABLE IF EXISTS public.pages CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;

DROP TYPE IF EXISTS user_role CASCADE;

-- Crear tipo enum
CREATE TYPE user_role AS ENUM ('admin', 'client');

-- =====================================================
-- TABLA 1: USER_PROFILES
-- =====================================================
CREATE TABLE public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'client',
  full_name text NOT NULL,
  phone text,
  address text,
  city text DEFAULT 'Ciudad del Este',
  country text DEFAULT 'Paraguay',
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role full access profiles" ON public.user_profiles FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 2: PAGES
-- =====================================================
CREATE TABLE public.pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  display_name text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('landing', 'capture')),
  is_active boolean DEFAULT false,
  is_root boolean DEFAULT false,
  template_key text NOT NULL,
  preview_image text,
  tags text[],
  color_scheme text,
  views integer DEFAULT 0,
  conversions integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX idx_pages_type ON public.pages(type);
CREATE INDEX idx_pages_is_root ON public.pages(is_root) WHERE is_root = true;
CREATE INDEX idx_pages_is_active ON public.pages(is_active);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active pages" ON public.pages FOR SELECT USING (is_active = true);
CREATE POLICY "Service role full access pages" ON public.pages FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 3: USER_CREDITS
-- =====================================================
CREATE TABLE public.user_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE UNIQUE,
  balance numeric(10, 2) DEFAULT 0 NOT NULL,
  total_purchased numeric(10, 2) DEFAULT 0 NOT NULL,
  total_spent numeric(10, 2) DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own credits" ON public.user_credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own credits" ON public.user_credits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Service role full access credits" ON public.user_credits FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 4: CREDIT_PURCHASE_REQUESTS
-- =====================================================
CREATE TABLE public.credit_purchase_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  amount numeric(10, 2) NOT NULL,
  payment_method text NOT NULL,
  receipt_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.credit_purchase_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own purchase requests" ON public.credit_purchase_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create purchase requests" ON public.credit_purchase_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Service role full access purchase requests" ON public.credit_purchase_requests FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 5: CREDIT_TRANSACTIONS
-- =====================================================
CREATE TABLE public.credit_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  amount numeric(10, 2) NOT NULL,
  type text NOT NULL CHECK (type IN ('purchase', 'usage', 'refund', 'adjustment')),
  description text,
  balance_after numeric(10, 2) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own transactions" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role full access transactions" ON public.credit_transactions FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 6: VIDEOS
-- =====================================================
CREATE TABLE public.videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  title text,
  description text,
  video_url text,
  thumbnail_url text,
  duration_seconds integer,
  status text DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  topview_job_id text,
  avatar_image_url text,
  script_text text,
  voice_id text,
  cost_usd numeric(10, 2),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX idx_videos_user_id ON public.videos(user_id);
CREATE INDEX idx_videos_status ON public.videos(status);

ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own videos" ON public.videos FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Service role full access videos" ON public.videos FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 7: SOCIAL_ACCOUNTS
-- =====================================================
CREATE TABLE public.social_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('instagram', 'facebook', 'tiktok', 'twitter')),
  account_name text NOT NULL,
  access_token text NOT NULL,
  refresh_token text,
  expires_at timestamp with time zone,
  connected_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE (user_id, platform, account_name)
);

CREATE INDEX idx_social_accounts_user_id ON public.social_accounts(user_id);

ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own social accounts" ON public.social_accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Service role full access social accounts" ON public.social_accounts FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 8: SOCIAL_POSTS
-- =====================================================
CREATE TABLE public.social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  video_id uuid REFERENCES public.videos(id) ON DELETE SET NULL,
  account_id uuid REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  platform text NOT NULL,
  post_id text,
  video_url text,
  copy_text text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'failed')),
  likes integer DEFAULT 0,
  comments integer DEFAULT 0,
  views integer DEFAULT 0,
  shares integer DEFAULT 0,
  engagement_rate numeric(5,2) DEFAULT 0,
  scheduled_at timestamp with time zone,
  published_at timestamp with time zone,
  analytics_updated_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX idx_social_posts_user_id ON public.social_posts(user_id);

ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own posts" ON public.social_posts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Service role full access posts" ON public.social_posts FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 9: COPY_TEMPLATES
-- =====================================================
CREATE TABLE public.copy_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  template_name text NOT NULL,
  template_text text NOT NULL,
  platform text,
  category text,
  times_used integer DEFAULT 0,
  avg_engagement numeric(5,2),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX idx_copy_templates_user_id ON public.copy_templates(user_id);

ALTER TABLE public.copy_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own templates" ON public.copy_templates FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Service role full access templates" ON public.copy_templates FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 10: CRM_CLIENTS
-- =====================================================
CREATE TABLE public.crm_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text,
  phone text NOT NULL,
  birth_date date,
  gender text CHECK (gender IN ('femenino', 'masculino', 'otro')),
  address text,
  notes text,
  tags text[],
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'vip')),
  total_spent numeric(10, 2) DEFAULT 0,
  total_visits integer DEFAULT 0,
  last_visit_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.crm_clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only crm" ON public.crm_clients FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 11: TREATMENTS
-- =====================================================
CREATE TABLE public.treatments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('facial', 'corporal', 'micropigmentacion', 'depilacion', 'masajes', 'otro')),
  duration_minutes integer NOT NULL,
  price numeric(10, 2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only treatments" ON public.treatments FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 12: APPOINTMENTS
-- =====================================================
CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.crm_clients(id) ON DELETE CASCADE,
  treatment_id uuid REFERENCES public.treatments(id) ON DELETE SET NULL,
  appointment_date timestamp with time zone NOT NULL,
  duration_minutes integer NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes text,
  reminder_sent boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX idx_appointments_status ON public.appointments(status);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only appointments" ON public.appointments FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 13: PRODUCTS
-- =====================================================
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('skincare', 'makeup', 'tools', 'supplements', 'otro')),
  sku text UNIQUE,
  price numeric(10, 2) NOT NULL,
  stock integer DEFAULT 0,
  min_stock integer DEFAULT 5,
  is_active boolean DEFAULT true,
  image_url text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only products" ON public.products FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 14: PRODUCT_SALES
-- =====================================================
CREATE TABLE public.product_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.crm_clients(id) ON DELETE SET NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  unit_price numeric(10, 2) NOT NULL,
  total_price numeric(10, 2) NOT NULL,
  payment_method text,
  notes text,
  sale_date timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.product_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only sales" ON public.product_sales FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 15: BUSINESS_STATS
-- =====================================================
CREATE TABLE public.business_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_date date NOT NULL UNIQUE,
  total_revenue numeric(10, 2) DEFAULT 0,
  total_appointments integer DEFAULT 0,
  completed_appointments integer DEFAULT 0,
  cancelled_appointments integer DEFAULT 0,
  new_clients integer DEFAULT 0,
  product_sales_count integer DEFAULT 0,
  product_sales_revenue numeric(10, 2) DEFAULT 0,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.business_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only stats" ON public.business_stats FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TABLA 16: SYSTEM_CONFIG
-- =====================================================
CREATE TABLE public.system_config (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  description text,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only config" ON public.system_config FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- FUNCIONES Y TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, role, full_name, phone)
  VALUES (NEW.id, 'client', COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuario'), NEW.raw_user_meta_data->>'phone');
  
  INSERT INTO public.user_credits (user_id, balance) VALUES (NEW.id, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created 
  AFTER INSERT ON auth.users 
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.ensure_single_root_page() 
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_root = true THEN
    UPDATE public.pages SET is_root = false WHERE id != NEW.id AND type = NEW.type AND is_root = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_ensure_single_root 
  BEFORE INSERT OR UPDATE ON public.pages 
  FOR EACH ROW 
  EXECUTE FUNCTION public.ensure_single_root_page();

CREATE OR REPLACE FUNCTION public.get_active_root_page() 
RETURNS TABLE (id uuid, name text, display_name text, template_key text, color_scheme text) AS $$
BEGIN
  RETURN QUERY SELECT p.id, p.name, p.display_name, p.template_key, p.color_scheme
  FROM public.pages p WHERE p.is_root = true AND p.is_active = true AND p.type = 'landing' LIMIT 1;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.increment_page_views(page_id uuid) 
RETURNS void AS $$
BEGIN
  UPDATE public.pages SET views = views + 1, updated_at = now() WHERE id = page_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.increment_page_conversions(page_id uuid) 
RETURNS void AS $$
BEGIN
  UPDATE public.pages SET conversions = conversions + 1, updated_at = now() WHERE id = page_id;
END;
$$ LANGUAGE plpgsql;

-- Mensaje de confirmación
SELECT '✅ PARTE 1 COMPLETADA - 16 tablas creadas' as resultado;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

