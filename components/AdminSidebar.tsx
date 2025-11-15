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
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-black border border-primary-400/30 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6 text-primary-400" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-black border-r border-primary-400/30 
          transition-all duration-300 z-40
          ${isCollapsed ? 'w-0 lg:w-20' : 'w-64'}
          ${isCollapsed && 'lg:flex lg:flex-col'}
        `}
      >
        <div className={`flex flex-col h-full ${isCollapsed && 'opacity-0 lg:opacity-100'}`}>
          {/* Header */}
          <div className="p-6 border-b border-primary-400/30">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent">
                    Admin Panel
                  </h2>
                  <p className="text-xs text-white/60 mt-1">Rebeca Barreto</p>
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
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive(item.href)
                    ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-400 border border-primary-400/30 shadow-lg'
                    : 'text-white/70 hover:bg-primary-400/5 hover:text-white'
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
          <div className="p-4 border-t border-primary-400/30 space-y-2">
            <Link
              href="/admin/configuracion"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                text-white/70 hover:bg-primary-400/5 hover:text-white
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
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                text-red-400/70 hover:bg-red-500/10 hover:text-red-400
                ${isCollapsed && 'lg:justify-center lg:px-2'}
              `}
              title={isCollapsed ? 'Salir' : ''}
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && (
                <span className="font-medium text-sm">Salir</span>
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

