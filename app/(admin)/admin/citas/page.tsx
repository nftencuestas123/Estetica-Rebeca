'use client'

import { useState } from 'react'
import { Calendar, Clock, Plus, User, Search } from 'lucide-react'

export default function CitasPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Citas</h1>
          <p className="text-white/60">Agenda y calendario de citas</p>
        </div>
        <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Cita
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Hoy</p>
          <p className="text-2xl font-bold text-primary-400">8</p>
        </div>
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Esta Semana</p>
          <p className="text-2xl font-bold text-primary-400">42</p>
        </div>
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-400">5</p>
        </div>
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Completadas</p>
          <p className="text-2xl font-bold text-green-400">37</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <div className="bg-black border border-primary-400/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-400" />
              Calendario
            </h3>
            <div className="text-center">
              <p className="text-white/60 py-8">
                Calendario interactivo próximamente
              </p>
            </div>
          </div>
        </div>

        {/* Citas List */}
        <div className="lg:col-span-2">
          <div className="bg-black border border-primary-400/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-400" />
                Citas de Hoy
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 bg-black border border-primary-400/30 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary-400/50"
                />
              </div>
            </div>

            <div className="space-y-4">
              {/* Example Cita */}
              {[
                { time: '09:00', cliente: 'María González', tratamiento: 'Botox', estado: 'confirmada' },
                { time: '10:30', cliente: 'Ana Rodríguez', tratamiento: 'Limpieza Facial', estado: 'pendiente' },
                { time: '12:00', cliente: 'Laura Martínez', tratamiento: 'HIFU Facial', estado: 'confirmada' },
                { time: '14:00', cliente: 'Sofía López', tratamiento: 'Rellenos', estado: 'completada' },
              ].map((cita, idx) => (
                <div
                  key={idx}
                  className="border border-primary-400/30 rounded-lg p-4 hover:border-primary-400/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-primary-400 font-semibold">{cita.time}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          cita.estado === 'confirmada' ? 'bg-green-400/10 text-green-400' :
                          cita.estado === 'pendiente' ? 'bg-yellow-400/10 text-yellow-400' :
                          'bg-primary-400/10 text-primary-400'
                        }`}>
                          {cita.estado}
                        </span>
                      </div>
                      <p className="text-white font-medium flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-white/60" />
                        {cita.cliente}
                      </p>
                      <p className="text-sm text-white/60">{cita.tratamiento}</p>
                    </div>
                    <button className="text-primary-400 hover:text-primary-300 text-sm font-semibold">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

