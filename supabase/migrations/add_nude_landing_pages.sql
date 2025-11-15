-- =====================================================
-- AGREGAR 20 NUDE LANDING PAGES
-- Colección completa de landing pages con paleta nude/rosado
-- =====================================================

INSERT INTO public.pages (name, display_name, description, type, is_active, is_root, template_key, tags, color_scheme, preview_image)
VALUES
  -- NUDE LANDING 01
  (
    'nude-landing-01',
    'Nude 01 - Hero Centrado',
    'Diseño minimalista con hero centrado y paleta nude rosado',
    'landing',
    true,
    false,
    'NudeLanding01',
    ARRAY['minimalista', 'centrado', 'nude', 'elegante'],
    'nude',
    '/previews/nude-01.jpg'
  ),
  -- NUDE LANDING 02
  (
    'nude-landing-02',
    'Nude 02 - Grid Asimétrico',
    'Layout asimétrico con bloques desalineados',
    'landing',
    true,
    false,
    'NudeLanding02',
    ARRAY['asimétrico', 'moderno', 'nude', 'grid'],
    'nude',
    '/previews/nude-02.jpg'
  ),
  -- NUDE LANDING 03
  (
    'nude-landing-03',
    'Nude 03 - Split Screen',
    'Diseño 50/50 split screen vertical',
    'landing',
    true,
    false,
    'NudeLanding03',
    ARRAY['split', 'vertical', 'nude', 'elegante'],
    'nude',
    '/previews/nude-03.jpg'
  ),
  -- NUDE LANDING 04
  (
    'nude-landing-04',
    'Nude 04 - Tipografía Grande',
    'Diseño centrado en tipografía gigante',
    'landing',
    true,
    false,
    'NudeLanding04',
    ARRAY['tipografía', 'grande', 'nude', 'minimalista'],
    'nude',
    '/previews/nude-04.jpg'
  ),
  -- NUDE LANDING 05
  (
    'nude-landing-05',
    'Nude 05 - Círculos Orgánicos',
    'Formas circulares superpuestas con flow suave',
    'landing',
    true,
    false,
    'NudeLanding05',
    ARRAY['orgánico', 'círculos', 'nude', 'suave'],
    'nude',
    '/previews/nude-05.jpg'
  ),
  -- NUDE LANDING 06
  (
    'nude-landing-06',
    'Nude 06 - Layout Diagonal',
    'Elementos en ángulo, dinámico pero minimalista',
    'landing',
    true,
    false,
    'NudeLanding06',
    ARRAY['diagonal', 'dinámico', 'nude', 'moderno'],
    'nude',
    '/previews/nude-06.jpg'
  ),
  -- NUDE LANDING 07
  (
    'nude-landing-07',
    'Nude 07 - Minimalista Japonés',
    'Diseño zen ultra simple, wabi-sabi',
    'landing',
    true,
    false,
    'NudeLanding07',
    ARRAY['japonés', 'zen', 'nude', 'wabi-sabi'],
    'nude',
    '/previews/nude-07.jpg'
  ),
  -- NUDE LANDING 08
  (
    'nude-landing-08',
    'Nude 08 - Cards Flotantes',
    'Cards elevadas con sombras suaves',
    'landing',
    true,
    false,
    'NudeLanding08',
    ARRAY['cards', 'flotante', 'nude', 'sombras'],
    'nude',
    '/previews/nude-08.jpg'
  ),
  -- NUDE LANDING 09
  (
    'nude-landing-09',
    'Nude 09 - One Page Scroll',
    'Secciones full-height verticales',
    'landing',
    true,
    false,
    'NudeLanding09',
    ARRAY['one-page', 'scroll', 'nude', 'secciones'],
    'nude',
    '/previews/nude-09.jpg'
  ),
  -- NUDE LANDING 10
  (
    'nude-landing-10',
    'Nude 10 - Magazine Style',
    'Diseño editorial estilo revista',
    'landing',
    true,
    false,
    'NudeLanding10',
    ARRAY['magazine', 'editorial', 'nude', 'grid'],
    'nude',
    '/previews/nude-10.jpg'
  ),
  -- NUDE LANDING 11
  (
    'nude-landing-11',
    'Nude 11 - Bauhaus',
    'Diseño geométrico bauhaus funcional',
    'landing',
    true,
    false,
    'NudeLanding11',
    ARRAY['bauhaus', 'geométrico', 'nude', 'funcional'],
    'nude',
    '/previews/nude-11.jpg'
  ),
  -- NUDE LANDING 12
  (
    'nude-landing-12',
    'Nude 12 - Gradient Soft',
    'Gradientes suaves y transiciones delicadas',
    'landing',
    true,
    false,
    'NudeLanding12',
    ARRAY['gradient', 'suave', 'nude', 'delicado'],
    'nude',
    '/previews/nude-12.jpg'
  ),
  -- NUDE LANDING 13
  (
    'nude-landing-13',
    'Nude 13 - Geometric Shapes',
    'Formas geométricas minimalistas',
    'landing',
    true,
    false,
    'NudeLanding13',
    ARRAY['geométrico', 'formas', 'nude', 'minimalista'],
    'nude',
    '/previews/nude-13.jpg'
  ),
  -- NUDE LANDING 14
  (
    'nude-landing-14',
    'Nude 14 - Swiss Minimal',
    'Estilo suizo con grid preciso',
    'landing',
    true,
    false,
    'NudeLanding14',
    ARRAY['suizo', 'grid', 'nude', 'preciso'],
    'nude',
    '/previews/nude-14.jpg'
  ),
  -- NUDE LANDING 15
  (
    'nude-landing-15',
    'Nude 15 - Sidebar Navigation',
    'Menú lateral fijo con contenido fluido',
    'landing',
    true,
    false,
    'NudeLanding15',
    ARRAY['sidebar', 'navegación', 'nude', 'lateral'],
    'nude',
    '/previews/nude-15.jpg'
  ),
  -- NUDE LANDING 16
  (
    'nude-landing-16',
    'Nude 16 - Full Screen Sections',
    'Cada sección ocupa pantalla completa',
    'landing',
    true,
    false,
    'NudeLanding16',
    ARRAY['fullscreen', 'sections', 'nude', 'scroll'],
    'nude',
    '/previews/nude-16.jpg'
  ),
  -- NUDE LANDING 17
  (
    'nude-landing-17',
    'Nude 17 - Brutalist Clean',
    'Brutalista minimalista con bordes fuertes',
    'landing',
    true,
    false,
    'NudeLanding17',
    ARRAY['brutalista', 'bold', 'nude', 'fuerte'],
    'nude',
    '/previews/nude-17.jpg'
  ),
  -- NUDE LANDING 18
  (
    'nude-landing-18',
    'Nude 18 - Organic Waves',
    'Formas onduladas con flow natural',
    'landing',
    true,
    false,
    'NudeLanding18',
    ARRAY['orgánico', 'waves', 'nude', 'flow'],
    'nude',
    '/previews/nude-18.jpg'
  ),
  -- NUDE LANDING 19
  (
    'nude-landing-19',
    'Nude 19 - Art Deco',
    'Elegancia geométrica Art Deco',
    'landing',
    true,
    false,
    'NudeLanding19',
    ARRAY['art-deco', 'elegante', 'nude', 'geométrico'],
    'nude',
    '/previews/nude-19.jpg'
  ),
  -- NUDE LANDING 20
  (
    'nude-landing-20',
    'Nude 20 - Future Minimal',
    'Futurista pero minimalista y limpio',
    'landing',
    true,
    false,
    'NudeLanding20',
    ARRAY['futurista', 'minimalista', 'nude', 'limpio'],
    'nude',
    '/previews/nude-20.jpg'
  )
ON CONFLICT DO NOTHING;

COMMENT ON TABLE public.pages IS 'Sistema de gestión de páginas - Ahora con 25 landing pages (5 originales + 20 nude collection)';

