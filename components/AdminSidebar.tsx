'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Sparkles, 
  MessageSquare, 
  Package, 
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react'
import { useState } from 'react'

interface MenuItem {
  href: string
  icon: React.ReactNode
  label: string
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems: MenuItem[] = [
    {
      href: '/admin',
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard'
    },
    {
      href: '/admin/creditos/comprar',
      icon: <span className="text-lg">💳</span>,
      label: 'Comprar Créditos'
    },
    {
      href: '/admin/solicitudes-creditos',
      icon: <span className="text-lg">📋</span>,
      label: 'Solicitudes Créditos'
    },
    {
      href: '/admin/videos-ia-v2',
      icon: <span className="text-lg">🎬</span>,
      label: 'Videos IA + Publicar'
    },
    {
      href: '/admin/estadisticas',
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Estadísticas'
    },
    {
      href: '/admin/configuracion/redes-sociales',
      icon: <span className="text-lg">🔗</span>,
      label: 'Redes Sociales'
    },
    {
      href: '/admin/clientes',
      icon: <Users className="w-5 h-5" />,
      label: 'CRM - Clientes'
    },
    {
      href: '/admin/citas',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Gestión de Citas'
    },
    {
      href: '/admin/tratamientos',
      icon: <Sparkles className="w-5 h-5" />,
      label: 'Tratamientos'
    },
    {
      href: '/admin/sofia',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Sofía IA'
    },
    {
      href: '/admin/productos',
      icon: <Package className="w-5 h-5" />,
      label: 'Productos'
    },
    {
      href: '/admin/reportes',
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Reportes'
    },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-br from-primary-500/20 to-primary-600/10 
                   border border-primary-400/40 rounded-xl shadow-lg backdrop-blur-xl
                   hover:from-primary-500/30 hover:to-primary-600/20 transition-all duration-200"
      >
        <Menu className="w-6 h-6 text-primary-400" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-neutral-950 via-black to-neutral-950
          border-r border-primary-400/20 backdrop-blur-xl
          transition-all duration-300 z-40 shadow-2xl
          ${isCollapsed ? 'w-0 lg:w-20' : 'w-64'}
          ${isCollapsed && 'lg:flex lg:flex-col'}
        `}
      >
        <div className={`flex flex-col h-full ${isCollapsed && 'opacity-0 lg:opacity-100'}`}>
          {/* Header */}
          <div className="p-6 border-b border-primary-400/20 bg-gradient-to-r from-primary-500/5 via-primary-400/5 to-transparent">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center gap-3">
                  {/* Logo Icon */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                    <span className="text-lg font-bold text-white">RB</span>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                      Admin Panel
                    </h2>
                    <p className="text-[10px] text-white/50 mt-0.5 font-medium">Rebeca Barreto</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:block p-2 hover:bg-primary-400/10 rounded-lg transition-colors"
              >
                <ChevronLeft 
                  className={`w-5 h-5 text-primary-400 transition-transform ${isCollapsed && 'rotate-180'}`} 
                />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  relative overflow-hidden group
                  ${isActive(item.href)
                    ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/10 text-primary-400 border border-primary-400/40 shadow-lg shadow-primary-500/10'
                    : 'text-white/60 hover:bg-gradient-to-r hover:from-primary-400/10 hover:to-transparent hover:text-white hover:border-primary-400/20 border border-transparent'
                  }
                  ${isCollapsed && 'lg:justify-center lg:px-2'}
                `}
                title={isCollapsed ? item.label : ''}
              >
                {item.icon}
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-primary-400/20 bg-gradient-to-b from-transparent to-primary-500/5 space-y-2">
            <Link
              href="/admin/configuracion"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                text-white/60 hover:bg-gradient-to-r hover:from-primary-400/10 hover:to-transparent 
                hover:text-white hover:border-primary-400/20 border border-transparent
                ${isCollapsed && 'lg:justify-center lg:px-2'}
              `}
              title={isCollapsed ? 'Configuración' : ''}
            >
              <Settings className="w-5 h-5" />
              {!isCollapsed && (
                <span className="font-medium text-sm">Configuración</span>
              )}
            </Link>

            <Link
              href="/"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                text-red-400/60 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-transparent 
                hover:text-red-400 hover:border-red-400/20 border border-transparent
                ${isCollapsed && 'lg:justify-center lg:px-2'}
              `}
              title={isCollapsed ? 'Salir' : ''}
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && (
                <span className="font-medium text-sm">Volver al Sitio</span>
              )}
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  )
}

