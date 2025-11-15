-- =====================================================
-- FIX: ACTIVAR PÁGINA PRINCIPAL
-- Activa "Elegance Gold" para que se muestre en /
-- =====================================================

-- Activar la página root (Elegance Gold)
UPDATE public.pages 
SET is_active = true 
WHERE is_root = true AND type = 'landing';

-- Verificar que funcionó
SELECT 
  name,
  display_name,
  is_active,
  is_root,
  template_key,
  '✅ Página activada correctamente' as status
FROM public.pages
WHERE is_root = true AND type = 'landing';

-- Ver todas las landing pages y su estado
SELECT 
  display_name,
  is_active,
  is_root,
  views,
  created_at
FROM public.pages
WHERE type = 'landing'
ORDER BY is_root DESC, display_name ASC;

