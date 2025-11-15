# ⚡ CONFIGURACIÓN RÁPIDA RAILWAY

## 🎯 PROBLEMA: "Failed to fetch" en Railway

**Causa:** Supabase no tiene configurada tu URL de Railway.

---

## ✅ SOLUCIÓN EN 3 PASOS (5 MINUTOS)

### **PASO 1: ¿CUÁL ES TU URL DE RAILWAY?**

Abrí Railway y buscá tu URL. Será algo como:

```
https://estetica-rebeca-production.up.railway.app
```

**👆 Copiá esa URL completa.**

---

### **PASO 2: CONFIGURAR SUPABASE**

1. **Abrí este link:**
   https://supabase.com/dashboard/project/pcqllvejdjhvzrptxqia/settings/auth

2. **Cambiar "Site URL":**
   - Busca el campo **"Site URL"**
   - Pega tu URL de Railway (la que copiaste arriba)
   - Ejemplo: `https://tu-app.railway.app`

3. **Agregar "Redirect URLs":**
   - Busca el campo **"Redirect URLs"**
   - Borra todo lo que hay
   - Pega esto (REEMPLAZANDO `tu-app.railway.app` con tu URL real):

```
http://localhost:3000/**
https://tu-app.railway.app/**
https://tu-app.railway.app/update-password
https://tu-app.railway.app/auth/callback
```

4. **Click "Save"**

---

### **PASO 3: CONFIGURAR RAILWAY**

1. **Abrí Railway Dashboard:**
   https://railway.app/dashboard

2. **Click en tu proyecto → Variables**

3. **Agregar/Actualizar estas variables:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://pcqllvejdjhvzrptxqia.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcWxsdmVqZGpodnpycHR4cWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNzA3NjksImV4cCI6MjA3ODc0Njc2OX0.3ADT1so46XbaT6KtSPZdBnhxgHeEk8Nt4tsoEWraAGw
NEXT_PUBLIC_SITE_URL=https://tu-app.railway.app
NODE_ENV=production
```

**⚠️ IMPORTANTE:** Reemplazar `tu-app.railway.app` con tu URL real.

4. **Click "Save"** (Railway redeploy automáticamente, espera 2-3 min)

---

## 🧪 PROBAR

1. Ve a: `https://tu-app.railway.app/reset-password`
2. Ingresa tu email
3. Click "Enviar"
4. **Debería decir: "Email Enviado"** ✅

---

## 📋 EJEMPLO COMPLETO

Si tu URL de Railway es:
```
https://estetica-rebeca-prod.up.railway.app
```

**Entonces en Supabase:**

**Site URL:**
```
https://estetica-rebeca-prod.up.railway.app
```

**Redirect URLs:**
```
http://localhost:3000/**
https://estetica-rebeca-prod.up.railway.app/**
https://estetica-rebeca-prod.up.railway.app/update-password
https://estetica-rebeca-prod.up.railway.app/auth/callback
```

**En Railway Variables:**
```bash
NEXT_PUBLIC_SITE_URL=https://estetica-rebeca-prod.up.railway.app
```

---

## ✅ LISTO

Después de 2-3 minutos (tiempo de redeploy), Railway funcionará perfectamente:

- ✅ Reset password
- ✅ Registro
- ✅ Login
- ✅ No más "Failed to fetch"

---

**🎯 ¿Cuál es tu URL de Railway? Pasámela y te doy la configuración exacta copy-paste lista.**

