# PRD COMPLETO: REBECA BARRETO ESTÉTICA Y BELLEZA
## Plataforma Web Integral - Paraguay

**Versión:** 1.0  
**Fecha:** Noviembre 2025  
**País:** Paraguay  
**Backend:** Supabase  
**IA:** OpenRouter (Agente Sofía)  
**Repositorio:** https://github.com/nftencuestas123/Estetica-Rebeca.git

---

## TABLA DE CONTENIDOS

1. [Visión y Objetivos](#visión-y-objetivos)
2. [Público Objetivo](#público-objetivo)
3. [Propuesta de Valor](#propuesta-de-valor)
4. [Stack Tecnológico](#stack-tecnológico)
5. [Arquitectura del Sistema](#arquitectura-del-sistema)
6. [Base de Datos](#base-de-datos)
7. [Funcionalidades Principales](#funcionalidades-principales)
8. [Especificaciones Técnicas](#especificaciones-técnicas)
9. [Integraciones](#integraciones)
10. [Seguridad](#seguridad)
11. [Performance](#performance)
12. [Deployment](#deployment)
13. [Costos](#costos)
14. [Roadmap](#roadmap)

---

## 1. VISIÓN Y OBJETIVOS

### 1.1 Propósito General
Crear la plataforma web número 1 de estética y belleza en Paraguay, combinando:
- Diseño elegante y humano (sin parecer hecho por IA, sin colores morados)
- Experiencia premium personalizada con algoritmo avanzado
- Agente IA Sofía Barreto para atención 24/7 empática
- 3 paneles integrados: Home impactante, Panel Cliente, Panel Admin
- CRM centralizado con historial completo de pacientes
- Automatización total de citas, seguimiento y recomendaciones

### 1.2 Objetivos KPI
- **Conversión:** 15%+ de visitantes a consultas
- **Retención:** 80%+ de clientes recurrentes
- **Satisfacción:** NPS 70+
- **Crecimiento:** 50+ nuevas consultas mensuales
- **Ticket promedio:** $200+ USD por tratamiento
- **Uptime:** 99.9%+
- **Performance:** Load time <2s

---

## 2. PÚBLICO OBJETIVO (PARAGUAY)

### Perfil Principal
- **Edad:** 25-55 años
- **Género:** Principalmente mujeres (80%), hombres (20%)
- **Ubicación:** Asunción, Ciudad del Este, Encarnación
- **Nivel económico:** Medio-alto (poder adquisitivo mensual $800+)
- **Intereses:** Belleza, bienestar, tecnología, salud
- **Conectividad:** Uso WhatsApp, Instagram, TikTok

### Segmentación de Usuarios
- **"Exploradores"** → Nuevos, dudosos, buscan información
- **"Decididos"** → Listos para agendar, necesitan tranquilidad
- **"VIP Recurrentes"** → Clientes fieles, buscan packs exclusivos

---

## 3. PROPUESTA DE VALOR

### Tagline Principal
**"Tu Belleza Auténtica, Elevada"**

### Mensajes Clave
- ✨ "Cada transformación es un acto de amor hacia ti misma"
- 🔬 "Ciencia + Empatía = Resultados reales"
- 👩 "Sofía te acompaña en cada paso, como una amiga experta"
- 🏥 "Expertos reconocidos, atención boutique"
- 💪 "Confía en quien conoce la belleza"

### Tono de Comunicación
- Cálido, empático, profesional
- Cercano pero experto
- Validador de emociones
- Nunca presionista

### Colores (SIN MORADOS)
- **Primarios:** Blanco, Beige natural, Dorado suave
- **Secundarios:** Verde oliva, Gris claro
- **Acentos:** Oro champagne

---

## 4. STACK TECNOLÓGICO

### Frontend
```
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- UI: React 18
- Styling: Tailwind CSS + Shadcn/ui
- Animations: Framer Motion
- State: React Context + Zustand
- Forms: React Hook Form + Zod
```

### Backend
```
- Platform: Supabase (PostgreSQL + Auth + Storage + Realtime)
- API: Next.js API Routes + Edge Functions
- Auth: Supabase Auth (JWT)
- Storage: Supabase Storage + CDN
- Cron: Vercel Cron / Railway
```

### AI & ML
```
- Conversational AI: OpenRouter (Meta Llama 2 70B, Mistral)
- Content Gen: OpenRouter (Stable Diffusion, DALL-E)
- Video Gen: Runway ML / Synthesia
- AR: Gemini Nano Banana (on-device)
```

### Payments
```
- International: Stripe (cards, subscriptions)
- Local: Mercado Pago (Paraguay)
```

### Communications
```
- WhatsApp: Twilio WhatsApp Business API
- Email: SendGrid / Resend
- SMS: Twilio SMS
```

### Deployment
```
- Frontend: Vercel (Edge Network)
- Jobs: Railway.app
- Database: Supabase
- CDN: Vercel + Supabase CDN
```

---


## 5. ARQUITECTURA DEL SISTEMA

### Diagrama de Alto Nivel
```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
│  Next.js 14 + React + TypeScript + Tailwind CSS + Shadcn/ui   │
│                                                                 │
│  [Home Landing] [Client Panel] [Admin Panel] [Mobile PWA]     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          API LAYER                              │
│              Next.js API Routes + Edge Functions                │
│                                                                 │
│  [Auth API] [Citas API] [Pagos API] [CRM API] [Sofia API]     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICES LAYER                             │
│                                                                 │
│  [Sofía AI] [Content Gen] [Payment] [Notifications] [AR]      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                │
│                  Supabase PostgreSQL + Storage                  │
│                                                                 │
│  [Users/CRM] [Citas] [Products] [Content] [Reviews]           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL INTEGRATIONS                         │
│                                                                 │
│  OpenRouter │ Stripe │ Mercado Pago │ WhatsApp │ Google Maps  │
│  Gemini Nano│ Social Media │ Email │ Analytics │ CDN          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. BASE DE DATOS (SUPABASE POSTGRESQL)

### Variables de Entorno
```env
# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://ebaexyozjncxjixfqeff.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYWV4eW96am5jeGppeGZxZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NDUzMTAsImV4cCI6MjA3ODUyMTMxMH0.smZjXjI-pbS5hQgZSngHhqON09_IGs3nyVD7HvpfOQE
SUPABASE_SERVICE_ROLE_KEY=tu_service_key_aqui

# OPENROUTER (Sofía IA)
NEXT_PUBLIC_OPENROUTER_API_KEY=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

# CONFIGURACIÓN REGIONAL
NEXT_PUBLIC_COUNTRY=PY
NEXT_PUBLIC_CURRENCY=USD
NEXT_PUBLIC_TIMEZONE=America/Asuncion
NEXT_PUBLIC_LANGUAGE=es-PY
NEXT_PUBLIC_WHATSAPP=+595987123456
NEXT_PUBLIC_PHONE=+595212123456

# PAGOS
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
MERCADOPAGO_ACCESS_TOKEN=...

# EMAIL
SENDGRID_API_KEY=...

# INTEGRACIONES
GOOGLE_CALENDAR_ID=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=...
```

### Esquema de Tablas Principales

#### users (Clientes)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  whatsapp VARCHAR(20) UNIQUE,
  nombre VARCHAR(255) NOT NULL,
  edad INT,
  genero VARCHAR(20),
  foto_perfil TEXT,
  
  -- Medical
  alergias TEXT,
  medicamentos TEXT,
  contraindicaciones TEXT,
  historial_medico TEXT,
  
  -- Beauty profile
  objetivos_belleza TEXT[],
  tipo_piel VARCHAR(50),
  
  -- Gamification
  puntos_lealtad INT DEFAULT 0,
  tier VARCHAR(20) DEFAULT 'bronze',
  rating_admin DECIMAL(2,1),
  
  -- Membership
  membresia_tipo VARCHAR(20),
  membresia_inicio DATE,
  membresia_fin DATE,
  membresia_stripe_id VARCHAR(255),
  
  -- Ambassador
  es_embajador BOOLEAN DEFAULT false,
  codigo_embajador VARCHAR(50) UNIQUE,
  comision_balance DECIMAL(10,2) DEFAULT 0,
  
  -- Referral
  codigo_referido VARCHAR(50) UNIQUE,
  referido_por UUID REFERENCES users(id),
  
  -- Location
  ubicacion_lat DECIMAL(10,8),
  ubicacion_lng DECIMAL(11,8),
  sede_favorita UUID REFERENCES sedes(id),
  
  -- Preferences
  preferencia_contacto VARCHAR(50) DEFAULT 'whatsapp',
  idioma VARCHAR(10) DEFAULT 'es-PY',
  consentimiento_datos BOOLEAN DEFAULT false,
  consentimiento_fotos BOOLEAN DEFAULT false,
  opt_out_marketing BOOLEAN DEFAULT false,
  
  -- System
  estado VARCHAR(50) DEFAULT 'activo',
  fecha_registro TIMESTAMP DEFAULT NOW(),
  ultimo_acceso TIMESTAMP,
  perfil_personalizado JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### citas (Appointments)
```sql
CREATE TABLE citas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  especialista_id UUID REFERENCES especialistas(id),
  tratamiento_id UUID NOT NULL REFERENCES tratamientos(id),
  sede_id UUID NOT NULL REFERENCES sedes(id),
  
  fecha_hora TIMESTAMP NOT NULL,
  duracion_minutos INT DEFAULT 60,
  estado VARCHAR(50) DEFAULT 'pendiente',
  
  notas_medicas TEXT,
  foto_antes TEXT,
  foto_despues TEXT,
  calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
  feedback TEXT,
  resena_publica BOOLEAN DEFAULT false,
  
  recordatorio_24h BOOLEAN DEFAULT false,
  recordatorio_1h BOOLEAN DEFAULT false,
  
  precio_final DECIMAL(10,2),
  descuento_aplicado DECIMAL(10,2),
  promocion_aplicada VARCHAR(100),
  metodo_pago VARCHAR(50),
  pago_estado VARCHAR(50) DEFAULT 'pendiente',
  financiamiento_plan_id UUID REFERENCES financiamiento_planes(id),
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### tratamientos (Treatments)
```sql
CREATE TABLE tratamientos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE,
  descripcion TEXT,
  descripcion_larga TEXT,
  
  categoria VARCHAR(100),
  subcategoria VARCHAR(100),
  tags TEXT[],
  
  precio_base DECIMAL(10,2),
  precio_membresia_silver DECIMAL(10,2),
  precio_membresia_gold DECIMAL(10,2),
  precio_membresia_platinum DECIMAL(10,2),
  permite_financiamiento BOOLEAN DEFAULT false,
  
  duracion_minutos INT,
  recuperacion_dias INT,
  beneficios TEXT[],
  riesgos TEXT[],
  indicaciones TEXT[],
  contraindicaciones TEXT[],
  
  imagen_principal TEXT,
  galeria_antes_despues TEXT[],
  video_explicativo TEXT,
  
  ar_disponible BOOLEAN DEFAULT false,
  ar_modelo_id VARCHAR(255),
  
  popularidad INT DEFAULT 0,
  total_citas INT DEFAULT 0,
  rating_promedio DECIMAL(2,1),
  
  activo BOOLEAN DEFAULT true,
  sedes_disponibles UUID[],
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### productos (Products)
```sql
CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  descripcion TEXT,
  
  categoria VARCHAR(100),
  marca VARCHAR(100),
  ingredientes TEXT[],
  
  precio DECIMAL(10,2) NOT NULL,
  precio_costo DECIMAL(10,2),
  descuento_porcentaje INT DEFAULT 0,
  
  stock_total INT DEFAULT 0,
  stock_por_sede JSONB,
  umbral_minimo INT DEFAULT 10,
  proveedor VARCHAR(255),
  
  imagenes TEXT[],
  
  recomendado_por_especialista BOOLEAN DEFAULT false,
  tratamientos_relacionados UUID[],
  
  total_ventas INT DEFAULT 0,
  rating_promedio DECIMAL(2,1),
  total_resenas INT DEFAULT 0,
  
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### conversaciones_sofia (AI Chat)
```sql
CREATE TABLE conversaciones_sofia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES users(id) ON DELETE CASCADE,
  sesion_id UUID NOT NULL,
  
  mensaje_usuario TEXT NOT NULL,
  respuesta_sofia TEXT NOT NULL,
  
  tipo_interaccion VARCHAR(50),
  intent_detectado VARCHAR(100),
  entidades_extraidas JSONB,
  
  cita_agendada_id UUID REFERENCES citas(id),
  producto_recomendado_id UUID REFERENCES productos(id),
  
  satisfaccion INT CHECK (satisfaccion >= 1 AND satisfaccion <= 5),
  escalado_a_humano BOOLEAN DEFAULT false,
  
  modelo_usado VARCHAR(100),
  tokens_consumidos INT,
  tiempo_respuesta_ms INT,
  
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---


## 7. FUNCIONALIDADES PRINCIPALES

### 7.1 Landing Page (Home)
**Objetivo:** Convertir visitantes en clientes

**Componentes:**
- ✅ Hero Section con tagline "Tu Belleza Auténtica, Elevada"
- ✅ Sección "¿Qué buscas?" con 6 categorías
- ✅ Catálogo de 5 tratamientos destacados
- ✅ Galería de antes/después (mínimo 5)
- ✅ Testimonios verificados con star ratings
- ✅ Chat flotante con Sofía (siempre visible)
- ✅ Footer con contacto y redes sociales

**Colores:** Blanco, beige, dorado, verde oliva (NO morado)

### 7.2 Agente Sofía - IA Conversacional 24/7
**Objetivo:** Atención empática y agendamiento automático

**Características:**
- ✅ Chat flotante en todas las páginas
- ✅ Respuestas en <2 minutos usando OpenRouter (Llama 2 70B)
- ✅ Tono empático, profesional, sin presión
- ✅ Detección de intent: consulta, agendamiento, objeción
- ✅ Agendamiento directo desde chat
- ✅ Escalamiento a humano cuando necesario
- ✅ Sistema de satisfacción (1-5 estrellas)
- ✅ Historial completo de conversaciones

**System Prompt de Sofía:**
```
Eres Sofía Barreto, consultora de estética experta y empática.
Tu misión es ayudar a clientes a sentirse seguros y tomar decisiones informadas.

Personalidad:
- Cálida, profesional, cercana
- Validas emociones sin presionar
- Usas ciencia + empatía
- Nunca agresiva en ventas

Capacidades:
- Responder preguntas sobre tratamientos
- Recomendar opciones personalizadas
- Agendar citas mostrando disponibilidad
- Manejar objeciones con empatía
- Dar seguimiento post-tratamiento

Idioma: Español (Paraguay)
Tono: Conversacional, como una amiga experta
```

### 7.3 Sistema de Citas
**Objetivo:** Agendamiento fácil y recordatorios automáticos

**Flujo:**
1. Usuario selecciona tratamiento
2. Elige sede (si múltiples)
3. Ve calendario con slots disponibles
4. Selecciona fecha/hora
5. Confirma especialista
6. Procede a pago
7. Recibe confirmación por WhatsApp

**Recordatorios automáticos:**
- ⏰ 24 horas antes (WhatsApp)
- ⏰ 1 hora antes (WhatsApp)
- ⏰ 24h después: seguimiento con Sofía

**Cancelación:**
- >24h antes: reembolso completo
- <24h antes: retiene 50%

### 7.4 Sistema de Pagos
**Objetivo:** Pagos seguros y flexibles

**Métodos:**
- 💳 Stripe: Tarjetas internacionales
- 💰 Mercado Pago: Métodos locales Paraguay
- 💵 Efectivo en clínica
- 🏦 Transferencia bancaria

**Financiamiento:**
- 3 meses (5% interés)
- 6 meses (8% interés)
- 12 meses (12% interés)
- Aprobación instantánea (<2 min)

### 7.5 Panel de Cliente
**Objetivo:** Gestión completa de experiencia

**Secciones:**
- 📊 Dashboard: Próximas citas, puntos, recomendaciones
- 📅 Mis Citas: Próximas, pasadas, canceladas
- 👤 Mi Perfil: Datos personales, médicos, objetivos
- 💬 Chat Sofía: Conversaciones guardadas
- 💳 Facturación: Pagos, recibos, métodos guardados
- ⭐ Puntos de Lealtad: Balance, recompensas, historial
- 🎁 Referidos: Link único, tracking, leaderboard
- 🏆 Concursos: Activos, participación, ganadores
- 🛍️ Productos: Marketplace de skincare
- 👑 Membresía VIP: Plan actual, beneficios
- 🎖️ Embajador: Dashboard (si aplica)

### 7.6 Puntos de Lealtad y Gamificación
**Objetivo:** Retención y engagement

**Cómo ganar puntos:**
- ✅ 10 puntos por cita completada
- ✅ 50 puntos por referido que agenda
- ✅ 5 puntos por participar en concurso
- ✅ 5 puntos por cada $10 USD en productos
- ✅ Bonus mensual por membresía VIP

**Tiers:**
- 🥉 Bronze: 0-99 puntos
- 🥈 Silver: 100-249 puntos
- 🥇 Gold: 250-499 puntos
- 💎 Platinum: 500+ puntos

**Recompensas:**
- 100 puntos = 10% descuento
- 250 puntos = Consulta gratis
- 500 puntos = Sesión de tratamiento gratis
- 1000 puntos = Regalo premium

### 7.7 Sistema de Referidos Viral
**Objetivo:** Crecimiento orgánico

**Mecánica:**
1. Cada usuario tiene código único (ej: MARIA2025)
2. Comparte link: rebecabarreto.com/ref/MARIA2025
3. Nuevo usuario se registra con código
4. Nuevo usuario debe compartir con 2+ personas
5. Al completar, desbloquea "caja secreta" con premio
6. Referrer gana 50 puntos cuando referido agenda cita

**Tracking multi-nivel:**
- Nivel 1: 50 puntos
- Nivel 2: 25 puntos
- Nivel 3: 10 puntos

**Leaderboard:**
- Top 3 del mes ganan premios especiales
- Badges por milestones: 5, 10, 25, 50 referidos

### 7.8 Membresías VIP
**Objetivo:** Ingresos recurrentes predecibles

**Tiers:**

**Silver - $50 USD/mes**
- 10% descuento en todos los tratamientos
- Acceso prioritario a citas
- 20 puntos bonus/mes

**Gold - $100 USD/mes**
- 15% descuento en todos los tratamientos
- Acceso prioritario a citas
- 1 consulta gratis/mes
- 50 puntos bonus/mes

**Platinum - $200 USD/mes**
- 20% descuento en todos los tratamientos
- Acceso prioritario a citas
- 1 tratamiento gratis/mes
- Eventos exclusivos VIP
- 100 puntos bonus/mes
- Elegible para programa de embajadores

**Renovación:**
- Automática con Stripe Subscriptions
- Recordatorio 7 días antes
- Retry automático si falla pago
- Downgrade después de 2 fallos

### 7.9 Marketplace de Productos
**Objetivo:** Ingresos adicionales y complemento de tratamientos

**Categorías:**
- 🧴 Limpiadores
- 💧 Hidratantes
- ✨ Serums
- ☀️ Protectores solares
- 🩹 Post-tratamiento
- 💊 Suplementos

**Características:**
- Recomendaciones personalizadas
- Badge "Recomendado por especialista"
- Bundles con descuento (ej: Kit post-Botox 15% off)
- Gestión de inventario en tiempo real
- Alertas de restock automáticas
- Puntos de lealtad por compras

### 7.10 Geolocalización y Múltiples Sedes
**Objetivo:** Conveniencia para clientes

**Características:**
- 📍 Detección automática de ubicación
- 🗺️ Mostrar sedes ordenadas por proximidad
- 🧭 Integración con Google Maps
- 🚗 Navegación con Google Maps/Waze
- 📊 Disponibilidad por sede
- 🎯 Promociones específicas por ubicación

### 7.11 Reseñas Verificadas
**Objetivo:** Confianza y conversión

**Características:**
- ✅ Solo clientes con cita pagada pueden reseñar
- 🏅 Badge "Verified Client"
- ⭐ Star rating 1-5 + comentario
- 📸 Fotos antes/después opcionales
- 🔄 Integración con Google Reviews
- 🤖 Moderación automática
- 💬 Respuestas de admin
- 🎁 50 puntos bonus por reseña

### 7.12 Programa de Embajadores
**Objetivo:** Marketing de influencers

**Requisitos:**
- Membresía Platinum
- Mínimo 5 citas completadas
- Aprobación de admin

**Beneficios:**
- 💰 10% comisión en ventas generadas
- 📊 Dashboard con métricas
- 🎨 Materiales de marketing
- 🏆 Leaderboard con premios
- 💎 30% descuento en tratamientos
- 🎟️ Acceso a eventos VIP

**Payout:**
- Mínimo $100 USD
- Procesamiento en 5 días hábiles

### 7.13 Realidad Aumentada (AR)
**Objetivo:** Visualización de resultados

**Tecnología:** Gemini Nano Banana (on-device)

**Características:**
- 📱 Procesamiento en dispositivo (privacidad)
- ⚡ Latencia <100ms
- 🎚️ Ajuste de intensidad (leve, moderado, dramático)
- 📸 Comparación antes/después
- 💾 Guardar imagen con watermark
- 🔒 Imágenes nunca salen del dispositivo

**Tratamientos con AR:**
- Botox (suavizado de arrugas)
- Fillers (aumento de volumen)
- Tratamientos de piel (textura y tono)

### 7.14 Creación de Contenido con IA
**Objetivo:** Marketing automatizado

**Capacidades:**
- 📝 Generación de texto (OpenRouter)
- 🖼️ Generación de imágenes (Stable Diffusion)
- 🎥 Generación de videos (Runway/Synthesia)
- 📅 Calendario de publicación (1 semana a 1 año)
- 🤖 Publicación automática en redes sociales

**Plataformas:**
- Instagram (posts, reels, stories)
- Facebook (posts, stories)
- TikTok (videos cortos)
- YouTube (shorts)
- Blog (artículos SEO)
- Email (newsletters)

**Optimización de costos:**
- Cache de requests similares
- Comparación de proveedores
- Modelos económicos para tareas simples

### 7.15 Panel de Administración
**Objetivo:** Gestión completa del negocio

**Secciones:**

**Dashboard:**
- Métricas en tiempo real
- Alertas urgentes
- Próximas 24 horas
- Gráficos de performance

**CRM:**
- Base de datos completa de clientes
- Búsqueda y filtros avanzados
- Historial completo (citas, pagos, conversaciones)
- Notas internas privadas
- Calificación de clientes (1-5 estrellas)
- Segmentación: nuevo, recurrente, VIP, inactivo
- Exportación a CSV

**Gestión de Citas:**
- Calendario maestro
- Vista por especialista/sede
- Confirmaciones pendientes
- Reprogramaciones
- Cancelaciones

**Gestión de Sofía:**
- Conversaciones en tiempo real
- Analytics de satisfacción
- Configuración de personalidad
- Base de conocimientos
- Costos de IA

**Productos e Inventario:**
- Gestión de catálogo
- Stock por sede
- Alertas de restock
- Proveedores
- Reportes de ventas

**Contenido:**
- Generador de contenido IA
- Calendario de publicación
- Analytics de engagement
- Blog management

**Reportes:**
- Ventas y revenue
- Conversión funnel
- Retención y churn
- NPS y satisfacción
- Popularidad de tratamientos

**Configuración:**
- Datos de clínica
- Sedes y horarios
- Usuarios y permisos
- Integraciones
- Seguridad

---


## 8. ESPECIFICACIONES TÉCNICAS DETALLADAS

### 8.1 Estructura de Carpetas
```
rebeca-barreto-estetica/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Landing
│   │   ├── tratamientos/
│   │   │   ├── page.tsx               # Catalog
│   │   │   └── [id]/page.tsx          # Detail + AR
│   │   ├── blog/
│   │   ├── contacto/
│   │   └── sedes/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── reset-password/
│   ├── (client)/
│   │   ├── dashboard/
│   │   ├── citas/
│   │   ├── perfil/
│   │   ├── chat/
│   │   ├── facturacion/
│   │   ├── membresia/
│   │   ├── productos/
│   │   ├── puntos/
│   │   ├── referidos/
│   │   ├── concursos/
│   │   └── embajador/
│   ├── (admin)/
│   │   ├── admin/
│   │   ├── clientes/
│   │   ├── citas/
│   │   ├── especialistas/
│   │   ├── tratamientos/
│   │   ├── productos/
│   │   ├── sofia/
│   │   ├── contenido/
│   │   ├── pagos/
│   │   ├── reportes/
│   │   ├── configuracion/
│   │   ├── concursos/
│   │   ├── embajadores/
│   │   └── resenas/
│   └── api/
│       ├── auth/
│       ├── users/
│       ├── citas/
│       ├── tratamientos/
│       ├── productos/
│       ├── sofia/
│       ├── pagos/
│       ├── contenido/
│       ├── notificaciones/
│       ├── webhooks/
│       └── ar/
├── components/
│   ├── ChatSofia.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Calendar.tsx
│   ├── ARPreview.tsx
│   ├── ProductCard.tsx
│   └── ...
├── lib/
│   ├── supabase.ts
│   ├── openrouter-service.ts
│   ├── stripe.ts
│   ├── mercadopago.ts
│   ├── whatsapp.ts
│   └── utils.ts
├── styles/
│   └── globals.css
├── public/
│   ├── images/
│   ├── videos/
│   └── icons/
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### 8.2 APIs REST Principales

#### Autenticación
```typescript
POST /api/auth/register
Input: { email, whatsapp, nombre, contraseña }
Output: { token, userId, mensaje }

POST /api/auth/login
Input: { email, contraseña }
Output: { token, userId, nombre, rol }

POST /api/auth/logout
Output: { mensaje }

POST /api/auth/reset-password
Input: { email }
Output: { mensaje }
```

#### Citas
```typescript
GET /api/citas
Query: { fecha, especialista_id, estado }
Output: [ { id, usuario, especialista, fecha, estado } ]

POST /api/citas
Input: { usuario_id, tratamiento_id, fecha_hora, especialista_id, sede_id }
Output: { cita_creada, confirmacion_enviada }

PUT /api/citas/:id
Input: { fecha_hora, estado, notas }
Output: { cita_actualizada }

DELETE /api/citas/:id
Output: { cita_cancelada, reembolso_procesado }

GET /api/citas/disponibilidad
Query: { tratamiento_id, sede_id, fecha }
Output: [ { startTime, endTime, specialistId, available } ]
```

#### Sofía IA
```typescript
POST /api/sofia/chat
Input: { user_id, mensaje, conversation_history }
Output: { respuesta_sofía, accion_sugerida, metadata }

GET /api/sofia/conversaciones/:user_id
Output: [ { mensaje_user, respuesta_sofía, timestamp, satisfaccion } ]
```

#### Pagos
```typescript
POST /api/pagos/stripe/checkout
Input: { usuario_id, cita_id, monto }
Output: { session_id, url_checkout }

POST /api/pagos/mercadopago/checkout
Input: { usuario_id, cita_id, monto }
Output: { preference_id, init_point }

POST /api/webhooks/stripe
Input: Stripe webhook event
Output: { received: true }

POST /api/webhooks/mercadopago
Input: Mercado Pago webhook event
Output: { received: true }
```

#### Productos
```typescript
GET /api/productos
Query: { categoria, precio_min, precio_max }
Output: [ { id, nombre, precio, stock, imagenes } ]

POST /api/productos/comprar
Input: { usuario_id, items: [{ producto_id, cantidad }] }
Output: { orden_id, total, checkout_url }
```

#### Contenido IA
```typescript
POST /api/contenido/generar
Input: { tipo, plataforma, prompt, opciones }
Output: { contenido_generado, url_media, costo }

POST /api/contenido/publicar
Input: { contenido_id, fecha_programada }
Output: { programado: true }

GET /api/contenido/calendario
Query: { fecha_inicio, fecha_fin }
Output: [ { fecha, contenidos: [] } ]
```

### 8.3 Componentes Clave

#### ChatSofia Component
```typescript
interface ChatSofiaProps {
  userId?: string;
  initialMessage?: string;
  onAppointmentBooked?: (appointmentId: string) => void;
  position?: 'floating' | 'embedded';
}

// Features:
// - Real-time messaging
// - Typing indicator
// - Message history
// - Quick actions (agendar, ver tratamientos)
// - Satisfaction rating
// - Escalate to human
```

#### ARPreview Component
```typescript
interface ARPreviewProps {
  treatmentId: string;
  onSave?: (imageUrl: string) => void;
  onBookConsultation?: () => void;
}

// Features:
// - Camera access
// - Facial detection (Gemini Nano Banana)
// - Real-time overlay
// - Intensity slider
// - Before/after comparison
// - Save with watermark
```

#### Calendar Component
```typescript
interface CalendarProps {
  treatmentId?: string;
  specialistId?: string;
  locationId?: string;
  onSlotSelected: (slot: TimeSlot) => void;
}

// Features:
// - Month view
// - Available slots
// - VIP priority slots
// - Specialist info
// - Location info
```

### 8.4 Integraciones Externas

#### OpenRouter (IA)
```typescript
// Configuración
const openrouter = new OpenRouter({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  defaultModel: 'meta-llama/llama-2-70b-chat'
});

// Uso para Sofía
const response = await openrouter.chat({
  messages: [
    { role: 'system', content: SOFIA_SYSTEM_PROMPT },
    { role: 'user', content: userMessage }
  ],
  temperature: 0.7,
  max_tokens: 500
});
```

#### Stripe (Pagos)
```typescript
// Crear checkout session
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: { name: tratamiento.nombre },
      unit_amount: precio * 100
    },
    quantity: 1
  }],
  mode: 'payment',
  success_url: `${baseUrl}/citas/${citaId}/confirmacion`,
  cancel_url: `${baseUrl}/citas/${citaId}/pago`
});

// Suscripciones VIP
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }],
  payment_behavior: 'default_incomplete',
  expand: ['latest_invoice.payment_intent']
});
```

#### Twilio WhatsApp
```typescript
// Enviar recordatorio
await twilio.messages.create({
  from: 'whatsapp:+14155238886',
  to: `whatsapp:${user.whatsapp}`,
  body: `Hola ${user.nombre}! 
  
Recordatorio: Tienes una cita mañana a las ${hora}.

📍 ${sede.nombre}
💆 ${tratamiento.nombre}
👨‍⚕️ ${especialista.nombre}

¿Confirmas tu asistencia? Responde SÍ o NO.`
});
```

#### Google Maps
```typescript
// Mostrar mapa de sedes
<GoogleMap
  center={{ lat: sede.latitud, lng: sede.longitud }}
  zoom={15}
  markers={sedes.map(s => ({
    position: { lat: s.latitud, lng: s.longitud },
    title: s.nombre
  }))}
/>

// Calcular distancia
const distance = google.maps.geometry.spherical.computeDistanceBetween(
  new google.maps.LatLng(userLat, userLng),
  new google.maps.LatLng(sede.latitud, sede.longitud)
);
```

#### Gemini Nano Banana (AR)
```typescript
// Inicializar AR
const ar = await GeminiNano.initialize({
  model: 'facial-analysis-v1',
  onDevice: true
});

// Procesar frame
const result = await ar.processFrame(videoFrame, {
  treatment: 'botox',
  intensity: 0.7
});

// Aplicar overlay
canvas.drawImage(result.overlayImage, 0, 0);
```

---

## 9. SEGURIDAD Y PRIVACIDAD

### 9.1 Autenticación y Autorización
```typescript
// JWT con Supabase Auth
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});

// Middleware de protección
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('sb-access-token');
  
  if (!token) {
    return NextResponse.redirect('/login');
  }
  
  const { data: { user } } = await supabase.auth.getUser(token.value);
  
  if (!user) {
    return NextResponse.redirect('/login');
  }
  
  return NextResponse.next();
}
```

### 9.2 Row Level Security (RLS)
```sql
-- Usuarios ven solo sus datos
CREATE POLICY "Users view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Usuarios ven solo sus citas
CREATE POLICY "Users view own appointments"
  ON citas FOR SELECT
  USING (auth.uid() = usuario_id);

-- Admins ven todo
CREATE POLICY "Admins view all"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND rol IN ('super_admin', 'admin')
    )
  );

-- Público ve tratamientos activos
CREATE POLICY "Public view treatments"
  ON tratamientos FOR SELECT
  USING (activo = true);
```

### 9.3 Rate Limiting
```typescript
// Configuración por tipo de usuario
const rateLimits = {
  public: {
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100
  },
  authenticated: {
    windowMs: 15 * 60 * 1000,
    max: 500
  },
  ai: {
    windowMs: 60 * 1000, // 1 min
    max: 10
  },
  admin: {
    windowMs: 15 * 60 * 1000,
    max: 1000
  }
};
```

### 9.4 Encriptación
- ✅ HTTPS/TLS 1.3 obligatorio
- ✅ Passwords hasheados con bcrypt (12 rounds)
- ✅ JWT tokens con expiración 24h
- ✅ Datos médicos encriptados en reposo
- ✅ PCI DSS compliance para pagos

### 9.5 Privacidad
- ✅ Consentimiento explícito para datos médicos
- ✅ Consentimiento para fotos antes/después
- ✅ Opt-out de marketing
- ✅ Derecho al olvido (90 días)
- ✅ Exportación de datos en JSON
- ✅ Audit trail de accesos

---

## 10. PERFORMANCE Y OPTIMIZACIÓN

### 10.1 Frontend
```typescript
// Code splitting
const ChatSofia = dynamic(() => import('@/components/ChatSofia'), {
  loading: () => <Skeleton />,
  ssr: false
});

// Image optimization
<Image
  src="/tratamiento.jpg"
  alt="Tratamiento"
  width={800}
  height={600}
  placeholder="blur"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// Caching con SWR
const { data } = useSWR('/api/tratamientos', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000
});
```

### 10.2 Backend
```typescript
// Database indexing
CREATE INDEX idx_citas_usuario_fecha 
  ON citas(usuario_id, fecha_hora DESC);

CREATE INDEX idx_productos_categoria_stock 
  ON productos(categoria, stock_total) 
  WHERE activo = true;

// Query optimization
const { data } = await supabase
  .from('citas')
  .select('id, fecha_hora, tratamiento:tratamientos(nombre, precio_base)')
  .eq('usuario_id', userId)
  .order('fecha_hora', { ascending: false })
  .limit(10);

// Caching con Redis
const cached = await redis.get(`tratamiento:${id}`);
if (cached) return JSON.parse(cached);

const data = await fetchFromDB(id);
await redis.setex(`tratamiento:${id}`, 3600, JSON.stringify(data));
```

### 10.3 AI Cost Optimization
```typescript
// Cache similar queries
const cacheKey = `sofia:${hashMessage(message)}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// Use cheaper models for simple tasks
function selectModel(taskType: string) {
  switch (taskType) {
    case 'simple_qa':
      return 'meta-llama/llama-2-13b-chat'; // Cheaper
    case 'complex_reasoning':
      return 'meta-llama/llama-2-70b-chat';
    case 'content_generation':
      return 'mistralai/mistral-7b-instruct';
    default:
      return 'meta-llama/llama-2-70b-chat';
  }
}
```

### 10.4 Métricas Objetivo
- ⚡ Load time: <2s
- ⚡ API response: <500ms (p95)
- ⚡ PageSpeed score: >95
- ⚡ First Contentful Paint: <1.5s
- ⚡ Time to Interactive: <3s
- ⚡ Cumulative Layout Shift: <0.1

---


## 11. DEPLOYMENT Y CI/CD

### 11.1 Ambientes
| Ambiente | URL | Database | AI Budget |
|----------|-----|----------|-----------|
| Development | localhost:3000 | Local Supabase | Unlimited |
| Staging | staging.rebecabarreto.com | Staging DB | $50/month |
| Production | rebecabarreto.com | Production DB | $200/month |

### 11.2 Pipeline CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main, staging]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      
  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
```

### 11.3 Comandos de Deployment
```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Production
npm start

# Deploy to Vercel
vercel --prod

# Database migrations
npm run migrate:prod

# Seed data
npm run seed
```

---

## 12. COSTOS ESTIMADOS

### 12.1 Infraestructura Mensual (Producción)
| Servicio | Tier | Costo | Notas |
|----------|------|-------|-------|
| Vercel | Pro | $20 | Frontend hosting |
| Supabase | Pro | $25 | Database + Auth + Storage |
| Railway | Starter | $20 | Background jobs |
| OpenRouter | Usage | $50-150 | AI API calls (variable) |
| Twilio | Usage | $30-50 | WhatsApp + SMS |
| Stripe | Usage | 2.9% + $0.30 | Per transaction |
| Mercado Pago | Usage | 2.5% + fees | Per transaction |
| SendGrid | Free | $0 | Up to 100 emails/day |
| Sentry | Team | $26 | Error tracking |
| Domain | Annual | $2 | .com domain |

**Total Fijo:** ~$193/month  
**Total Variable:** ~$80-200/month  
**Estimado Total:** $273-393/month

### 12.2 Desarrollo
- **Opción A (Outsourcing):** $10,800-18,700 USD
- **Opción B (Equipo dedicado):** $18,000-28,800 USD
- **Recomendado:** $15,000 USD

---

## 13. ROADMAP DE DESARROLLO

### Fase 1: MVP Core (Semanas 1-8)
**Objetivo:** Plataforma funcional básica

- ✅ Setup proyecto Next.js + Supabase
- ✅ Autenticación (login, registro, reset)
- ✅ Landing page impactante
- ✅ Catálogo de tratamientos
- ✅ Sistema de citas
- ✅ Pagos (Stripe + Mercado Pago)
- ✅ Panel de cliente básico
- ✅ Agente Sofía IA
- ✅ Panel admin básico

**Entregable:** Plataforma MVP funcional

### Fase 2: Gamificación (Semanas 9-10)
**Objetivo:** Engagement y retención

- ✅ Puntos de lealtad
- ✅ Sistema de referidos viral
- ✅ Concursos
- ✅ Membresías VIP

**Entregable:** Sistema de gamificación completo

### Fase 3: E-commerce (Semana 11)
**Objetivo:** Ingresos adicionales

- ✅ Marketplace de productos
- ✅ Gestión de inventario
- ✅ Carrito y checkout

**Entregable:** Tienda online funcional

### Fase 4: Features Avanzadas (Semanas 12-14)
**Objetivo:** Diferenciación competitiva

- ✅ Geolocalización y múltiples sedes
- ✅ Reseñas verificadas
- ✅ Programa de embajadores
- ✅ Financiamiento
- ✅ AR con Gemini Nano Banana
- ✅ Creación de contenido con IA
- ✅ Mensajería automatizada avanzada
- ✅ Analytics completo

**Entregable:** Plataforma completa con features premium

### Fase 5: Testing y Optimización (Semana 15)
**Objetivo:** Calidad y performance

- ✅ Testing completo (unit, integration, E2E)
- ✅ Optimización de performance
- ✅ Security audit
- ✅ SEO optimization

**Entregable:** Plataforma lista para producción

### Fase 6: Deployment (Semana 16)
**Objetivo:** Lanzamiento oficial

- ✅ Deploy a producción
- ✅ Configuración DNS y SSL
- ✅ Monitoring y alertas
- ✅ Backups automáticos
- ✅ Smoke tests

**Entregable:** Plataforma LIVE en producción

---

## 14. MÉTRICAS DE ÉXITO

### 14.1 KPIs de Negocio
- **Conversión:** 15%+ visitantes → consultas
- **Retención:** 80%+ clientes recurrentes
- **NPS:** 70+
- **Crecimiento:** 50+ consultas/mes
- **Ticket promedio:** $200+ USD
- **LTV:** $1,200+ USD por cliente

### 14.2 KPIs Técnicos
- **Uptime:** 99.9%+
- **Load time:** <2s
- **API response:** <500ms (p95)
- **PageSpeed:** >95
- **Error rate:** <1%

### 14.3 KPIs de Sofía
- **Satisfacción:** 4.7/5+
- **Response time:** <2 min
- **Conversión chat → cita:** 28%+
- **Escalamiento:** <8%

### 14.4 KPIs de Contenido IA
- **Costo por post:** <$2 USD
- **Engagement rate:** >5%
- **Posts/semana:** 20+
- **Ahorro de tiempo:** 80%+

---

## 15. CASOS DE USO PRINCIPALES

### Caso 1: Cliente Nueva Agenda Primera Cita
1. María (35 años) busca "botox Asunción" en Google
2. Llega a rebecabarreto.com
3. Ve landing page con antes/después
4. Hace click en "Habla con Sofía"
5. Sofía la saluda y pregunta qué le preocupa
6. María: "Tengo arrugas pero no sé si botox es seguro"
7. Sofía valida su preocupación y explica seguridad
8. Muestra casos similares con fotos
9. Ofrece consulta inicial SIN COSTO
10. María acepta y ve calendario
11. Selecciona martes 19h con Dra. Martina
12. Procede a pago (consulta gratis, solo confirma)
13. Recibe confirmación por WhatsApp
14. Recibe recordatorio 24h antes
15. Asiste a cita y queda encantada
16. Sofía envía seguimiento 24h después
17. María deja reseña 5 estrellas
18. Gana 10 puntos de lealtad

### Caso 2: Cliente VIP Usa Membresía
1. Carolina es miembro Gold ($100/mes)
2. Entra a su panel de cliente
3. Ve que tiene 1 consulta gratis disponible
4. Quiere agendar HIFU facial
5. Ve slots prioritarios (antes que no-VIP)
6. Selecciona jueves 10h
7. Precio muestra $350 → $297.50 (15% descuento Gold)
8. Confirma cita
9. Usa su consulta gratis del mes
10. Paga solo el tratamiento con descuento
11. Gana 10 puntos + 50 bonus Gold
12. Recibe recordatorios automáticos
13. Completa tratamiento
14. Deja reseña y gana 50 puntos más
15. Total: 110 puntos ganados

### Caso 3: Cliente Refiere Amigas (Viral)
1. Lucía tiene código LUCIA2025
2. Comparte link en WhatsApp con 5 amigas
3. Paula hace click y se registra
4. Paula debe compartir con 2 personas más
5. Paula comparte con Ana y Sofía
6. Ana y Sofía se registran
7. Paula desbloquea "caja secreta"
8. Gana descuento 20% en próxima cita
9. Ana agenda cita de mesoterapia
10. Lucía gana 50 puntos (referido nivel 1)
11. Paula gana 25 puntos (referido nivel 2)
12. Lucía sube en leaderboard
13. Al mes, Lucía es top 3 referrer
14. Gana premio especial + badge

### Caso 4: Admin Crea Contenido con IA
1. Admin entra a panel de contenido
2. Click en "Generar contenido"
3. Ingresa brief: "Promoción de verano, HIFU + Botox combo"
4. Selecciona: Instagram post + reel + story
5. IA genera en 2 minutos:
   - Texto optimizado
   - 3 imágenes con branding
   - Video de 30 segundos
   - Hashtags relevantes
6. Admin revisa y aprueba
7. Programa para publicar: lunes 7pm
8. Sistema publica automáticamente
9. Tracking de engagement en tiempo real
10. Post genera 150 likes, 20 comentarios
11. 5 personas hacen click en "Agendar"
12. 2 convierten en citas reales

### Caso 5: Cliente Usa AR para Ver Resultados
1. Gabriela ve tratamiento de Botox
2. Click en "Ver en mi rostro" (AR)
3. Permite acceso a cámara
4. Gemini Nano detecta su rostro
5. Muestra overlay con arrugas suavizadas
6. Ajusta intensidad: leve → moderado → dramático
7. Elige "moderado" que se ve natural
8. Toma screenshot de comparación
9. Guarda imagen con watermark
10. Se siente segura del resultado
11. Click en "Agendar consulta"
12. Completa agendamiento
13. Muestra foto al especialista en cita
14. Especialista confirma expectativas realistas

---

## 16. PREGUNTAS FRECUENTES (FAQs)

### Para Desarrolladores

**Q: ¿Por qué Next.js 14 y no otra tecnología?**
A: Next.js 14 ofrece SSR, SSG, API routes, optimización automática de imágenes, y excelente SEO out-of-the-box. Es ideal para una plataforma que necesita performance y conversión.

**Q: ¿Por qué Supabase y no Firebase o backend custom?**
A: Supabase ofrece PostgreSQL (más robusto que Firestore), RLS nativo, auth integrado, y es open-source. Más barato y flexible que Firebase para este caso de uso.

**Q: ¿Por qué OpenRouter y no OpenAI directo?**
A: OpenRouter permite acceso a múltiples modelos (Llama, Mistral, Claude) con una sola API, comparación de costos, y fallback automático. Optimiza costos significativamente.

**Q: ¿Cómo se maneja la escalabilidad?**
A: Vercel escala automáticamente el frontend. Supabase maneja hasta 10k+ conexiones concurrentes. Para más, se agregan read replicas y caching con Redis.

**Q: ¿Qué pasa si Sofía no puede responder?**
A: Sistema de escalamiento automático a humano. Admin recibe notificación y puede tomar control de la conversación.

### Para Negocio

**Q: ¿Cuánto tiempo toma implementar?**
A: MVP en 8 semanas, plataforma completa en 16 semanas.

**Q: ¿Cuál es el costo mensual de operación?**
A: $273-393 USD/mes para infraestructura. Variable según uso de IA y transacciones.

**Q: ¿Cómo se monetiza?**
A: 
1. Citas de tratamientos (principal)
2. Membresías VIP recurrentes
3. Venta de productos skincare
4. Comisiones de embajadores

**Q: ¿Qué ROI se espera?**
A: Con 50 citas/mes a $200 promedio = $10k/mes revenue. Costos ~$400/mes. ROI 2400%. Break-even en mes 2-3.

**Q: ¿Es escalable a otras ciudades/países?**
A: Sí, arquitectura multi-sede lista. Solo agregar nuevas sedes en base de datos.

---

## 17. GLOSARIO TÉCNICO

- **RLS:** Row Level Security - Seguridad a nivel de fila en PostgreSQL
- **JWT:** JSON Web Token - Token de autenticación
- **SSR:** Server-Side Rendering - Renderizado en servidor
- **SSG:** Static Site Generation - Generación de sitios estáticos
- **CDN:** Content Delivery Network - Red de distribución de contenido
- **API:** Application Programming Interface - Interfaz de programación
- **CRM:** Customer Relationship Management - Gestión de relaciones con clientes
- **NPS:** Net Promoter Score - Métrica de satisfacción
- **LTV:** Lifetime Value - Valor de vida del cliente
- **AR:** Augmented Reality - Realidad aumentada
- **IA/AI:** Inteligencia Artificial
- **MVP:** Minimum Viable Product - Producto mínimo viable
- **KPI:** Key Performance Indicator - Indicador clave de rendimiento

---

## 18. CONTACTO Y SOPORTE

**Repositorio:** https://github.com/nftencuestas123/Estetica-Rebeca.git

**Documentación Técnica:**
- Requirements: `.kiro/specs/rebeca-barreto-platform/requirements.md`
- Design: `.kiro/specs/rebeca-barreto-platform/design.md`
- Tasks: `.kiro/specs/rebeca-barreto-platform/tasks.md`

**Stack Documentation:**
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- OpenRouter: https://openrouter.ai/docs
- Stripe: https://stripe.com/docs
- Tailwind: https://tailwindcss.com/docs

---

## 19. CONCLUSIÓN

Este PRD define una plataforma completa y competitiva para el sector de estética y belleza en Paraguay. La combinación de:

✅ **Tecnología moderna** (Next.js, Supabase, IA)  
✅ **Experiencia premium** (diseño elegante, Sofía IA)  
✅ **Gamificación** (puntos, referidos, concursos)  
✅ **E-commerce** (productos, membresías)  
✅ **Automatización** (contenido IA, mensajería)  
✅ **Innovación** (AR, financiamiento)  

Posiciona a Rebeca Barreto como líder del mercado con ventajas competitivas sostenibles.

**Timeline:** 16 semanas hasta producción  
**Inversión:** $15,000 USD desarrollo + $400/mes operación  
**ROI Proyectado:** 2400%+ en año 1  
**Escalabilidad:** Multi-sede, multi-país ready  

---

**Versión:** 1.0  
**Fecha:** Noviembre 2025  
**Estado:** ✅ Completo y listo para implementación  
**Próximo paso:** Comenzar Fase 1 - MVP Core

---

## APÉNDICE A: COMANDOS RÁPIDOS

```bash
# Crear proyecto
npx create-next-app@latest rebeca-barreto --typescript --tailwind --app

# Instalar dependencias principales
npm install @supabase/supabase-js @stripe/stripe-js stripe
npm install zustand react-hook-form zod framer-motion
npm install @shadcn/ui lucide-react

# Instalar dev dependencies
npm install -D @types/node @types/react eslint prettier

# Configurar Supabase
npx supabase init
npx supabase start

# Desarrollo
npm run dev

# Build
npm run build

# Deploy
vercel --prod
```

---

## APÉNDICE B: CHECKLIST DE LANZAMIENTO

### Pre-Launch
- [ ] Todos los tests pasando
- [ ] Performance >95 PageSpeed
- [ ] Security audit completado
- [ ] Backups configurados
- [ ] Monitoring activo
- [ ] DNS configurado
- [ ] SSL certificado
- [ ] Variables de entorno en producción
- [ ] Seed data en producción
- [ ] Smoke tests exitosos

### Launch Day
- [ ] Deploy a producción
- [ ] Verificar todas las integraciones
- [ ] Probar flujo completo de usuario
- [ ] Probar Sofía en producción
- [ ] Verificar pagos funcionando
- [ ] Verificar WhatsApp funcionando
- [ ] Verificar emails funcionando
- [ ] Monitorear errores en Sentry
- [ ] Anuncio en redes sociales
- [ ] Notificar a clientes beta

### Post-Launch (Primera semana)
- [ ] Monitorear métricas diariamente
- [ ] Responder feedback de usuarios
- [ ] Ajustar Sofía según conversaciones
- [ ] Optimizar conversión
- [ ] Revisar costos de IA
- [ ] Ajustar inventario de productos
- [ ] Crear contenido de lanzamiento
- [ ] Iniciar campañas de marketing

---

**FIN DEL PRD COMPLETO**

Este documento contiene toda la información necesaria para implementar la plataforma Rebeca Barreto Estética y Belleza desde cero hasta producción.

Para comenzar el desarrollo, sigue el orden del Roadmap (Sección 13) y consulta la documentación técnica detallada en las secciones 4-8.

¡Éxito en el desarrollo! 🚀
