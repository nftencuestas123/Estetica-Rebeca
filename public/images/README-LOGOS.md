# Logos de la Aplicación Móvil

## Instrucciones para agregar los logos oficiales

Para agregar los logos oficiales de iOS y Android a la sección de pre-lanzamiento:

1. **Logo iOS (iPhone):**
   - Nombre del archivo: `app-ios-logo.png`
   - Ubicación: `public/images/app-ios-logo.png`
   - Tamaño recomendado: 512x512px o 1024x1024px
   - Formato: PNG con fondo transparente

2. **Logo Android:**
   - Nombre del archivo: `app-android-logo.png`
   - Ubicación: `public/images/app-android-logo.png`
   - Tamaño recomendado: 512x512px o 1024x1024px
   - Formato: PNG con fondo transparente

3. **Después de agregar los logos:**
   - Abre `components/PreLaunchSection.tsx`
   - Busca los comentarios que dicen "Descomentar cuando tengas el logo real"
   - Descomenta las líneas de código que usan `<Image>` y comenta las líneas del placeholder

Los logos aparecerán automáticamente en la sección de pre-lanzamiento con animaciones y efectos premium.

