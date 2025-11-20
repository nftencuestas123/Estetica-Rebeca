
export const fileDescriptions: Record<string, { title: string; description: string; importance: string; icon: string }> = {
    // CONFIGURACIÓN CRÍTICA
    "package.json": {
        title: "El Corazón del Proyecto",
        description: "Es el documento de identidad de tu aplicación. Contiene el nombre del proyecto, la versión, los scripts para iniciarlo (como 'npm run dev') y, lo más importante, la lista de todas las librerías (dependencias) que tu proyecto necesita para funcionar.",
        importance: "CRÍTICA. Sin este archivo, Node.js no sabe qué instalar ni cómo arrancar tu app.",
        icon: "📦"
    },
    "package-lock.json": {
        title: "El Guardián de Versiones",
        description: "Es un registro exacto y detallado de cada librería instalada. Asegura que si instalas este proyecto en otra computadora, se usen EXACTAMENTE las mismas versiones de las librerías, evitando el problema de 'en mi máquina funcionaba'.",
        importance: "ALTA. Garantiza la estabilidad y consistencia del proyecto.",
        icon: "🔒"
    },
    "next.config.js": {
        title: "El Cerebro de Next.js",
        description: "Aquí configuramos cómo se comporta el framework Next.js. Definimos reglas de seguridad, optimización de imágenes (como lo que acabamos de arreglar), dominios permitidos y configuraciones avanzadas del servidor.",
        importance: "CRÍTICA. Controla el rendimiento y las capacidades del servidor web.",
        icon: "⚙️"
    },
    "tsconfig.json": {
        title: "El Traductor de TypeScript",
        description: "Define las reglas del juego para TypeScript. Le dice al compilador qué tan estricto debe ser, qué características de JavaScript moderno permitir y cómo transformar tu código TypeScript a JavaScript que el navegador entienda.",
        importance: "ALTA. Define la calidad y seguridad del código.",
        icon: "📘"
    },
    "next-env.d.ts": {
        title: "El Puente de Tipos",
        description: "Un archivo generado automáticamente por Next.js. Sirve para asegurar que TypeScript reconozca los tipos de datos específicos de Next.js. No debes editarlo manualmente.",
        importance: "MEDIA. Necesario para que TypeScript no marque errores falsos.",
        icon: "🌉"
    },

    // ESTILOS
    "tailwind.config.ts": {
        title: "La Paleta de Pintor",
        description: "Aquí definimos el sistema de diseño. Colores personalizados, fuentes, tamaños de pantalla para móviles, animaciones y extensiones del tema visual. Es donde nace la identidad visual de 'Estética Rebeca'.",
        importance: "ALTA. Controla toda la apariencia visual de la web.",
        icon: "🎨"
    },
    "postcss.config.js": {
        title: "El Procesador de Estilos",
        description: "Es una herramienta que procesa tu CSS. En este caso, es el encargado de activar Tailwind CSS y asegurar que tus estilos sean compatibles con todos los navegadores modernos.",
        importance: "MEDIA. Necesario para que Tailwind funcione.",
        icon: "⚡"
    },
    "globals.css": {
        title: "Estilos Globales",
        description: "El archivo CSS maestro. Aquí importamos Tailwind y definimos estilos base que aplican a TODA la aplicación, como el color de fondo por defecto o las fuentes base.",
        importance: "ALTA. Define la base visual.",
        icon: "💅"
    },

    // DEPLOYMENT E INFRAESTRUCTURA
    "railway.json": {
        title: "Instrucciones para Railway",
        description: "Un mapa para que la plataforma Railway sepa cómo construir y desplegar tu aplicación. Define comandos de inicio y configuraciones del entorno de producción.",
        importance: "ALTA (para producción). Sin él, el deploy podría fallar.",
        icon: "🚂"
    },
    "nixpacks.toml": {
        title: "Plano de Construcción del Servidor",
        description: "Instrucciones de bajo nivel para crear el contenedor del servidor. Le dice a Railway qué versión de Node.js usar y qué librerías del sistema operativo instalar.",
        importance: "ALTA (para producción). Asegura el entorno correcto en la nube.",
        icon: "🏗️"
    },
    "server.js": {
        title: "Servidor Personalizado",
        description: "Un script de arranque manual para el servidor. A veces es necesario para configuraciones avanzadas de despliegue que el comando estándar 'next start' no cubre.",
        importance: "MEDIA. Usado en entornos específicos de producción.",
        icon: "🖥️"
    },
    ".railwayignore": {
        title: "Lista de Exclusión de Railway",
        description: "Le dice a Railway qué archivos NO subir al servidor. Ayuda a que el despliegue sea más rápido y ligero evitando subir basura o archivos locales.",
        importance: "BAJA. Optimización del deploy.",
        icon: "🚫"
    },

    // CARPETAS PRINCIPALES
    "app": {
        title: "La Aplicación (App Router)",
        description: "Aquí vive todo. Cada carpeta dentro de 'app' es una ruta en tu web (ej: 'app/dashboard' es 'tudominio.com/dashboard'). Contiene las páginas, layouts y la lógica principal.",
        importance: "CRÍTICA. Es tu página web.",
        icon: "📂"
    },
    "components": {
        title: "Piezas de LEGO (Componentes)",
        description: "Aquí guardamos las piezas reutilizables de tu web: botones, tarjetas, barras de navegación, formularios. Se construyen una vez y se usan en muchas partes.",
        importance: "ALTA. Mantiene el código organizado y reutilizable.",
        icon: "🧩"
    },
    "lib": {
        title: "Biblioteca de Utilidades",
        description: "Funciones auxiliares, configuraciones de base de datos (Supabase), loggers y herramientas que no son componentes visuales pero hacen que todo funcione por detrás.",
        importance: "ALTA. Lógica de negocio y conexiones.",
        icon: "📚"
    },
    "services": {
        title: "Servicios de Negocio",
        description: "Aquí está la lógica pura de tu negocio. Funciones para hablar con la base de datos, procesar pagos, gestionar usuarios o lógica de IA.",
        importance: "ALTA. El cerebro lógico de la aplicación.",
        icon: "🧠"
    },
    "hooks": {
        title: "Ganchos (Hooks)",
        description: "Funciones especiales de React para manejar 'estados' y 'ciclos de vida'. Por ejemplo: detectar si el usuario hizo scroll, si está en móvil, o manejar el estado de un formulario.",
        importance: "MEDIA. Lógica de interfaz reutilizable.",
        icon: "🎣"
    },
    "public": {
        title: "Archivos Públicos",
        description: "Todo lo que es accesible directamente desde el navegador: imágenes, iconos, fuentes, robots.txt. Lo que pongas aquí es público para todo el mundo.",
        importance: "MEDIA. Recursos estáticos.",
        icon: "🖼️"
    },
    "scripts": {
        title: "Scripts de Automatización",
        description: "Pequeños programas que he creado para ayudarte a mantener el proyecto: backups, limpieza, deploys seguros. Son tus asistentes robots.",
        importance: "MEDIA. Herramientas de mantenimiento.",
        icon: "🤖"
    },

    // CARPETAS ADICIONALES
    ".vscode": {
        title: "Configuración del Editor",
        description: "Configuraciones específicas para Visual Studio Code. Ayuda a que el editor entienda tu código, formatee automáticamente y sugiera correcciones.",
        importance: "BAJA. Solo afecta tu experiencia al editar código.",
        icon: "📝"
    },
    "constants": {
        title: "Constantes (Constants)",
        description: "Valores fijos que no cambian y se usan en toda la app. Ejemplos: precios de tratamientos, nombres de navegación, configuraciones globales.",
        importance: "MEDIA. Mantiene los datos organizados.",
        icon: "💎"
    },
    "contexts": {
        title: "Contextos (Contexts)",
        description: "Estados globales de la aplicación. Aquí vive la información que debe estar disponible en todas partes, como '¿El usuario está logueado?' o '¿Qué tema visual prefiere?'.",
        importance: "ALTA. Gestión de estado global.",
        icon: "🔄"
    },
    "types": {
        title: "Tipos de Datos (Types)",
        description: "Definiciones de TypeScript. Aquí describimos la 'forma' de los datos: qué propiedades tiene un Usuario, qué campos tiene una Cita, etc.",
        importance: "ALTA. Seguridad y estructura de datos.",
        icon: "🏷️"
    },

    // ARCHIVOS DE CONFIGURACIÓN ADICIONALES
    ".env.local": {
        title: "Variables de Entorno (Secretos)",
        description: "Archivo donde guardamos claves secretas (API Keys, contraseñas de base de datos). Este archivo NUNCA se sube al repositorio por seguridad.",
        importance: "CRÍTICA. Contiene tus secretos.",
        icon: "🔑"
    },
    ".env.example": {
        title: "Ejemplo de Variables",
        description: "Una plantilla que muestra qué variables necesita el proyecto, pero sin los valores secretos reales. Sirve de guía para nuevos desarrolladores.",
        importance: "BAJA. Documentación.",
        icon: "📋"
    },
    ".gitignore": {
        title: "Lista de Ignorados de Git",
        description: "Le dice a Git qué archivos NO debe guardar en el historial. Por ejemplo, ignora las carpetas gigantes como 'node_modules' o tus secretos en '.env.local'.",
        importance: "ALTA. Mantiene el repositorio limpio y seguro.",
        icon: "🙈"
    },
    ".eslintrc.json": {
        title: "Reglas de Calidad (Linting)",
        description: "Reglas automáticas para asegurar que el código esté bien escrito y siga buenas prácticas. Te avisa si cometes errores comunes.",
        importance: "MEDIA. Calidad de código.",
        icon: "📏"
    },
    ".nvmrc": {
        title: "Versión de Node.js",
        description: "Indica exactamente qué versión del motor Node.js debe usar este proyecto para funcionar correctamente.",
        importance: "MEDIA. Compatibilidad.",
        icon: "🟢"
    },

    // DOCUMENTACIÓN
    "⚡_INSTRUCCIONES_DIARIAS_EJECUTIVO.md": {
        title: "EL MANUAL SAGRADO",
        description: "El documento maestro que rige cómo trabajamos. Contiene protocolos, reglas de oro y guías de operación. Es intocable.",
        importance: "CRÍTICA. La biblia del proyecto.",
        icon: "📜"
    },
    "📊_OPTIMIZACION_IMAGENES.md": {
        title: "Reporte de Optimización",
        description: "Documentación técnica sobre cómo arreglamos el problema de las imágenes lentas. Útil para referencia futura.",
        importance: "BAJA. Referencia histórica.",
        icon: "📊"
    },
    "🔍_AUDITORIA_PROYECTO.md": {
        title: "Reporte de Auditoría",
        description: "El resultado del análisis de limpieza que acabamos de realizar.",
        importance: "BAJA. Referencia histórica.",
        icon: "🔍"
    }
};

export const getFileDescription = (filename: string) => {
    // Búsqueda exacta
    if (fileDescriptions[filename]) return fileDescriptions[filename];

    // Búsqueda por extensión
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return {
        title: "Archivo TypeScript",
        description: "Código fuente escrito en TypeScript. Contiene lógica o componentes de la aplicación.",
        importance: "ALTA",
        icon: "ts"
    };
    if (filename.endsWith('.css')) return {
        title: "Hoja de Estilos",
        description: "Archivo de diseño y apariencia visual.",
        importance: "MEDIA",
        icon: "css"
    };
    if (filename.endsWith('.json')) return {
        title: "Archivo de Datos/Config",
        description: "Archivo de configuración o datos estáticos en formato JSON.",
        importance: "VARIA",
        icon: "{}"
    };

    return {
        title: "Archivo del Proyecto",
        description: "Un archivo parte de la estructura de tu aplicación.",
        importance: "DESCONOCIDA",
        icon: "📄"
    };
};
