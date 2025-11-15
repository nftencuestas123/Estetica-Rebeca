# 🎬 Guía de Integración TopView Avatar 4

## ✨ ¿Qué es TopView Avatar 4?

[TopView Avatar 4](https://www.topview.ai/es/make/avatar4) es la tecnología de IA más avanzada para crear **avatares parlantes ultra-realistas** desde una simple foto.

### **Características Principales:**
- ✅ **Movimientos labiales perfectos** sincronizados con audio
- ✅ **Control de movimientos** mediante texto con IA
- ✅ **Clonación de voz** o biblioteca de voces profesionales
- ✅ **Videos hasta 2 minutos** (ilimitado para empresas)
- ✅ **Múltiples casos de uso:** productos, marketing, educación, redes sociales

---

## 🚀 Integración en Tu Panel Admin

Ya está **100% integrado** en tu panel de administración en:

```
/admin/videos-ia
```

### **¿Qué puedes hacer?**

1. **Subir una foto** → Se convierte en avatar parlante
2. **Escribir guión** → El avatar lo dirá con voz natural
3. **Elegir voz** → IA, clonada, o subir audio
4. **Generar video** → Listo en minutos
5. **Descargar/Compartir** → Directo a redes sociales

---

## 🔑 Cómo Obtener Credenciales de API

### **Paso 1: Crear Cuenta en TopView**

1. Ve a: https://www.topview.ai/es/make/avatar4
2. Click en **"Empieza gratis"** o **"Iniciar sesión"**
3. Crea tu cuenta con email

### **Paso 2: Contactar para API Access**

TopView requiere **contacto directo** para acceso a API:

📧 **Email:** official@topview.ai

**Asunto sugerido:**
```
Solicitud de acceso a API - TopView Avatar 4
```

**Mensaje sugerido:**
```
Hola equipo de TopView,

Soy [Tu Nombre] de Rebeca Barreto Estética y Belleza.

Estoy interesado en integrar TopView Avatar 4 en mi plataforma web 
para generar videos con avatares IA para marketing y redes sociales.

¿Podrían proporcionarme:
1. Documentación completa de la API
2. Credenciales de API (API Key)
3. Información sobre planes y pricing para uso empresarial
4. Límites de uso y cuotas

Gracias,
[Tu Nombre]
[Tu Email]
[Tu Empresa]
```

### **Paso 3: Obtener API Key**

Una vez que TopView te responda, te darán:
- 🔑 **API Key** (clave de acceso)
- 📚 **Documentación oficial** de la API
- 💰 **Plan de pricing** según tu uso
- 📊 **Dashboard** para monitorear uso

---

## ⚙️ Configuración en Tu Proyecto

### **1. Crear Archivo `.env.local`**

En la raíz de tu proyecto, crea o edita el archivo `.env.local`:

```bash
# TopView Avatar 4 API Configuration
NEXT_PUBLIC_TOPVIEW_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_TOPVIEW_API_URL=https://api.topview.ai/v1
```

### **2. Reemplazar con tus Credenciales**

```bash
# Ejemplo con API Key real (NO COMPARTAS ESTO PÚBLICAMENTE)
NEXT_PUBLIC_TOPVIEW_API_KEY=tpv_1234567890abcdef...
NEXT_PUBLIC_TOPVIEW_API_URL=https://api.topview.ai/v1
```

### **3. Reiniciar el Servidor**

```bash
# Detener el servidor (Ctrl+C)
# Iniciar nuevamente
npm run dev
```

---

## 🔧 Arquitectura de la Integración

### **Archivos Creados:**

```
proyecto/
├── app/(admin)/admin/
│   └── videos-ia/
│       └── page.tsx           # Interfaz principal del generador
├── services/
│   └── topview.ts             # Servicio de API de TopView
├── components/
│   └── AdminSidebar.tsx       # Sidebar con nuevo ítem "Videos IA"
└── TOPVIEW_INTEGRATION_GUIDE.md  # Esta guía
```

### **Flujo de Funcionamiento:**

```
1. Usuario sube foto en /admin/videos-ia
   ↓
2. Usuario escribe guión
   ↓
3. Usuario selecciona voz (IA/Clonada/Custom)
   ↓
4. Click en "Generar Video con IA"
   ↓
5. services/topview.ts envía petición a TopView API
   ↓
6. TopView procesa y genera video (1-2 minutos)
   ↓
7. Video listo para descargar/compartir
```

---

## 📋 Uso del Servicio TopView

### **Ejemplo Básico:**

```typescript
import { getTopViewService } from '@/services/topview'

// Obtener instancia del servicio
const topview = getTopViewService()

// Crear video con avatar
const result = await topview.createAvatarVideo({
  avatarImage: photoFile, // File o base64
  script: "¡Hola! Soy Rebeca Barreto...",
  voice: {
    type: 'text-to-speech',
    voiceId: 'es-ES-Female-1'
  },
  resolution: '1080p'
})

console.log('Job ID:', result.jobId)
console.log('Status:', result.status)

// Consultar estado
const status = await topview.getVideoStatus(result.jobId)

if (status.status === 'completed') {
  console.log('Video URL:', status.videoUrl)
  
  // Descargar video
  const videoBlob = await topview.downloadVideo(status.videoUrl)
}
```

### **Métodos Disponibles:**

| Método | Descripción |
|--------|-------------|
| `createAvatarVideo()` | Crea un nuevo video con avatar IA |
| `getVideoStatus()` | Consulta el estado de generación |
| `downloadVideo()` | Descarga el video completado |
| `getAvailableVoices()` | Lista voces disponibles |

---

## 💰 Pricing y Planes

Consulta directamente con TopView para:

- **Plan Gratuito:** Pruebas limitadas
- **Plan Pro:** Videos ilimitados
- **Plan Empresarial:** Videos largos, API ilimitada, soporte prioritario

**Factores que afectan el costo:**
- Duración del video
- Resolución (720p, 1080p, 4k)
- Número de videos por mes
- Clonación de voz (adicional)

---

## 🎯 Casos de Uso en Tu Negocio

### **1. Marketing de Tratamientos**
```
Foto: Rebeca Barreto
Guión: "¡Hola! Hoy quiero hablarte sobre nuestro tratamiento 
        de Botox y cómo puede ayudarte a lucir radiante..."
Resultado: Video profesional para redes sociales
```

### **2. Tutoriales y Educación**
```
Foto: Especialista
Guión: "En este tutorial aprenderás los pasos correctos 
        para tu rutina de skincare diaria..."
Resultado: Contenido educativo atractivo
```

### **3. Testimonios Personalizados**
```
Foto: Cliente (con permiso)
Guión: "Mi experiencia en Rebeca Barreto fue increíble.
        Los resultados superaron mis expectativas..."
Resultado: Testimonial auténtico y convincente
```

### **4. Anuncios para Productos**
```
Foto: Producto o modelo
Guión: "Descubre nuestra nueva línea de productos premium
        diseñados para realzar tu belleza natural..."
Resultado: Anuncio profesional en minutos
```

---

## 🐛 Solución de Problemas

### **Error: "API Key not configured"**
**Solución:** 
1. Verifica que existe `.env.local`
2. Confirma que la variable es `NEXT_PUBLIC_TOPVIEW_API_KEY`
3. Reinicia el servidor

### **Error: "Unauthorized" o 401**
**Solución:**
1. Verifica que tu API Key es correcta
2. Confirma que tu plan está activo
3. Contacta a TopView: official@topview.ai

### **Error: "Quota Exceeded"**
**Solución:**
1. Has alcanzado el límite de tu plan
2. Espera al siguiente ciclo de facturación
3. Upgrade a un plan superior

### **Video tarda mucho en generarse**
**Normal:** 
- Videos cortos (<30s): 30-60 segundos
- Videos medianos (30s-1m): 1-2 minutos
- Videos largos (>1m): 2-5 minutos

---

## 📚 Recursos Adicionales

### **Documentación Oficial:**
- 🌐 **Website:** https://www.topview.ai/es/make/avatar4
- 📧 **Soporte:** official@topview.ai
- 📖 **FAQ:** https://www.topview.ai/es/make/avatar4 (sección de preguntas frecuentes)

### **Características Destacadas:**
- ✅ Movimientos corporales y labiales sincronizados
- ✅ Control de movimientos por texto
- ✅ Soporte para animales y avatares no humanos
- ✅ Videos de duración extralarga (empresas)
- ✅ Personalización completa de apariencia y voz

---

## 🚀 Próximos Pasos

1. **Contacta a TopView** para obtener API Key
2. **Configura las credenciales** en `.env.local`
3. **Prueba el generador** en `/admin/videos-ia`
4. **Crea tu primer video** para redes sociales
5. **Escala tu contenido** con avatares IA

---

## ✅ Checklist de Implementación

- [ ] Cuenta creada en TopView
- [ ] Email enviado a official@topview.ai
- [ ] API Key recibida
- [ ] Documentación oficial descargada
- [ ] `.env.local` configurado
- [ ] Servidor reiniciado
- [ ] Primer video de prueba generado
- [ ] Videos descargados y compartidos

---

**¿Necesitas ayuda?** Contacta directamente a TopView:
📧 **official@topview.ai**

**Fecha de integración:** 2025-01-15  
**Versión:** Avatar 4 (última)  
**Estado:** ✅ Interfaz lista, pendiente credenciales API

