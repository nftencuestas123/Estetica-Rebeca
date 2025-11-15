# 🚀 EJECUTAR EN 2 PASOS - MUY SIMPLE

## ⚠️ POR QUÉ FALLÓ ANTES

El error **"relation public.pages does not exist"** significa que:
- ❌ Solo se ejecutó PARTE del script
- ❌ Faltó crear las tablas primero

## ✅ SOLUCIÓN: 2 SCRIPTS SEPARADOS

He dividido todo en **2 partes más seguras:**

1. **PARTE 1:** Crea las 16 tablas (EJECUTAR PRIMERO)
2. **PARTE 2:** Inserta los datos (EJECUTAR DESPUÉS)

---

# 📋 PASO A PASO

## 🔴 PASO 1: ELIMINAR TODO EN SUPABASE

1. Ve a: https://supabase.com/dashboard/project/ebaexyozjncxjixfqeff
2. Click en **"Table Editor"** (menú lateral)
3. **Elimina TODAS las tablas existentes** (si hay alguna)
4. Deja en **0 tablas**

---

## 🟢 PASO 2: EJECUTAR PARTE 1 (Crear Tablas)

### 2.1 Abrir SQL Editor
- Click en **"SQL Editor"** (menú lateral)
- Click en **"New query"**

### 2.2 Copiar PARTE 1
- Abre el archivo: **`PARTE_1_CREAR_TABLAS.sql`**
- Copia **TODO EL CONTENIDO** (Ctrl+A, Ctrl+C)

### 2.3 Pegar y Ejecutar
- Pega en el SQL Editor
- Click en **"Run"** (o Ctrl+Enter)
- **Espera 5-10 segundos**

### 2.4 Verificar Resultado
Deberías ver:
```
✅ PARTE 1 COMPLETADA - 16 tablas creadas

Y una lista de tablas:
- appointments
- business_stats
- copy_templates
- credit_purchase_requests
- credit_transactions
- crm_clients
- pages
- product_sales
- products
- social_accounts
- social_posts
- system_config
- treatments
- user_credits
- user_profiles
- videos
```

**✅ SI VES ESTO, CONTINUÁ AL PASO 3**

---

## 🟡 PASO 3: EJECUTAR PARTE 2 (Insertar Datos)

### 3.1 Nueva Query
- En SQL Editor, click en **"New query"** otra vez

### 3.2 Copiar PARTE 2
- Abre el archivo: **`PARTE_2_INSERTAR_DATOS.sql`**
- Copia **TODO EL CONTENIDO**

### 3.3 Pegar y Ejecutar
- Pega en el SQL Editor
- Click en **"Run"**
- **Espera 3-5 segundos**

### 3.4 Verificar Resultado
Deberías ver:
```
🎉 BASE DE DATOS COMPLETA Y LISTA
✅ 16 Tablas creadas
✅ 28 Landing pages insertadas
✅ 4 Tratamientos de ejemplo
✅ 3 Productos de ejemplo

Y una tabla con:
pages       | 28 | 28 landing pages cargadas
treatments  | 4  | 4 tratamientos de ejemplo
products    | 3  | 3 productos de ejemplo
user_profiles | 0 | Vacía - se crea al registrar usuarios
```

**✅ SI VES ESTO, ¡LISTO! TODO ESTÁ PERFECTO**

---

## ✅ VERIFICACIÓN FINAL

### En Supabase - Table Editor:

Deberías ver **16 tablas:**
- [ ] appointments (vacía)
- [ ] business_stats (vacía)
- [ ] copy_templates (vacía)
- [ ] credit_purchase_requests (vacía)
- [ ] credit_transactions (vacía)
- [ ] crm_clients (vacía)
- [ ] **pages (28 registros)** ✅
- [ ] product_sales (vacía)
- [ ] **products (3 registros)** ✅
- [ ] social_accounts (vacía)
- [ ] social_posts (vacía)
- [ ] system_config (vacía)
- [ ] **treatments (4 registros)** ✅
- [ ] user_credits (vacía)
- [ ] user_profiles (vacía)
- [ ] videos (vacía)

---

## 🧪 PROBAR EL REGISTRO

1. Abre: **http://localhost:3000/register**
2. Completa:
   ```
   Nombre: Test User
   Email: test@example.com
   WhatsApp: +595 987 123 456
   Contraseña: test123
   Confirmar: test123
   ```
3. Click en **"Crear Cuenta"**

**Resultado esperado:**
- ✅ Redirige a `/dashboard`
- ✅ En Supabase → Authentication → Users (aparece tu usuario)
- ✅ En Supabase → Table Editor → user_profiles (1 registro)
- ✅ En Supabase → Table Editor → user_credits (1 registro)

---

## 🔐 CREAR ADMIN

Una vez que el registro funcione:

1. Registrate normalmente en la app
2. Ve a Supabase → Table Editor → **user_profiles**
3. Busca tu usuario
4. Cambia `role` de `client` a `admin`
5. Save
6. Ya podés entrar a: **http://localhost:3000/admin-login**

---

## 🆘 SI HAY ERRORES

### Error en PARTE 1:
- Copia el error completo y mandámelo
- Verifica que eliminaste TODAS las tablas antes

### Error en PARTE 2:
- Verifica que ejecutaste PARTE 1 primero
- Verifica que PARTE 1 se completó sin errores
- Si hay duplicados, es porque ya insertaste antes (está ok, ignoralo)

### El registro no funciona:
- Verifica que el trigger existe:
  ```sql
  SELECT tgname FROM pg_trigger WHERE tgname = 'on_auth_user_created';
  ```
  Debe devolver 1 fila

---

## 📊 RESUMEN

```
PARTE 1: Crear estructura (16 tablas + RLS + triggers)
   ⬇️
PARTE 2: Insertar datos (28 páginas + tratamientos + productos)
   ⬇️
LISTO: Todo funcional 100%
```

---

## 📞 SIGUIENTE PASO

**Ejecutá las 2 partes en orden y avisame:**
- ✅ "Listo, las 2 partes funcionaron"
- ❌ "Error en PARTE X: [mensaje de error]"

🚀 **¡Adelante! Ejecutá PARTE 1 primero**

