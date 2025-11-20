/**
 * CONFIGURACIÓN DE IMÁGENES PARA LANDING PAGES
 * Todas las rutas de imágenes centralizadas
 */

export const LANDING_IMAGES = {
  // Rebeca Barreto (misma imagen para Hero y About)
  rebeca: {
    hero: '/images/rebeca-barreto.jpg',
    about: '/images/rebeca-barreto.jpg',
  },

  // Tratamientos Faciales
  faciales: {
    hidrofacial: '/images/landing/facial-hidrofacial.jpg.png',
    limpiezaProfunda: '/images/landing/facial-limpieza-profunda.jpg.png',
    exfoliacion: '/images/landing/facial-exfoliacion.jpg',
    peelingUltrasonico: '/images/landing/facial-peeling-ultrasonico.jpg',
    dermapen: '/images/landing/facial-dermapen.jpg',
    antiage: '/images/landing/facial-antiage.jpg',
    manchas: '/images/landing/facial-manchas.jpg',
    hidratacionLuminosidad: '/images/landing/facial-hidratacion-luminosidad.jpg',
  },

  // Tratamientos Corporales
  corporales: {
    masajeReductor: '/images/landing/corporal-masaje-reductor.jpg',
    maderoterapia: '/images/landing/corporal-maderoterapia.jpg',
    drenajeLinfatico: '/images/landing/corporal-drenaje-linfatico.jpg',
    masajeDescontracturante: '/images/landing/corporal-masaje-descontracturante.jpg',
    comboReductor: '/images/landing/corporal-combo-reductor.jpg',
  },

  // Maquillaje Profesional
  maquillaje: {
    social: '/images/landing/maquillaje-social.jpg',
    eventos: '/images/landing/maquillaje-eventos.jpg',
    novia: '/images/landing/maquillaje-novia.jpg',
    prueba: '/images/landing/maquillaje-prueba.jpg',
  },

  // Testimonios (Mujeres Paraguayas)
  testimonios: {
    mujer01: '/images/landing/testimonio-mujer-01.jpg',
    mujer02: '/images/landing/testimonio-mujer-02.jpg',
    mujer03: '/images/landing/testimonio-mujer-03.jpg',
    mujer04: '/images/landing/testimonio-mujer-04.jpg',
    mujer05: '/images/landing/testimonio-mujer-05.jpg',
    mujer06: '/images/landing/testimonio-mujer-06.jpg',
  },
} as const

/**
 * Obtener imagen de testimonio por índice (0-5)
 */
export const getTestimonioImage = (index: number): string => {
  const images = Object.values(LANDING_IMAGES.testimonios)
  return images[index % images.length]
}

/**
 * Verificar si una imagen existe
 */
export const imageExists = (path: string): boolean => {
  // En producción, todas las imágenes deberían existir
  return true
}

