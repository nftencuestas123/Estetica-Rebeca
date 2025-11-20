'use client'

import { Menu } from 'lucide-react'

interface SidebarMobileToggleProps {
  onToggle: () => void
}

export default function SidebarMobileToggle({ onToggle }: SidebarMobileToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white border-2 border-rose-100 rounded-xl shadow-lg
                 hover:shadow-xl transition-all duration-200"
    >
      <Menu className="w-6 h-6 text-slate-900" />
    </button>
  )
}

