# 🌸 Estética Rebeca

SaaS profesional para gestión de estética con sistema de autenticación propio, landing pages, asistente de voz IA, y publicación automática en redes sociales.

---

## 🚀 **INICIO RÁPIDO**

### **Opción 1: Servidor Persistente (Recomendado)**

El servidor se mantendrá corriendo en segundo plano y se reiniciará automáticamente si se cae:

```bash
# Iniciar servidor persistente
.\INICIAR_SERVIDOR.bat

# Ver estado del servidor
.\VER_ESTADO_SERVIDOR.bat

# Ver logs en tiempo real
.\VER_LOGS_SERVIDOR.bat

# Reiniciar servidor
.\REINICIAR_SERVIDOR.bat

# Detener servidor
.\DETENER_SERVIDOR.bat
```

### **Opción 2: Servidor Normal (Tradicional)**

```bash
npm run dev
```

---

## 📋 **CARACTERÍSTICAS PRINCIPALES**

### ✅ **Autenticación JWT**
- Sistema propio sin Supabase Auth
- Cookies HttpOnly + Secure
- Roles: Admin y Cliente
- Registro con verificación de email
- Recuperación de contraseña
- Preguntas de seguridad para admin

### ✅ **Panel de Administración**
- Dashboard completo
- Gestión de clientes
- Asistente de voz con ElevenLabs
- Generador de videos con IA
- Publicación en redes sociales
- Configuración de landing pages

### ✅ **Panel de Clientes**
- Dashboard personalizado
- Sistema de créditos
- Selección de landing page
- Estadísticas de uso
- Chat con Sofia (IA)

### ✅ **Landing Pages**
- 10 diseños diferentes
- Optimización extrema (carga < 2 segundos)
- Lazy loading inteligente
- Imágenes comprimidas
- Responsive design

### ✅ **Asistente de Voz IA**
- Integración con ElevenLabs
- Conversaciones naturales
- Vocabulario paraguayo
- Aprendizaje continuo
- Sistema de créditos

### ✅ **Publicación en Redes Sociales**
- Facebook
- Instagram
- TikTok
- Programación de posts
- Analytics integrados

---

## 🛠️ **INSTALACIÓN**

### **1. Clonar repositorio**

```bash
git clone https://github.com/nftencuestas123/Estetica-Rebeca.git
cd Estetica-Rebeca
```

### **2. Instalar dependencias**

```bash
npm install
```

### **3. Configurar variables de entorno**

Copia `.env.example` a `.env.local` y configura tus credenciales:

```bash
cp .env.example .env.local
```

Variables necesarias:
- `NEXT_PUBLIC_SUPABASE_URL` - URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clave pública de Supabase
- `JWT_SECRET` - Secreto para firmar tokens JWT
- `OPENROUTER_API_KEY` - API key para OpenRouter (IA)

### **4. Configurar base de datos**

Ve a tu panel de Supabase y ejecuta los scripts SQL necesarios para crear las 23 tablas requeridas.

### **5. Iniciar servidor**

```bash
# Servidor persistente (recomendado)
.\INICIAR_SERVIDOR.bat

# O servidor normal
npm run dev
```

### **6. Abrir en navegador**

```
http://localhost:3000
```

---

## 📦 **TECNOLOGÍAS UTILIZADAS**

- **Framework:** Next.js 14.2 (App Router)
- **Lenguaje:** TypeScript
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** JWT + bcryptjs
- **Estilos:** Tailwind CSS
- **IA:** OpenRouter + ElevenLabs
- **Gestión de procesos:** PM2
- **Deployment:** Railway
- **Imágenes:** Sharp (compresión)
- **Logging:** Winston

---

## 🔒 **SEGURIDAD**

- ✅ Passwords hasheados con bcryptjs (10 rounds)
- ✅ JWT con expiración de 7 días
- ✅ Cookies HttpOnly + Secure
- ✅ Protección CSRF (SameSite: lax)
- ✅ Validación de roles en layouts
- ✅ RLS deshabilitado (single-tenant)
- ✅ Audit log de acciones

---

## 📊 **ESTRUCTURA DEL PROYECTO**

```
estetica-rebeca/
├── app/                              # Next.js App Router
│   ├── (admin)/                      # Panel admin
│   ├── (auth)/                       # Autenticación
│   ├── (landing)/                    # Landing pages
│   ├── api/                          # API routes
│   └── dashboard/                    # Panel cliente
├── components/                       # Componentes React
├── services/                         # Lógica de negocio
├── lib/                              # Utilidades
├── hooks/                            # Custom hooks
├── contexts/                         # Context API
├── constants/                        # Constantes
├── types/                            # TypeScript types
├── public/                           # Assets estáticos
├── logs/                             # Logs de PM2
├── ecosystem.config.js               # Configuración PM2
├── INICIAR_SERVIDOR.bat              # Iniciar servidor persistente
├── DETENER_SERVIDOR.bat              # Detener servidor
├── REINICIAR_SERVIDOR.bat            # Reiniciar servidor
├── VER_ESTADO_SERVIDOR.bat           # Ver estado
└── VER_LOGS_SERVIDOR.bat             # Ver logs
```

---

## 🎯 **GESTIÓN DEL SERVIDOR**

### **Comandos de PM2**

```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs estetica-rebeca

# Reiniciar
pm2 restart estetica-rebeca

# Detener
pm2 stop estetica-rebeca

# Eliminar del PM2
pm2 delete estetica-rebeca

# Ver información detallada
pm2 info estetica-rebeca

# Monitoreo en tiempo real
pm2 monit
```

### **Inicio Automático al Arrancar PC**

1. Ejecuta como **Administrador**: `INICIAR_AL_ARRANQUE.bat`
2. Copia el comando que te muestra PM2
3. Abre PowerShell como **Administrador**
4. Pega y ejecuta el comando
5. Ejecuta: `pm2 save`

✅ Ahora el servidor se iniciará automáticamente al encender tu PC

---

## 🗄️ **TABLAS DE SUPABASE**

El proyecto utiliza 23 tablas:

### **Autenticación**
- `auth_users`
- `auth_email_verification`
- `password_reset_tokens`
- `admin_security_gate`

### **Landing Pages**
- `pages`
- `user_landing_pages`

### **Asistente de Voz**
- `voice_assistant_clients`
- `voice_assistant_credits_log`
- `voice_assistant_integrations`
- `voice_assistant_usage`
- `voice_interactions`

### **Créditos**
- `user_credits`
- `credit_transactions`
- `credit_purchase_requests`
- `credit-receipts`

### **Chat IA**
- `conversaciones_sofia`
- `vocabulario_paraguayo`
- `patrones_conversacion`
- `feedback_conversaciones`
- `aprendizaje_continuo`

### **Redes Sociales**
- `social_accounts`
- `social_posts`

### **Otros**
- `users`

---

## 📝 **SCRIPTS DISPONIBLES**

```bash
# Desarrollo
npm run dev                 # Iniciar servidor desarrollo

# Producción
npm run build               # Compilar para producción
npm run start               # Iniciar servidor producción

# Calidad de código
npm run type-check          # Verificar TypeScript
npm run lint                # Linting con ESLint
npm test                    # Ejecutar tests

# Utilidades
npm run compress-images     # Comprimir imágenes
```

---

## 🚀 **DEPLOYMENT**

### **Railway (Automático)**

El proyecto está configurado para deployment automático en Railway:

1. Conecta tu repositorio de GitHub
2. Railway detecta cambios automáticamente
3. Ejecuta build y deploy
4. Variables de entorno configuradas en Railway Dashboard

Archivos de configuración:
- `railway.json`
- `nixpacks.toml`
- `server.js`

---

## 📄 **LICENCIA**

Proyecto privado - Todos los derechos reservados

---

## 👤 **AUTOR**

**nftencuestas123**
- GitHub: [@nftencuestas123](https://github.com/nftencuestas123)
- Repositorio: [Estetica-Rebeca](https://github.com/nftencuestas123/Estetica-Rebeca)

---

## 📞 **SOPORTE**

Para consultas o problemas, revisa:
- `⚡_INSTRUCCIONES_DIARIAS_EJECUTIVO.md` - Guía completa de desarrollo
- `CHANGELOG.md` - Historial de cambios
- Issues en GitHub

---

**🌸 Estética Rebeca - SaaS Profesional v1.0.0**

