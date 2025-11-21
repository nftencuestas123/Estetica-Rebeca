/**
 * Tipos para tratamientos
 * Responsabilidad: Definir interfaces de tratamientos
 */

export interface Treatment {
  id: string
  name: string
  description: string
  duration: string
  price: string
  category: TreatmentCategory
  benefits: string[]
  image?: string
}

export type TreatmentCategory =
  | 'facial'
  | 'corporal'
  | 'capilar'
  | 'depilacion'
  | 'masajes'
  | 'otros'

export interface TreatmentCardProps {
  treatment: Treatment
  index?: number
}

