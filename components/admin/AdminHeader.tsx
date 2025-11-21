'use client'

/**
 * Componente: AdminHeader
 * Responsabilidad: Mostrar el encabezado del panel admin
 */
interface AdminHeaderProps {
  title: string
  description: string
}

export default function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <div className="mb-12 border-b border-slate-200 pb-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-slate-600">
        {description}
      </p>
    </div>
  )
}

