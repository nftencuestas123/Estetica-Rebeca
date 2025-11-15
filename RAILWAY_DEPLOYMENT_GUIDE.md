# 🚂 GUÍA DE DEPLOYMENT EN RAILWAY

## ✅ PREREQUISITOS COMPLETADOS

- ✅ Código auditado y limpio
- ✅ Errores críticos eliminados
- ✅ Node 20.x configurado
- ✅ Rutas duplicadas removidas
- ✅ TypeScript sin errores
- ✅ Git actualizado

---

## 📋 PASO A PASO PARA DEPLOYMENT

### PASO 1: Configurar Variables de Entorno en Railway

1. Ve al **Dashboard de Railway**
2. Selecciona tu proyecto
3. Click en **Variables**
4. Agrega estas variables (OBLIGATORIAS):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ebaexyozjncxjixfqeff.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYWV4eW96am5jeGppeGZxZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NDUzMTAsImV4cCI6MjA3ODUyMTMxMH0.smZjXjI-pbS5hQgZSngHhqON09_IGs3nyVD7HvpfOQE
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

**Nota:** `${{RAILWAY_PUBLIC_DOMAIN}}` es una variable automática de Railway que se reemplaza con tu URL.

---

### PASO 2: Configurar Build Settings

En Railway Dashboard → Settings:

**Build Command:**
```bash
npm ci
```

**Start Command:**
```bash
npm start
```

**Root Directory:** 
```
/
```

**Node Version:** (Automático desde .node-version)
```
20.11.0
```

---

### PASO 3: Conectar Repositorio

1. **New Project** → **Deploy from GitHub repo**
2. Selecciona: `nftencuestas123/Estetica-Rebeca`
3. Branch: `main`
4. Railway detectará automáticamente que es un proyecto Next.js

---

### PASO 4: Monitorear el Build

Una vez que inicies el deploy:

1. Ve a **Deployments** en Railway
2. Click en el deployment activo
3. Ve a la pestaña **Build Logs**

#### ✅ Build Exitoso - Deberías Ver:

```bash
✓ Compiled successfully
✓ Static pages exported successfully
✓ Build completed successfully

Deployment URL: https://tu-app.up.railway.app
```

#### ❌ Si Falla - Verificar:

```bash
# Error de Node Version
Solución: Verificar que .node-version existe (20.11.0)

# Error de Variables de Entorno
Solución: Verificar que NEXT_PUBLIC_SUPABASE_* estén configuradas

# Error de Build
Solución: Verificar que package.json tenga "engines": { "node": "20.x" }
```

---

### PASO 5: Verificar Deployment

Una vez desplegado, verifica estas URLs:

```bash
https://tu-app.up.railway.app/                  → Landing page dinámica
https://tu-app.up.railway.app/admin-login       → Login admin
https://tu-app.up.railway.app/login             → Login cliente
https://tu-app.up.railway.app/api/health        → Healthcheck (debe devolver 200)
```

---

## 🔧 CONFIGURACIÓN AVANZADA

### Dominio Custom

1. Railway Dashboard → Settings → Domains
2. Click en **Generate Domain** (dominio gratuito de Railway)
3. O agrega tu **Custom Domain**

### Variables Opcionales (Features Avanzadas)

```bash
# AI Copywriting
OPENROUTER_API_KEY=sk-or-v1-tu-key

# Videos con IA
TOPVIEW_API_KEY=tu-key
TOPVIEW_API_URL=https://api.topview.ai/v4

# Redes Sociales
INSTAGRAM_APP_ID=tu-app-id
INSTAGRAM_APP_SECRET=tu-secret
FACEBOOK_APP_ID=tu-app-id
FACEBOOK_APP_SECRET=tu-secret
TIKTOK_CLIENT_KEY=tu-key
TIKTOK_CLIENT_SECRET=tu-secret
```

---

## 🐛 TROUBLESHOOTING

### Build Falla con "Cannot find module"

**Solución:**
```bash
1. Verificar que package-lock.json esté en Git
2. Railway Settings → Clear Cache → Redeploy
3. Verificar que todas las dependencias estén en package.json
```

### Build Falla con "EBADENGINE"

**Solución:**
```bash
1. Verificar que .node-version contenga: 20.11.0
2. Verificar que .nvmrc contenga: 20.11.0
3. Verificar package.json: "engines": { "node": "20.x" }
4. Redeploy
```

### App Se Despliega Pero Muestra Error 500

**Solución:**
```bash
1. Railway Dashboard → Deployments → Logs
2. Verificar variables de entorno:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Verificar que Supabase esté accesible
4. Verificar que las tablas existan en Supabase
```

### App Se Despliega Pero No Carga Estilos

**Solución:**
```bash
1. Verificar que NODE_ENV=production
2. Limpiar cache de Railway
3. Redeploy
```

---

## 📊 MONITOREO POST-DEPLOY

### Métricas a Vigilar

1. **Response Time:** Debe ser < 500ms
2. **Memory Usage:** Normal < 512MB
3. **CPU Usage:** Normal < 50%
4. **Error Rate:** Debe ser < 1%

### Logs Importantes

Railway Dashboard → Deployments → Logs:

```bash
# Errores de Conexión a Supabase
Error: fetch failed
Solución: Verificar SUPABASE_URL

# Errores de Autenticación
Error: Invalid JWT
Solución: Verificar SUPABASE_ANON_KEY

# Errores de Build
Module not found
Solución: Verificar imports en código
```

---

## 🎯 POST-DEPLOYMENT CHECKLIST

### Funcionalidad Básica
- [ ] Landing page carga (`/`)
- [ ] Login admin funciona (`/admin-login`)
- [ ] Login cliente funciona (`/login`)
- [ ] Registro funciona (`/register`)
- [ ] Healthcheck responde (`/api/health`)

### Autenticación
- [ ] Crear cuenta de prueba
- [ ] Login exitoso
- [ ] Redirecciones funcionan
- [ ] Logout funciona

### Admin Panel
- [ ] Acceso al admin panel (`/admin`)
- [ ] Gestor de páginas funciona
- [ ] Se pueden cambiar landing pages
- [ ] Dashboard admin carga

### Performance
- [ ] Lighthouse Score > 80
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 4s
- [ ] No errores en Console

---

## 🔐 SEGURIDAD

### Variables Sensibles

**✅ NUNCA** subas a Git:
- `.env.local`
- `.env`
- Archivos con keys o passwords

**✅ SIEMPRE** usa:
- Variables de entorno en Railway
- Secrets para keys sensibles
- HTTPS para todas las conexiones

### RLS (Row Level Security)

Verificar que esté habilitado en Supabase:

```sql
-- Verificar RLS
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Debe mostrar rowsecurity = true para todas las tablas
```

---

## 📞 CONTACTO Y SOPORTE

### Si Necesitas Ayuda

1. **Railway Discord:** https://discord.gg/railway
2. **Railway Docs:** https://docs.railway.app
3. **Supabase Docs:** https://supabase.com/docs
4. **Next.js Docs:** https://nextjs.org/docs

### Logs Útiles para Debugging

```bash
# Ver logs en tiempo real
railway logs

# Ver últimos 100 logs
railway logs --tail 100

# Ver logs de build
Railway Dashboard → Build Logs
```

---

## ✅ DEPLOYMENT COMPLETADO

Una vez que todos los checks pasen:

🎉 **¡Tu aplicación está en producción!**

**URL de Producción:**
```
https://tu-app.up.railway.app
```

**Próximos Pasos:**
1. Configurar dominio custom (opcional)
2. Configurar SSL (automático en Railway)
3. Configurar monitoring (Railway lo hace automático)
4. Crear cuenta admin en Supabase
5. Configurar landing page principal
6. Invitar usuarios de prueba

---

*Guía creada por tu ingeniero fullstack*
*Última actualización: 15 de Noviembre de 2025*
*Sistema listo para producción ✅*

