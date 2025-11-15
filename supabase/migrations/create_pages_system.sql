-- =====================================================
-- SISTEMA DE GESTIÓN DE PÁGINAS (Landing + Capture)
-- =====================================================

-- Tabla principal de páginas
CREATE TABLE IF NOT EXISTS public.pages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Información básica
  name text NOT NULL, -- Nombre interno para identificar
  display_name text NOT NULL, -- Nombre que ve el usuario
  description text,
  type text NOT NULL CHECK (type IN ('landing', 'capture')),
  
  -- Estado y visibilidad
  is_active boolean DEFAULT false, -- Si está disponible para usar
  is_root boolean DEFAULT false, -- Si es la página del root (solo una puede ser true)
  
  -- Diseño y contenido
  template_key text NOT NULL, -- Identificador del componente React a renderizar
  preview_image text, -- URL de imagen de preview
  
  -- Metadatos
  tags text[], -- ['elegante', 'minimalista', 'moderno']
  color_scheme text, -- 'gold', 'pink', 'blue', etc.
  
  -- Analytics
  views integer DEFAULT 0,
  conversions integer DEFAULT 0, -- Para capture pages
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_pages_type ON public.pages(type);
CREATE INDEX IF NOT EXISTS idx_pages_is_root ON public.pages(is_root) WHERE is_root = true;
CREATE INDEX IF NOT EXISTS idx_pages_is_active ON public.pages(is_active);

-- Función para asegurar que solo UNA página sea root
CREATE OR REPLACE FUNCTION ensure_single_root_page()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_root = true THEN
    -- Desactivar todas las demás páginas root del mismo tipo
    UPDATE public.pages
    SET is_root = false
    WHERE id != NEW.id AND type = NEW.type AND is_root = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para ejecutar la función
DROP TRIGGER IF EXISTS trigger_ensure_single_root ON public.pages;
CREATE TRIGGER trigger_ensure_single_root
  BEFORE INSERT OR UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION ensure_single_root_page();

-- =====================================================
-- CONFIGURACIÓN DE SEGURIDAD (RLS)
-- =====================================================

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer páginas activas (para el sitio público)
CREATE POLICY "Páginas activas son públicas"
  ON public.pages
  FOR SELECT
  USING (is_active = true);

-- Política: Admin puede hacer TODO (sin autenticación por ahora)
-- TODO: Cuando implementes auth real, cambiar a: TO authenticated USING (user_has_admin_role())
CREATE POLICY "Admin acceso completo"
  ON public.pages
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- =====================================================
-- DATOS INICIALES (SEED DATA)
-- Landing Pages creadas por el sistema
-- =====================================================

INSERT INTO public.pages (name, display_name, description, type, is_active, is_root, template_key, tags, color_scheme, preview_image)
VALUES
  -- LANDING PAGES
  (
    'elegance-gold',
    'Elegance Gold',
    'Diseño de lujo con oro y negro, ideal para estética de alta gama',
    'landing',
    true,
    true, -- Esta será la página principal por defecto
    'EleganceGoldLanding',
    ARRAY['elegante', 'lujo', 'oro', 'sofisticado'],
    'gold',
    '/previews/elegance-gold.jpg'
  ),
  (
    'minimal-chic',
    'Minimal Chic',
    'Diseño minimalista y limpio con enfoque en la simplicidad',
    'landing',
    true,
    false,
    'MinimalChicLanding',
    ARRAY['minimalista', 'limpio', 'moderno', 'simple'],
    'white',
    '/previews/minimal-chic.jpg'
  ),
  (
    'modern-glam',
    'Modern Glam',
    'Diseño moderno con animaciones suaves y colores vibrantes',
    'landing',
    true,
    false,
    'ModernGlamLanding',
    ARRAY['moderno', 'animado', 'vibrante', 'dinámico'],
    'pink',
    '/previews/modern-glam.jpg'
  ),
  (
    'soft-beauty',
    'Soft Beauty',
    'Diseño suave con colores pasteles y estética delicada',
    'landing',
    true,
    false,
    'SoftBeautyLanding',
    ARRAY['suave', 'pastel', 'delicado', 'femenino'],
    'pastel',
    '/previews/soft-beauty.jpg'
  ),
  (
    'bold-impact',
    'Bold Impact',
    'Diseño de alto impacto visual con colores fuertes',
    'landing',
    true,
    false,
    'BoldImpactLanding',
    ARRAY['bold', 'impactante', 'fuerte', 'energético'],
    'vibrant',
    '/previews/bold-impact.jpg'
  ),
  
  -- CAPTURE PAGES
  (
    'lead-form-classic',
    'Formulario Clásico',
    'Página de captura de leads con formulario clásico',
    'capture',
    true,
    false,
    'LeadFormClassic',
    ARRAY['formulario', 'leads', 'clásico'],
    'gold',
    '/previews/lead-form-classic.jpg'
  ),
  (
    'promo-capture',
    'Captura de Promoción',
    'Página para capturar leads con oferta especial',
    'capture',
    true,
    false,
    'PromoCaptureForm',
    ARRAY['promoción', 'oferta', 'descuento'],
    'red',
    '/previews/promo-capture.jpg'
  ),
  (
    'newsletter-signup',
    'Suscripción Newsletter',
    'Página simple para suscripción a newsletter',
    'capture',
    true,
    false,
    'NewsletterSignup',
    ARRAY['newsletter', 'email', 'suscripción'],
    'blue',
    '/previews/newsletter-signup.jpg'
  )
ON CONFLICT DO NOTHING;

-- =====================================================
-- FUNCIONES ÚTILES
-- =====================================================

-- Función para obtener la página root activa
CREATE OR REPLACE FUNCTION get_active_root_page()
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
  WHERE p.is_root = true AND p.is_active = true AND p.type = 'landing'
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Función para incrementar views
CREATE OR REPLACE FUNCTION increment_page_views(page_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.pages
  SET views = views + 1,
      updated_at = now()
  WHERE id = page_id;
END;
$$ LANGUAGE plpgsql;

-- Función para incrementar conversiones (capture pages)
CREATE OR REPLACE FUNCTION increment_page_conversions(page_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.pages
  SET conversions = conversions + 1,
      updated_at = now()
  WHERE id = page_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE public.pages IS 'Sistema de gestión de landing pages y capture pages';
COMMENT ON COLUMN public.pages.template_key IS 'Nombre del componente React que renderiza esta página';
COMMENT ON COLUMN public.pages.is_root IS 'Solo UNA landing page puede ser root (página principal)';

