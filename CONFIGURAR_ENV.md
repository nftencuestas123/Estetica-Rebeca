# 🔧 CONFIGURACIÓN DE VARIABLES DE ENTORNO

## ⚠️ ERROR ACTUAL

```
Error: either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables 
or supabaseUrl and supabaseKey are required!
```

## 📋 SOLUCIÓN INMEDIATA

Necesitas crear un archivo `.env.local` en la raíz del proyecto con tus credenciales de Supabase.

### Paso 1: Obtener tus credenciales de Supabase

1. Ve a tu proyecto en **Supabase Dashboard**
2. Click en **Settings** (⚙️ icono de engranaje)
3. Click en **API**
4. Copia estos dos valores:
   - **Project URL** (ej: `https://xxxyyyzzz.supabase.co`)
   - **anon public** key (una key muy larga que empieza con `eyJ...`)

### Paso 2: Crear el archivo .env.local

Crea un archivo llamado `.env.local` en la **RAÍZ** del proyecto (mismo nivel que `package.json`) con este contenido:

```env
# =====================================================
# SUPABASE - OBLIGATORIO ✅
# =====================================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxyyyzzz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...tu-key-completa-aqui

# =====================================================
# OPENROUTER - Para AI Copywriting (Opcional, por ahora)
# =====================================================
# OPENROUTER_API_KEY=sk-or-v1-tu-key-aqui

# =====================================================
# TOPVIEW AVATAR 4 - Para Videos IA (Opcional, por ahora)
# =====================================================
# TOPVIEW_API_KEY=tu-topview-api-key
# TOPVIEW_API_URL=https://api.topview.ai/v4

# =====================================================
# PRODUCCIÓN
# =====================================================
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ IMPORTANTE:** 
- Reemplaza `https://xxxyyyzzz.supabase.co` con tu URL real
- Reemplaza `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` con tu anon key completa
- Las líneas que empiezan con `#` son comentarios y se pueden ignorar por ahora

### Paso 3: Reiniciar el servidor

Después de crear el archivo `.env.local`:

1. **Detén el servidor** (Ctrl+C en la terminal donde corre `npm run dev`)
2. **Vuelve a ejecutar:**
   ```bash
   npm run dev
   ```

### Paso 4: Verificar

Ve a `http://localhost:3000` y el error debería desaparecer.

---

## 🔒 Seguridad

- ✅ El archivo `.env.local` está en `.gitignore` (NO se sube a GitHub)
- ✅ Nunca compartas tu `NEXT_PUBLIC_SUPABASE_ANON_KEY` públicamente
- ✅ Nunca subas `.env.local` al repositorio

---

## 📂 Estructura de archivos

```
Estetica-Rebeca/
├── .env.local                 ← CREAR ESTE ARCHIVO AQUÍ
├── .gitignore
├── package.json
├── next.config.js
├── app/
├── components/
└── ...
```

---

## ❓ ¿Dónde está mi Supabase Dashboard?

1. Ve a https://supabase.com
2. Inicia sesión
3. Selecciona tu proyecto "Estetica Rebeca"
4. Ve a **Settings** → **API**

---

## 🆘 Si sigues teniendo problemas

Verifica que:
1. ✅ El archivo se llame exactamente `.env.local` (con el punto al inicio)
2. ✅ Esté en la raíz del proyecto (no dentro de carpetas)
3. ✅ No tenga espacios al inicio de las líneas
4. ✅ Las keys estén completas (sin cortar)
5. ✅ Reiniciaste el servidor después de crear el archivo

