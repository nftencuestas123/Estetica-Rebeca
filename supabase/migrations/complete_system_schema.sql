-- =====================================================
-- SCHEMA COMPLETO - SISTEMA REBECA BARRETO
-- Autenticación profesional + Todas las tablas necesarias
-- =====================================================

-- =====================================================
-- 1. SISTEMA DE ROLES Y USUARIOS
-- =====================================================

-- Enum para roles
CREATE TYPE user_role AS ENUM ('admin', 'client');

-- Tabla de perfiles extendidos (conecta con auth.users de Supabase)
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

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);

-- RLS para perfiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Los usuarios solo pueden ver y editar su propio perfil
CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Admins pueden ver todos los perfiles
CREATE POLICY "Admins can view all profiles"
  ON public.user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- 2. SISTEMA DE PÁGINAS (Landing + Capture)
-- Ya existe en create_pages_system.sql
-- =====================================================

-- =====================================================
-- 3. SISTEMA DE CRÉDITOS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.user_credits (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  balance numeric(10, 2) DEFAULT 0 NOT NULL,
  total_purchased numeric(10, 2) DEFAULT 0 NOT NULL,
  total_spent numeric(10, 2) DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id)
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

-- RLS para créditos
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_purchase_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

-- Usuarios ven solo sus propios créditos
CREATE POLICY "Users view own credits" ON public.user_credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users view own purchase requests" ON public.credit_purchase_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create purchase requests" ON public.credit_purchase_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users view own transactions" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);

-- Admins ven todo
CREATE POLICY "Admins view all credits" ON public.user_credits FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins manage purchase requests" ON public.credit_purchase_requests FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins view all transactions" ON public.credit_transactions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);

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

-- RLS
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own social accounts" ON public.social_accounts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own posts" ON public.social_posts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins view all social" ON public.social_accounts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);

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

-- Solo admins pueden acceder a estas tablas
CREATE POLICY "Admin only crm" ON public.crm_clients FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin only treatments" ON public.treatments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin only appointments" ON public.appointments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin only products" ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin only sales" ON public.product_sales FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin only stats" ON public.business_stats FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin only config" ON public.system_config FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
);

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

-- Función para crear perfil automáticamente cuando se registra un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, role, full_name, phone)
  VALUES (
    NEW.id,
    'client', -- Por defecto todos son clientes
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuario'),
    NEW.raw_user_meta_data->>'phone'
  );
  
  -- Crear balance de créditos inicial
  INSERT INTO public.user_credits (user_id, balance)
  VALUES (NEW.id, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para auto-crear perfil
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- DATOS INICIALES
-- =====================================================

-- Tratamientos base
INSERT INTO public.treatments (name, description, category, duration_minutes, price, is_active)
VALUES
  ('Limpieza Facial Profunda', 'Limpieza completa con extracción y mascarilla', 'facial', 60, 150000, true),
  ('Micropigmentación de Cejas', 'Técnica avanzada para cejas naturales', 'micropigmentacion', 120, 800000, true),
  ('Masaje Relajante', 'Masaje corporal completo', 'masajes', 60, 200000, true),
  ('Depilación Láser Facial', 'Depilación definitiva facial', 'depilacion', 30, 100000, true)
ON CONFLICT DO NOTHING;

-- Productos base
INSERT INTO public.products (name, description, category, sku, price, stock, is_active)
VALUES
  ('Serum Vitamina C', 'Serum antioxidante para el rostro', 'skincare', 'SKU001', 180000, 20, true),
  ('Crema Hidratante', 'Hidratación profunda 24h', 'skincare', 'SKU002', 120000, 15, true),
  ('Mascarilla Facial', 'Mascarilla purificante', 'skincare', 'SKU003', 80000, 30, true)
ON CONFLICT DO NOTHING;

COMMENT ON TABLE public.user_profiles IS 'Perfiles de usuarios (admin y clientes) con roles';
COMMENT ON TABLE public.crm_clients IS 'Base de datos de clientes del CRM';
COMMENT ON TABLE public.treatments IS 'Catálogo de tratamientos/servicios';
COMMENT ON TABLE public.appointments IS 'Citas y reservas';
COMMENT ON TABLE public.products IS 'Inventario de productos';

