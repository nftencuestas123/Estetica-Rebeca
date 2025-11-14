# Migraciones de Base de Datos - Rebeca Barreto Estética

Este directorio contiene las migraciones SQL para la base de datos de Supabase.

## Orden de Ejecución

### 001_initial_schema.sql
**Fecha**: Inicial  
**Descripción**: Schema completo de la base de datos
- Tablas: users, sedes, especialistas, tratamientos, citas, productos, conversaciones_sofia
- Índices para performance
- Row Level Security (RLS) configurado
- Triggers para updated_at
- Datos iniciales (sedes y tratamientos de ejemplo)

### 002_add_agent_field.sql
**Fecha**: 2024-11-14  
**Descripción**: Agregar campo agente_asignado
- Agrega campo `agente_asignado` a `conversaciones_sofia`
- Permite tracking de qué agente atendió cada conversación
- Índice para búsquedas por agente

### 001_learning_system.sql
**Fecha**: Futuro  
**Descripción**: Sistema de aprendizaje para el chat de Sofía
- Tablas para feedback y mejora continua
- Machine learning integrado

## Cómo Ejecutar las Migraciones

### Opción 1: Dashboard de Supabase (Recomendado)
1. Ir a https://supabase.com/dashboard/project/ebaexyozjncxjixfqeff
2. Ir a SQL Editor
3. Copiar y pegar el contenido de cada archivo SQL en orden
4. Ejecutar

### Opción 2: CLI de Supabase
```bash
# Instalar CLI si no la tienes
npm install -g supabase

# Login
supabase login

# Link al proyecto
supabase link --project-ref ebaexyozjncxjixfqeff

# Ejecutar todas las migraciones
supabase db push
```

### Opción 3: Manualmente
```bash
psql "postgresql://postgres:[PASSWORD]@db.ebaexyozjncxjixfqeff.supabase.co:5432/postgres" < supabase/migrations/001_initial_schema.sql
psql "postgresql://postgres:[PASSWORD]@db.ebaexyozjncxjixfqeff.supabase.co:5432/postgres" < supabase/migrations/002_add_agent_field.sql
```

## Verificar que las Migraciones se Ejecutaron

```sql
-- Ver todas las tablas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver estructura de una tabla específica
\d conversaciones_sofia

-- Verificar políticas RLS
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

## Rollback (Si es necesario)

Para revertir una migración, ejecuta los comandos DROP correspondientes:

```sql
-- Ejemplo: Revertir 002_add_agent_field.sql
ALTER TABLE conversaciones_sofia DROP COLUMN IF EXISTS agente_asignado;
DROP INDEX IF EXISTS idx_conversaciones_agente;
```

## Notas Importantes

- ⚠️ **Nunca** ejecutes migraciones directamente en producción sin probar primero
- ✅ Siempre haz un backup antes de ejecutar migraciones
- 📝 Documenta cualquier cambio manual que hagas en la base de datos
- 🔒 Las políticas RLS protegen los datos de los usuarios

## Estado Actual

- ✅ 001_initial_schema.sql - Ejecutado
- ⏳ 002_add_agent_field.sql - Pendiente de ejecutar
- ⏳ 001_learning_system.sql - Pendiente de crear

## Contacto

Para dudas sobre las migraciones, contacta al equipo de desarrollo.

