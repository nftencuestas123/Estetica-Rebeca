# 🔧 SOLUCIÓN A LOS ERRORES ACTUALES

## 📋 ERRORES DETECTADOS:

### ❌ **ERROR 1: "Error al cargar la página principal"**
### ❌ **ERROR 2: "Failed to fetch" en Recuperar Contraseña**

---

## ✅ SOLUCIÓN 1: ACTIVAR PÁGINA PRINCIPAL

### **Problema:**
La página "Elegance Gold" está como root pero **desactivada** (`is_active = false`).

### **Solución (EJECUTAR EN SUPABASE):**

1. Ve a: https://supabase.com/dashboard/project/pcqllvejdjhvzrptxqia/sql/new
2. Copia y pega este código:

```sql
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
  template_key
FROM public.pages
WHERE is_root = true AND type = 'landing';
```

3. Click **"Run"** (▶️)
4. Deberías ver: `is_active = true` ✅
5. **Recarga** http://localhost:3000
6. **¡La página debería cargar ahora!** 🎉

---

## ✅ SOLUCIÓN 2: CONFIGURAR EMAIL EN SUPABASE

### **Problema:**
Supabase Auth no puede enviar emails porque no está configurado el SMTP.

### **2 OPCIONES:**

---

### **OPCIÓN A: Usar Email Provider de Supabase (GRATIS - RECOMENDADO)**

Supabase tiene servicio de email gratuito incluido:

1. Ve a: https://supabase.com/dashboard/project/pcqllvejdjhvzrptxqia/settings/auth
2. Scroll hasta **"SMTP Settings"**
3. Verifica que **"Enable Custom SMTP"** esté **OFF** (desactivado)
4. Supabase usará su servicio de email por defecto
5. **Listo, debería funcionar** ✅

**NOTA:** El email puede tardar 1-2 minutos y puede llegar a spam.

---

### **OPCIÓN B: Usar Gmail SMTP (SI QUERÉS TU PROPIO EMAIL)**

#### **Paso 1: Habilitar SMTP en Gmail**

1. Ve a tu Gmail
2. Click en tu foto → **"Gestionar tu cuenta de Google"**
3. Busca **"Seguridad"** → **"Verificación en 2 pasos"** (activarla si no está)
4. Luego busca **"Contraseñas de aplicaciones"**
5. Selecciona **"Correo"** y **"Otro (nombre personalizado)"**
6. Escribe: "Estetica Rebeca"
7. Click **"Generar"**
8. **Copia la contraseña** (16 caracteres, sin espacios)

#### **Paso 2: Configurar en Supabase**

1. Ve a: https://supabase.com/dashboard/project/pcqllvejdjhvzrptxqia/settings/auth
2. Scroll hasta **"SMTP Settings"**
3. Activa **"Enable Custom SMTP"**
4. Completa:
   ```
   Host: smtp.gmail.com
   Port: 587
   Username: tu-email@gmail.com
   Password: [la contraseña de 16 caracteres que copiaste]
   Sender email: tu-email@gmail.com
   Sender name: Rebeca Barreto Estética
   ```
5. Click **"Save"**
6. **Probar** enviando un email de recuperación

---

### **OPCIÓN C: DESACTIVAR RECUPERACIÓN DE CONTRASEÑA (TEMPORAL)**

Si no querés configurar email ahora, podés:

1. Ocultar el enlace "¿Olvidaste tu contraseña?"
2. Los usuarios se registran de nuevo si olvidan
3. O vos les reseteas la contraseña desde el panel admin de Supabase

Para ocultar el enlace, te aviso y lo hago.

---

## 🧪 VERIFICACIÓN RÁPIDA

### **Test 1: Página Principal**
1. Ejecutá el SQL de arriba
2. Ve a: http://localhost:3000
3. **Debería ver "Elegance Gold" landing page** ✅

### **Test 2: Reset Password**
1. Ve a: http://localhost:3000/reset-password
2. Ingresa: `encuestas977@gmail.com`
3. Click "Enviar"
4. Si configuraste SMTP:
   - ✅ Debería decir "Email Enviado"
   - ✅ Revisar inbox (puede estar en spam)
5. Si NO configuraste SMTP:
   - ❌ Seguirá diciendo "Failed to fetch"

---

## 📊 RESUMEN DE PASOS:

| Paso | Acción | Estado |
|------|--------|--------|
| 1 | Ejecutar SQL para activar landing | ⏳ **HACER AHORA** |
| 2 | Verificar http://localhost:3000 | ⏳ |
| 3 | Configurar SMTP en Supabase (Opción A o B) | ⏳ **OPCIONAL** |
| 4 | Probar reset password | ⏳ |

---

## 🎯 PRIORIDAD:

1. **URGENTE:** Ejecutar el SQL para activar la landing (1 minuto)
2. **IMPORTANTE:** Configurar email (5-10 minutos) o usar el de Supabase por defecto
3. **OPCIONAL:** Decidir si querés reset password o no

---

## 🔗 ENLACES RÁPIDOS:

- **Supabase SQL Editor:** https://supabase.com/dashboard/project/pcqllvejdjhvzrptxqia/sql/new
- **Supabase Auth Settings:** https://supabase.com/dashboard/project/pcqllvejdjhvzrptxqia/settings/auth
- **Gmail App Passwords:** https://myaccount.google.com/apppasswords
- **Página Local:** http://localhost:3000

---

## ❓ PREGUNTAS:

1. **¿Por qué falló la página?**
   - Porque insertamos las páginas como `is_active = false` para seguridad
   - Olvidamos activar la página root

2. **¿Por qué falla reset password?**
   - Supabase necesita configuración de email
   - No puede enviar emails sin SMTP configurado

3. **¿Qué hago primero?**
   - **Ejecutá el SQL** para activar la landing (30 segundos)
   - **Recarga la página** y debería funcionar
   - Email podés configurarlo después

---

**🚀 EJECUTÁ EL SQL AHORA Y AVISAME CUANDO FUNCIONE LA PÁGINA PRINCIPAL**

