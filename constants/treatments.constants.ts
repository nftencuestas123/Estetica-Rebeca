/**
 * Constantes de tratamientos
 * Responsabilidad: Almacenar datos de tratamientos disponibles
 */

import type { Treatment } from '@/types/treatment.types'

export const TREATMENTS: Treatment[] = [
  {
    id: 'facial-limpieza',
    name: 'Limpieza Facial Profunda',
    description: 'Tratamiento completo de limpieza facial con extracción y mascarilla',
    duration: '60 min',
    price: '$50',
    category: 'facial',
    benefits: [
      'Elimina impurezas',
      'Desobstruye poros',
      'Piel más luminosa',
      'Hidratación profunda',
    ],
  },
  {
    id: 'facial-peeling',
    name: 'Peeling Químico',
    description: 'Renovación celular profunda para rejuvenecer la piel',
    duration: '45 min',
    price: '$80',
    category: 'facial',
    benefits: [
      'Reduce manchas',
      'Mejora textura',
      'Estimula colágeno',
      'Piel más joven',
    ],
  },
  {
    id: 'corporal-reductora',
    name: 'Masaje Reductor',
    description: 'Masaje especializado para reducir medidas y celulitis',
    duration: '90 min',
    price: '$70',
    category: 'corporal',
    benefits: [
      'Reduce medidas',
      'Combate celulitis',
      'Mejora circulación',
      'Tonifica piel',
    ],
  },
  {
    id: 'depilacion-laser',
    name: 'Depilación Láser',
    description: 'Depilación definitiva con tecnología láser de última generación',
    duration: '30-60 min',
    price: 'Desde $40',
    category: 'depilacion',
    benefits: [
      'Resultados permanentes',
      'Sin dolor',
      'Piel suave',
      'Ahorro a largo plazo',
    ],
  },
  {
    id: 'capilar-keratina',
    name: 'Tratamiento de Keratina',
    description: 'Alisado y nutrición profunda del cabello',
    duration: '120 min',
    price: '$120',
    category: 'capilar',
    benefits: [
      'Cabello liso',
      'Elimina frizz',
      'Brillo intenso',
      'Duración prolongada',
    ],
  },
  {
    id: 'masaje-relajante',
    name: 'Masaje Relajante',
    description: 'Masaje de cuerpo completo para liberar tensiones',
    duration: '60 min',
    price: '$60',
    category: 'masajes',
    benefits: [
      'Reduce estrés',
      'Relaja músculos',
      'Mejora sueño',
      'Bienestar general',
    ],
  },
]

export const TREATMENT_CATEGORIES = {
  facial: 'Faciales',
  corporal: 'Corporales',
  capilar: 'Capilares',
  depilacion: 'Depilación',
  masajes: 'Masajes',
  otros: 'Otros',
}

