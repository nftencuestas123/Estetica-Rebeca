# 🎬 GUÍA COMPLETA TOPVIEW AVATAR 4 (De 0 a 100)
## Para Principiantes - Paso a Paso

---

## 📚 ÍNDICE

1. [¿Qué es TopView Avatar 4?](#1-qué-es-topview-avatar-4)
2. [¿Cómo funciona en tu plataforma?](#2-cómo-funciona-en-tu-plataforma)
3. [¿Qué necesito para empezar?](#3-qué-necesito-para-empezar)
4. [Paso a Paso: Crear cuenta en TopView](#4-paso-a-paso-crear-cuenta-en-topview)
5. [Paso a Paso: Obtener API Key](#5-paso-a-paso-obtener-api-key)
6. [Paso a Paso: Configurar en tu proyecto](#6-paso-a-paso-configurar-en-tu-proyecto)
7. [Precios de TopView](#7-precios-de-topview)
8. [¿Qué tipo de videos puedo crear?](#8-qué-tipo-de-videos-puedo-crear)
9. [Cómo usar el generador](#9-cómo-usar-el-generador)
10. [Publicar en redes sociales](#10-publicar-en-redes-sociales)
11. [Producción (cuando vayas a lanzar)](#11-producción-cuando-vayas-a-lanzar)
12. [Preguntas frecuentes](#12-preguntas-frecuentes)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. ¿Qué es TopView Avatar 4?

### **Explicación Simple:**

TopView Avatar 4 es como tener un **actor digital profesional** que puede:

- 📸 **Convertir una foto** en un video donde la persona "habla"
- 🎤 **Hablar con voz natural** (o tu propia voz clonada)
- 💄 **Mostrar productos** en sus manos
- 🎭 **Hacer gestos y movimientos** naturales
- ⚡ **Generarse en minutos** automáticamente

### **¿Para qué sirve?**

Imagina que:
- Quieres hacer un video promocional de un tratamiento de botox
- Normalmente necesitarías: cámara, iluminación, grabar, editar (horas de trabajo)
- Con TopView: Subes una foto + escribes el texto → **Video listo en 2 minutos**

### **Ejemplo Real:**

```
TÚ SUBES:
📸 Foto: Rebeca Barreto sonriendo
✍️ Texto: "¡Hola! Soy Rebeca y hoy quiero hablarte sobre 
           nuestro tratamiento de Botox premium..."

TOPVIEW GENERA:
🎬 Video: Rebeca hablando naturalmente con movimientos 
          de labios perfectos, gestos naturales, voz profesional
          
RESULTADO:
✅ Video profesional en 1080p
✅ Listo para Instagram, Facebook, TikTok
✅ Sin cámara, sin edición, sin complicaciones
```

---

## 2. ¿Cómo funciona en tu plataforma?

### **Ya está 100% integrado en tu Admin Panel**

#### **Ubicación:**
```
http://localhost:3000/admin/videos-ia
```

#### **En el Sidebar verás:**
```
┌─────────────────┐
│ Dashboard       │
│ Clientes        │
│ Citas           │
│ Tratamientos    │
│ 🎬 Videos IA    │ ← AQUÍ ESTÁ
│ Sofía IA        │
│ Productos       │
│ Reportes        │
└─────────────────┘
```

### **¿Cómo funciona el flujo?**

```
PASO 1: Entras a /admin/videos-ia
   ↓
PASO 2: Subes una foto (Rebeca, producto, lo que quieras)
   ↓
PASO 3: Escribes el guión (lo que dirá en el video)
   ↓
PASO 4: Eliges la voz (español femenino, masculino, etc.)
   ↓
PASO 5: Click en "Generar Video con IA"
   ↓
PASO 6: TopView procesa (1-2 minutos)
   ↓
PASO 7: Video listo para descargar
   ↓
PASO 8: Lo compartes en redes sociales
```

### **¿Dónde está guardado en el código?**

```
TU PROYECTO/
├── app/(admin)/admin/
│   └── videos-ia/
│       └── page.tsx          ← La interfaz del generador
│
├── services/
│   └── topview.ts            ← Conexión con TopView API
│
├── components/
│   └── AdminSidebar.tsx      ← Menu con "Videos IA"
│
└── TOPVIEW_GUIA_COMPLETA_PARA_PRINCIPIANTES.md ← Esta guía
```

---

## 3. ¿Qué necesito para empezar?

### **Checklist Completo:**

- [ ] **Tu proyecto ya tiene todo el código** ✅ (Ya lo integré)
- [ ] **Servidor corriendo** (`npm run dev`) ✅
- [ ] **Cuenta en TopView** ❌ (Tienes que crearla)
- [ ] **Suscripción/Plan en TopView** ❌ (Tienes que elegir uno)
- [ ] **API Key de TopView** ❌ (Te la dan cuando te suscribes)
- [ ] **Configurar API Key en tu proyecto** ❌ (Te explico abajo)

---

## 4. Paso a Paso: Crear cuenta en TopView

### **PASO 1: Ir al sitio de TopView**

🌐 **URL:** https://www.topview.ai/es/make/avatar4

### **PASO 2: Crear cuenta**

1. Click en **"Iniciar sesión"** (arriba derecha)
2. Si no tienes cuenta, click en **"Registrarse"**
3. Completa:
   - Email
   - Contraseña
   - Nombre de la empresa: "Rebeca Barreto Estética"

### **PASO 3: Verificar email**

- Te llegará un email de confirmación
- Click en el link para activar tu cuenta

### **PASO 4: Login**

- Entra con tu email y contraseña
- Verás el **Dashboard de TopView**

---

## 5. Paso a Paso: Obtener API Key

### **OPCIÓN A: Desde el Dashboard (Si está disponible)**

1. Una vez logueado en TopView
2. Busca sección: **"API"** o **"Desarrolladores"**
3. Click en **"Generar API Key"**
4. Copia la API Key (se ve algo así: `tpv_1234567890abcdef...`)

### **OPCIÓN B: Contactar soporte (Más común)**

Si no ves opción de API en el dashboard:

1. **Email:** official@topview.ai
2. **Asunto:** Solicitud de acceso a API - Avatar 4
3. **Mensaje:**

```
Hola equipo de TopView,

Soy [Tu Nombre] de Rebeca Barreto Estética y Belleza 
(Paraguay).

He creado una cuenta en TopView y estoy interesado en 
integrar Avatar 4 en mi plataforma web para generar 
videos con IA.

¿Podrían activar el acceso a API en mi cuenta y 
proporcionarme:
- API Key
- Documentación de la API
- Información sobre planes para uso comercial

Email de mi cuenta: tu_email@ejemplo.com

Gracias,
[Tu Nombre]
```

### **PASO 5: Guardar tu API Key**

Una vez que tengas tu API Key:

```
EJEMPLO:
tpv_1234567890abcdefghijklmnopqrstuvwxyz
```

⚠️ **IMPORTANTE:** 
- NO la compartas públicamente
- NO la subas a GitHub
- Guárdala en un lugar seguro (vamos a configurarla en el siguiente paso)

---

## 6. Paso a Paso: Configurar en tu proyecto

### **PASO 1: Abrir tu proyecto en VS Code**

Ya estás aquí, así que este paso está listo ✅

### **PASO 2: Crear archivo `.env.local`**

1. En la **raíz de tu proyecto** (donde está `package.json`)
2. Crea un archivo nuevo llamado exactamente: `.env.local`
3. Si ya existe, ábrelo

### **PASO 3: Agregar las variables de entorno**

Copia y pega esto en `.env.local`:

```bash
# TopView Avatar 4 Configuration
NEXT_PUBLIC_TOPVIEW_API_KEY=TU_API_KEY_AQUI
NEXT_PUBLIC_TOPVIEW_API_URL=https://api.topview.ai/v1
```

### **PASO 4: Reemplazar con tu API Key real**

```bash
# ANTES (ejemplo):
NEXT_PUBLIC_TOPVIEW_API_KEY=TU_API_KEY_AQUI

# DESPUÉS (con tu key real):
NEXT_PUBLIC_TOPVIEW_API_KEY=tpv_1234567890abcdefghijklmnopqrstuvwxyz
```

### **PASO 5: Guardar el archivo**

- Ctrl+S (Windows) o Cmd+S (Mac)

### **PASO 6: Reiniciar el servidor**

1. En la terminal donde corre `npm run dev`
2. Presiona: **Ctrl+C** (detener)
3. Ejecuta de nuevo: `npm run dev`

### **PASO 7: Verificar que funciona**

Abre en el navegador:
```
http://localhost:3000/admin/videos-ia
```

Si todo está bien:
- ✅ La página carga sin errores
- ✅ Puedes subir fotos
- ✅ Puedes escribir guiones
- ✅ El botón "Generar Video" está activo

---

## 7. Precios de TopView

### **¿Cómo funciona el pricing?**

TopView normalmente tiene varios planes:

### **PLAN GRATUITO (Trial)**
```
Precio: $0 USD/mes
Incluye:
- 2-5 videos de prueba
- Videos de hasta 30 segundos
- Marca de agua "TopView"
- Resolución 720p

✅ Ideal para: Probar la plataforma
❌ No ideal para: Uso comercial
```

### **PLAN PRO (Recomendado)**
```
Precio: ~$29-49 USD/mes (Aproximado)
Incluye:
- 50-100 videos por mes
- Videos de hasta 2 minutos
- Sin marca de agua
- Resolución 1080p
- Clonación de voz básica
- Soporte por email

✅ Ideal para: Uso comercial regular
```

### **PLAN BUSINESS**
```
Precio: ~$99-199 USD/mes (Aproximado)
Incluye:
- 200-500 videos por mes
- Videos ilimitados de duración
- Sin marca de agua
- Resolución 4K
- Clonación de voz avanzada
- API access completo
- Soporte prioritario

✅ Ideal para: Agencias, alto volumen
```

### **PLAN ENTERPRISE**
```
Precio: Personalizado (contactar ventas)
Incluye:
- Videos ilimitados
- Todo de Business +
- Infraestructura dedicada
- SLA garantizado
- Account manager dedicado

✅ Ideal para: Empresas grandes
```

### **¿Cómo se calcula el costo por video?**

Depende del plan, pero generalmente:

```
EJEMPLO PLAN PRO ($49/mes con 100 videos):

Costo por video: $49 / 100 = $0.49 USD por video

Si haces un video de:
- 30 segundos: $0.49
- 1 minuto: $0.49
- 2 minutos: $0.49

O sea, el costo es POR VIDEO, no por duración
```

### **¿Qué pasa si me paso del límite?**

```
OPCIÓN 1: Comprar créditos adicionales
Ejemplo: 50 videos extra por $25 USD

OPCIÓN 2: Upgrade al siguiente plan
Pro → Business (más videos incluidos)

OPCIÓN 3: Esperar al siguiente mes
Tu cuota se renueva mensualmente
```

### **Recomendación para tu negocio:**

```
INICIO:
- Mes 1-2: Plan Gratuito (pruebas)
- Mes 3-6: Plan Pro (5-10 videos/mes para redes)
- Mes 6+: Evaluar si necesitas Business

ESTIMACIÓN:
Si haces 2 videos por semana:
- 2 videos/semana × 4 semanas = 8 videos/mes
- Plan Pro ($49/mes) es suficiente
- Costo efectivo: $49/8 = $6.12 USD por video
```

---

## 8. ¿Qué tipo de videos puedo crear?

### **TIPOS DE VIDEOS DISPONIBLES:**

#### **1. AVATAR HABLANDO (Persona)**
```
Foto: Rebeca Barreto
Resultado: Rebeca hablando a cámara
Uso: Presentaciones, testimonios, tutoriales

✅ Movimientos de labios perfectos
✅ Gestos naturales
✅ Contacto visual con cámara
```

#### **2. AVATAR CON PRODUCTO EN MANO**
```
Foto: Persona sosteniendo un producto
Resultado: Avatar mostrando el producto mientras habla
Uso: Demostraciones, reviews, anuncios

✅ Puede sostener productos
✅ Señalar características
✅ Gestos de presentación
```

#### **3. AVATAR DE PRODUCTO (Sin persona)**
```
Foto: Solo el producto (crema, serum, etc.)
Resultado: El producto con voz en off explicativa
Uso: Catálogos, especificaciones, beneficios

✅ Zoom dinámico en producto
✅ Voz profesional
✅ Fondo personalizable
```

#### **4. AVATAR ANIMADO (Estilo cartoon)**
```
Foto: Ilustración o dibujo
Resultado: Personaje animado hablando
Uso: Contenido educativo, diversión, mascota de marca

✅ Estilos artísticos
✅ Animales humanizados
✅ Personajes de marca
```

### **¿LIMITACIONES?**

❌ **NO puede hacer:**
- Movimientos complejos (bailar, caminar)
- Cambiar de ropa o fondo automáticamente
- Interactuar físicamente con otros objetos
- Expresiones faciales extremas

✅ **SÍ puede hacer:**
- Hablar naturalmente
- Gestos con manos (sostener, señalar)
- Movimientos de cabeza sutiles
- Expresiones faciales suaves
- Contacto visual

### **EJEMPLOS PARA TU NEGOCIO:**

#### **Ejemplo 1: Video de Tratamiento**
```
📸 FOTO: Rebeca sosteniendo producto de Botox
✍️ GUIÓN: 
"Hola, soy Rebeca Barreto. Hoy quiero hablarte sobre 
nuestro tratamiento de Botox premium. Este procedimiento 
es perfecto para suavizar arrugas de expresión de forma 
natural y segura. En solo 20 minutos puedes lucir 
hasta 10 años más joven. ¡Agenda tu cita hoy!"

🎬 VIDEO FINAL: 45 segundos de video profesional
📱 USO: Instagram Reels, Facebook, Stories
```

#### **Ejemplo 2: Testimonio de Cliente**
```
📸 FOTO: Cliente feliz (con permiso)
✍️ GUIÓN:
"Mi nombre es María y quiero compartir mi experiencia 
con Rebeca Barreto. Los resultados del tratamiento 
facial superaron mis expectativas. El equipo es 
profesional y atento. ¡Totalmente recomendado!"

🎬 VIDEO FINAL: 30 segundos de testimonial
📱 USO: Website, redes sociales, WhatsApp
```

#### **Ejemplo 3: Promoción Especial**
```
📸 FOTO: Rebeca sonriendo
✍️ GUIÓN:
"¡Atención! Este mes tenemos una promoción especial. 
20% de descuento en todos los tratamientos faciales. 
No pierdas esta oportunidad única. Agenda ahora a través 
de WhatsApp. ¡Te espero!"

🎬 VIDEO FINAL: 25 segundos de promo
📱 USO: Stories de Instagram, anuncios de Facebook
```

---

## 9. Cómo usar el generador

### **TUTORIAL PASO A PASO:**

#### **PASO 1: Entrar al generador**

1. Abre tu navegador
2. Ve a: `http://localhost:3000/admin`
3. En el sidebar, click en: **🎬 Videos IA**

#### **PASO 2: Tab "Crear Video"**

Verás 3 secciones numeradas:

```
┌─────────────────────────────────────┐
│ 1. Imagen del Avatar                │
│ 2. Guión del Video                  │
│ 3. Configuración de Voz             │
└─────────────────────────────────────┘
```

#### **PASO 3: Subir la imagen**

**Opción A: Subir foto**
1. Click en el área de "Sube una foto"
2. Selecciona una imagen de tu computadora
3. Formatos: PNG, JPG, JPEG
4. Tamaño máximo: 10MB
5. Recomendación: Foto clara, buena iluminación

**Opción B: Generar con IA**
1. Click en "Generar Avatar con IA"
2. Describe lo que quieres (próximamente)

**Consejos para mejores resultados:**
- ✅ Foto de frente
- ✅ Cara visible claramente
- ✅ Buena iluminación
- ✅ Fondo neutro o profesional
- ❌ No usar fotos borrosas
- ❌ No usar fotos muy oscuras
- ❌ No usar fotos con filtros extremos

#### **PASO 4: Escribir el guión**

En el área de texto grande:

```
Ejemplo de guión:

¡Hola! Soy Rebeca Barreto y te doy la bienvenida 
a nuestro centro de estética y belleza.

Hoy quiero hablarte sobre nuestro tratamiento 
estrella de Botox. Este procedimiento es seguro, 
rápido y con resultados naturales.

En solo 20 minutos puedes lucir hasta 10 años 
más joven. Los efectos duran de 4 a 6 meses.

¡Agenda tu cita hoy mismo! Te esperamos.
```

**Consejos para el guión:**
- ✅ Escribe como hablas (natural)
- ✅ Frases cortas y claras
- ✅ Incluye llamado a la acción (CTA)
- ✅ 100-300 palabras = 30-90 segundos
- ❌ No escribas texto muy técnico
- ❌ No uses palabras difíciles de pronunciar

**Contador automático:**
- Te dice cuántos caracteres escribiste
- Te estima la duración del video
- Ejemplo: 450 caracteres ≈ 45 segundos

#### **PASO 5: Configurar la voz**

Tienes 3 opciones:

**OPCIÓN 1: IA (Recomendado para empezar)**
```
1. Click en botón "IA"
2. Selecciona una voz del dropdown:
   - Español - Mujer 1 (Natural)
   - Español - Mujer 2 (Energética)
   - Español - Hombre 1 (Profesional)
   - Español Argentina - Mujer
   - Español México - Mujer

3. La voz se aplicará automáticamente
```

**OPCIÓN 2: Clonar tu voz**
```
1. Click en botón "Clonar"
2. Graba un audio de 30 segundos
3. TopView analiza tu voz
4. Genera videos con TU voz
(Requiere plan premium)
```

**OPCIÓN 3: Subir audio**
```
1. Click en botón "Subir"
2. Selecciona archivo MP3/WAV
3. El video usará ese audio
(Útil si tienes locutora profesional)
```

#### **PASO 6: Vista previa**

En la columna derecha verás:
- Preview de la imagen del avatar
- Duración estimada del video
- Resolución (1080p)
- Formato (MP4)

#### **PASO 7: Generar el video**

1. Revisa que todo esté correcto
2. Click en el botón grande:
   ```
   🎬 GENERAR VIDEO CON IA
   ```
3. Verás un mensaje: "Generando Video..."
4. TopView procesa (1-3 minutos)
5. Cuando termine, verás: "¡Video listo!"

#### **PASO 8: Ver el resultado**

1. Cambia al tab "Mis Videos"
2. Verás tu video en el grid
3. Estados posibles:
   - 🟡 **Procesando:** Aún generando
   - 🟢 **Completado:** Listo para descargar
   - 🔴 **Error:** Algo falló (revisar)

#### **PASO 9: Descargar**

1. Click en tu video
2. Botón "Descargar"
3. El video se guarda en tu computadora
4. Formato: MP4 (compatible con todo)

---

## 10. Publicar en redes sociales

### **Después de descargar tu video:**

#### **INSTAGRAM:**

**Stories (15 seg):**
1. Abre Instagram en tu teléfono
2. Botón "+" → Story
3. Selecciona tu video
4. Edita (stickers, texto, etc.)
5. Publicar

**Reels (hasta 90 seg):**
1. Botón "+" → Reel
2. Selecciona tu video
3. Añade música (opcional)
4. Descripción + hashtags
5. Publicar

**Feed (hasta 60 seg):**
1. Botón "+" → Post
2. Selecciona tu video
3. Descripción + ubicación
4. Compartir

#### **FACEBOOK:**

**Post Normal:**
1. "¿Qué estás pensando?"
2. Click en video
3. Selecciona tu video
4. Descripción
5. Publicar

**Story:**
1. Click en "Crear historia"
2. Selecciona video
3. Personaliza
4. Compartir historia

#### **TIKTOK:**

1. Botón "+" central
2. "Subir" (no grabar)
3. Selecciona tu video
4. Añade efectos/sonidos
5. Descripción + hashtags
6. Publicar

#### **TWITTER:**

1. Nuevo tweet
2. Click en ícono de imagen/video
3. Selecciona video (máx 2:20 min)
4. Texto del tweet
5. Tuitear

### **FLUJO COMPLETO (META - Instagram/Facebook):**

```
EN TU ADMIN PANEL:
1. Generas video en /admin/videos-ia
2. Descargas el MP4
   ↓
EN FACEBOOK BUSINESS SUITE:
3. Abres business.facebook.com
4. "Crear publicación"
5. Subes tu video
6. Eliges donde publicar:
   ☑️ Página de Facebook
   ☑️ Instagram (conectado)
7. Descripción + Call to Action
8. Programar o Publicar ahora
   ↓
RESULTADO:
Video publicado en ambas plataformas
```

### **PRÓXIMAMENTE (Futuro):**

En una actualización futura podríamos agregar:
```
Botón "Publicar en Redes" directo desde tu panel:
→ Conectar cuentas de Instagram/Facebook
→ Click en "Compartir" en un video
→ Escribir descripción
→ Publicar automáticamente
```

---

## 11. Producción (cuando vayas a lanzar)

### **¿Qué significa "Producción"?**

Es cuando tu sitio web ya NO está en tu computadora (`localhost:3000`), 
sino en internet para que todo el mundo pueda acceder.

### **PASOS PARA PRODUCCIÓN:**

#### **PASO 1: Verificar que TopView funciona bien**

ANTES de lanzar a producción, prueba:
- ✅ Generar 5-10 videos de prueba
- ✅ Descargar sin problemas
- ✅ Verificar calidad de los videos
- ✅ Confirmar que no hay errores

#### **PASO 2: Upgrade tu plan de TopView**

Si estás en plan gratuito:
- Upgrade a **Plan Pro** mínimo
- Asegúrate de tener suficientes créditos
- Confirma límites mensuales

#### **PASO 3: Deploy a Vercel/producción**

Cuando hagas el deploy, necesitas:

1. **Agregar variables de entorno en producción:**

En Vercel (o tu plataforma de hosting):
```
Settings → Environment Variables → Add

Name: NEXT_PUBLIC_TOPVIEW_API_KEY
Value: tpv_tu_api_key_real_aqui
```

2. **Redeploy:**
```bash
git add .
git commit -m "Configurar TopView para producción"
git push
```

3. **Verificar en producción:**
```
https://tudominio.com/admin/videos-ia
(Debe funcionar igual que en localhost)
```

#### **PASO 4: Monitorear uso**

En el dashboard de TopView:
- Revisa cuántos videos generas por mes
- Ajusta tu plan si necesitas más
- Configura alertas de límite

---

## 12. Preguntas frecuentes

### **P: ¿Necesito suscribirme en TopView primero?**

R: **SÍ**, necesitas crear cuenta y elegir un plan en TopView.
   No puedes suscribirte desde tu propia plataforma.
   Tu plataforma CONSUME el servicio de TopView.

### **P: ¿Puedo probar gratis?**

R: **SÍ**, TopView tiene plan gratuito con:
   - 2-5 videos de prueba
   - Videos cortos
   - Marca de agua
   (Suficiente para probar antes de pagar)

### **P: ¿Cuánto cuesta realmente?**

R: Depende del plan:
   - Gratuito: $0 (limitado)
   - Pro: ~$29-49/mes (50-100 videos)
   - Business: ~$99-199/mes (200-500 videos)
   
   Para tu caso (2-3 videos/semana): Plan Pro es suficiente

### **P: ¿Puedo sostener productos en el video?**

R: **SÍ**, el avatar puede:
   - ✅ Sostener productos en las manos
   - ✅ Señalar cosas
   - ✅ Hacer gestos básicos
   - ❌ NO hacer movimientos complejos

### **P: ¿Los videos se ven reales?**

R: **SÍ**, Avatar 4 es ultra-realista:
   - Movimientos de labios perfectos
   - Sincronización audio-visual
   - Gestos naturales
   - Calidad 1080p

### **P: ¿Puedo clonar mi voz?**

R: **SÍ**, con plan premium:
   - Grabas 30 segundos de audio
   - TopView analiza tu voz
   - Genera videos con TU voz

### **P: ¿Los videos tienen marca de agua?**

R: Depende del plan:
   - Plan Gratuito: SÍ (marca de agua)
   - Plan Pro o superior: NO (sin marca)

### **P: ¿Cuánto tarda en generar un video?**

R: Típicamente:
   - Video 30 seg: 30-60 segundos
   - Video 1 min: 1-2 minutos
   - Video 2 min: 2-3 minutos

### **P: ¿Puedo editar el video después?**

R: TopView genera el video final. Para editarlo:
   - Descarga el MP4
   - Usa editor (CapCut, Premiere, etc.)
   - Agrega música, efectos, texto

### **P: ¿Funciona en español?**

R: **SÍ**, soporta:
   - Español España
   - Español México
   - Español Argentina
   - Y más variantes

### **P: ¿Puedo usar cualquier foto?**

R: Casi cualquiera, pero funciona mejor con:
   - ✅ Fotos claras
   - ✅ Buena iluminación
   - ✅ Cara visible
   - ❌ NO fotos borrosas
   - ❌ NO fotos muy oscuras

---

## 13. Troubleshooting

### **PROBLEMA: "API Key not configured"**

❌ **Error:** Aparece este mensaje al generar video

✅ **Solución:**
1. Verifica que existe `.env.local`
2. Confirma que tiene:
   ```
   NEXT_PUBLIC_TOPVIEW_API_KEY=tu_key
   ```
3. Reinicia el servidor (Ctrl+C y `npm run dev`)

---

### **PROBLEMA: "Unauthorized" o Error 401**

❌ **Error:** La API rechaza tu request

✅ **Solución:**
1. Verifica que tu API Key es correcta (cópiala de nuevo)
2. Confirma que tu cuenta de TopView está activa
3. Verifica que no vencieron tus créditos
4. Contacta a TopView: official@topview.ai

---

### **PROBLEMA: "Quota Exceeded"**

❌ **Error:** Has superado tu límite de videos

✅ **Solución:**
1. Revisa cuántos videos has generado este mes
2. Espera al próximo ciclo de facturación
3. O upgrade a un plan superior
4. O compra créditos adicionales

---

### **PROBLEMA: Video tarda mucho (>10 minutos)**

❌ **Error:** El video lleva más de 10 minutos "procesando"

✅ **Solución:**
1. Refresca la página
2. Revisa el tab "Mis Videos" → puede que ya esté listo
3. Si dice "Error", revisa:
   - Tamaño de imagen (<10MB)
   - Longitud de guión (<2 minutos)
4. Intenta de nuevo con imagen más pequeña

---

### **PROBLEMA: El avatar no se ve bien**

❌ **Error:** El video no se ve realista

✅ **Solución:**
1. Usa foto de mejor calidad:
   - Alta resolución
   - Buena iluminación
   - Cara frontal
2. Evita:
   - Fotos con filtros
   - Selfies muy cercanas
   - Ángulos extraños

---

### **PROBLEMA: La voz no suena natural**

❌ **Error:** La voz suena robótica

✅ **Solución:**
1. Prueba otra voz del dropdown
2. Escribe el guión más natural:
   - ✅ "Hola, soy Rebeca"
   - ❌ "Saludos. Mi nombre es..."
3. Usa puntuación correcta para pausas naturales
4. Considera clonar tu propia voz (plan premium)

---

### **PROBLEMA: No puedo descargar el video**

❌ **Error:** El botón "Descargar" no funciona

✅ **Solución:**
1. Verifica que el video dice "Completado" (no "Procesando")
2. Click derecho → "Guardar video como"
3. Si no funciona, contacta soporte

---

## 🎯 RESUMEN ULTRA SIMPLE

### **Para empezar HOY:**

1. ✅ **Ya tienes el código** (lo integré)
2. 📝 **Crea cuenta en TopView** → https://www.topview.ai
3. 💳 **Elige un plan** (Pro recomendado: $49/mes)
4. 🔑 **Obtén tu API Key**
5. 📄 **Créa `.env.local`** y pega tu API Key
6. 🔄 **Reinicia servidor** (`npm run dev`)
7. 🎬 **Ve a** `/admin/videos-ia`
8. 📸 **Sube foto + escribe guión**
9. ⚡ **Genera tu primer video**
10. 📱 **Descarga y comparte en redes**

### **Costo estimado mensual:**

```
Plan TopView Pro: $49/mes
Genera: ~8-10 videos/mes
Costo por video: $4.90 USD

VS

Grabar videos tradicional:
- Cámara, iluminación: $500+
- Editor de video: $50/hora
- Tiempo: 2-3 horas por video

AHORRO: 90% tiempo + 80% costo
```

---

## 📞 SOPORTE

### **Si tienes dudas sobre TopView:**
📧 official@topview.ai
🌐 https://www.topview.ai

### **Si tienes dudas sobre tu proyecto:**
💬 Pregúntame aquí, soy tu Full-Stack Engineer

---

**Fecha:** 2025-01-15  
**Versión:** 1.0 - Completa para Principiantes  
**Estado:** ✅ Listo para usar

