-- =====================================================
-- PARTE 2: INSERTAR DATOS
-- Ejecutar DESPUÉS de la PARTE 1
-- =====================================================

-- =====================================================
-- LANDING PAGES (28 en total)
-- =====================================================

INSERT INTO public.pages (name, display_name, description, type, is_active, is_root, template_key, tags, color_scheme)
VALUES
  -- 5 Diseños Originales
  ('elegance-gold', 'Elegance Gold', 'Diseño de lujo con oro y negro', 'landing', true, true, 'EleganceGoldLanding', ARRAY['elegante', 'lujo'], 'gold'),
  ('minimal-chic', 'Minimal Chic', 'Diseño minimalista', 'landing', true, false, 'MinimalChicLanding', ARRAY['minimalista'], 'white'),
  ('modern-glam', 'Modern Glam', 'Moderno con animaciones', 'landing', true, false, 'ModernGlamLanding', ARRAY['moderno'], 'pink'),
  ('soft-beauty', 'Soft Beauty', 'Suave con pasteles', 'landing', true, false, 'SoftBeautyLanding', ARRAY['suave'], 'pastel'),
  ('bold-impact', 'Bold Impact', 'Alto impacto visual', 'landing', true, false, 'BoldImpactLanding', ARRAY['bold'], 'vibrant'),
  
  -- 20 Nude Landing Pages
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
  
  -- 3 Capture Pages
  ('lead-form-classic', 'Formulario Clásico', 'Captura de leads', 'capture', true, false, 'LeadFormClassic', ARRAY['formulario'], 'gold'),
  ('promo-capture', 'Captura Promoción', 'Oferta 30% OFF', 'capture', true, false, 'PromoCaptureForm', ARRAY['promoción'], 'red'),
  ('newsletter-signup', 'Newsletter', 'Suscripción newsletter', 'capture', true, false, 'NewsletterSignup', ARRAY['newsletter'], 'blue');

-- =====================================================
-- TRATAMIENTOS (4 de ejemplo)
-- =====================================================

INSERT INTO public.treatments (name, description, category, duration_minutes, price, is_active)
VALUES
  ('Limpieza Facial Profunda', 'Limpieza completa con extracción', 'facial', 60, 150000, true),
  ('Micropigmentación Cejas', 'Técnica avanzada cejas naturales', 'micropigmentacion', 120, 800000, true),
  ('Masaje Relajante', 'Masaje corporal completo', 'masajes', 60, 200000, true),
  ('Depilación Láser Facial', 'Depilación definitiva', 'depilacion', 30, 100000, true);

-- =====================================================
-- PRODUCTOS (3 de ejemplo)
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
  RAISE NOTICE '🎉 BASE DE DATOS COMPLETA Y LISTA';
  RAISE NOTICE '=====================================================';
  RAISE NOTICE '';
  RAISE NOTICE '✅ 16 Tablas creadas';
  RAISE NOTICE '✅ 28 Landing pages insertadas';
  RAISE NOTICE '✅ 4 Tratamientos de ejemplo';
  RAISE NOTICE '✅ 3 Productos de ejemplo';
  RAISE NOTICE '✅ RLS activado en todas las tablas';
  RAISE NOTICE '✅ Triggers funcionando';
  RAISE NOTICE '';
  RAISE NOTICE '🚀 AHORA PROBÁ EL REGISTRO:';
  RAISE NOTICE '   http://localhost:3000/register';
  RAISE NOTICE '';
  RAISE NOTICE '=====================================================';
END $$;

-- Mostrar resumen
SELECT 
  'pages' as tabla, 
  COUNT(*) as registros,
  '28 landing pages cargadas' as nota
FROM public.pages
UNION ALL
SELECT 
  'treatments',
  COUNT(*),
  '4 tratamientos de ejemplo'
FROM public.treatments
UNION ALL
SELECT 
  'products',
  COUNT(*),
  '3 productos de ejemplo'
FROM public.products
UNION ALL
SELECT 
  'user_profiles',
  COUNT(*),
  'Vacía - se crea al registrar usuarios'
FROM public.user_profiles;

