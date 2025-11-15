-- =====================================================
-- SCRIPT: CONVERTIR USUARIO EN ADMINISTRADOR
-- Ejecutar en Supabase SQL Editor después de registrarte
-- =====================================================

-- OPCIÓN 1: Convertir usuario específico por EMAIL
-- ⚠️ REEMPLAZA 'tu-email@ejemplo.com' con tu email real

UPDATE public.user_profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'tu-email@ejemplo.com'
);

-- Verificar que funcionó
SELECT 
  u.email,
  p.full_name,
  p.role,
  p.created_at
FROM auth.users u
JOIN public.user_profiles p ON u.id = p.id
WHERE p.role = 'admin';


-- =====================================================
-- OPCIÓN 2: Función para promover a admin (más elegante)
-- =====================================================

-- Crear función para promover a admin
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id uuid;
  result jsonb;
BEGIN
  -- Buscar el usuario por email
  SELECT id INTO user_id
  FROM auth.users
  WHERE email = user_email;

  -- Si no existe, retornar error
  IF user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Usuario no encontrado con email: ' || user_email
    );
  END IF;

  -- Actualizar el rol a admin
  UPDATE public.user_profiles
  SET role = 'admin'
  WHERE id = user_id;

  -- Retornar éxito
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Usuario promovido a administrador',
    'user_id', user_id,
    'email', user_email
  );
END;
$$;

-- =====================================================
-- CÓMO USAR LA FUNCIÓN:
-- =====================================================

-- Ejemplo: Promover usuario a admin
-- SELECT public.promote_to_admin('tu-email@ejemplo.com');


-- =====================================================
-- OPCIÓN 3: Ver todos los usuarios y sus roles
-- =====================================================

SELECT 
  u.id,
  u.email,
  p.full_name,
  p.role,
  p.phone,
  p.created_at
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
ORDER BY p.created_at DESC;


-- =====================================================
-- OPCIÓN 4: Convertir el PRIMER usuario registrado en admin
-- (Útil si acabás de registrarte)
-- =====================================================

UPDATE public.user_profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id 
  FROM public.user_profiles 
  ORDER BY created_at ASC 
  LIMIT 1
);

-- Verificar
SELECT 
  u.email,
  p.full_name,
  p.role,
  'Primer usuario convertido a admin' as status
FROM auth.users u
JOIN public.user_profiles p ON u.id = p.id
WHERE p.role = 'admin';


-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

SELECT 
  '✅ Total de administradores:' as info,
  COUNT(*) as cantidad
FROM public.user_profiles
WHERE role = 'admin';

