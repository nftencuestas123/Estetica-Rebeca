# 🚨 SOLUCIÓN COMPLETA - COPIAR Y PEGAR

## ⚠️ PROBLEMA ACTUAL
```
Error: either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY 
env variables or supabaseUrl and supabaseKey are required!
```

**La página está completamente caída porque faltan las variables de entorno.**

---

## 📋 PASO 1: OBTENER TUS CREDENCIALES DE SUPABASE

### Instrucciones:

1. Ve a: **https://supabase.com**
2. Inicia sesión
3. Selecciona tu proyecto **"Estetica Rebeca"** (o como se llame)
4. En el menú lateral, click en **⚙️ Settings**
5. Click en **API**
6. Vas a ver dos valores importantes:

   **a) Project URL**
   ```
   Ejemplo: https://abcdefghijk.supabase.co
   ```
   
   **b) Project API keys → anon public**
   ```
   Ejemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJl...
   (es una key MUY larga, debe empezar con "eyJ")
   ```

7. **COPIA ESTOS DOS VALORES** (los vas a necesitar en el siguiente paso)

---

## 📋 PASO 2: CREAR EL ARCHIVO .env.local

### Ubicación del archivo:
```
Estetica-Rebeca/
├── .env.local          ← CREAR ESTE ARCHIVO AQUÍ (en la RAÍZ)
├── .gitignore
├── package.json
├── next.config.js
├── app/
├── components/
└── ...
```

### Contenido del archivo .env.local:

**⚠️ IMPORTANTE:** Reemplaza los valores de ejemplo con TUS valores reales de Supabase.

```env
# =====================================================
# SUPABASE - OBLIGATORIO ✅
# =====================================================

# REEMPLAZA ESTO con tu Project URL de Supabase:
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co

# REEMPLAZA ESTO con tu anon public key de Supabase:
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0NzYyMjAsImV4cCI6MjAwNDAzMjIyMH0.tu-key-completa-aqui

# =====================================================
# CONFIGURACIÓN BÁSICA
# =====================================================
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# =====================================================
# OPCIONALES (por ahora déjalos comentados)
# =====================================================
# OPENROUTER_API_KEY=
# TOPVIEW_API_KEY=
# TOPVIEW_API_URL=https://api.topview.ai/v4
```

---

## 📋 PASO 3: CÓMO CREAR EL ARCHIVO .env.local

### Opción A: Desde el Explorador de Windows

1. Abre el **Explorador de Archivos**
2. Navega a la carpeta del proyecto: `C:\Users\nften\OneDrive\Escritorio\Estetica-Rebeca`
3. Click derecho → **Nuevo** → **Documento de texto**
4. Nómbralo **exactamente** como: `.env.local` (CON el punto al inicio)
5. Si Windows no te deja poner el punto, nómbralo `env.local` y luego en PowerShell ejecuta:
   ```powershell
   cd "C:\Users\nften\OneDrive\Escritorio\Estetica-Rebeca"
   Rename-Item -Path "env.local" -NewName ".env.local"
   ```
6. Abre el archivo `.env.local` con **Notepad** o **Visual Studio Code**
7. **COPIA Y PEGA** el contenido del PASO 2 (el bloque de código de arriba)
8. **REEMPLAZA** los valores de ejemplo con TUS valores reales de Supabase
9. **GUARDA** el archivo (Ctrl+S)

### Opción B: Desde PowerShell (MÁS RÁPIDO)

1. Abre **PowerShell**
2. Ejecuta estos comandos:

```powershell
cd "C:\Users\nften\OneDrive\Escritorio\Estetica-Rebeca"

@"
# =====================================================
# SUPABASE - OBLIGATORIO
# =====================================================

# REEMPLAZA ESTO con tu Project URL:
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO-AQUI.supabase.co

# REEMPLAZA ESTO con tu anon public key:
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU-KEY-COMPLETA-AQUI

# =====================================================
# CONFIGURACIÓN BÁSICA
# =====================================================
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
```

3. **LUEGO**, abre el archivo `.env.local` con un editor
4. **REEMPLAZA** `TU-PROYECTO-AQUI` y `TU-KEY-COMPLETA-AQUI` con tus valores reales
5. **GUARDA** el archivo

---

## 📋 PASO 4: REINICIAR EL SERVIDOR

1. En la terminal donde corre `npm run dev`, presiona **Ctrl+C** para detenerlo
2. Ejecuta de nuevo:
   ```bash
   npm run dev
   ```

3. Espera a que compile (debe decir "Ready in X seconds")
4. Ve a **http://localhost:3000**

---

## 📋 PASO 5: VERIFICAR QUE FUNCIONE

### ✅ Si funciona correctamente:
- La página debe cargar sin el error de variables de entorno
- Debe mostrar la landing page configurada
- No debe haber errores rojos en la consola del navegador (F12)

### ❌ Si sigue fallando:

**Verifica estos puntos:**

1. **El archivo se llama EXACTAMENTE `.env.local`** (con el punto)
   ```powershell
   # Verificar en PowerShell:
   cd "C:\Users\nften\OneDrive\Escritorio\Estetica-Rebeca"
   ls .env.local
   # Debe mostrar el archivo
   ```

2. **El archivo está en la RAÍZ del proyecto** (no dentro de carpetas)
   ```
   ✅ CORRECTO: Estetica-Rebeca/.env.local
   ❌ INCORRECTO: Estetica-Rebeca/app/.env.local
   ❌ INCORRECTO: Estetica-Rebeca/supabase/.env.local
   ```

3. **Las credenciales son correctas**
   - La URL debe terminar en `.supabase.co`
   - La key debe empezar con `eyJ`
   - La key debe ser MUY larga (más de 200 caracteres)

4. **No hay espacios antes de las líneas**
   ```env
   ✅ CORRECTO:
   NEXT_PUBLIC_SUPABASE_URL=https://...
   
   ❌ INCORRECTO:
     NEXT_PUBLIC_SUPABASE_URL=https://...
   ```

5. **Reiniciaste el servidor DESPUÉS de crear el archivo**
   - Node.js solo lee `.env.local` al iniciar
   - Debes detener (Ctrl+C) y reiniciar (`npm run dev`)

---

## 📋 PASO 6 (OPCIONAL): EJECUTAR EL SQL EN SUPABASE

Si ya creaste el `.env.local` y el servidor funciona, ejecuta este SQL para crear las tablas faltantes:

1. Ve a **Supabase Dashboard** → **SQL Editor**
2. Click en **"New Query"**
3. **COPIA Y PEGA** el siguiente SQL completo:

```sql
-- =====================================================
-- SQL SEGURO - Solo crea lo que falta
-- =====================================================

-- Verificar si el tipo user_role existe, si no, crearlo
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'client');
  END IF;
END $$;

-- Crear tabla videos si no existe
CREATE TABLE IF NOT EXISTS public.videos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
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

-- Crear tabla copy_templates si no existe
CREATE TABLE IF NOT EXISTS public.copy_templates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  template_name text NOT NULL,
  template_text text NOT NULL,
  platform text,
  category text,
  times_used integer DEFAULT 0,
  avg_engagement numeric(5,2),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON public.videos(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON public.videos(status);
CREATE INDEX IF NOT EXISTS idx_copy_templates_user_id ON public.copy_templates(user_id);

-- Habilitar RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_templates ENABLE ROW LEVEL SECURITY;

-- Políticas para videos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'videos' 
    AND policyname = 'Users view own videos'
  ) THEN
    CREATE POLICY "Users view own videos" 
    ON public.videos FOR ALL 
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Políticas para copy_templates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'copy_templates' 
    AND policyname = 'Users manage own copy templates'
  ) THEN
    CREATE POLICY "Users manage own copy templates" 
    ON public.copy_templates FOR ALL 
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Verificación final
SELECT 'videos' as tabla, COUNT(*) as registros FROM public.videos
UNION ALL
SELECT 'copy_templates', COUNT(*) FROM public.copy_templates;
```

4. Click en **"Run"** (o presiona Ctrl+Enter)
5. Debe ejecutarse sin errores

---

## 🎯 RESUMEN RÁPIDO

### Para que la página funcione AHORA mismo:

1. ✅ **Crear `.env.local` en la raíz del proyecto**
2. ✅ **Pegar el contenido con tus credenciales de Supabase**
3. ✅ **Guardar el archivo**
4. ✅ **Reiniciar el servidor** (Ctrl+C y luego `npm run dev`)
5. ✅ **Verificar que cargue en `localhost:3000`**

### Orden de prioridad:

1. **PRIMERO:** .env.local (sin esto, NADA funciona)
2. **SEGUNDO:** Reiniciar servidor
3. **TERCERO:** SQL en Supabase (para funcionalidades avanzadas)

---

## 🆘 SI SIGUE SIN FUNCIONAR

Ejecuta estos comandos en PowerShell y muéstrame la salida:

```powershell
cd "C:\Users\nften\OneDrive\Escritorio\Estetica-Rebeca"

# Verificar que el archivo existe
Get-Content .env.local

# Verificar que el servidor puede leerlo
npm run dev
```

**Muéstrame el error exacto que aparece** y te ayudo específicamente con ese problema.

---

## ✅ CHECKLIST FINAL

Marca cada ítem cuando lo completes:

- [ ] Obtuve mi **Project URL** de Supabase Dashboard
- [ ] Obtuve mi **anon public key** de Supabase Dashboard
- [ ] Creé el archivo `.env.local` en la **RAÍZ** del proyecto
- [ ] Pegué el contenido y **REEMPLACÉ** los valores de ejemplo
- [ ] Guardé el archivo `.env.local`
- [ ] **Reinicié** el servidor con `npm run dev`
- [ ] La página carga en `localhost:3000` sin errores
- [ ] (Opcional) Ejecuté el SQL en Supabase para crear tablas faltantes

---

**¿En qué paso estás trabado? Decime y te ayudo específicamente.** 🚀

