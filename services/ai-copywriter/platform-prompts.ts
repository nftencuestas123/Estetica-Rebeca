/**
 * Servicio: Platform Prompts
 * Responsabilidad: Prompts específicos por plataforma
 */

export const PLATFORM_PROMPTS = {
  instagram: `Genera un copy VIRAL para Instagram con estas características:
- Máximo 2200 caracteres
- Hook poderoso en las primeras 3 palabras
- Uso estratégico de emojis (3-5)
- 5-10 hashtags relevantes al final
- Call-to-action claro
- Formato con saltos de línea para fácil lectura
- Lenguaje visual y descriptivo`,

  facebook: `Genera un copy EFECTIVO para Facebook con estas características:
- Extensión media (200-400 palabras)
- Storytelling que conecte emocionalmente
- Uso moderado de emojis (2-4)
- 3-5 hashtags relevantes
- Call-to-action fuerte al final
- Formato con párrafos cortos
- Tono conversacional y cercano`,

  tiktok: `Genera un copy VIRAL para TikTok con estas características:
- MUY CORTO (máximo 150 caracteres)
- Lenguaje Gen Z y trendy
- Emojis llamativos (4-6)
- Hashtags virales (#FYP, #ParaTi, + específicos)
- Texto que se lea rápido
- Urgencia y FOMO (fear of missing out)`,

  twitter: `Genera un copy IMPACTANTE para Twitter/X con estas características:
- Máximo 280 caracteres
- Hook potente
- 2-3 emojis relevantes
- 2-4 hashtags estratégicos
- CTA conciso
- Estilo directo y contundente`,

  linkedin: `Genera un copy PROFESIONAL para LinkedIn con estas características:
- Extensión profesional (300-600 palabras)
- Formato de artículo corto
- Tono profesional pero accesible
- Emojis mínimos (1-2)
- 3-5 hashtags profesionales
- Insights valiosos
- CTA profesional`,

  multi: `Genera un copy VERSÁTIL que funcione en múltiples plataformas:
- Extensión media (150-300 caracteres)
- Adaptable a cualquier red social
- Emojis moderados (2-3)
- Hashtags universales (3-5)
- CTA efectivo
- Mensaje claro y directo`,
}

export type Platform = keyof typeof PLATFORM_PROMPTS

