/**
 * DESCRIPCIONES EXACTAS DE TRATAMIENTOS
 * Cada tratamiento tiene su descripción específica y profesional
 */

export const TRATAMIENTOS_FACIALES = {
  'Hidrofacial Profesional': {
    descripcion: 'Limpieza profunda con hidratación instantánea',
    imagen: '/images/landing/treatments/facial-hidrofacial.jpg.png'
  },
  'Limpieza Facial Profunda': {
    descripcion: 'Extracción y purificación de poros',
    imagen: '/images/landing/treatments/facial-limpieza-profunda.jpg.png'
  },
  'Exfoliación + Extracción': {
    descripcion: 'Renovación celular y remoción de impurezas',
    imagen: '/images/landing/treatments/facial-exfoliacion.jpg'
  },
  'Peeling ultrasónico': {
    descripcion: 'Exfoliación suave sin irritación',
    imagen: '/images/landing/treatments/facial-peeling-ultrasonico.jpg'
  },
  'Dermapen / Microneedling': {
    descripcion: 'Regeneración profunda y estimulación de colágeno',
    imagen: '/images/landing/treatments/facial-dermapen.jpg'
  },
  'Tratamiento Antiage': {
    descripcion: 'Reducción de arrugas y líneas de expresión',
    imagen: '/images/landing/treatments/facial-antiage.jpg'
  },
  'Tratamiento para Manchas': {
    descripcion: 'Unificación del tono y eliminación de hiperpigmentación',
    imagen: '/images/landing/treatments/facial-manchas.jpg'
  },
  'Hidratación y Luminosidad': {
    descripcion: 'Nutrición profunda con brillo natural',
    imagen: '/images/landing/treatments/facial-hidratacion-luminosidad.jpg'
  },
}

export const TRATAMIENTOS_CORPORALES = {
  'Masaje Reductor': {
    descripcion: 'Reducción de medidas y tonificación corporal',
    imagen: '/images/landing/treatments/corporal-masaje-reductor.jpg'
  },
  'Maderoterapia': {
    descripcion: 'Drenaje y modelado con técnica ancestral',
    imagen: '/images/landing/treatments/corporal-maderoterapia.jpg'
  },
  'Drenaje Linfático': {
    descripcion: 'Eliminación de toxinas y reducción de retención',
    imagen: '/images/landing/treatments/corporal-drenaje-linfatico.jpg'
  },
  'Combo Reductor + Madero + Drenaje (1 hora)': {
    descripcion: 'Tratamiento completo para resultados intensivos',
    imagen: '/images/landing/treatments/corporal-combo-reductor.jpg'
  },
  'Masaje Descontracturante': {
    descripcion: 'Alivio de tensión muscular y estrés',
    imagen: '/images/landing/treatments/corporal-masaje-descontracturante.jpg'
  },
}

export const TRATAMIENTOS_MAQUILLAJE = {
  'Maquillaje Social': {
    descripcion: 'Look elegante para reuniones y salidas',
    imagen: '/images/landing/treatments/maquillaje-social.jpg'
  },
  'Maquillaje para Eventos': {
    descripcion: 'Maquillaje de larga duración para eventos especiales',
    imagen: '/images/landing/treatments/maquillaje-eventos.jpg'
  },
  'Maquillaje para Novia': {
    descripcion: 'Belleza natural para tu día especial',
    imagen: '/images/landing/treatments/maquillaje-novia.jpg'
  },
  'Prueba de Maquillaje': {
    descripcion: 'Prueba tu look antes del evento',
    imagen: '/images/landing/treatments/maquillaje-prueba.jpg'
  },
}

// Lista de servicios (mantiene compatibilidad)
export const SERVICIOS = {
  faciales: Object.keys(TRATAMIENTOS_FACIALES),
  corporales: Object.keys(TRATAMIENTOS_CORPORALES),
  maquillaje: Object.keys(TRATAMIENTOS_MAQUILLAJE),
}

