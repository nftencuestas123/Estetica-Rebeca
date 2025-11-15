-- =====================================================
-- MIGRACIÓN SQL COMPLETA Y DEFINITIVA
-- Ejecutar TODO esto de una vez en Supabase SQL Editor
-- =====================================================

-- =====================================================
-- 1. SISTEMA DE ROLES Y USUARIOS
-- =====================================================

CREATE TYPE user_role AS ENUM ('admin', 'client');

CREATE TABLE IF NOT EXISTS public.user_profiles (
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

CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.user_profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);

-- =====================================================
-- 2. SISTEMA DE PÁGINAS (Landing + Capture)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.pages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_pages_type ON public.pages(type);
CREATE INDEX IF NOT EXISTS idx_pages_is_root ON public.pages(is_root) WHERE is_root = true;
CREATE INDEX IF NOT EXISTS idx_pages_is_active ON public.pages(is_active);

CREATE OR REPLACE FUNCTION ensure_single_root_page() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_root = true THEN
    UPDATE public.pages SET is_root = false WHERE id != NEW.id AND type = NEW.type AND is_root = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_ensure_single_root ON public.pages;
CREATE TRIGGER trigger_ensure_single_root BEFORE INSERT OR UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION ensure_single_root_page();

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Páginas activas son públicas" ON public.pages FOR SELECT USING (is_active = true);
CREATE POLICY "Admin acceso completo pages" ON public.pages FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- 3. SISTEMA DE CRÉDITOS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.user_credits (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE UNIQUE,
  balance numeric(10, 2) DEFAULT 0 NOT NULL,
  total_purchased numeric(10, 2) DEFAULT 0 NOT NULL,
  total_spent numeric(10, 2) DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.credit_purchase_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  amount numeric(10, 2) NOT NULL,
  payment_method text NOT NULL,
  receipt_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  amount numeric(10, 2) NOT NULL,
  type text NOT NULL CHECK (type IN ('purchase', 'usage', 'refund', 'adjustment')),
  description text,
  balance_after numeric(10, 2) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_purchase_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own credits" ON public.user_credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users view own purchase requests" ON public.credit_purchase_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create purchase requests" ON public.credit_purchase_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users view own transactions" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins view all credits" ON public.user_credits FOR ALL USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins manage purchase requests" ON public.credit_purchase_requests FOR ALL USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins view all transactions" ON public.credit_transactions FOR ALL USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));

-- =====================================================
-- 4. SISTEMA DE REDES SOCIALES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.social_accounts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('instagram', 'facebook', 'tiktok', 'twitter')),
  account_name text NOT NULL,
  access_token text NOT NULL,
  refresh_token text,
  expires_at timestamp with time zone,
  connected_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE (user_id, platform, account_name)
);

CREATE TABLE IF NOT EXISTS public.social_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
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
  scheduled_at timestamp with time zone,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own social accounts" ON public.social_accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own posts" ON public.social_posts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins view all social" ON public.social_accounts FOR SELECT USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));

-- =====================================================
-- 5. CRM - CLIENTES
-- =====================================================

CREATE TABLE IF NOT EXISTS public.crm_clients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- =====================================================
-- 6. TRATAMIENTOS/SERVICIOS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.treatments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('facial', 'corporal', 'micropigmentacion', 'depilacion', 'masajes', 'otro')),
  duration_minutes integer NOT NULL,
  price numeric(10, 2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- =====================================================
-- 7. CITAS/RESERVAS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);

-- =====================================================
-- 8. PRODUCTOS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- =====================================================
-- 9. VENTAS DE PRODUCTOS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.product_sales (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid REFERENCES public.crm_clients(id) ON DELETE SET NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  quantity integer NOT NULL,
  unit_price numeric(10, 2) NOT NULL,
  total_price numeric(10, 2) NOT NULL,
  payment_method text,
  notes text,
  sale_date timestamp with time zone DEFAULT now() NOT NULL
);

-- =====================================================
-- 10. REPORTES/ESTADÍSTICAS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.business_stats (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- =====================================================
-- 11. CONFIGURACIONES DEL SISTEMA
-- =====================================================

CREATE TABLE IF NOT EXISTS public.system_config (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  description text,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- =====================================================
-- RLS PARA TABLAS ADMIN
-- =====================================================

ALTER TABLE public.crm_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin only crm" ON public.crm_clients FOR ALL USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin only treatments" ON public.treatments FOR ALL USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin only appointments" ON public.appointments FOR ALL USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin only products" ON public.products FOR ALL USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin only sales" ON public.product_sales FOR ALL USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin only stats" ON public.business_stats FOR ALL USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admin only config" ON public.system_config FOR ALL USING (EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin'));

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, role, full_name, phone)
  VALUES (NEW.id, 'client', COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuario'), NEW.raw_user_meta_data->>'phone');
  INSERT INTO public.user_credits (user_id, balance) VALUES (NEW.id, 0);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION get_active_root_page() RETURNS TABLE (id uuid, name text, display_name text, template_key text, color_scheme text) AS $$
BEGIN
  RETURN QUERY SELECT p.id, p.name, p.display_name, p.template_key, p.color_scheme
  FROM public.pages p WHERE p.is_root = true AND p.is_active = true AND p.type = 'landing' LIMIT 1;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_page_views(page_id uuid) RETURNS void AS $$
BEGIN
  UPDATE public.pages SET views = views + 1, updated_at = now() WHERE id = page_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_page_conversions(page_id uuid) RETURNS void AS $$
BEGIN
  UPDATE public.pages SET conversions = conversions + 1, updated_at = now() WHERE id = page_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- SEED DATA - Landing Pages Originales
-- =====================================================

INSERT INTO public.pages (name, display_name, description, type, is_active, is_root, template_key, tags, color_scheme)
VALUES
  ('elegance-gold', 'Elegance Gold', 'Diseño de lujo con oro y negro', 'landing', true, true, 'EleganceGoldLanding', ARRAY['elegante', 'lujo'], 'gold'),
  ('minimal-chic', 'Minimal Chic', 'Diseño minimalista', 'landing', true, false, 'MinimalChicLanding', ARRAY['minimalista'], 'white'),
  ('modern-glam', 'Modern Glam', 'Moderno con animaciones', 'landing', true, false, 'ModernGlamLanding', ARRAY['moderno'], 'pink'),
  ('soft-beauty', 'Soft Beauty', 'Suave con pasteles', 'landing', true, false, 'SoftBeautyLanding', ARRAY['suave'], 'pastel'),
  ('bold-impact', 'Bold Impact', 'Alto impacto visual', 'landing', true, false, 'BoldImpactLanding', ARRAY['bold'], 'vibrant'),
  ('lead-form-classic', 'Formulario Clásico', 'Captura de leads', 'capture', true, false, 'LeadFormClassic', ARRAY['formulario'], 'gold'),
  ('promo-capture', 'Captura Promoción', 'Oferta 30% OFF', 'capture', true, false, 'PromoCaptureForm', ARRAY['promoción'], 'red'),
  ('newsletter-signup', 'Newsletter', 'Suscripción newsletter', 'capture', true, false, 'NewsletterSignup', ARRAY['newsletter'], 'blue')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED DATA - 20 Nude Landing Pages
-- =====================================================

INSERT INTO public.pages (name, display_name, description, type, is_active, is_root, template_key, tags, color_scheme)
VALUES
  ('nude-01', 'Nude 01 - Hero Centrado', 'Hero centrado minimalista', 'landing', true, false, 'NudeLanding01', ARRAY['nude', 'minimalista'], 'nude'),
  ('nude-02', 'Nude 02 - Grid Asimétrico', 'Grid asimétrico moderno', 'landing', true, false, 'NudeLanding02', ARRAY['nude', 'grid'], 'nude'),
  ('nude-03', 'Nude 03 - Split Screen', 'Split screen 50/50', 'landing', true, false, 'NudeLanding03', ARRAY['nude', 'split'], 'nude'),
  ('nude-04', 'Nude 04 - Tipografía Grande', 'Tipografía dominante', 'landing', true, false, 'NudeLanding04', ARRAY['nude', 'tipografía'], 'nude'),
  ('nude-05', 'Nude 05 - Círculos Orgánicos', 'Formas circulares', 'landing', true, false, 'NudeLanding05', ARRAY['nude', 'orgánico'], 'nude'),
  ('nude-06', 'Nude 06 - Layout Diagonal', 'Elementos en ángulo', 'landing', true, false, 'NudeLanding06', ARRAY['nude', 'diagonal'], 'nude'),
  ('nude-07', 'Nude 07 - Japonés', 'Minimalista zen', 'landing', true, false, 'NudeLanding07', ARRAY['nude', 'zen'], 'nude'),
  ('nude-08', 'Nude 08 - Cards Flotantes', 'Cards con sombras', 'landing', true, false, 'NudeLanding08', ARRAY['nude', 'cards'], 'nude'),
  ('nude-09', 'Nude 09 - One Page', 'Scroll vertical', 'landing', true, false, 'NudeLanding09', ARRAY['nude', 'scroll'], 'nude'),
  ('nude-10', 'Nude 10 - Magazine', 'Estilo editorial', 'landing', true, false, 'NudeLanding10', ARRAY['nude', 'magazine'], 'nude'),
  ('nude-11', 'Nude 11 - Bauhaus', 'Geométrico funcional', 'landing', true, false, 'NudeLanding11', ARRAY['nude', 'bauhaus'], 'nude'),
  ('nude-12', 'Nude 12 - Gradient', 'Gradientes suaves', 'landing', true, false, 'NudeLanding12', ARRAY['nude', 'gradient'], 'nude'),
  ('nude-13', 'Nude 13 - Geometric', 'Formas geométricas', 'landing', true, false, 'NudeLanding13', ARRAY['nude', 'geométrico'], 'nude'),
  ('nude-14', 'Nude 14 - Swiss', 'Estilo suizo', 'landing', true, false, 'NudeLanding14', ARRAY['nude', 'swiss'], 'nude'),
  ('nude-15', 'Nude 15 - Sidebar', 'Menú lateral', 'landing', true, false, 'NudeLanding15', ARRAY['nude', 'sidebar'], 'nude'),
  ('nude-16', 'Nude 16 - Fullscreen', 'Secciones completas', 'landing', true, false, 'NudeLanding16', ARRAY['nude', 'fullscreen'], 'nude'),
  ('nude-17', 'Nude 17 - Brutalist', 'Brutalista limpio', 'landing', true, false, 'NudeLanding17', ARRAY['nude', 'brutalist'], 'nude'),
  ('nude-18', 'Nude 18 - Waves', 'Formas onduladas', 'landing', true, false, 'NudeLanding18', ARRAY['nude', 'waves'], 'nude'),
  ('nude-19', 'Nude 19 - Art Deco', 'Elegancia Art Deco', 'landing', true, false, 'NudeLanding19', ARRAY['nude', 'artdeco'], 'nude'),
  ('nude-20', 'Nude 20 - Future', 'Futurista minimal', 'landing', true, false, 'NudeLanding20', ARRAY['nude', 'futurista'], 'nude')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED DATA - Tratamientos
-- =====================================================

INSERT INTO public.treatments (name, description, category, duration_minutes, price, is_active)
VALUES
  ('Limpieza Facial Profunda', 'Limpieza completa con extracción', 'facial', 60, 150000, true),
  ('Micropigmentación Cejas', 'Técnica avanzada cejas naturales', 'micropigmentacion', 120, 800000, true),
  ('Masaje Relajante', 'Masaje corporal completo', 'masajes', 60, 200000, true),
  ('Depilación Láser Facial', 'Depilación definitiva', 'depilacion', 30, 100000, true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED DATA - Productos
-- =====================================================

INSERT INTO public.products (name, description, category, sku, price, stock, is_active)
VALUES
  ('Serum Vitamina C', 'Serum antioxidante', 'skincare', 'SKU001', 180000, 20, true),
  ('Crema Hidratante', 'Hidratación 24h', 'skincare', 'SKU002', 120000, 15, true),
  ('Mascarilla Facial', 'Mascarilla purificante', 'skincare', 'SKU003', 80000, 30, true)
ON CONFLICT DO NOTHING;

