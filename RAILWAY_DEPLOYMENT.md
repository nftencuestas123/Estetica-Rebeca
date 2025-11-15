# 🚂 Deployment en Railway - Rebeca Barreto Estética

## 📊 Estado Actual

✅ Aplicación desplegada en Railway  
🔗 URL: [Tu URL de Railway]  
📦 Branch: `main`  
🏗️ Builder: Nixpacks (auto-detected)

---

## 🔧 Configuración de Variables de Entorno en Railway

**⚠️ IMPORTANTE**: Asegúrate de tener todas estas variables configuradas en Railway Dashboard:

### Variables Obligatorias:

```bash
# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://ebaexyozjncxjixfqeff.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYWV4eW96am5jeGppeGZxZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NDUzMTAsImV4cCI6MjA3ODUyMTMxMH0.smZjXjI-pbS5hQgZSngHhqON09_IGs3nyVD7HvpfOQE

# OPENROUTER (IA)
NEXT_PUBLIC_OPENROUTER_API_KEY=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

# SITE CONFIGURATION
NEXT_PUBLIC_SITE_URL=https://tu-app.railway.app
NEXT_PUBLIC_SITE_NAME=Rebeca Barreto Estética y Belleza

# REGIONAL (PARAGUAY)
NEXT_PUBLIC_COUNTRY=PY
NEXT_PUBLIC_CURRENCY=USD
NEXT_PUBLIC_TIMEZONE=America/Asuncion
NEXT_PUBLIC_LANGUAGE=es-PY
NEXT_PUBLIC_WHATSAPP=+595987123456
NEXT_PUBLIC_PHONE=+595212123456

# NODE ENVIRONMENT
NODE_ENV=production
```

---

## 📝 Cómo Agregar Variables de Entorno en Railway

### Método 1: Dashboard Web
1. Ir a https://railway.app/dashboard
2. Seleccionar tu proyecto "Estetica-Rebeca"
3. Click en la pestaña "Variables"
4. Click en "Raw Editor"
5. Pegar todas las variables
6. Click en "Deploy" para aplicar cambios

### Método 2: Railway CLI
```bash
# Instalar CLI
npm install -g @railway/cli

# Login
railway login

# Link al proyecto
railway link

# Agregar variables
railway variables set NEXT_PUBLIC_SUPABASE_URL="https://ebaexyozjncxjixfqeff.supabase.co"
railway variables set NEXT_PUBLIC_OPENROUTER_API_KEY="sk-or-v1-bff..."
# ... (todas las demás)

# Ver variables actuales
railway variables
```

---

## 🚀 Comandos Útiles

### Deploy Manual
```bash
# Hacer push a GitHub (auto-deploy activado)
git push origin main

# O usar Railway CLI
railway up
```

### Ver Logs en Tiempo Real
```bash
railway logs
```

### Ver Estado del Deployment
```bash
railway status
```

### Abrir App en el Navegador
```bash
railway open
```

---

## 📊 Configuración del Proyecto en Railway

### Build Settings (Recomendados)
- **Builder**: Nixpacks (auto-detected)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18.x
- **Install Command**: `npm ci`

### Deploy Settings
- **Branch**: `main`
- **Auto Deploy**: ✅ Activado
- **Health Check Path**: `/` (opcional)
- **Restart Policy**: On Failure (10 retries)

---

## 🔍 Verificación Post-Deployment

### Checklist:
- [ ] Variables de entorno configuradas
- [ ] Build exitoso sin errores
- [ ] App accesible desde la URL de Railway
- [ ] Chat de Sofía funciona (probar IA)
- [ ] Login/Register funciona
- [ ] Dashboard carga correctamente
- [ ] Imágenes se cargan correctamente
- [ ] No hay errores en los logs

### Comandos de Verificación:
```bash
# Ver logs recientes
railway logs --tail 100

# Ver estado del servicio
railway status

# Abrir app en navegador
railway open
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'next'"
**Solución**: Asegúrate de que `next` esté en `dependencies` (no en `devDependencies`)

```bash
npm install next --save
git commit -am "fix: Move next to dependencies"
git push origin main
```

### Error: "NEXT_PUBLIC_* variables not defined"
**Solución**: Verifica que todas las variables `NEXT_PUBLIC_*` estén en Railway Dashboard

### Error: "Build timeout"
**Solución**: Aumenta el timeout en Railway Settings o optimiza el build

### App se cae después de deploy
**Solución**: 
1. Ver logs: `railway logs`
2. Verificar variables de entorno
3. Verificar que el puerto sea el correcto (Railway lo asigna automáticamente)

---

## 🔒 Seguridad

### Variables Sensibles
⚠️ **NUNCA** commitees archivos con variables sensibles:
- `.env.local` ✅ (gitignored)
- `.env.production` ✅ (gitignored)
- API keys en código ❌

### Verificar .gitignore
```bash
# Verificar que estos archivos estén ignorados
cat .gitignore | grep -E "(\.env|\.env\.local)"
```

---

## 📈 Monitoreo

### Logs
```bash
# Logs en tiempo real
railway logs --follow

# Logs de las últimas 2 horas
railway logs --tail 1000
```

### Metrics
- Ver CPU, RAM y Network en Railway Dashboard
- Configurar alertas si es necesario

---

## 🔄 Actualizar Deployment

### Flujo Normal (Auto-deploy)
```bash
# 1. Hacer cambios en código
# 2. Commit y push
git add .
git commit -m "feat: Nueva funcionalidad"
git push origin main

# 3. Railway detecta el push y despliega automáticamente
# 4. Esperar ~2-5 minutos para que termine el build
```

### Deploy Manual
```bash
railway up
```

---

## 📞 Soporte

- **Railway Docs**: https://docs.railway.app/
- **Railway Discord**: https://discord.gg/railway
- **Railway Status**: https://status.railway.app/

---

## 🎯 Próximos Pasos Recomendados

1. **Configurar Dominio Personalizado**
   - Railway Settings > Domains
   - Agregar dominio personalizado (ej: rebecabarreto.com)

2. **Configurar Health Checks**
   - Railway Settings > Health Check
   - Path: `/api/health` (crear endpoint)

3. **Configurar Escalamiento**
   - Railway Settings > Replicas
   - Aumentar réplicas si es necesario

4. **Monitoreo con Sentry** (opcional)
   - Instalar Sentry para error tracking
   - Configurar alertas

---

**Última actualización**: 14 de Noviembre, 2024  
**Estado**: ✅ Configuración optimizada para Railway

