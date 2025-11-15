# 🔐 CREAR ADMINISTRADOR AUTOMÁTICAMENTE

## 📋 INSTRUCCIONES PASO A PASO

### **PASO 1: Registrarte como usuario normal**

1. Ve a: http://localhost:3000/register
2. Completa el formulario:
   - **Nombre:** Tu nombre
   - **Email:** tu-email@ejemplo.com (usa tu email real)
   - **WhatsApp:** +595 987 123 456
   - **Contraseña:** tu-contraseña-segura
3. Click en **"Crear Cuenta"**
4. Serás redirigido a `/dashboard` como **cliente** (role: client)

---

### **PASO 2: Convertirte en administrador**

#### **OPCIÓN A: Usando tu email (MÁS FÁCIL)**

1. Ve a Supabase: https://supabase.com/dashboard/project/pcqllvejdjhvzrptxqia
2. Click en **"SQL Editor"** (menú izquierdo)
3. Copia y pega este código (REEMPLAZA el email):

```sql
UPDATE public.user_profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'TU-EMAIL@EJEMPLO.COM'
);

-- Verificar
SELECT 
  u.email,
  p.full_name,
  p.role
FROM auth.users u
JOIN public.user_profiles p ON u.id = p.id
WHERE p.role = 'admin';
```

4. Reemplaza `'TU-EMAIL@EJEMPLO.COM'` con tu email real
5. Click en **"Run"** (▶️)
6. Deberías ver tu usuario con `role = admin`

---

#### **OPCIÓN B: Convertir el primer usuario automáticamente**

Si acabás de registrarte y sos el único usuario:

```sql
UPDATE public.user_profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id 
  FROM public.user_profiles 
  ORDER BY created_at ASC 
  LIMIT 1
);

-- Verificar
SELECT u.email, p.full_name, p.role
FROM auth.users u
JOIN public.user_profiles p ON u.id = p.id
WHERE p.role = 'admin';
```

---

#### **OPCIÓN C: Usar la función (MÁS ELEGANTE)**

1. **Primero, crear la función** (solo una vez):

```sql
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id uuid;
BEGIN
  SELECT id INTO user_id FROM auth.users WHERE email = user_email;
  
  IF user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'message', 'Usuario no encontrado');
  END IF;
  
  UPDATE public.user_profiles SET role = 'admin' WHERE id = user_id;
  
  RETURN jsonb_build_object('success', true, 'message', 'Usuario promovido a admin', 'email', user_email);
END;
$$;
```

2. **Luego, usarla cuando quieras promover a alguien:**

```sql
SELECT public.promote_to_admin('tu-email@ejemplo.com');
```

---

### **PASO 3: Verificar que sos admin**

1. Cierra sesión en la aplicación
2. Ve a: http://localhost:3000/admin-login
3. Inicia sesión con tus credenciales
4. Deberías ver el **Panel de Administración** completo

---

## 🔍 COMANDOS ÚTILES

### **Ver todos los usuarios y sus roles:**

```sql
SELECT 
  u.email,
  p.full_name,
  p.role,
  p.phone,
  p.created_at
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.id
ORDER BY p.created_at DESC;
```

### **Ver cuántos admins hay:**

```sql
SELECT COUNT(*) as total_admins
FROM public.user_profiles
WHERE role = 'admin';
```

### **Degradar un admin a cliente:**

```sql
UPDATE public.user_profiles 
SET role = 'client' 
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'email@ejemplo.com'
);
```

---

## 🎯 RESUMEN RÁPIDO

**Para el primer admin (TÚ):**

1. Registrate en `/register`
2. Ve a Supabase SQL Editor
3. Ejecuta:
   ```sql
   UPDATE public.user_profiles 
   SET role = 'admin' 
   WHERE id = (SELECT id FROM auth.users WHERE email = 'TU-EMAIL@EJEMPLO.COM');
   ```
4. Cierra sesión y entra a `/admin-login`

**¡LISTO! Ahora sos administrador. 🎉**

---

## 📂 ARCHIVO SQL COMPLETO

Todo el código SQL está en:
```
supabase/migrations/CREAR_ADMIN_AUTOMATICO.sql
```

Podés abrir ese archivo y copiar cualquier opción que necesites.

---

## ⚠️ IMPORTANTE

- **Nunca hagas pública** la función de crear admins en una API
- **Solo usá estos comandos** desde el SQL Editor de Supabase
- **El primer admin** (vos) debe crearse manualmente por seguridad
- **Después**, podés usar la función `promote_to_admin()` para crear más admins

---

**¿TODO CLARO? ¡Avisame cuando hayas creado tu cuenta de admin!** 🚀

