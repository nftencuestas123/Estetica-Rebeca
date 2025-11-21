'use client'

interface SidebarMobileOverlayProps {
  isCollapsed: boolean
  onClose: () => void
}

export default function SidebarMobileOverlay({ isCollapsed, onClose }: SidebarMobileOverlayProps) {
  if (isCollapsed) return null

  return (
    <div
      className="lg:hidden fixed inset-0 bg-black/50 z-30"
      onClick={onClose}
    />
  )
}

