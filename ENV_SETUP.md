# Configuración de Variables de Entorno

## Problema Actual

El chat no responde porque falta la configuración de la API key de OpenRouter.

## Solución

Necesitás crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# OpenRouter API Configuration
# Obtené tu API key en: https://openrouter.ai/keys
NEXT_PUBLIC_OPENROUTER_API_KEY=tu_api_key_de_openrouter

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# Site URL (para OpenRouter)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Pasos para Configurar

### 1. Obtener API Key de OpenRouter

1. Ir a [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Crear una cuenta o iniciar sesión
3. Crear una nueva API key
4. Copiar la API key

### 2. Crear archivo .env.local

Crear un archivo llamado `.env.local` en la raíz del proyecto (mismo nivel que `package.json`)

### 3. Agregar la API Key

Pegar el contenido del ejemplo arriba y reemplazar `tu_api_key_de_openrouter` con tu API key real.

### 4. Reiniciar el servidor

```bash
# Detener el servidor actual (Ctrl+C)
# Luego reiniciar:
npm run dev
```

## Verificar Configuración

Después de configurar, el chat debería funcionar correctamente. Si ves el mensaje:

> "Hola! Soy Sofía. Disculpame, parece que hay un problema de configuración con la API..."

Significa que la API key no está configurada o es inválida.

## Notas Importantes

- El archivo `.env.local` NO debe subirse a Git (ya está en `.gitignore`)
- Necesitás créditos en tu cuenta de OpenRouter para usar el modelo GPT-4o
- GPT-4o es más costoso que gpt-4o-mini, pero ofrece mejor calidad

## Costos Aproximados (OpenRouter)

- **GPT-4o**: ~$2.50 por millón de tokens de entrada, ~$10 por millón de tokens de salida
- **GPT-4o-mini**: ~$0.15 por millón de tokens de entrada, ~$0.60 por millón de tokens de salida

Si preferís usar el modelo más económico, podés cambiar en `services/openrouter.service.ts`:

```typescript
model: string = 'openai/gpt-4o-mini'  // En lugar de 'openai/gpt-4o'
```

