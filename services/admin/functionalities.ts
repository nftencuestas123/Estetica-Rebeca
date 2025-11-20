/**
 * Servicio: Functionalities
 * Responsabilidad: Proveer datos de funcionalidades del admin
 */

export interface Functionality {
  id: string
  href: string
  icon: string
  title: string
  description: string
  colorFrom: string
  colorTo: string
  borderColor: string
  hoverBorderColor: string
}

export const ADMIN_FUNCTIONALITIES: Functionality[] = [
  {
    id: 'videos-ia',
    href: '/admin/videos-ia',
    icon: 'Video',
    title: 'Videos IA',
    description: 'Genera videos profesionales con IA y publícalos en tus redes automáticamente',
    colorFrom: 'from-rose-500',
    colorTo: 'to-pink-500',
    borderColor: 'border-slate-200',
    hoverBorderColor: 'hover:border-rose-500',
  },
  {
    id: 'redes-sociales',
    href: '/admin/configuracion/redes-sociales',
    icon: 'LinkIcon',
    title: 'Redes Sociales',
    description: 'Conecta y gestiona todas tus cuentas de redes sociales en un solo lugar',
    colorFrom: 'from-blue-500',
    colorTo: 'to-cyan-500',
    borderColor: 'border-slate-200',
    hoverBorderColor: 'hover:border-blue-500',
  },
  {
    id: 'sofia-ia',
    href: '/admin/sofia',
    icon: 'MessageSquare',
    title: 'Sofía IA',
    description: 'Asistente de inteligencia artificial para conversaciones y atención al cliente',
    colorFrom: 'from-purple-500',
    colorTo: 'to-indigo-500',
    borderColor: 'border-slate-200',
    hoverBorderColor: 'hover:border-purple-500',
  },
  {
    id: 'asistente-voz',
    href: '/admin/asistente-voz',
    icon: 'Mic',
    title: 'Asistente de Voz',
    description: 'Gestiona el asistente de voz con IA y controla su configuración por landing page',
    colorFrom: 'from-orange-500',
    colorTo: 'to-amber-500',
    borderColor: 'border-slate-200',
    hoverBorderColor: 'hover:border-orange-500',
  },
]

