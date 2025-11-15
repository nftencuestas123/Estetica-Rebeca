# 🔧 ARREGLAR AUTENTICACIÓN - EJECUTAR AHORA

## ⚠️ PROBLEMA DETECTADO

**Error:** "infinite recursion detected in policy for relation user_profiles"

**Causa:** Las políticas RLS (Row Level Security) están mal configuradas y causan recursión infinita.

---

## ✅ SOLUCIÓN (SIGUE ESTOS PASOS)

### PASO 1: Ir a Supabase

1. Abre tu navegador
2. Ve a: **https://supabase.com/dashboard/project/ebaexyozjncxjixfqeff**
3. Inicia sesión si es necesario

### PASO 2: Abrir SQL Editor

1. En el menú lateral izquierdo, click en **"SQL Editor"**
2. Click en **"New query"** (botón azul)

### PASO 3: Copiar y Pegar ESTE SQL (NUEVO - ARREGLA TODO)

**⚠️ USA ESTE CÓDIGO ACTUALIZADO:**

Copia TODO el contenido del archivo `FIX_RLS_FINAL.sql` y pégalo en el editor SQL.

O copia directamente este código completo:

```sql
-- =====================================================
-- FIX COMPLETO - ELIMINA TODO Y RECREA LIMPIO
-- =====================================================

-- PASO 1: ELIMINAR TODAS LAS POLÍTICAS EXISTENTES
DO $$ 
DECLARE 
    pol record;
BEGIN
    -- Eliminar user_profiles
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_profiles'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.user_profiles', pol.policyname);
    END LOOP;

    -- Eliminar user_credits
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_credits'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.user_credits', pol.policyname);
    END LOOP;

    -- Eliminar videos
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'videos'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.videos', pol.policyname);
    END LOOP;

    -- Eliminar copy_templates
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'copy_templates'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.copy_templates', pol.policyname);
    END LOOP;

    RAISE NOTICE '✅ Políticas antiguas eliminadas';
END $$;

-- PASO 2: CREAR POLÍTICAS NUEVAS (SIN RECURSIÓN)

-- user_profiles
CREATE POLICY "Users can view own profile" 
  ON public.user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Service role full access" 
  ON public.user_profiles FOR ALL 
  USING (auth.role() = 'service_role');

-- user_credits
CREATE POLICY "Users view own credits" 
  ON public.user_credits FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full credits" 
  ON public.user_credits FOR ALL 
  USING (auth.role() = 'service_role');

-- videos
CREATE POLICY "Users manage own videos" 
  ON public.videos FOR ALL 
  USING (auth.uid() = user_id);

-- copy_templates
CREATE POLICY "Users manage own templates" 
  ON public.copy_templates FOR ALL 
  USING (auth.uid() = user_id);

-- CONFIRMACIÓN
SELECT '🎉 ¡POLÍTICAS RLS ARREGLADAS!' as resultado;
```

### PASO 4: Ejecutar

1. Click en el botón **"Run"** (o presiona `Ctrl+Enter`)
2. Deberías ver: **"Success. No rows returned"**
3. Al final debe decir: **"✅ Políticas RLS arregladas correctamente"**

---

## ✅ VERIFICACIÓN

Una vez ejecutado el SQL, vuelve aquí y:

1. Abre tu navegador: **http://localhost:3000/register**
2. Intenta registrarte con:
   - **Nombre:** Tu Nombre
   - **Email:** tu@email.com
   - **WhatsApp:** +595 987 123 456
   - **Contraseña:** test123
   - **Confirmar:** test123
3. Click en **"Crear Cuenta"**

Si todo está bien, deberías:
- ✅ Ver mensaje de éxito
- ✅ Ser redirigido a `/dashboard`
- ✅ No ver errores en la consola

---

## 🔍 SI HAY ERRORES

Si después de ejecutar el SQL sigues teniendo problemas:

1. En Supabase, ve a **Table Editor**
2. Verifica que existan estas tablas:
   - `user_profiles`
   - `user_credits`
   - `pages`
   - `videos`
   - `copy_templates`

3. Si falta alguna tabla, ve a SQL Editor y ejecuta:
   `supabase/migrations/SQL_LIMPIO_EJECUTAR.sql`

---

## 📞 DAME FEEDBACK

Después de ejecutar el SQL, avisame:
- ✅ Si funcionó perfecto
- ❌ Si todavía hay errores (con captura de pantalla)

---

**Tu servidor está corriendo en:** http://localhost:3000

**Ejecutá el SQL y probá el registro** 🚀

