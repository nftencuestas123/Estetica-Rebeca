import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Tipos para las tablas principales
export interface User {
  id: string
  email: string
  whatsapp?: string
  nombre: string
  edad?: number
  genero?: string
  foto_perfil?: string
  alergias?: string
  medicamentos?: string
  puntos_lealtad?: number
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum'
  membresia_tipo?: string
  estado?: string
  fecha_registro?: string
  created_at?: string
  updated_at?: string
}

export interface Tratamiento {
  id: string
  nombre: string
  slug: string
  descripcion?: string
  descripcion_larga?: string
  categoria?: string
  precio_base: number
  precio_membresia_silver?: number
  precio_membresia_gold?: number
  precio_membresia_platinum?: number
  duracion_minutos?: number
  imagen_principal?: string
  galeria_antes_despues?: string[]
  activo?: boolean
  created_at?: string
  updated_at?: string
}

export interface Cita {
  id: string
  usuario_id: string
  especialista_id?: string
  tratamiento_id: string
  sede_id: string
  fecha_hora: string
  duracion_minutos?: number
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada'
  notas_medicas?: string
  precio_final?: number
  metodo_pago?: string
  pago_estado?: string
  created_at?: string
  updated_at?: string
}

export interface ConversacionSofia {
  id: string
  usuario_id?: string
  sesion_id: string
  mensaje_usuario: string
  respuesta_sofia: string
  tipo_interaccion?: string
  satisfaccion?: number
  timestamp?: string
  created_at?: string
}

