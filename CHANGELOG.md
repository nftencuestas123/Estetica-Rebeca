# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

## [1.0.0] - 2025-11-20

### Agregado
- Sistema de autenticación JWT con cookies HttpOnly
- Panel de administración completo con dashboard
- Panel de clientes con dashboard personalizado
- Sistema de registro con verificación de email
- Sistema de recuperación de contraseña
- Preguntas de seguridad para registro de administradores
- Múltiples landing pages (10 diseños diferentes)
- Asistente de voz integrado con ElevenLabs
- Asistente IA Sofia para chat
- Sistema de créditos para clientes
- Generador de videos con IA
- Publicación automática en redes sociales (Facebook, Instagram, TikTok)
- Sistema de logging estructurado
- Manejo de errores centralizado
- Performance monitoring
- Compresión automática de imágenes
- Lazy loading inteligente de imágenes
- Responsive design completo
- Dark mode en panel admin

### Seguridad
- Passwords hasheados con bcryptjs (10 rounds)
- JWT con expiración de 7 días
- Cookies HttpOnly + Secure
- Protección CSRF con SameSite
- Validación de roles en middleware
- RLS deshabilitado (single-tenant)
- Audit log de acciones

### Infraestructura
- Next.js 14.2 con App Router
- TypeScript estricto
- Supabase como base de datos
- Railway para deployment
- CI/CD automático
- Compresión de imágenes con Sharp
- Winston para logging

### Documentación
- README con instrucciones
- Documento de instrucciones diarias para IA
- Comentarios JSDoc en funciones públicas
- Variables de entorno documentadas (.env.example)

[Unreleased]: https://github.com/tu-usuario/estetica-rebeca/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/tu-usuario/estetica-rebeca/releases/tag/v1.0.0

