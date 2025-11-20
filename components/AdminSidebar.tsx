'use client'

import { useAdminSidebar } from '@/hooks/admin/useAdminSidebar'
import { MENU_ITEMS, FOOTER_ITEMS } from './admin-sidebar/menuConfig'
import SidebarHeader from './admin-sidebar/SidebarHeader'
import SidebarMenu from './admin-sidebar/SidebarMenu'
import SidebarMobileToggle from './admin-sidebar/SidebarMobileToggle'
import SidebarMobileOverlay from './admin-sidebar/SidebarMobileOverlay'

export default function AdminSidebar() {
  const { isCollapsed, isActive, toggleCollapse } = useAdminSidebar()

  return (
    <>
      <SidebarMobileToggle onToggle={toggleCollapse} />

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white
          border-r border-rose-100 shadow-xl
          transition-all duration-300 z-40
          ${isCollapsed ? 'w-0 lg:w-20' : 'w-64'}
          ${isCollapsed && 'lg:flex lg:flex-col'}
        `}
      >
        <div className={`flex flex-col h-full ${isCollapsed && 'opacity-0 lg:opacity-100'}`}>
          <SidebarHeader isCollapsed={isCollapsed} onToggle={toggleCollapse} />
          <SidebarMenu items={MENU_ITEMS} isCollapsed={isCollapsed} isActive={isActive} />
          <div className="p-4 border-t border-rose-100">
            <SidebarMenu items={FOOTER_ITEMS} isCollapsed={isCollapsed} isActive={isActive} variant="footer" />
          </div>
        </div>
      </aside>

      <SidebarMobileOverlay isCollapsed={isCollapsed} onClose={toggleCollapse} />
    </>
  )
}

