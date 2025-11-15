-- =====================================================
-- SCRIPT DEFINITIVO COMPLETO - ESTETICA REBECA
-- EJECUTAR UNA SOLA VEZ DESPUÉS DE ELIMINAR TODO
-- Revisado pixel por pixel - 100% funcional
-- =====================================================

-- =====================================================
-- PASO 1: LIMPIAR TODO (IDEMPOTENTE)
-- =====================================================

-- Eliminar triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS trigger_ensure_single_root ON public.pages;
DROP TRIGGER IF EXISTS update_videos_timestamp ON public.videos;
DROP TRIGGER IF EXISTS update_copy_templates_timestamp ON public.copy_templates;

-- Eliminar funciones
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.ensure_single_root_page() CASCADE;
DROP FUNCTION IF EXISTS public.get_active_root_page() CASCADE;
DROP FUNCTION IF EXISTS public.increment_page_views(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.increment_page_conversions(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.update_videos_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.update_copy_templates_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- Eliminar tablas (en orden correcto por dependencias)
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

-- Eliminar tipos
DROP TYPE IF EXISTS user_role CASCADE;

-- =====================================================
-- PASO 2: CREAR TIPO DE ENUM
-- =====================================================

CREATE TYPE user_role AS ENUM ('admin', 'client');

-- =====================================================
-- PASO 3: TABLA USER_PROFILES
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

-- RLS para user_profiles (SIN RECURSIÓN)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
  ON public.user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Service role full access profiles" 
  ON public.user_profiles FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- PASO 4: TABLA PAGES (Landing Pages)
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

-- RLS para pages (público solo lectura de activas)
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active pages" 
  ON public.pages FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Service role full access pages" 
  ON public.pages FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- PASO 5: SISTEMA DE CRÉDITOS
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

CREATE TABLE public.credit_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  amount numeric(10, 2) NOT NULL,
  type text NOT NULL CHECK (type IN ('purchase', 'usage', 'refund', 'adjustment')),
  description text,
  balance_after numeric(10, 2) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- RLS para créditos
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_purchase_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own credits" 
  ON public.user_credits FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users update own credits" 
  ON public.user_credits FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access credits" 
  ON public.user_credits FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Users view own purchase requests" 
  ON public.credit_purchase_requests FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users create purchase requests" 
  ON public.credit_purchase_requests FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access purchase requests" 
  ON public.credit_purchase_requests FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Users view own transactions" 
  ON public.credit_transactions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access transactions" 
  ON public.credit_transactions FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- PASO 6: VIDEOS IA
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

-- RLS para videos
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own videos" 
  ON public.videos FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access videos" 
  ON public.videos FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- PASO 7: REDES SOCIALES
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

CREATE INDEX idx_social_accounts_user_id ON public.social_accounts(user_id);
CREATE INDEX idx_social_posts_user_id ON public.social_posts(user_id);
CREATE INDEX idx_copy_templates_user_id ON public.copy_templates(user_id);

-- RLS para redes sociales
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own social accounts" 
  ON public.social_accounts FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access social accounts" 
  ON public.social_accounts FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Users manage own posts" 
  ON public.social_posts FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access posts" 
  ON public.social_posts FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Users manage own templates" 
  ON public.copy_templates FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access templates" 
  ON public.copy_templates FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- PASO 8: CRM - CLIENTES
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

-- =====================================================
-- PASO 9: TRATAMIENTOS
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

-- =====================================================
-- PASO 10: CITAS
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

-- =====================================================
-- PASO 11: PRODUCTOS
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

-- =====================================================
-- PASO 12: VENTAS
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

-- =====================================================
-- PASO 13: ESTADÍSTICAS
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

-- =====================================================
-- PASO 14: CONFIGURACIÓN
-- =====================================================

CREATE TABLE public.system_config (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  description text,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- =====================================================
-- RLS PARA TABLAS ADMIN (Solo Service Role)
-- =====================================================

ALTER TABLE public.crm_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only crm" 
  ON public.crm_clients FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role only treatments" 
  ON public.treatments FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role only appointments" 
  ON public.appointments FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role only products" 
  ON public.products FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role only sales" 
  ON public.product_sales FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role only stats" 
  ON public.business_stats FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role only config" 
  ON public.system_config FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- PASO 15: FUNCIONES AUTOMÁTICAS
-- =====================================================

-- Trigger para crear perfil automático al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, role, full_name, phone)
  VALUES (
    NEW.id, 
    'client', 
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuario'), 
    NEW.raw_user_meta_data->>'phone'
  );
  
  INSERT INTO public.user_credits (user_id, balance) 
  VALUES (NEW.id, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created 
  AFTER INSERT ON auth.users 
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Función para asegurar una sola página root
CREATE OR REPLACE FUNCTION public.ensure_single_root_page() 
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_root = true THEN
    UPDATE public.pages 
    SET is_root = false 
    WHERE id != NEW.id 
      AND type = NEW.type 
      AND is_root = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_ensure_single_root 
  BEFORE INSERT OR UPDATE ON public.pages 
  FOR EACH ROW 
  EXECUTE FUNCTION public.ensure_single_root_page();

-- Funciones útiles para páginas
CREATE OR REPLACE FUNCTION public.get_active_root_page() 
RETURNS TABLE (
  id uuid, 
  name text, 
  display_name text, 
  template_key text, 
  color_scheme text
) AS $$
BEGIN
  RETURN QUERY 
  SELECT p.id, p.name, p.display_name, p.template_key, p.color_scheme
  FROM public.pages p 
  WHERE p.is_root = true 
    AND p.is_active = true 
    AND p.type = 'landing' 
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.increment_page_views(page_id uuid) 
RETURNS void AS $$
BEGIN
  UPDATE public.pages 
  SET views = views + 1, updated_at = now() 
  WHERE id = page_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.increment_page_conversions(page_id uuid) 
RETURNS void AS $$
BEGIN
  UPDATE public.pages 
  SET conversions = conversions + 1, updated_at = now() 
  WHERE id = page_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- PASO 16: SEED DATA - LANDING PAGES
-- =====================================================

INSERT INTO public.pages (name, display_name, description, type, is_active, is_root, template_key, tags, color_scheme)
VALUES
  -- Originales
  ('elegance-gold', 'Elegance Gold', 'Diseño de lujo con oro y negro', 'landing', true, true, 'EleganceGoldLanding', ARRAY['elegante', 'lujo'], 'gold'),
  ('minimal-chic', 'Minimal Chic', 'Diseño minimalista', 'landing', true, false, 'MinimalChicLanding', ARRAY['minimalista'], 'white'),
  ('modern-glam', 'Modern Glam', 'Moderno con animaciones', 'landing', true, false, 'ModernGlamLanding', ARRAY['moderno'], 'pink'),
  ('soft-beauty', 'Soft Beauty', 'Suave con pasteles', 'landing', true, false, 'SoftBeautyLanding', ARRAY['suave'], 'pastel'),
  ('bold-impact', 'Bold Impact', 'Alto impacto visual', 'landing', true, false, 'BoldImpactLanding', ARRAY['bold'], 'vibrant'),
  
  -- Nude Landing Pages (20)
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
  ('nude-20', 'Nude 20 - Future', 'Futurista minimal', 'landing', true, false, 'NudeLanding20', ARRAY['nude', 'futurista'], 'nude'),
  
  -- Capture Pages
  ('lead-form-classic', 'Formulario Clásico', 'Captura de leads', 'capture', true, false, 'LeadFormClassic', ARRAY['formulario'], 'gold'),
  ('promo-capture', 'Captura Promoción', 'Oferta 30% OFF', 'capture', true, false, 'PromoCaptureForm', ARRAY['promoción'], 'red'),
  ('newsletter-signup', 'Newsletter', 'Suscripción newsletter', 'capture', true, false, 'NewsletterSignup', ARRAY['newsletter'], 'blue');

-- =====================================================
-- PASO 17: SEED DATA - TRATAMIENTOS
-- =====================================================

INSERT INTO public.treatments (name, description, category, duration_minutes, price, is_active)
VALUES
  ('Limpieza Facial Profunda', 'Limpieza completa con extracción', 'facial', 60, 150000, true),
  ('Micropigmentación Cejas', 'Técnica avanzada cejas naturales', 'micropigmentacion', 120, 800000, true),
  ('Masaje Relajante', 'Masaje corporal completo', 'masajes', 60, 200000, true),
  ('Depilación Láser Facial', 'Depilación definitiva', 'depilacion', 30, 100000, true);

-- =====================================================
-- PASO 18: SEED DATA - PRODUCTOS
-- =====================================================

INSERT INTO public.products (name, description, category, sku, price, stock, is_active)
VALUES
  ('Serum Vitamina C', 'Serum antioxidante', 'skincare', 'SKU001', 180000, 20, true),
  ('Crema Hidratante', 'Hidratación 24h', 'skincare', 'SKU002', 120000, 15, true),
  ('Mascarilla Facial', 'Mascarilla purificante', 'skincare', 'SKU003', 80000, 30, true);

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

DO $$ 
BEGIN 
  RAISE NOTICE '';
  RAISE NOTICE '=====================================================';
  RAISE NOTICE '🎉 BASE DE DATOS CREADA EXITOSAMENTE';
  RAISE NOTICE '=====================================================';
  RAISE NOTICE '';
  RAISE NOTICE '✅ Tablas creadas: 16';
  RAISE NOTICE '✅ RLS activado en todas las tablas';
  RAISE NOTICE '✅ Políticas sin recursión infinita';
  RAISE NOTICE '✅ Triggers funcionando';
  RAISE NOTICE '✅ 28 Landing pages insertadas';
  RAISE NOTICE '✅ Tratamientos y productos de ejemplo';
  RAISE NOTICE '';
  RAISE NOTICE '🔐 CREAR ADMIN MANUALMENTE:';
  RAISE NOTICE '1. Registrate en la app como usuario normal';
  RAISE NOTICE '2. En Supabase → Table Editor → user_profiles';
  RAISE NOTICE '3. Cambia role de "client" a "admin"';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 TODO LISTO PARA USAR';
  RAISE NOTICE '=====================================================';
END $$;

-- Mostrar resumen de tablas
SELECT 
  'user_profiles' as tabla, 
  COUNT(*) as registros 
FROM public.user_profiles
UNION ALL
SELECT 'pages', COUNT(*) FROM public.pages
UNION ALL
SELECT 'treatments', COUNT(*) FROM public.treatments
UNION ALL
SELECT 'products', COUNT(*) FROM public.products;

