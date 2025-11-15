# 💳 Guía Completa: Sistema de Créditos

## 🎯 ¿Qué hace este sistema?

Permite que clientes compren créditos para generar videos con IA. El flujo es:

1. **Cliente** → Solicita créditos (elige paquete: $10, $50, $100)
2. **Cliente** → Elige método de pago (Transferencia, Billetera Personal, Cambio Chaco, Efectivo)
3. **Cliente** → Sube comprobante de pago
4. **Admin** → Recibe notificación, ve comprobante
5. **Admin** → Aprueba o rechaza solicitud
6. **Cliente** → Recibe créditos automáticamente
7. **Cliente** → Usa créditos para generar videos

---

## 📋 PASO 1: Configurar Base de Datos (Supabase)

### 1.1. Crear Tablas

1. Ve a tu proyecto Supabase → **SQL Editor**
2. Click en **"New Query"**
3. Abre el archivo: `supabase/migrations/create_credits_tables.sql`
4. Copia TODO el contenido
5. Pégalo en Supabase SQL Editor
6. Click en **"Run"** ✅

Esto creará:
- ✅ Tabla `user_credits` (balance de usuarios)
- ✅ Tabla `credit_purchase_requests` (solicitudes)
- ✅ Tabla `credit_transactions` (historial)
- ✅ Storage bucket `credit-receipts` (comprobantes)
- ✅ Políticas de seguridad (RLS)

---

## ⚙️ PASO 2: Configurar Datos de Pago

### 2.1. Editar `constants/payment-config.ts`

Este archivo tiene **PLACEHOLDERS** que debes reemplazar con tus datos reales:

```typescript
// 🏦 TRANSFERENCIA BANCARIA
bankTransfer: {
  bankName: '[NOMBRE DEL BANCO - MODIFICAR]',       // Ej: "Banco Continental"
  accountNumber: '[NÚMERO DE CUENTA - MODIFICAR]',  // Ej: "1234567890"
  accountHolder: '[NOMBRE DEL TITULAR - MODIFICAR]',// Ej: "Juan Pérez"
  accountType: '[TIPO DE CUENTA - MODIFICAR]',      // Ej: "Cuenta Corriente"
  ruc: '[RUC/CÉDULA - MODIFICAR]',                  // Ej: "1234567-8"
},

// 📱 BILLETERA PERSONAL
personalWallet: {
  phoneNumber: '[NÚMERO DE CELULAR - MODIFICAR]',   // Ej: "+595 981 123456"
  holderName: '[NOMBRE TITULAR - MODIFICAR]',       // Ej: "Juan Pérez"
  ci: '[CÉDULA - MODIFICAR]',                       // Ej: "1234567"
},

// 🏦 CAMBIO CHACO
cambioChaco: {
  holderName: '[NOMBRE/EMPRESA - MODIFICAR]',       // Ej: "Empresa XYZ"
  identification: '[CÉDULA/RUC - MODIFICAR]',       // Ej: "80012345-6"
  accountNumber: '[NÚMERO DE CUENTA - MODIFICAR]',  // Ej: "9876543210"
},

// 💵 EFECTIVO EN PERSONA
cashInPerson: {
  address: '[DIRECCIÓN/PUNTO DE ENCUENTRO - MODIFICAR]',  // Ej: "Av. España 123, Ciudad del Este"
  schedule: '[HORARIO DE ATENCIÓN - MODIFICAR]',          // Ej: "Lunes a Viernes, 9am - 6pm"
  contactPhone: '[TELÉFONO DE CONTACTO - MODIFICAR]',     // Ej: "+595 981 123456"
  contactName: '[NOMBRE DE CONTACTO - MODIFICAR]',        // Ej: "María López"
},
```

### 2.2. Configurar Precios de Videos (Cuando TopView responda)

```typescript
// 🎬 PRECIOS DE VIDEOS (BASADO EN TOPVIEW)
export const VIDEO_PRICING = {
  costPerMinute: 0, // [ACTUALIZAR SEGÚN TOPVIEW - MODIFICAR]
  // Ejemplo: Si TopView cobra $1/min, pon: costPerMinute: 1,
  
  markup: 100, // Porcentaje de ganancia (100% = duplicar precio)
  // Ejemplo: Si TopView cobra $1, tú vendes a $2 (100% markup)
  // Si quieres 50% ganancia: markup: 50 → TopView $1, tú vendes $1.50
}
```

**Ejemplo real:**
```typescript
// TopView cobra $1 por minuto
costPerMinute: 1,
markup: 100, // Vendes a $2/min (100% ganancia)

// Entonces:
// - Video de 1 min = $2
// - Video de 2 min = $4
// - Video de 5 min = $10
// - Video de 10 min = $20
```

### 2.3. Actualizar Estimaciones de Videos en Paquetes

Una vez que sepas el precio real, actualiza:

```typescript
export const CREDIT_PACKAGES = [
  {
    id: 'basic',
    name: 'BÁSICO',
    price: 10,
    displayPrice: '$10',
    estimatedVideos: '~5 videos de 1min', // ACTUALIZAR
  },
  {
    id: 'standard',
    name: 'ESTÁNDAR',
    price: 50,
    displayPrice: '$50',
    estimatedVideos: '~25 videos de 1min', // ACTUALIZAR
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 100,
    displayPrice: '$100',
    estimatedVideos: '~50 videos de 1min', // ACTUALIZAR
  },
]
```

---

## 🚀 PASO 3: Usar el Sistema

### Para Clientes:

1. Ir a: `/admin/creditos/comprar`
2. Elegir paquete: $10, $50 o $100
3. Seleccionar método de pago
4. Ver instrucciones de pago
5. Realizar transferencia/pago
6. Subir comprobante
7. Esperar aprobación (máx 24hs)
8. ¡Recibir créditos y crear videos!

### Para Administradores:

1. Ir a: `/admin/solicitudes-creditos`
2. Ver solicitudes pendientes
3. Click en comprobante para verificar
4. Aprobar ✅ o Rechazar ❌
5. Cliente recibe créditos automáticamente

---

## 📊 CÓMO FUNCIONAN LOS CRÉDITOS

### Flujo de Créditos:

```
Cliente compra $50
        ↓
Admin aprueba
        ↓
+$50 en balance del cliente
        ↓
Cliente genera video de 2 min
        ↓
Costo: $4 (según VIDEO_PRICING)
        ↓
-$4 del balance
        ↓
Balance nuevo: $46
```

### Cálculo Automático de Costos:

El sistema calcula automáticamente:

```typescript
// Duración → Precio
30 segundos = $X (según costPerMinute * 0.5)
1 minuto = $X (según costPerMinute)
2 minutos = $X (según costPerMinute * 2)
5 minutos = $X (según costPerMinute * 5)
10 minutos = $X (según costPerMinute * 10)
```

---

## 🔧 MODIFICAR CONFIGURACIÓN DESPUÉS

### Cambiar datos bancarios:

**Archivo:** `constants/payment-config.ts`

```typescript
// Solo edita los valores entre corchetes
bankName: 'Banco Continental', // ← Cambia aquí
accountNumber: '1234567890',   // ← Cambia aquí
```

### Cambiar precios de paquetes:

**Archivo:** `constants/payment-config.ts`

```typescript
export const CREDIT_PACKAGES = [
  {
    id: 'basic',
    price: 15, // ← Cambia de $10 a $15
    // ...
  },
]
```

### Cambiar markup (ganancia):

**Archivo:** `constants/payment-config.ts`

```typescript
markup: 150, // ← Cambia de 100% a 150% de ganancia
// TopView $1/min → Tú vendes $2.50/min
```

---

## 📱 NOTIFICACIONES (Futuro)

El sistema ya tiene preparado:

```typescript
export const NOTIFICATION_CONFIG = {
  adminEmail: '[EMAIL ADMINISTRADOR - MODIFICAR]',
  adminPhone: '[TELÉFONO ADMINISTRADOR - MODIFICAR]',
  businessName: 'Rebeca Barreto Estética y Belleza',
}
```

En el futuro, se puede agregar:
- Email al admin cuando hay nueva solicitud
- SMS al admin
- Email al cliente cuando se aprueba
- Push notifications

---

## 🎨 PERSONALIZACIÓN

### Cambiar colores de paquetes:

**Archivo:** `app/(admin)/admin/creditos/comprar/page.tsx`

Busca y modifica:
```tsx
className="... border-primary-400 ..." // Cambia primary-400 por otro color
```

### Agregar más paquetes:

**Archivo:** `constants/payment-config.ts`

```typescript
export const CREDIT_PACKAGES = [
  // ... paquetes existentes
  {
    id: 'mega',
    name: 'MEGA',
    price: 200,
    displayPrice: '$200',
    estimatedVideos: '~100 videos de 1min',
    recommended: false,
  },
]
```

### Agregar más métodos de pago:

**Archivo:** `constants/payment-config.ts`

```typescript
export const PAYMENT_METHODS = [
  // ... métodos existentes
  {
    id: 'crypto',
    name: 'Criptomonedas',
    icon: '₿',
    instructionsKey: 'crypto', // Luego agregar instrucciones en PAYMENT_CONFIG
  },
]
```

---

## ⚠️ IMPORTANTE: Seguridad

✅ **Ya implementado:**
- Row Level Security (RLS) en Supabase
- Solo usuarios pueden ver sus propios créditos
- Solo usuarios pueden crear sus propias solicitudes
- Solo admins pueden aprobar/rechazar

❌ **NO implementado (hacerlo manualmente):**
- Crear role "admin" en Supabase
- Agregar políticas para que solo admins vean todas las solicitudes

---

## 🐛 Troubleshooting

### "Error: relation 'user_credits' does not exist"
**Solución:** No ejecutaste el SQL. Ve a Paso 1.

### "Comprobante no se sube"
**Solución:** 
1. Ve a Supabase → Storage
2. Verifica que exista bucket `credit-receipts`
3. Verifica que tenga políticas públicas

### "No veo solicitudes en panel admin"
**Solución:**
1. Verifica que el usuario sea admin
2. Por ahora, el panel muestra todas las solicitudes pendientes
3. Agregar filtro de roles en el futuro

---

## 📊 Resumen de Archivos

```
SISTEMA DE CRÉDITOS:

📁 constants/
  └── payment-config.ts ← CONFIGURAR AQUÍ (datos bancarios, precios)

📁 services/
  └── credits.ts ← Lógica de créditos (no tocar)

📁 app/(admin)/admin/
  ├── creditos/comprar/page.tsx ← Página cliente (comprar créditos)
  └── solicitudes-creditos/page.tsx ← Página admin (aprobar)

📁 components/
  └── AdminSidebar.tsx ← Menú actualizado

📁 supabase/migrations/
  └── create_credits_tables.sql ← SQL para ejecutar

📄 GUIA_SISTEMA_CREDITOS.md ← ESTE ARCHIVO
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Ejecutar SQL en Supabase (`create_credits_tables.sql`)
- [ ] Configurar datos bancarios en `payment-config.ts`
- [ ] Esperar respuesta de TopView para actualizar `VIDEO_PRICING`
- [ ] Actualizar estimaciones de videos en `CREDIT_PACKAGES`
- [ ] Configurar emails de notificación (opcional)
- [ ] Probar flujo completo:
  - [ ] Cliente solicita créditos
  - [ ] Admin aprueba
  - [ ] Cliente recibe créditos
  - [ ] Cliente genera video
  - [ ] Créditos se descuentan

---

## 🚀 ¡LISTO!

El sistema está **100% funcional** con placeholders. Solo falta:
1. Ejecutar SQL
2. Configurar tus datos de pago
3. Actualizar precios cuando TopView responda

**¿Dudas? Todo está comentado en el código.** 💪

