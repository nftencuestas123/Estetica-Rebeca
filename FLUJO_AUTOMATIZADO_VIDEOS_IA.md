# 🚀 Flujo Automatizado de Videos IA + Publicación en Redes Sociales

## 🎯 OBJETIVO

Permitir que clientes sin conocimientos técnicos (dueños de negocios de estética) puedan:
1. Generar videos profesionales con IA en 1 click
2. Publicar automáticamente en todas sus redes sociales
3. Con copy viral generado por IA
4. TODO desde una sola plataforma, SIN salir

---

## 📋 FLUJO COMPLETO (ULTRA SIMPLE)

### **PASO 1: Crear Video** 🎬

**Interfaz:**
```
┌─────────────────────────────────────────────────┐
│  🎬 Crear Video con IA                          │
│                                                 │
│  📸 Sube una foto o escribe qué quieres decir  │
│  ┌───────────────────────────────────────────┐ │
│  │ [Drag & Drop imagen] o [Escribe texto]    │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ⏱️ Duración del video:                         │
│  ○ 30 seg ($2)  ○ 1 min ($5)  ○ 2 min ($10)   │
│  ○ 5 min ($25)  ○ 10 min ($50)                 │
│                                                 │
│  💳 Tu saldo: $100 (20 videos de 1 min)        │
│                                                 │
│  [Generar Video 🚀]                             │
└─────────────────────────────────────────────────┘
```

**Lo que pasa detrás:**
1. Cliente sube imagen + texto breve
2. Selecciona duración
3. Sistema calcula costo automáticamente
4. Verifica que tenga créditos suficientes
5. Genera video con TopView Avatar 4 API
6. Video se procesa (1-3 minutos)
7. Video listo → **AUTOMÁTICAMENTE pasa a PASO 2**

---

### **PASO 2: Publicar en Redes Sociales** 📱

**Interfaz (aparece automáticamente cuando video está listo):**
```
┌─────────────────────────────────────────────────┐
│  ✅ Video listo! Ahora publícalo en tus redes   │
│                                                 │
│  📹 [Vista previa del video]                    │
│                                                 │
│  ✍️ ¿De qué trata este video?                   │
│  ┌───────────────────────────────────────────┐ │
│  │ Ejemplo: "Promoción de tratamiento facial"│ │
│  │ "Nueva técnica de depilación láser"       │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  🤖 [Generar copy viral con IA ✨]              │
│                                                 │
│  📝 Copy generado:                              │
│  ┌───────────────────────────────────────────┐ │
│  │ 🌟 ¡Nueva promo! Tratamiento facial       │ │
│  │ rejuvenecedor 50% OFF esta semana 💆‍♀️    │ │
│  │                                            │ │
│  │ ✨ Resultados visibles desde la 1ra sesión│ │
│  │ 💎 Agenda tu cita: 👇                      │ │
│  │                                            │ │
│  │ #EstéticaRebecaBarreto #Belleza #Facial   │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  📲 ¿Dónde publicar?                            │
│  ☑️ Instagram  ☑️ Facebook  ☑️ TikTok          │
│  ☐ Twitter     ☐ YouTube    ☐ LinkedIn        │
│                                                 │
│  [Publicar en todas las redes 🚀]              │
└─────────────────────────────────────────────────┘
```

**Lo que pasa detrás:**
1. Video generado aparece en previsualización
2. Cliente escribe 1 frase sobre qué trata
3. IA (GPT-4/OpenRouter) genera copy profesional y viral:
   - Título llamativo
   - Emojis estratégicos
   - Call to action
   - Hashtags relevantes
   - Texto optimizado para cada red
4. Cliente elige redes sociales (checkboxes)
5. Click "Publicar" → **MAGIA:**
   - Video se sube a Instagram automáticamente
   - Video se sube a Facebook automáticamente
   - Video se sube a TikTok automáticamente
   - Con el copy generado por IA
   - TODO en 1 click

---

### **PASO 3: Confirmación y Estadísticas** 📊

**Interfaz:**
```
┌─────────────────────────────────────────────────┐
│  ✅ ¡Video publicado exitosamente! 🎉          │
│                                                 │
│  Publicado en:                                  │
│  ✅ Instagram (hace 2 min) - 45 likes, 12 💬   │
│  ✅ Facebook (hace 2 min)  - 23 likes, 5 💬    │
│  ✅ TikTok (hace 2 min)    - 156 views         │
│                                                 │
│  [Ver estadísticas completas] [Crear otro video]│
└─────────────────────────────────────────────────┘
```

---

## 🏗️ ARQUITECTURA TÉCNICA

### **1. Frontend (Next.js)**
```
app/(admin)/admin/videos-ia/page.tsx
├── Tab 1: Crear Video
│   ├── Upload image
│   ├── Script input
│   ├── Duration selector (con precios dinámicos)
│   ├── Balance display
│   └── Generate button
│
├── Tab 2: Publicar (aparece cuando video listo)
│   ├── Video preview
│   ├── Brief idea input
│   ├── "Generate viral copy" button
│   ├── AI-generated copy (editable)
│   ├── Social media checkboxes
│   └── Publish button
│
└── Tab 3: Historial & Stats
    └── Lista de videos publicados con stats
```

### **2. Backend Services**

**`services/topview.ts`** (Ya existe)
- `generateVideo()` → Genera video con TopView
- `getVideoStatus()` → Check si está listo

**`services/ai-copywriter.ts`** (NUEVO)
- `generateViralCopy()` → Genera copy con GPT-4/OpenRouter
- Input: brief idea del cliente
- Output: copy optimizado con emojis, hashtags, CTA

**`services/social-media.ts`** (NUEVO)
- `publishToInstagram()` → Sube video a Instagram
- `publishToFacebook()` → Sube video a Facebook
- `publishToTikTok()` → Sube video a TikTok
- Usa APIs oficiales de cada plataforma

**`services/credits.ts`** (NUEVO)
- `getUserBalance()` → Cuántos créditos tiene
- `deductCredits()` → Resta créditos al generar video
- `calculateCost()` → Calcula costo según duración

### **3. Base de Datos (Supabase)**

**Tabla: `videos`**
```sql
id, user_id, topview_video_id, video_url, 
duration, cost, script, status, created_at
```

**Tabla: `social_posts`**
```sql
id, video_id, platform (instagram/facebook/tiktok), 
post_url, copy_text, likes, comments, views, posted_at
```

**Tabla: `user_credits`**
```sql
id, user_id, balance, last_recharge, created_at
```

---

## 💰 SISTEMA DE PRECIOS

### **Precios por duración:**
```
30 segundos = $2
1 minuto    = $5
2 minutos   = $10
5 minutos   = $25
10 minutos  = $50
```

### **Lógica de créditos:**
1. Cliente compra créditos (ej: $100 = 20 videos de 1 min)
2. Cada video generado descuenta créditos
3. Si no tiene suficientes → Mensaje "Recarga créditos"
4. Dashboard muestra balance actual

---

## 🔌 INTEGRACIONES NECESARIAS

### **1. TopView Avatar 4** (Video generation)
- Status: ✅ Ya integrado
- API Key: Necesaria (solicitada en email)

### **2. OpenRouter / OpenAI** (AI Copywriting)
- Status: ✅ Ya tenemos OpenRouter integrado
- Uso: Generar copy viral con GPT-4
- Prompt: "Genera un copy viral para Instagram sobre: [idea cliente]"

### **3. Instagram Graph API** (Publicación)
- Requiere: Facebook App, permisos, tokens
- Endpoint: `/me/media` (photo/video)
- Docs: https://developers.facebook.com/docs/instagram-api

### **4. Facebook Graph API** (Publicación)
- Requiere: Facebook App, permisos, tokens
- Endpoint: `/me/videos`
- Docs: https://developers.facebook.com/docs/graph-api

### **5. TikTok API** (Publicación)
- Requiere: TikTok Developer account, OAuth
- Endpoint: `/share/video/upload/`
- Docs: https://developers.tiktok.com/

---

## 📝 IMPLEMENTACIÓN PASO A PASO

### **Fase 1: Video Generation (Ya casi listo)**
- [x] Interfaz de creación
- [x] Integración TopView
- [ ] Sistema de precios dinámicos
- [ ] Verificación de créditos
- [ ] Deducción de balance

### **Fase 2: AI Copywriting**
- [ ] Servicio `ai-copywriter.ts`
- [ ] Prompt engineering para copy viral
- [ ] Interfaz para generar copy
- [ ] Edición manual de copy generado

### **Fase 3: Social Media Publishing**
- [ ] Conectar cuentas de redes sociales (OAuth)
- [ ] Servicio `social-media.ts`
- [ ] Publicación en Instagram
- [ ] Publicación en Facebook
- [ ] Publicación en TikTok
- [ ] Manejo de errores y reintentos

### **Fase 4: Analytics & Tracking**
- [ ] Rastrear likes, comments, views
- [ ] Dashboard de estadísticas
- [ ] Reportes de rendimiento

---

## 🎨 UX/UI CRÍTICO

### **Para clientes NO técnicos:**

✅ **TODO en 1 sola página** (no navegar entre secciones)
✅ **Pasos numerados claros** (1 → 2 → 3)
✅ **Botones GRANDES y obvios**
✅ **Textos simples** ("Crear video", NO "Generate AI avatar")
✅ **Precios visibles** antes de generar
✅ **Confirmaciones claras** ("Video publicado ✅")
✅ **Cero configuración técnica**

❌ **NO pedir configuraciones complejas**
❌ **NO términos técnicos** (API, tokens, webhooks)
❌ **NO múltiples pantallas**

---

## 💡 EJEMPLO DE FLUJO COMPLETO

**Cliente: María (dueña de centro de estética)**

1. María entra a su panel admin → Videos IA
2. Escribe: "Tenemos una promo de 50% en láser facial"
3. Sube una foto de su centro
4. Elige: 1 minuto ($5) → Ve que tiene $85 de saldo
5. Click "Generar Video" → Espera 2 minutos tomando café ☕
6. Video listo → Aparece automáticamente pantalla "Publicar"
7. María escribe: "Promo láser facial 50% off"
8. Click "Generar copy viral" → IA crea texto profesional con emojis
9. María selecciona: ✅ Instagram, ✅ Facebook, ✅ TikTok
10. Click "Publicar en todas" → ¡BOOM! 🚀
11. En 30 segundos, su video está en las 3 redes
12. María ve: "✅ Publicado en Instagram (12 likes) Facebook (5 likes) TikTok (67 views)"
13. María feliz 😊 → Crea otro video mañana

**Tiempo total: 5 minutos. Esfuerzo: MÍNIMO.**

---

## 🚀 PRÓXIMOS PASOS

1. ¿Aprobamos este flujo?
2. Implemento primero el sistema de precios/créditos
3. Luego implemento AI copywriting
4. Finalmente integramos redes sociales

**¿Empezamos?** 🔥

