'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

export function useAdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  return {
    isCollapsed,
    isActive,
    toggleCollapse
  }
}

