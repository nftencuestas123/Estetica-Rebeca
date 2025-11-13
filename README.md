# Rebeca Barreto Estética y Belleza

Plataforma web integral para centro de estética y belleza en Ciudad del Este, Paraguay.

## 🚀 Características Principales

- **Landing Page Impactante**: Diseño elegante con hero section, catálogo de tratamientos y testimonios
- **Agente Sofía IA**: Asistente virtual empática 24/7 con OpenRouter (Llama 2 70B)
- **Sistema de Autenticación**: Login, registro y gestión de usuarios con Supabase Auth
- **Panel de Cliente**: Dashboard personalizado con citas, puntos de lealtad y chat
- **Panel de Administración**: CRM completo, gestión de citas y analytics
- **Sistema de Citas**: Agendamiento y gestión de citas
- **Base de Datos**: PostgreSQL con Supabase, RLS configurado

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **IA**: OpenRouter (Meta Llama 2 70B)
- **Deployment**: Vercel (recomendado)

## 📋 Prerequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase
- API Key de OpenRouter

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/nftencuestas123/Estetica-Rebeca.git
cd Estetica-Rebeca
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia `.env.local.example` a `.env.local` y completa las variables:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus credenciales:
- `NEXT_PUBLIC_SUPABASE_URL`: URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon key de Supabase
- `NEXT_PUBLIC_OPENROUTER_API_KEY`: API key de OpenRouter

4. **Configurar base de datos**

Ejecuta las migraciones SQL en tu proyecto Supabase:

```bash
# En el dashboard de Supabase, ve a SQL Editor y ejecuta:
supabase/migrations/001_initial_schema.sql
```

O usa la CLI de Supabase:
```bash
npx supabase db push
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
├── app/
│   ├── (auth)/          # Páginas de autenticación
│   ├── (client)/        # Panel de cliente
│   ├── (admin)/         # Panel de administración
│   ├── api/             # API routes
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Landing page
├── components/          # Componentes React
│   ├── ChatSofia.tsx   # Componente del chat IA
│   ├── Navbar.tsx      # Navegación
│   └── Hero.tsx        # Hero section
├── lib/                # Utilidades y servicios
│   ├── supabase.ts     # Cliente Supabase
│   ├── openrouter-service.ts  # Servicio IA
│   └── utils.ts        # Utilidades
├── supabase/
│   └── migrations/      # Migraciones SQL
└── public/             # Archivos estáticos
```

## 🤖 Agente Sofía

El agente Sofía está configurado según el entrenamiento proporcionado:
- **Empatía profunda**: Valida emociones y acompaña
- **Personalización extrema**: Usa el nombre del usuario
- **Tono paraguayo**: Expresiones locales ("sos", "nomás", "querés")
- **Sin presión**: Invitaciones suaves y amigables
- **Mejor amiga**: Experiencia cálida y de apoyo

Configuración en `lib/openrouter-service.ts`

## 🔐 Seguridad

- **Row Level Security (RLS)**: Configurado en Supabase
- **Autenticación**: Supabase Auth con JWT
- **Políticas de acceso**: Usuarios solo ven sus propios datos
- **Variables de entorno**: Credenciales seguras

## 📊 Base de Datos

Tablas principales:
- `users`: Perfiles de clientes
- `citas`: Citas y agendamientos
- `tratamientos`: Catálogo de tratamientos
- `productos`: Productos de skincare
- `conversaciones_sofia`: Historial de chat con IA
- `sedes`: Ubicaciones de clínicas
- `especialistas`: Staff médico

## 🚢 Deployment

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel
3. Deploy automático en cada push a `main`

```bash
vercel --prod
```

### Variables de Entorno en Producción

Asegúrate de configurar todas las variables de `.env.local` en tu plataforma de deployment.

## 📝 Próximos Pasos

- [ ] Implementar sistema de pagos (Stripe + Mercado Pago)
- [ ] Agregar sistema de puntos de lealtad completo
- [ ] Implementar sistema de referidos
- [ ] Agregar membresías VIP
- [ ] Integrar WhatsApp (Twilio)
- [ ] Implementar AR con Gemini Nano
- [ ] Agregar generación de contenido con IA
- [ ] Sistema de reseñas verificadas

## 📄 Licencia

Este proyecto es privado y propiedad de Rebeca Barreto Estética y Belleza.

## 🤝 Soporte

Para soporte técnico, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para Rebeca Barreto Estética y Belleza**

