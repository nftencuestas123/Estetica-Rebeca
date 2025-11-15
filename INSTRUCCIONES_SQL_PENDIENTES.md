# 📋 INSTRUCCIONES: SQL Pendientes en Supabase

## ⚠️ IMPORTANTE: Debes ejecutar este SQL en Supabase

### ¿Por qué?
Faltan **2 tablas** en tu base de datos:
1. ✅ `videos` - Almacena los videos generados con IA
2. ✅ `copy_templates` - Almacena templates de copy para redes sociales

### 📍 ¿Dónde ejecutar el SQL?

1. Ve a tu proyecto en **Supabase Dashboard**
2. Click en **"SQL Editor"** (menú lateral izquierdo)
3. Click en **"New Query"** (botón superior)
4. Copia y pega todo el contenido del archivo: `supabase/migrations/fix_missing_tables.sql`
5. Click en **"Run"** (o presiona Ctrl/Cmd + Enter)
6. Verifica que aparezca el mensaje de éxito y la consulta final muestre:
   ```
   table_name       | row_count
   -----------------|-----------
   videos           | 0
   copy_templates   | 0
   ```

### 📂 Archivo a ejecutar

**Ruta:** `supabase/migrations/fix_missing_tables.sql`

Este archivo contiene:
- ✅ Tabla `videos` con todas las columnas necesarias
- ✅ Tabla `copy_templates` con todas las columnas necesarias
- ✅ Índices para optimizar las consultas
- ✅ Row Level Security (RLS) configurado
- ✅ Políticas de seguridad para ambas tablas
- ✅ Triggers para actualizar `updated_at` automáticamente
- ✅ Verificación final de que las tablas se crearon correctamente

### ✅ Después de ejecutar el SQL

Una vez ejecutado, tu base de datos tendrá **TODAS** las tablas necesarias:

1. ✅ `appointments` - Gestión de citas
2. ✅ `business_stats` - Estadísticas del negocio
3. ✅ `credit_purchase_requests` - Solicitudes de compra de créditos
4. ✅ `credit_transactions` - Transacciones de créditos
5. ✅ `crm_clients` - Clientes del CRM
6. ✅ `pages` - Landing y capture pages
7. ✅ `product_sales` - Ventas de productos
8. ✅ `products` - Catálogo de productos
9. ✅ `social_accounts` - Cuentas de redes sociales conectadas
10. ✅ `social_posts` - Publicaciones en redes sociales
11. ✅ `system_config` - Configuración del sistema
12. ✅ `treatments` - Tratamientos disponibles
13. ✅ `user_credits` - Balance de créditos de usuarios
14. ✅ `user_profiles` - Perfiles de usuarios
15. ✅ `videos` - **NUEVA** - Videos generados con IA
16. ✅ `copy_templates` - **NUEVA** - Templates de copywriting

### 🚀 ¿Qué pasó con el error de compilación?

**✅ RESUELTO:** Instalé el paquete faltante `@supabase/auth-helpers-nextjs` que necesitaba el middleware.

**⚠️ Nota:** El paquete está deprecado, pero funciona. En el futuro, debería migrar a `@supabase/ssr`.

### 🎯 Cambios en el sistema de páginas

**✅ Activado:** Sistema dinámico de landing pages
- La página principal (`/`) ahora se renderiza dinámicamente desde la base de datos
- Puedes cambiar la landing page desde el **Gestor de Páginas** (`/admin/gestor-paginas`)
- La página estática original se respaldó en `app/page-static-backup.tsx`

### 📊 Estado de las páginas en la BD

Según tu captura, estas páginas ya existen:
- 5 Landing pages originales (Elegance Gold, Minimal Chic, etc.)
- 3 Capture pages (Lead Form, Promo, Newsletter)
- 20 Landing pages Nude Collection (si ejecutaste el SQL anterior)

**Total:** 28 páginas disponibles para usar como principal

### 🔄 Próximos pasos

1. ✅ Ejecutar el SQL en Supabase (`fix_missing_tables.sql`)
2. ✅ Verificar que el servidor compila sin errores (debería estar funcionando ahora)
3. ✅ Ir a `localhost:3000` y verificar que carga la página correctamente
4. ✅ Ir a `/admin/gestor-paginas` y verificar que veas todas las landing pages
5. ✅ Cambiar la página principal desde el gestor (botón "Establecer como Principal")
6. ✅ Refrescar `/` y verificar que muestra la nueva landing page

### 🐛 Si algo falla

1. **Error de compilación:** Revisa la terminal donde corre `npm run dev`
2. **Error 500:** Revisa el SQL Editor en Supabase para ver si hay errores
3. **Página en blanco:** Abre la consola del navegador (F12) y busca errores
4. **Landing page no cambia:** Verifica en Supabase que solo una página tenga `is_root = true`

---

**¿Alguna duda? Avisame y te ayudo paso a paso.**

