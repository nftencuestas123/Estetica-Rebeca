# 🔐 SISTEMA DE AUTENTICACIÓN COMPLETO - IMPLEMENTACIÓN

## ✅ **YA COMPLETADO:**

1. ✅ Script SQL completo con TODAS las tablas (`supabase/migrations/complete_system_schema.sql`)
2. ✅ Hook `useAuth` real con Supabase (`hooks/useAuth.ts`)
3. ✅ Middleware para proteger rutas (`middleware.ts`)
4. ✅ Login de Admin (`/admin-login`)
5. ✅ Login de Cliente restaurado (`/login`)
6. ✅ Registro de Cliente restaurado (`/register`)

---

## 🚧 **PENDIENTE DE COMPLETAR:**

### **1. Restaurar autenticación en TODAS las páginas Admin**

Archivos que necesitan cambios:

#### **`app/(admin)/admin/page.tsx`**
```typescript
// ELIMINAR estas líneas:
// const { user, loading: authLoading } = useAuth()
// BYPASS DE AUTENTICACIÓN - Cargar stats directamente
// if (!authLoading && !user) {
//   router.push('/login')
//   return
// }

// RESTAURAR:
'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  // ... resto del código

  useEffect(() => {
    if (!authLoading) {
      if (!user || profile?.role !== 'admin') {
        router.push('/admin-login')
        return
      }
      loadStats()
    }
  }, [user, profile, authLoading, router])

  if (authLoading || loading) {
    return <div>Cargando...</div>
  }

  // ... resto del código
}
```

#### **Aplicar el mismo patrón en:**
- `app/(admin)/admin/creditos/comprar/page.tsx`
- `app/(admin)/admin/solicitudes-creditos/page.tsx`
- `app/(admin)/admin/videos-ia/page.tsx`
- `app/(admin)/admin/videos-ia-v2/page.tsx`
- `app/(admin)/admin/estadisticas/page.tsx`
- `app/(admin)/admin/configuracion/redes-sociales/page.tsx`
- `app/(admin)/admin/gestor-paginas/page.tsx`
- `app/(admin)/admin/clientes/page.tsx`
- `app/(admin)/admin/citas/page.tsx`
- `app/(admin)/admin/tratamientos/page.tsx`
- `app/(admin)/admin/sofia/page.tsx`
- `app/(admin)/admin/productos/page.tsx`
- `app/(admin)/admin/reportes/page.tsx`
- `app/(admin)/admin/configuracion/page.tsx`

---

### **2. Crear Dashboard de CLIENTES**

#### **`app/dashboard/page.tsx`** (NUEVO)
```typescript
'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ClientDashboardPage() {
  const router = useRouter()
  const { user, profile, loading, signOut } = useAuth()
  const [credits, setCredits] = useState(0)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Panel de Cliente</h1>
          <button onClick={signOut} className="px-4 py-2 bg-red-500 text-white rounded">
            Cerrar Sesión
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card de Créditos */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Mis Créditos</h2>
            <p className="text-3xl font-bold text-primary-600">{credits}</p>
            <a href="/dashboard/creditos" className="text-sm text-primary-600 hover:underline">
              Ver detalles →
            </a>
          </div>

          {/* Card de Videos */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Mis Videos</h2>
            <p className="text-sm text-gray-600">Crea videos con IA</p>
            <a href="/dashboard/videos" className="text-sm text-primary-600 hover:underline">
              Ir a Videos →
            </a>
          </div>

          {/* Card de Redes Sociales */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Redes Sociales</h2>
            <p className="text-sm text-gray-600">Gestiona tus cuentas</p>
            <a href="/dashboard/redes" className="text-sm text-primary-600 hover:underline">
              Configurar →
            </a>
          </div>
        </div>

        {/* Secciones adicionales */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Perfil</h2>
          <div className="space-y-2">
            <p><strong>Nombre:</strong> {profile?.full_name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Teléfono:</strong> {profile?.phone || 'No especificado'}</p>
          </div>
        </div>
      </main>
    </div>
  )
}
```

---

### **3. Crear Admin en Supabase (MANUAL)**

**NO crear página de registro para admin**. Crear directamente en Supabase:

1. Ir a **Supabase Dashboard** → Authentication → Users
2. Click **"Add user"** o usar SQL Editor:

```sql
-- Crear usuario admin manualmente
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@rebecabarreto.com', -- Email del admin
  crypt('TU_CONTRASEÑA_SEGURA_AQUI', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Administrador"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Luego actualizar el rol a admin
UPDATE public.user_profiles
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@rebecabarreto.com');
```

---

### **4. Actualizar `package.json` dependencias**

Asegurar que tienes:

```json
{
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.8.7",
    "@supabase/supabase-js": "^2.38.4",
    // ... resto de dependencias
  }
}
```

Ejecutar: `npm install`

---

### **5. Variables de Entorno**

Asegurar `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

---

## 🎯 **ORDEN DE IMPLEMENTACIÓN:**

1. **Ejecutar migración SQL completa** (ya está creada)
2. **Crear usuario admin manualmente** en Supabase
3. **Restaurar autenticación en páginas admin** (todas las de `/admin/*`)
4. **Crear dashboard de clientes** (`/dashboard/*`)
5. **Probar flujos**:
   - Registro de cliente → Login → Dashboard cliente
   - Login admin → Panel admin

---

## 📋 **CHECKLIST DE ARCHIVOS A MODIFICAR:**

### ✅ **Ya Modificados:**
- [x] `hooks/useAuth.ts`
- [x] `middleware.ts`
- [x] `app/(auth)/admin-login/page.tsx`
- [x] `app/(auth)/login/page.tsx`
- [x] `app/(auth)/register/page.tsx`
- [x] `supabase/migrations/complete_system_schema.sql`

### ❌ **Pendientes:**
- [ ] `app/(admin)/admin/page.tsx`
- [ ] `app/(admin)/admin/creditos/comprar/page.tsx`
- [ ] `app/(admin)/admin/solicitudes-creditos/page.tsx`
- [ ] `app/(admin)/admin/videos-ia-v2/page.tsx`
- [ ] `app/(admin)/admin/estadisticas/page.tsx`
- [ ] `app/(admin)/admin/configuracion/redes-sociales/page.tsx`
- [ ] `app/(admin)/admin/gestor-paginas/page.tsx`
- [ ] Todas las demás páginas admin que existan
- [ ] `app/dashboard/page.tsx` (crear)
- [ ] `app/dashboard/creditos/page.tsx` (crear)
- [ ] `app/dashboard/videos/page.tsx` (crear)
- [ ] `app/dashboard/redes/page.tsx` (crear)

---

## 🚀 **PASOS FINALES:**

1. Ejecutar migración SQL en Supabase
2. Crear admin manualmente
3. Modificar TODAS las páginas admin para usar `useAuth` real
4. Crear páginas del dashboard de clientes
5. Probar ambos flujos (admin y cliente)
6. Eliminar cualquier bypass restante

---

**NOTA IMPORTANTE:** Este documento es una guía completa para finalizar la implementación de autenticación profesional. Todos los bypasses temporales deben ser eliminados y reemplazados por autenticación real con `useAuth`.

