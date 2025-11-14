# Configuración de Supabase - Sistema de Aprendizaje

## Pasos para Configurar las Tablas

### Opción 1: Desde el Dashboard de Supabase (Recomendado)

1. **Ir a tu proyecto en Supabase**
   - Abre [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Selecciona tu proyecto: `ebaexyozjncxjixfqeff`

2. **Abrir el SQL Editor**
   - En el menú lateral, click en "SQL Editor"
   - Click en "New Query"

3. **Copiar y Ejecutar la Migración**
   - Abre el archivo `supabase/migrations/001_learning_system.sql`
   - Copia TODO el contenido
   - Pega en el SQL Editor de Supabase
   - Click en "Run" (o presiona Ctrl/Cmd + Enter)

4. **Verificar Creación**
   - Ve a "Table Editor" en el menú lateral
   - Deberías ver las nuevas tablas:
     - `vocabulario_paraguayo`
     - `patrones_conversacion`
     - `feedback_conversaciones`
     - `intenciones_detectadas`
     - `aprendizaje_continuo`

5. **Verificar Datos Iniciales**
   - Click en la tabla `vocabulario_paraguayo`
   - Deberías ver 6 palabras pre-cargadas:
     - marcarme
     - marcame
     - nomás
     - sos
     - querés
     - mirá

### Opción 2: Desde la CLI de Supabase

Si tenés Supabase CLI instalado:

```bash
# Instalar Supabase CLI (si no lo tenés)
npm install -g supabase

# Login
supabase login

# Link a tu proyecto
supabase link --project-ref ebaexyozjncxjixfqeff

# Ejecutar migración
supabase db push
```

## Verificar que Todo Funciona

### 1. Verificar Tablas Creadas

Ejecuta en el SQL Editor:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'vocabulario_paraguayo',
  'patrones_conversacion',
  'feedback_conversaciones',
  'intenciones_detectadas',
  'aprendizaje_continuo'
);
```

Deberías ver las 5 tablas listadas.

### 2. Verificar Datos Iniciales

```sql
SELECT palabra_o_frase, significado, frecuencia_uso 
FROM vocabulario_paraguayo 
ORDER BY frecuencia_uso DESC;
```

Deberías ver:
- marcarme (100)
- marcame (100)
- sos (90)
- querés (90)
- mirá (85)
- nomás (80)

### 3. Verificar Patrones

```sql
SELECT categoria, patron_entrada 
FROM patrones_conversacion;
```

Deberías ver 3 patrones de agendamiento.

### 4. Verificar Trigger

```sql
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'trigger_aprendizaje_automatico';
```

Debería mostrar el trigger configurado.

## Políticas de Seguridad (RLS)

Por defecto, las tablas están sin políticas. Para producción, agrega políticas de seguridad:

```sql
-- Habilitar RLS
ALTER TABLE vocabulario_paraguayo ENABLE ROW LEVEL SECURITY;
ALTER TABLE patrones_conversacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_conversaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE intenciones_detectadas ENABLE ROW LEVEL SECURITY;
ALTER TABLE aprendizaje_continuo ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública (para que Sofía pueda leer)
CREATE POLICY "Lectura pública vocabulario" ON vocabulario_paraguayo
  FOR SELECT USING (true);

CREATE POLICY "Lectura pública patrones" ON patrones_conversacion
  FOR SELECT USING (true);

-- Permitir escritura desde el servicio (usando service_role key)
CREATE POLICY "Escritura servicio feedback" ON feedback_conversaciones
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Escritura servicio intenciones" ON intenciones_detectadas
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Escritura servicio aprendizaje" ON aprendizaje_continuo
  FOR INSERT WITH CHECK (true);
```

## Probar el Sistema

### 1. Insertar un Feedback de Prueba

```sql
INSERT INTO feedback_conversaciones (
  mensaje_usuario,
  respuesta_sofia,
  fue_util,
  contexto_cultural
) VALUES (
  'Marcame para mañana a las 10',
  'Perfecto! Te marco para mañana a las 10. ¿Me pasás tu nombre?',
  true,
  'Cliente usó "marcame" correctamente para agendar'
);
```

### 2. Buscar Vocabulario

```sql
SELECT * FROM vocabulario_paraguayo 
WHERE palabra_o_frase ILIKE '%marca%';
```

### 3. Ver Estadísticas

```sql
-- Total de palabras aprendidas
SELECT COUNT(*) as total_palabras FROM vocabulario_paraguayo;

-- Palabras más usadas
SELECT palabra_o_frase, frecuencia_uso 
FROM vocabulario_paraguayo 
ORDER BY frecuencia_uso DESC 
LIMIT 10;

-- Total de feedback recibido
SELECT COUNT(*) as total_feedback FROM feedback_conversaciones;
```

## Mantenimiento

### Backup de Datos

```sql
-- Exportar vocabulario
COPY vocabulario_paraguayo TO '/tmp/vocabulario_backup.csv' CSV HEADER;

-- Exportar patrones
COPY patrones_conversacion TO '/tmp/patrones_backup.csv' CSV HEADER;
```

### Limpiar Datos de Prueba

```sql
-- Eliminar feedback de prueba
DELETE FROM feedback_conversaciones 
WHERE mensaje_usuario LIKE '%prueba%' OR mensaje_usuario LIKE '%test%';
```

### Actualizar Frecuencias Manualmente

```sql
-- Incrementar frecuencia de una palabra
UPDATE vocabulario_paraguayo 
SET frecuencia_uso = frecuencia_uso + 10,
    actualizado_en = NOW()
WHERE palabra_o_frase = 'marcarme';
```

## Troubleshooting

### Error: "relation does not exist"

- Verifica que ejecutaste la migración completa
- Revisa que estás en el schema correcto (public)

### Error: "permission denied"

- Verifica las políticas RLS
- Usa la `service_role` key para operaciones de escritura

### Trigger no funciona

```sql
-- Verificar que el trigger existe
SELECT * FROM pg_trigger WHERE tgname = 'trigger_aprendizaje_automatico';

-- Recrear trigger si es necesario
DROP TRIGGER IF EXISTS trigger_aprendizaje_automatico ON conversaciones_sofia;
CREATE TRIGGER trigger_aprendizaje_automatico
AFTER INSERT ON conversaciones_sofia
FOR EACH ROW
EXECUTE FUNCTION actualizar_frecuencia_vocabulario();
```

## Próximos Pasos

Una vez configurado:

1. ✅ Las tablas están listas
2. ✅ El vocabulario inicial está cargado
3. ✅ Los patrones están configurados
4. ✅ El trigger de auto-aprendizaje está activo

Ahora Sofía puede:
- Entender "marcarme" correctamente
- Aprender de cada conversación
- Mejorar sus respuestas con el tiempo

## Soporte

Si tenés problemas:

1. Revisa los logs en Supabase Dashboard > Logs
2. Verifica las políticas RLS
3. Asegúrate de usar las keys correctas en `.env.local`

---

**Proyecto**: Rebeca Barreto Estética y Belleza  
**Base de Datos**: Supabase  
**URL**: https://ebaexyozjncxjixfqeff.supabase.co

