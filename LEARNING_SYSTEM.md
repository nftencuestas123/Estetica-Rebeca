# Sistema de Auto-Aprendizaje de Sofía 🧠

## Descripción

Sistema inteligente que permite a Sofía y las agentes aprender continuamente del vocabulario paraguayo y patrones de conversación reales con los clientes.

## Características Principales

### 1. 🗣️ Aprendizaje de Vocabulario Paraguayo

El sistema detecta y aprende automáticamente modismos y expresiones locales:

- **"Marcarme"** = Agendar/Anotar una cita (NO llamar por teléfono)
- **"Nomás"** = Solamente, simplemente
- **"Sos"** = Eres
- **"Querés"** = Quieres
- **"Mirá"** = Mira

### 2. 🔄 Patrones de Conversación

Aprende patrones efectivos de entrada-respuesta:

```
Cliente: "Marcame para el viernes a las 3"
Sofía: "Perfecto! Te marco para el viernes a las 3 de la tarde..."
```

### 3. 📊 Feedback Continuo

Registra qué respuestas funcionan mejor y aprende de correcciones.

### 4. 🎯 Detección de Intenciones

Identifica automáticamente qué quiere el cliente:
- Agendar cita
- Consultar información
- Cancelar/reprogramar
- Saludar

## Tablas de Base de Datos

### `vocabulario_paraguayo`
Almacena palabras y frases paraguayas con:
- Significado
- Contexto de uso
- Ejemplos
- Frecuencia de uso
- Nivel de confianza

### `patrones_conversacion`
Patrones de entrada-respuesta con:
- Patrón de entrada (regex)
- Respuesta sugerida
- Categoría
- Efectividad
- Veces usado

### `feedback_conversaciones`
Feedback de usuarios para mejorar:
- Si la respuesta fue útil
- Si requirió corrección
- Corrección sugerida
- Contexto cultural

### `intenciones_detectadas`
Log de intenciones para análisis:
- Intención detectada
- Confianza
- Palabras clave
- Si fue correcta

### `aprendizaje_continuo`
Log general de todo lo aprendido:
- Tipo de aprendizaje
- Dato original vs aprendido
- Fuente
- Estado de validación

## Cómo Funciona

### 1. Detección Automática

Cada vez que un cliente envía un mensaje, el sistema:

1. Busca vocabulario paraguayo conocido
2. Identifica la intención del mensaje
3. Busca patrones de conversación relevantes
4. Actualiza frecuencias de uso

### 2. Aprendizaje Continuo

El sistema aprende de:

- **Conversaciones reales**: Detecta nuevas palabras y patrones
- **Feedback de usuarios**: Mejora respuestas basándose en feedback
- **Correcciones manuales**: Aprende de correcciones del equipo

### 3. Mejora de Respuestas

Con el tiempo, Sofía:

- Entiende mejor el vocabulario local
- Responde más naturalmente
- Detecta intenciones con mayor precisión
- Se adapta al estilo de comunicación paraguayo

## Configuración en Supabase

### 1. Ejecutar Migración

```sql
-- Ejecutar el archivo: supabase/migrations/001_learning_system.sql
-- Esto creará todas las tablas necesarias
```

### 2. Verificar Tablas

Después de ejecutar la migración, deberías ver:

- ✅ `vocabulario_paraguayo` (con datos iniciales)
- ✅ `patrones_conversacion` (con patrones iniciales)
- ✅ `feedback_conversaciones`
- ✅ `intenciones_detectadas`
- ✅ `aprendizaje_continuo`

### 3. Datos Iniciales

El sistema viene pre-cargado con:

- **6 palabras/frases paraguayas** más comunes
- **3 patrones de agendamiento** iniciales
- **Trigger automático** para actualizar frecuencias

## Uso en el Código

### Detectar Vocabulario

```typescript
import { LearningService } from '@/services/learning.service'

const vocabulario = await LearningService.detectarVocabularioParaguayo(
  "Marcame para mañana"
)
// Retorna: [{ palabra_o_frase: 'marcame', significado: 'agendame una cita', ... }]
```

### Buscar Patrón Relevante

```typescript
const patron = await LearningService.buscarPatronRelevante(
  "Marcame para el viernes a las 3"
)
// Retorna el patrón más relevante con la respuesta sugerida
```

### Detectar Intención

```typescript
const intencion = await LearningService.detectarIntencion(
  "Marcame para mañana a las 10"
)
// Retorna: 'agendar'
```

### Registrar Feedback

```typescript
await LearningService.registrarFeedback({
  mensaje_usuario: "Marcame para mañana",
  respuesta_sofia: "Perfecto! Te marco para mañana...",
  fue_util: true,
  contexto_cultural: "Cliente usó 'marcame' para agendar"
})
```

### Aprender Nueva Palabra

```typescript
await LearningService.aprenderNuevaPalabra({
  palabra_o_frase: "che",
  significado: "expresión de llamada de atención",
  contexto: "Informal, muy paraguayo",
  ejemplos_uso: ["Che, ¿cómo estás?", "Che, mirá esto"],
  frecuencia_uso: 1,
  confianza: 0.8
})
```

## Estadísticas

Ver estadísticas de aprendizaje:

```typescript
const stats = await LearningService.obtenerEstadisticas()
console.log(stats)
// {
//   total_vocabulario: 15,
//   total_patrones: 8,
//   total_feedback: 42,
//   palabras_mas_usadas: [...]
// }
```

## Caso Real: "Marcarme"

### Problema Original

Cliente: "Marcame para el viernes a las 3"
Sofía (antes): "Entiendo que querés agendar, pero no puedo hacer llamadas..."

❌ Sofía interpretó "marcarme" como "llamarme por teléfono"

### Solución Implementada

1. **Entrenamiento en el prompt**:
   - Agregado vocabulario paraguayo específico
   - Ejemplos claros de uso

2. **Base de datos**:
   - "Marcarme" registrado con significado correcto
   - Patrones de conversación para agendamiento

3. **Resultado**:

Cliente: "Marcame para el viernes a las 3"
Sofía (ahora): "Perfecto! Te marco para el viernes a las 3 de la tarde. ¿Me pasás tu nombre completo y número de teléfono para confirmar tu cita?"

✅ Sofía entiende correctamente el vocabulario paraguayo

## Mantenimiento

### Revisar Aprendizajes

Periódicamente revisar la tabla `aprendizaje_continuo` para:

- Validar nuevos aprendizajes
- Corregir interpretaciones incorrectas
- Aprobar palabras/patrones para uso general

### Actualizar Confianza

Ajustar el nivel de confianza de palabras según su efectividad:

```sql
UPDATE vocabulario_paraguayo
SET confianza = 1.0
WHERE palabra_o_frase = 'marcarme' AND frecuencia_uso > 50;
```

### Limpiar Datos Antiguos

Eliminar feedback muy antiguo si es necesario:

```sql
DELETE FROM feedback_conversaciones
WHERE creado_en < NOW() - INTERVAL '6 months';
```

## Beneficios

1. ✅ **Comprensión Cultural**: Entiende modismos paraguayos
2. ✅ **Mejora Continua**: Aprende de cada conversación
3. ✅ **Personalización**: Se adapta al estilo local
4. ✅ **Escalabilidad**: Crece con el uso
5. ✅ **Transparencia**: Todo el aprendizaje es auditable

## Próximos Pasos

- [ ] Dashboard de administración para revisar aprendizajes
- [ ] Sistema de votación para validar nuevas palabras
- [ ] Análisis de sentimiento en feedback
- [ ] Exportar datos para entrenamiento de modelos
- [ ] Integración con otros dialectos (guaraní, etc.)

---

**Nota**: Este sistema está diseñado específicamente para el contexto paraguayo de "Rebeca Barreto Estética y Belleza" en Ciudad del Este.

