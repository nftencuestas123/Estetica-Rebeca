# 🚂 CONFIGURACIÓN RAILWAY + SUPABASE

## 📋 PROBLEMA ACTUAL:
- ✅ **Localhost funciona** (http://localhost:3000)
- ❌ **Railway da "Failed to fetch"** en reset password
- **Causa:** Supabase no tiene configurada la URL de Railway

---

## ✅ SOLUCIÓN COMPLETA

### **PASO 1: CONFIGURAR URLs EN SUPABASE**

1. **Ve a Supabase Auth Configuration:**
   https://supabase.com/dashboard/project/pcqllvejdjhvzrptxqia/settings/auth

2. **Scroll hasta "Site URL"**

3. **Cambiar "Site URL" a tu URL de Railway:**
   ```
   https://tu-app.railway.app
   ```
   (Reemplaza con tu URL real de Railway)

4. **Scroll hasta "Redirect URLs"**

5. **Agregar TODAS estas URLs** (una por línea):
   ```
   http://localhost:3000/**
   https://tu-app.railway.app/**
   https://tu-app.railway.app/update-password
   https://tu-app.railway.app/auth/callback
   ```

6. **Click "Save"**

---

### **PASO 2: CONFIGURAR VARIABLES EN RAILWAY**

1. **Ve a Railway Dashboard:**
   https://railway.app/dashboard

2. **Selecciona tu proyecto**

3. **Click en "Variables"**

4. **Agregar/Verificar estas variables:**

```bash
# SUPABASE (OBLIGATORIO)
NEXT_PUBLIC_SUPABASE_URL=https://pcqllvejdjhvzrptxqia.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcWxsdmVqZGpodnpycHR4cWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNzA3NjksImV4cCI6MjA3ODc0Njc2OX0.3ADT1so46XbaT6KtSPZdBnhxgHeEk8Nt4tsoEWraAGw

# SITE URL (IMPORTANTE)
NEXT_PUBLIC_SITE_URL=https://tu-app.railway.app

# NODE ENVIRONMENT
NODE_ENV=production
```

5. **Reemplazar `tu-app.railway.app` con tu URL real de Railway**

6. **Click "Save"** (Railway redeploy automáticamente)

---

### **PASO 3: OBTENER TU URL DE RAILWAY**

Si no sabés cuál es tu URL de Railway:

1. Ve a Railway Dashboard
2. Click en tu proyecto
3. Click en la pestaña **"Settings"**
4. Mira en **"Domains"**
5. Copia la URL que termina en `.railway.app`

**Ejemplo:**
```
https://estetica-rebeca-production.up.railway.app
```

---

## 🔧 CONFIGURACIÓN COMPLETA SUPABASE

### **URLs que DEBEN estar configuradas:**

#### **Site URL (Principal):**
```
https://tu-app.railway.app
```

#### **Redirect URLs (Agregar todas):**
```
http://localhost:3000/**
https://tu-app.railway.app/**
https://tu-app.railway.app/update-password
https://tu-app.railway.app/auth/callback
https://tu-app.railway.app/reset-password
```

**NOTA:** El `**` al final permite todas las sub-rutas.

---

## 🧪 VERIFICACIÓN

### **Test 1: Reset Password en Railway**

1. Ve a: `https://tu-app.railway.app/reset-password`
2. Ingresa tu email
3. Click "Enviar"
4. **Resultado esperado:**
   - ✅ Mensaje: "Email Enviado"
   - ✅ Email llega a tu inbox (revisar spam)
   - ✅ Al hacer click en el link del email, te redirige a Railway

### **Test 2: Registro en Railway**

1. Ve a: `https://tu-app.railway.app/register`
2. Registra una cuenta
3. **Resultado esperado:**
   - ✅ Te redirige a `/dashboard`
   - ✅ No hay errores de CORS
   - ✅ Usuario creado en Supabase

---

## ❌ ERRORES COMUNES

### **Error: "Invalid Redirect URL"**

**Causa:** La URL no está en la lista de Redirect URLs de Supabase

**Solución:** Agregar la URL exacta en Supabase → Auth → Redirect URLs

---

### **Error: "Failed to fetch"**

**Causa 1:** SMTP no configurado en Supabase

**Solución:** Configurar SMTP o usar el email de Supabase (ver `SOLUCIONAR_ERRORES.md`)

**Causa 2:** URL incorrecta en Railway

**Solución:** Verificar que `NEXT_PUBLIC_SITE_URL` coincida con la URL real de Railway

---

### **Error: "CORS policy"**

**Causa:** La URL de Railway no está en Site URL de Supabase

**Solución:** 
1. Supabase → Auth → Site URL
2. Cambiar a la URL de Railway
3. Agregar también en Redirect URLs

---

## 📝 CHECKLIST COMPLETO

| Paso | Acción | Estado |
|------|--------|--------|
| 1 | Obtener URL de Railway | ⏳ |
| 2 | Configurar Site URL en Supabase | ⏳ |
| 3 | Agregar Redirect URLs en Supabase | ⏳ |
| 4 | Configurar variables en Railway | ⏳ |
| 5 | Esperar redeploy de Railway (2-3 min) | ⏳ |
| 6 | Probar reset password en producción | ⏳ |
| 7 | Probar registro en producción | ⏳ |

---

## 🔗 ENLACES RÁPIDOS

- **Supabase Auth Config:** https://supabase.com/dashboard/project/pcqllvejdjhvzrptxqia/settings/auth
- **Railway Dashboard:** https://railway.app/dashboard
- **Documentación Supabase Auth:** https://supabase.com/docs/guides/auth/redirect-urls

---

## 💡 TIPS IMPORTANTES

1. **Siempre agregar `localhost`** en Redirect URLs para desarrollo
2. **Usar `/**` al final** para permitir todas las sub-rutas
3. **Esperar 2-3 minutos** después de cambios en Railway para que se apliquen
4. **Revisar spam** si no llega el email de reset password
5. **Site URL es singular**, solo una URL principal (Railway)
6. **Redirect URLs son múltiples**, agregar todas las necesarias

---

## 🚀 DESPUÉS DE CONFIGURAR

Una vez que todo esté configurado:

1. ✅ Reset password funcionará en Railway
2. ✅ Registro funcionará en Railway  
3. ✅ Login funcionará en Railway
4. ✅ No habrá errores de CORS
5. ✅ Los emails de recuperación llegarán correctamente

---

## ❓ PREGUNTAS FRECUENTES

**P: ¿Puedo tener localhost Y Railway al mismo tiempo?**
R: ✅ SÍ. Site URL apunta a Railway, pero Redirect URLs incluye ambos.

**P: ¿Qué pasa si cambio la URL de Railway?**
R: Debes actualizar Site URL y Redirect URLs en Supabase.

**P: ¿Cuánto tarda en aplicarse?**
R: Cambios en Supabase son instantáneos. Railway tarda 2-3 minutos en redeploy.

**P: ¿Necesito configurar SMTP?**
R: No es obligatorio, Supabase tiene email por defecto (puede llegar a spam).

---

**🎯 PASOS SIGUIENTES:**

1. **AHORA:** Obtener tu URL de Railway
2. **LUEGO:** Configurar Supabase con esa URL
3. **DESPUÉS:** Configurar variables en Railway
4. **FINALMENTE:** Probar en producción

---

**¿Cuál es tu URL de Railway? Con eso configuro todo.**

