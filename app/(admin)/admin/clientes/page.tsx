'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Search, Plus, Edit, Trash2, Phone, Mail, Calendar } from 'lucide-react'

interface Cliente {
  id: string
  nombre: string
  email: string
  whatsapp: string | null
  estado: string
  puntos_lealtad: number
  tier: string
  created_at: string
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadClientes()
  }, [])

  const loadClientes = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setClientes(data || [])
    } catch (error) {
      console.error('Error cargando clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold': return 'text-yellow-400 bg-yellow-400/10'
      case 'silver': return 'text-gray-400 bg-gray-400/10'
      case 'bronze': return 'text-orange-400 bg-orange-400/10'
      default: return 'text-white/60 bg-white/10'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">CRM - Clientes</h1>
          <p className="text-white/60">Gestión completa de la base de datos de clientes</p>
        </div>
        <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nuevo Cliente
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar clientes por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-black border border-primary-400/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary-400/50"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Total Clientes</p>
          <p className="text-2xl font-bold text-primary-400">{clientes.length}</p>
        </div>
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Activos</p>
          <p className="text-2xl font-bold text-green-400">
            {clientes.filter(c => c.estado === 'activo').length}
          </p>
        </div>
        <div className="bg-black border border-primary-400/30 rounded-lg p-4">
          <p className="text-sm text-white/60 mb-1">Nuevos Este Mes</p>
          <p className="text-2xl font-bold text-primary-400">
            {clientes.filter(c => {
              const created = new Date(c.created_at)
              const now = new Date()
              return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
            }).length}
          </p>
        </div>
      </div>

      {/* Clientes Table */}
      <div className="bg-black border border-primary-400/30 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-400/10 border-b border-primary-400/30">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-white">Cliente</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-white">Contacto</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-white">Tier</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-white">Puntos</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-white">Estado</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-white">Registro</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-white">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-400/10">
              {filteredClientes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-white/60">
                    {searchTerm ? 'No se encontraron clientes' : 'No hay clientes registrados'}
                  </td>
                </tr>
              ) : (
                filteredClientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-primary-400/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{cliente.nombre}</p>
                        <p className="text-sm text-white/60">{cliente.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {cliente.whatsapp && (
                          <a
                            href={`https://wa.me/${cliente.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300"
                          >
                            <Phone className="w-4 h-4" />
                            {cliente.whatsapp}
                          </a>
                        )}
                        <a
                          href={`mailto:${cliente.email}`}
                          className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getTierColor(cliente.tier)}`}>
                        {cliente.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{cliente.puntos_lealtad}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        cliente.estado === 'activo' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                      }`}>
                        {cliente.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Calendar className="w-4 h-4" />
                        {new Date(cliente.created_at).toLocaleDateString('es-ES')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-primary-400 hover:bg-primary-400/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

