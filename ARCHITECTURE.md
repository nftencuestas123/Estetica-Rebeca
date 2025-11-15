# Arquitectura del Proyecto - Rebeca Barreto Estética

## Principio de Responsabilidad Única (SRP)

Este proyecto está estructurado siguiendo estrictamente el principio de responsabilidad única (Single Responsibility Principle - SRP). Cada módulo, componente, servicio y hook tiene una única razón para cambiar.

## Estructura de Carpetas

```
├── app/                    # Páginas y rutas de Next.js
├── components/             # Componentes de React
│   ├── common/            # Componentes reutilizables
│   ├── hero/              # Subcomponentes del Hero
│   ├── navbar/            # Subcomponentes del Navbar
│   └── sofia/             # Subcomponentes del chat Sofia
├── constants/             # Constantes y configuración estática
├── hooks/                 # Custom React Hooks
├── lib/                   # Utilidades y configuración
├── services/              # Servicios de lógica de negocio
└── types/                 # Definiciones de TypeScript
```

## Responsabilidades por Carpeta

### `/types`
**Responsabilidad:** Definir interfaces y tipos del dominio

- `sofia.types.ts` - Tipos del sistema de chat Sofia
- `navigation.types.ts` - Tipos de navegación
- `treatment.types.ts` - Tipos de tratamientos

### `/constants`
**Responsabilidad:** Almacenar datos estáticos y configuración

- `agents.constants.ts` - Datos de agentes del chat
- `navigation.constants.ts` - Enlaces de navegación
- `treatments.constants.ts` - Catálogo de tratamientos
- `sofia.constants.ts` - Prompt del sistema Sofia

### `/services`
**Responsabilidad:** Lógica de negocio y operaciones

- `agent.service.ts` - Gestión de agentes (asignación, estado)
- `message.service.ts` - Operaciones CRUD de mensajes
- `typing.service.ts` - Simulación de escritura humana
- `openrouter.service.ts` - Comunicación con API OpenRouter
- `sofia-chat.service.ts` - Lógica del chat con Sofia

### `/hooks`
**Responsabilidad:** Estado y efectos reutilizables

- `useChat.ts` - Estado y lógica del chat
- `useAuth.ts` - Estado de autenticación
- `useScrollDetect.ts` - Detección de scroll
- `useMouseTracking.ts` - Tracking del mouse
- `useDeviceDetect.ts` - Detección de dispositivo

### `/components/common`
**Responsabilidad:** Componentes UI reutilizables

- `Button.tsx` - Botón con variantes
- `SectionHeader.tsx` - Encabezado de sección
- `TreatmentCard.tsx` - Tarjeta de tratamiento
- `TestimonialCard.tsx` - Tarjeta de testimonio

### `/components/hero`
**Responsabilidad:** Subcomponentes del Hero

- `AnimatedBackground.tsx` - Fondo con gradiente dinámico
- `AnimatedParticles.tsx` - Partículas flotantes
- `DynamicShapes.tsx` - Formas decorativas animadas
- `HeroContent.tsx` - Contenido principal (título, CTAs)

### `/components/navbar`
**Responsabilidad:** Subcomponentes del Navbar

- `Logo.tsx` - Logo animado de la marca
- `NavLinks.tsx` - Enlaces de navegación
- `AuthButtons.tsx` - Botones de autenticación
- `MobileMenu.tsx` - Menú móvil

### `/components/sofia`
**Responsabilidad:** Subcomponentes del chat Sofia

- `AgentCard.tsx` - Tarjeta de agente
- `ChatMessage.tsx` - Mensaje individual
- `ChatInput.tsx` - Input de chat

## Componentes Refactorizados

Los siguientes componentes han sido refactorizados siguiendo SRP:

### Antes (Monolítico)
```
SofiaSection.tsx (1092 líneas)
├── Lógica de estado
├── Lógica de agentes
├── Lógica de mensajes
├── Lógica de typing
├── Llamadas a API
├── Renderizado de UI
└── Efectos y side effects
```

### Después (Modular)
```
SofiaSection.refactored.tsx (150 líneas)
├── useChat hook
│   ├── AgentService
│   ├── MessageService
│   ├── TypingService
│   └── SofiaChatService
│       └── OpenRouterService
└── Subcomponentes
    ├── AgentCard
    ├── ChatMessage
    └── ChatInput
```

## Beneficios de esta Arquitectura

### 1. **Mantenibilidad**
- Cada archivo tiene una única responsabilidad
- Fácil de encontrar y modificar código específico
- Cambios aislados no afectan otras partes

### 2. **Testabilidad**
- Servicios y hooks son fáciles de testear unitariamente
- Componentes pequeños son más fáciles de testear
- Mocking simplificado

### 3. **Reutilización**
- Componentes comunes reutilizables
- Servicios compartibles entre features
- Hooks reutilizables en múltiples componentes

### 4. **Escalabilidad**
- Fácil agregar nuevas features sin modificar existentes
- Estructura clara para nuevos desarrolladores
- Separación de concerns facilita trabajo en equipo

### 5. **Performance**
- Code splitting más efectivo
- Lazy loading granular
- Optimización específica por módulo

## Patrones de Diseño Utilizados

### 1. **Service Layer Pattern**
Servicios encapsulan lógica de negocio y comunicación con APIs.

### 2. **Custom Hooks Pattern**
Hooks encapsulan estado y efectos reutilizables.

### 3. **Composition Pattern**
Componentes pequeños se componen para formar componentes complejos.

### 4. **Dependency Injection**
Servicios y hooks reciben dependencias como parámetros.

## Guía de Desarrollo

### Crear un Nuevo Componente
1. Definir tipos en `/types`
2. Crear constantes necesarias en `/constants`
3. Implementar servicios en `/services` si hay lógica de negocio
4. Crear hooks en `/hooks` si hay estado/efectos
5. Implementar componente usando servicios y hooks

### Refactorizar un Componente Existente
1. Identificar responsabilidades múltiples
2. Extraer lógica de negocio a servicios
3. Extraer estado y efectos a hooks
4. Dividir UI en subcomponentes
5. Orquestar todo en componente principal

## Migración

Los componentes originales se mantienen con extensión `.tsx` y los refactorizados con `.refactored.tsx` para facilitar la migración gradual.

Para migrar:
1. Testear componente refactorizado
2. Reemplazar imports en páginas
3. Eliminar componente original
4. Renombrar `.refactored.tsx` a `.tsx`

## Próximos Pasos

- [ ] Refactorizar `PreLaunchSection`
- [ ] Refactorizar `RebecaSection`
- [ ] Refactorizar `StorytellingSection`
- [ ] Refactorizar `PremiumTestimonials`
- [ ] Implementar tests unitarios
- [ ] Implementar tests de integración
- [ ] Documentar APIs de servicios

