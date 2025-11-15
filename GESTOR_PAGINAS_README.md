# 📄 Sistema de Gestión de Páginas

## 🎯 **¿Qué es?**

El **Gestor de Páginas** es un sistema completo que te permite:
- ✅ Tener **múltiples landing pages** predesñadas
- ✅ Tener **múltiples capture pages** (formularios)
- ✅ **Cambiar la página principal** de tu sitio con un solo click
- ✅ **Activar/desactivar** páginas según lo necesites
- ✅ Ver **estadísticas** de vistas y conversiones

---

## 🏗️ **Arquitectura del Sistema**

### **1. Base de Datos** (`supabase/migrations/create_pages_system.sql`)

Tabla `pages` que almacena:
- Información de cada página (nombre, descripción, tipo)
- Template key (identificador del componente React)
- Estado (activa/inactiva, es root)
- Estadísticas (vistas, conversiones)
- Tags y color scheme

**Función clave:** Solo **UNA** landing page puede ser `is_root = true` (se muestra en `/`)

### **2. Servicio** (`services/pages.ts`)

Funciones para:
- `getAllPages()` - Obtener todas las páginas
- `getRootPage()` - Obtener la página principal activa
- `setRootPage(id)` - Establecer cuál página es la principal
- `togglePageActive(id, state)` - Activar/desactivar páginas
- `incrementPageViews(id)` - Registrar vistas
- `getPagesStats()` - Estadísticas generales

### **3. Panel Admin** (`app/(admin)/admin/gestor-paginas/page.tsx`)

Interfaz visual donde puedes:
- Ver todas las landing pages y capture pages
- Filtrar por tipo
- Ver estadísticas (total páginas, vistas, conversiones)
- **Establecer como Principal** → Cambia cuál landing page se ve en `/`
- **Activar/Desactivar** → Controla cuáles páginas están disponibles

### **4. Componentes de Páginas** (`components/pages/`)

#### **Landing Pages:**
- `EleganceGoldLanding.tsx` - Diseño de lujo con oro y negro (default)
- `MinimalChicLanding.tsx` - Minimalista y limpio
- `ModernGlamLanding.tsx` - Moderno con animaciones
- `SoftBeautyLanding.tsx` - Suave con colores pasteles
- `BoldImpactLanding.tsx` - Alto impacto visual

#### **Capture Pages:**
- `LeadFormClassic.tsx` - Formulario clásico de contacto
- `PromoCaptureForm.tsx` - Página con oferta especial (30% OFF)
- `NewsletterSignup.tsx` - Suscripción a newsletter

### **5. Page Renderer** (`components/pages/PageRenderer.tsx`)

Mapea el `template_key` de la BD al componente React correspondiente.

```typescript
const PAGE_COMPONENTS = {
  EleganceGoldLanding, // template_key en BD
  MinimalChicLanding,
  // ...
}
```

### **6. Página Principal Dinámica** (`app/page-dynamic.tsx`)

- Lee la BD para obtener la página root activa
- Renderiza el componente correspondiente
- Incrementa las vistas automáticamente

---

## 🚀 **Cómo Usar**

### **PASO 1: Ejecutar la migración SQL**

```bash
# Conectar a Supabase y ejecutar:
supabase/migrations/create_pages_system.sql
```

Esto creará:
- ✅ Tabla `pages`
- ✅ Triggers para validar solo una página root
- ✅ Funciones de utilidad
- ✅ **Seed data** con 5 landing pages y 3 capture pages

### **PASO 2: Activar renderizado dinámico**

**Opción A: Reemplazar `app/page.tsx` completamente**

```bash
# Respaldar la página actual
mv app/page.tsx app/page-backup.tsx

# Activar la versión dinámica
mv app/page-dynamic.tsx app/page.tsx
```

**Opción B: Integrar en `app/page.tsx` existente**

```tsx
// En app/page.tsx
import { useEffect, useState } from 'react'
import PageRenderer from '@/components/pages/PageRenderer'
import { getRootPage } from '@/services/pages'

export default function Home() {
  const [templateKey, setTemplateKey] = useState<string | null>(null)

  useEffect(() => {
    getRootPage().then((page) => {
      if (page) setTemplateKey(page.template_key)
    })
  }, [])

  if (!templateKey) return <div>Cargando...</div>

  return <PageRenderer templateKey={templateKey} />
}
```

### **PASO 3: Gestionar páginas desde el admin**

1. Ve a `/admin/gestor-paginas`
2. Verás todas las páginas disponibles
3. Click en **"Establecer como Principal"** para cambiar la página root
4. Click en **"Activar/Desactivar"** para controlar visibilidad

---

## 📊 **Estadísticas**

El sistema registra automáticamente:
- **Vistas**: Cada vez que alguien carga una página
- **Conversiones**: Cuando se completa un formulario (capture pages)

---

## ➕ **Agregar Nuevas Páginas**

### **1. Crear el componente**

```tsx
// components/pages/landing/MiNuevaLanding.tsx
export default function MiNuevaLanding() {
  return <div>Mi diseño aquí</div>
}
```

### **2. Registrar en PageRenderer**

```tsx
// components/pages/PageRenderer.tsx
import MiNuevaLanding from './landing/MiNuevaLanding'

const PAGE_COMPONENTS = {
  // ...
  MiNuevaLanding, // ← Agregar aquí
}
```

### **3. Insertar en la BD**

```sql
INSERT INTO public.pages (
  name, display_name, description, type, 
  is_active, template_key, tags, color_scheme
)
VALUES (
  'mi-nueva-landing',
  'Mi Nueva Landing',
  'Descripción de mi página',
  'landing',
  true,
  'MiNuevaLanding', -- ← Debe coincidir con el nombre del componente
  ARRAY['moderno', 'creativo'],
  'blue'
);
```

### **4. Listo**

Ya aparecerá en `/admin/gestor-paginas` y podrás establecerla como principal.

---

## 🔧 **Configuración Técnica**

### **Seed Data** (Pre-cargado)

Al ejecutar la migración, se crean automáticamente:

- ✅ **5 Landing Pages** (EleganceGold es root por defecto)
- ✅ **3 Capture Pages**

### **RLS (Row Level Security)**

- ✅ Páginas activas son públicas (cualquiera puede verlas)
- ✅ Admin tiene acceso completo (sin autenticación por ahora)

---

## 📈 **Casos de Uso**

### **Cambiar el look del sitio temporalmente**

**Escenario:** San Valentín, quieres un diseño especial.

1. Activa `SoftBeautyLanding` (colores pasteles/románticos)
2. Establécela como principal
3. Tu sitio cambia instantáneamente
4. Después del evento, vuelves a `EleganceGoldLanding`

### **A/B Testing**

**Escenario:** Quieres probar qué landing convierte mejor.

1. Semana 1: `EleganceGoldLanding` como root
2. Medir conversiones en `/admin/gestor-paginas`
3. Semana 2: `ModernGlamLanding` como root
4. Comparar resultados
5. Mantener la que mejor convirtió

### **Páginas de Captura Especializadas**

**Escenario:** Promoción de Black Friday.

1. Activa `PromoCaptureForm` (30% OFF)
2. Comparte link directo: `tudominio.com/promo-black-friday`
3. Registra conversiones automáticamente
4. Exporta leads para seguimiento

---

## 🔐 **Seguridad**

- ✅ RLS activado
- ✅ Solo páginas activas son públicas
- ✅ Admin panel requiere autenticación (cuando esté implementada)

---

## 🐛 **Troubleshooting**

### **"Error al cargar la página"**

**Causa:** No hay ninguna página con `is_root = true` y `is_active = true`.

**Solución:**
```sql
UPDATE public.pages
SET is_root = true, is_active = true
WHERE template_key = 'EleganceGoldLanding';
```

### **"Página no encontrada (404)"**

**Causa:** El `template_key` en la BD no existe en `PageRenderer`.

**Solución:**
1. Verificar que el componente exista en `components/pages/`
2. Verificar que esté registrado en `PageRenderer.tsx`
3. Verificar que el nombre coincida EXACTAMENTE

---

## 📝 **TODO / Futuras Mejoras**

- [ ] Editor visual de páginas (drag & drop)
- [ ] Duplicar páginas
- [ ] Versionado de páginas
- [ ] Scheduled publishing (programar cambios)
- [ ] Preview en iframe antes de activar
- [ ] Exportar/importar configuraciones
- [ ] Temas y variables globales de color
- [ ] Sistema de plantillas con variables

---

## 🎉 **¡Listo!**

Con este sistema tienes:
- ✅ **8 páginas prediseñadas** listas para usar
- ✅ **Cambio de página principal** en 1 click
- ✅ **Estadísticas** automáticas
- ✅ **Escalable** para agregar más páginas fácilmente

**Accede a:** `/admin/gestor-paginas` y comienza a gestionar tu sitio. 🚀

