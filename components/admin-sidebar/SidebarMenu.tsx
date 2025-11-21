'use client'

import Link from 'next/link'
import type { MenuItem } from './menuConfig'

interface SidebarMenuProps {
  items: MenuItem[]
  isCollapsed: boolean
  isActive: (href: string) => boolean
  variant?: 'default' | 'footer'
}

export default function SidebarMenu({ items, isCollapsed, isActive, variant = 'default' }: SidebarMenuProps) {
  return (
    <nav className={variant === 'default' ? 'flex-1 p-4 space-y-2 overflow-y-auto' : 'space-y-2'}>
      {items.map((item) => {
        const isItemActive = isActive(item.href)
        const isLogout = item.href === '/'
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isItemActive
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg'
                : isLogout
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-slate-700 hover:bg-rose-50'
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
        )
      })}
    </nav>
  )
}

