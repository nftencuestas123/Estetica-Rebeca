import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings,
  LogOut,
  Mic
} from 'lucide-react'

export interface MenuItem {
  href: string
  icon: React.ReactNode
  label: string
}

export const MENU_ITEMS: MenuItem[] = [
  {
    href: '/admin',
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: 'Dashboard'
  },
  {
    href: '/admin/videos-ia',
    icon: <span className="text-lg">🎬</span>,
    label: 'Videos IA + Publicación'
  },
  {
    href: '/admin/configuracion/redes-sociales',
    icon: <span className="text-lg">🔗</span>,
    label: 'Redes Sociales'
  },
  {
    href: '/admin/sofia',
    icon: <MessageSquare className="w-5 h-5" />,
    label: 'Sofía IA'
  },
  {
    href: '/admin/asistente-voz',
    icon: <Mic className="w-5 h-5" />,
    label: 'Asistente de Voz'
  },
]

export const FOOTER_ITEMS: MenuItem[] = [
  {
    href: '/admin/configuracion',
    icon: <Settings className="w-5 h-5" />,
    label: 'Configuración'
  },
  {
    href: '/api/auth/logout',
    icon: <LogOut className="w-5 h-5" />,
    label: 'Cerrar Sesión'
  }
]

