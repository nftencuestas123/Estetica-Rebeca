# Guía de Instalación - Rebeca Barreto Estética

## Pasos para configurar el proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://ebaexyozjncxjixfqeff.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViYWV4eW96am5jeGppeGZxZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5NDUzMTAsImV4cCI6MjA3ODUyMTMxMH0.smZjXjI-pbS5hQgZSngHhqON09_IGs3nyVD7HvpfOQE
SUPABASE_SERVICE_ROLE_KEY=tu_service_key_aqui

# OPENROUTER (Sofía IA)
NEXT_PUBLIC_OPENROUTER_API_KEY=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

# CONFIGURACIÓN REGIONAL
NEXT_PUBLIC_COUNTRY=PY
NEXT_PUBLIC_CURRENCY=USD
NEXT_PUBLIC_TIMEZONE=America/Asuncion
NEXT_PUBLIC_LANGUAGE=es-PY
NEXT_PUBLIC_WHATSAPP=+595987123456
NEXT_PUBLIC_PHONE=+595212123456
```

### 3. Configurar base de datos en Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Navega a **SQL Editor**
3. Copia y pega el contenido del archivo `supabase/migrations/001_initial_schema.sql`
4. Ejecuta el script

Esto creará todas las tablas necesarias:
- `users` - Perfiles de clientes
- `citas` - Citas y agendamientos
- `tratamientos` - Catálogo de tratamientos
- `productos` - Productos de skincare
- `conversaciones_sofia` - Historial de chat con IA
- `sedes` - Ubicaciones de clínicas
- `especialistas` - Staff médico

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### 5. Verificar que todo funciona

1. **Landing Page**: Visita `http://localhost:3000`
2. **Chat Sofía**: Haz click en el botón flotante de chat
3. **Registro**: Crea una cuenta nueva en `/register`
4. **Dashboard**: Accede a `/dashboard` después de registrarte

## Solución de problemas

### Error: "Missing Supabase environment variables"
- Verifica que el archivo `.env.local` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo después de crear/modificar `.env.local`

### Error: "relation does not exist"
- Asegúrate de haber ejecutado el script SQL en Supabase
- Verifica que las tablas se crearon correctamente en el SQL Editor

### Error: "OpenRouter API error"
- Verifica que la API key de OpenRouter es válida
- Revisa que tienes créditos disponibles en OpenRouter

### El chat no funciona
- Verifica la conexión a internet
- Revisa la consola del navegador para errores
- Asegúrate de que la API key de OpenRouter está configurada correctamente

## Próximos pasos

Una vez que la aplicación esté funcionando:

1. **Personalizar contenido**: Edita los tratamientos en la base de datos
2. **Configurar sedes**: Agrega tus sedes reales en la tabla `sedes`
3. **Agregar especialistas**: Completa la información del staff en `especialistas`
4. **Personalizar Sofía**: Ajusta el prompt del agente en `lib/openrouter-service.ts`

## Soporte

Si tienes problemas, revisa:
- Los logs en la consola del navegador
- Los logs del servidor de desarrollo
- La documentación de [Next.js](https://nextjs.org/docs)
- La documentación de [Supabase](https://supabase.com/docs)

