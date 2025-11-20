'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  CreditCard, 
  Share2, 
  User, 
  LogOut,
  ChevronLeft,
  Menu,
  X,
  Mic
} from 'lucide-react'

interface MenuItem {
  href: string
  icon: React.ReactNode
  label: string
}

const MENU_ITEMS: MenuItem[] = [
  {
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: 'Dashboard'
  },
  {
    href: '/dashboard/paginas-inicio',
    icon: <FileText className="w-5 h-5" />,
    label: 'Páginas de Inicio'
  },
  {
    href: '/dashboard/videos',
    icon: <Video className="w-5 h-5" />,
    label: 'Videos IA'
  },
  {
    href: '/dashboard/creditos',
    icon: <CreditCard className="w-5 h-5" />,
    label: 'Créditos'
  },
  {
    href: '/dashboard/asistente-voz',
    icon: <Mic className="w-5 h-5" />,
    label: 'Asistente de Voz'
  },
  {
    href: '/dashboard/redes',
    icon: <Share2 className="w-5 h-5" />,
    label: 'Redes Sociales'
  },
  {
    href: '/dashboard/perfil',
    icon: <User className="w-5 h-5" />,
    label: 'Mi Perfil'
  },
]

export default function ClientSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-slate-200"
      >
        <Menu className="w-6 h-6 text-slate-700" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-slate-200
          transition-all duration-300 z-50 shadow-lg
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              {!isCollapsed ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-md">
                    <span className="text-lg font-bold text-white">RB</span>
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-slate-800">
                      Rebeca Barreto
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-md mx-auto">
                  <span className="text-lg font-bold text-white">RB</span>
                </div>
              )}
              
              {/* Close button (mobile) */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>

              {/* Collapse button (desktop) */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`hidden lg:block p-2 hover:bg-slate-100 rounded-lg transition-colors ${isCollapsed ? 'mx-auto mt-4' : ''}`}
                title={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
              >
                <ChevronLeft
                  className={`w-5 h-5 text-slate-600 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {MENU_ITEMS.map((item) => {
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${active
                      ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 border border-rose-200 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                    }
                    ${isCollapsed && 'justify-center px-2'}
                  `}
                  title={isCollapsed ? item.label : ''}
                >
                  {item.icon}
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer - Logout */}
          <div className="p-4 border-t border-slate-200">
            <Link
              href="/api/auth/logout"
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200
                ${isCollapsed && 'justify-center px-2'}
              `}
              title={isCollapsed ? 'Cerrar Sesión' : ''}
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && (
                <span className="font-medium text-sm">Cerrar Sesión</span>
              )}
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}

