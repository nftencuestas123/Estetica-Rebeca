'use client'

import { Settings, Bell, Lock, Globe, Palette } from 'lucide-react'

export default function ConfiguracionPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary-400" />
          Configuración
        </h1>
        <p className="text-white/60">Ajustes del sistema y preferencias</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General */}
        <div className="bg-black border border-primary-400/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary-400" />
            General
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Nombre del Negocio</label>
              <input
                type="text"
                defaultValue="Rebeca Barreto Estética y Belleza"
                className="w-full px-4 py-2 bg-black border border-primary-400/30 rounded-lg text-white focus:outline-none focus:border-primary-400/50"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Zona Horaria</label>
              <select className="w-full px-4 py-2 bg-black border border-primary-400/30 rounded-lg text-white focus:outline-none focus:border-primary-400/50">
                <option>América/Asunción (UTC-4)</option>
                <option>América/Buenos_Aires (UTC-3)</option>
                <option>América/Sao_Paulo (UTC-3)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-black border border-primary-400/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary-400" />
            Notificaciones
          </h3>
          <div className="space-y-3">
            {[
              'Nuevas citas agendadas',
              'Mensajes de clientes',
              'Recordatorios de citas',
              'Reportes diarios'
            ].map((notif, idx) => (
              <label key={idx} className="flex items-center justify-between p-3 border border-primary-400/20 rounded-lg cursor-pointer hover:border-primary-400/40 transition-colors">
                <span className="text-white">{notif}</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary-400" />
              </label>
            ))}
          </div>
        </div>

        {/* Seguridad */}
        <div className="bg-black border border-primary-400/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary-400" />
            Seguridad
          </h3>
          <div className="space-y-4">
            <button className="w-full px-4 py-3 bg-primary-400/10 text-primary-400 rounded-lg font-semibold hover:bg-primary-400/20 transition-colors">
              Cambiar Contraseña
            </button>
            <button className="w-full px-4 py-3 bg-primary-400/10 text-primary-400 rounded-lg font-semibold hover:bg-primary-400/20 transition-colors">
              Autenticación de Dos Factores
            </button>
          </div>
        </div>

        {/* Apariencia */}
        <div className="bg-black border border-primary-400/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary-400" />
            Apariencia
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-primary-400/30 rounded-lg cursor-pointer">
              <input type="radio" name="theme" defaultChecked className="w-4 h-4 accent-primary-400" />
              <span className="text-white">Oscuro (Actual)</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-primary-400/20 rounded-lg cursor-pointer opacity-50">
              <input type="radio" name="theme" disabled className="w-4 h-4" />
              <span className="text-white">Claro (Próximamente)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

