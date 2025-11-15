# 🚀 Railway Quick Start Guide

## ⚡ Acceso Rápido

**Tu aplicación está desplegada en Railway**

### 🔗 URLs Importantes:
- 🌐 **Tu App**: https://[tu-proyecto].railway.app
- 💚 **Health Check**: https://[tu-proyecto].railway.app/api/health
- 📊 **Dashboard**: https://railway.app/dashboard

---

## ✅ Verificación Inmediata (2 minutos)

### 1️⃣ Verificar Variables de Entorno

Ir a: **Railway Dashboard > Tu Proyecto > Variables**

**Copiar y pegar esto en "Raw Editor":**

```env
NEXT_PUBLIC_SUPABASE_URL=https://ebaexyozjncxjixfqeff.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYWV4eW96am5jeGppeGZxZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NDUzMTAsImV4cCI6MjA3ODUyMTMxMH0.smZjXjI-pbS5hQgZSngHhqON09_IGs3nyVD7HvpfOQE
NEXT_PUBLIC_OPENROUTER_API_KEY=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
NEXT_PUBLIC_SITE_URL=${{RAILWAY_PUBLIC_DOMAIN}}
NEXT_PUBLIC_COUNTRY=PY
NEXT_PUBLIC_CURRENCY=USD
NEXT_PUBLIC_TIMEZONE=America/Asuncion
NEXT_PUBLIC_LANGUAGE=es-PY
NEXT_PUBLIC_WHATSAPP=+595987123456
NEXT_PUBLIC_PHONE=+595212123456
NODE_ENV=production
```

**⚠️ NOTA**: `${{RAILWAY_PUBLIC_DOMAIN}}` se auto-completa con tu URL de Railway

### 2️⃣ Configurar Health Check

Ir a: **Railway Dashboard > Tu Proyecto > Settings > Health Check**

- **Path**: `/api/health`
- **Timeout**: 30 segundos

### 3️⃣ Verificar Auto-Deploy

Ir a: **Railway Dashboard > Tu Proyecto > Settings > Service**

- ✅ **Source**: GitHub - nftencuestas123/Estetica-Rebeca
- ✅ **Branch**: main
- ✅ **Auto Deploy**: ON

---

## 🧪 Probar Tu App (3 minutos)

### Checklist Rápido:

```bash
# 1. Abrir tu app
open https://[tu-proyecto].railway.app

# 2. Probar health check
curl https://[tu-proyecto].railway.app/api/health

# 3. Probar login
open https://[tu-proyecto].railway.app/login

# 4. Probar registro
open https://[tu-proyecto].railway.app/register
```

### Resultado Esperado:

✅ **Landing page** carga sin errores  
✅ **Health check** devuelve JSON con status "ok"  
✅ **Login** muestra formulario  
✅ **Imágenes** cargan correctamente  

---

## 📊 Monitoreo en Tiempo Real

### Ver Logs:

```bash
# Instalar Railway CLI (si no lo tienes)
npm install -g @railway/cli

# Login
railway login

# Link al proyecto
railway link

# Ver logs en tiempo real
railway logs --follow
```

### Dashboard Web:

Ir a: **Railway Dashboard > Tu Proyecto > Deployments**

- Ver status del último deployment
- Ver logs en tiempo real
- Ver métricas (CPU, RAM, Network)

---

## 🐛 Troubleshooting Rápido

### ❌ Error: "Application failed to respond"

**Solución:**
1. Verificar variables de entorno en Railway Dashboard
2. Ver logs: `railway logs`
3. Verificar que `NODE_ENV=production` esté configurado

### ❌ Error: "Build failed"

**Solución:**
1. Ver logs del build en Railway Dashboard
2. Verificar que `npm run build` funcione localmente:
   ```bash
   npm run build
   ```
3. Si funciona localmente, hacer push de nuevo:
   ```bash
   git push origin main --force
   ```

### ❌ Chat de Sofía no responde

**Solución:**
1. Verificar que `NEXT_PUBLIC_OPENROUTER_API_KEY` esté configurada
2. Verificar créditos en OpenRouter: https://openrouter.ai/
3. Probar endpoint directamente:
   ```bash
   curl -X POST https://[tu-proyecto].railway.app/api/sofia/chat \
     -H "Content-Type: application/json" \
     -d '{"mensaje":"Hola"}'
   ```

---

## 🚀 Deploy Manual (Si es necesario)

```bash
# Opción 1: Push a GitHub (auto-deploy)
git push origin main

# Opción 2: Railway CLI
railway up

# Opción 3: Railway Dashboard
# Click en "Deploy" button
```

---

## 📞 Soporte

- **Railway Docs**: https://docs.railway.app/
- **Railway Discord**: https://discord.gg/railway
- **Guía Completa**: Ver `RAILWAY_DEPLOYMENT.md`

---

## ⚡ Comandos de Un Clic

```bash
# Abrir app en navegador
railway open

# Ver logs
railway logs

# Ver status
railway status

# Redeploy
railway up

# Ver variables
railway variables
```

---

**✅ Tu app está lista en Railway!**

**Próximo paso**: Configurar dominio personalizado (opcional)  
**Documentación completa**: `RAILWAY_DEPLOYMENT.md`

---

*Última actualización: 14 de Noviembre, 2024*

