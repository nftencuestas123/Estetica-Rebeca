# ✅ Checklist para Railway Deployment

## 📋 Variables de Entorno (Railway Dashboard)

Ir a: Railway Dashboard > Tu Proyecto > Variables

### ✅ Variables Críticas:
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] NEXT_PUBLIC_OPENROUTER_API_KEY
- [ ] NEXT_PUBLIC_SITE_URL (tu URL de Railway)
- [ ] NODE_ENV=production

### ✅ Variables Regionales:
- [ ] NEXT_PUBLIC_COUNTRY=PY
- [ ] NEXT_PUBLIC_CURRENCY=USD
- [ ] NEXT_PUBLIC_TIMEZONE=America/Asuncion
- [ ] NEXT_PUBLIC_LANGUAGE=es-PY

## 📊 Configuración del Proyecto

### Railway Settings:
- [ ] Auto-deploy activado en branch `main`
- [ ] Health Check Path: `/api/health`
- [ ] Builder: Nixpacks
- [ ] Start Command: `npm start`

## 🧪 Testing Post-Deploy

Probar en tu URL de Railway:
- [ ] Landing page carga: `https://tu-app.railway.app/`
- [ ] Health check funciona: `https://tu-app.railway.app/api/health`
- [ ] Login funciona: `https://tu-app.railway.app/login`
- [ ] Chat de Sofía responde
- [ ] Imágenes cargan correctamente

## 🚀 Comandos Rápidos

```bash
# Ver logs en tiempo real
railway logs --follow

# Ver estado
railway status

# Abrir app
railway open

# Deploy manual
railway up
```

## 🐛 Troubleshooting

Si algo falla:
1. Ver logs: `railway logs`
2. Verificar variables de entorno en Dashboard
3. Verificar que el build se completó sin errores
4. Probar endpoint `/api/health`

