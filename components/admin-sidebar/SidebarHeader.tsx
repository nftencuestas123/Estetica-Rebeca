'use client'

import { ChevronLeft } from 'lucide-react'

interface SidebarHeaderProps {
  isCollapsed: boolean
  onToggle: () => void
}

export default function SidebarHeader({ isCollapsed, onToggle }: SidebarHeaderProps) {
  return (
    <div className="p-6 border-b border-rose-100">
      <div className="flex items-center justify-between">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-lg font-bold text-white">RB</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-slate-900">
                Admin Panel
              </h2>
              <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Rebeca Barreto</p>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md mx-auto">
            <span className="text-lg font-bold text-white">RB</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className={`hidden lg:block p-2 hover:bg-rose-50 rounded-lg transition-colors ${isCollapsed ? 'mx-auto mt-4' : ''}`}
          title={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          <ChevronLeft 
            className={`w-5 h-5 text-slate-600 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>
    </div>
  )
}

