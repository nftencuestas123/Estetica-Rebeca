'use client'

import { Sparkles, Plus, Edit, Trash2, DollarSign } from 'lucide-react'

export default function TratamientosPage() {
  const tratamientos = [
    { id: 1, nombre: 'Botox', precio: 200, duracion: '30 min', categoria: 'Facial' },
    { id: 2, nombre: 'Rellenos Ácido Hialurónico', precio: 350, duracion: '45 min', categoria: 'Facial' },
    { id: 3, nombre: 'HIFU Facial', precio: 450, duracion: '60 min', categoria: 'Facial' },
    { id: 4, nombre: 'Limpieza Facial Profunda', precio: 80, duracion: '60 min', categoria: 'Facial' },
    { id: 5, nombre: 'Mesoterapia', precio: 120, duracion: '45 min', categoria: 'Corporal' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary-400" />
            Tratamientos
          </h1>
          <p className="text-white/60">Catálogo de servicios y tratamientos</p>
        </div>
        <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nuevo Tratamiento
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Total Tratamientos</p>
          <p className="text-2xl font-bold text-primary-400">{tratamientos.length}</p>
        </div>
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Más Popular</p>
          <p className="text-lg font-bold text-white">Botox</p>
        </div>
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Precio Promedio</p>
          <p className="text-2xl font-bold text-primary-400">$240</p>
        </div>
      </div>

      {/* Tratamientos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tratamientos.map((tratamiento) => (
          <div
            key={tratamiento.id}
            className="bg-black border border-primary-400/30 rounded-lg p-6 hover:border-primary-400/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 bg-primary-400/10 text-primary-400 rounded-full text-xs font-semibold">
                {tratamiento.categoria}
              </span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-primary-400 hover:bg-primary-400/10 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-3">{tratamiento.nombre}</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Precio</span>
                <span className="text-lg font-bold text-primary-400 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {tratamiento.precio}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Duración</span>
                <span className="text-white">{tratamiento.duracion}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

