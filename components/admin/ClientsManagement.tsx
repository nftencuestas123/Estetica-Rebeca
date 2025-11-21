'use client'

import { useState } from 'react'
import { Users, Zap, BarChart3, Globe, Plus, Edit2, Trash2, Eye, EyeOff, Copy, Check } from 'lucide-react'

interface ClientsManagementProps {
  section: 'clients' | 'credits' | 'history' | 'integrations'
}

interface Client {
  id: string
  name: string
  email: string
  phone: string
  credits: number
  status: 'active' | 'inactive' | 'trial'
  createdAt: string
  totalSpent: number
}

interface Integration {
  id: string
  clientId: string
  clientName: string
  landingPage: string
  status: 'active' | 'inactive'
  integrationDate: string
  method: 'automatic' | 'manual'
}

/**
 * Componente: ClientsManagement
 * Responsabilidad: Gestión completa de clientes, créditos e integraciones
 * Secciones: Mis Clientes, Créditos, Historial, Integraciones
 */
export default function ClientsManagement({ section }: ClientsManagementProps) {
  const [copied, setCopied] = useState<string | null>(null)

  // DATOS DE EJEMPLO
  const mockClients: Client[] = [
    {
      id: '1',
      name: 'Spa Belleza Premium',
      email: 'admin@spabeleza.com',
      phone: '+34 912345678',
      credits: 5000,
      status: 'active',
      createdAt: '2025-01-15',
      totalSpent: 1500,
    },
    {
      id: '2',
      name: 'Centro Estética Sofia',
      email: 'contacto@estsofia.com',
      phone: '+34 934567890',
      credits: 2500,
      status: 'active',
      createdAt: '2025-02-01',
      totalSpent: 3000,
    },
    {
      id: '3',
      name: 'Salón de Belleza Rosa',
      email: 'info@rosabeauty.com',
      phone: '+34 956789012',
      credits: 100,
      status: 'active',
      createdAt: '2025-03-10',
      totalSpent: 500,
    },
  ]

  const mockIntegrations: Integration[] = [
    {
      id: '1',
      clientId: '1',
      clientName: 'Spa Belleza Premium',
      landingPage: 'https://spabeleza.com',
      status: 'active',
      integrationDate: '2025-02-01',
      method: 'automatic',
    },
    {
      id: '2',
      clientId: '2',
      clientName: 'Centro Estética Sofia',
      landingPage: 'https://estsofia.com',
      status: 'active',
      integrationDate: '2025-02-15',
      method: 'manual',
    },
  ]

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* SECCIÓN: MIS CLIENTES */}
      {section === 'clients' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-600" />
              <div>
                <h2 className="text-2xl font-bold text-slate-900">👥 Mis Clientes</h2>
                <p className="text-slate-600 text-sm">Gestiona todos los clientes que usan tu asistente de voz</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              <Plus className="w-5 h-5" />
              Nuevo Cliente
            </button>
          </div>

          <div className="grid gap-4">
            {mockClients.map((client) => (
              <div key={client.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Información del cliente */}
                  <div>
                    <p className="text-sm text-slate-600">Cliente</p>
                    <h3 className="font-bold text-slate-900">{client.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{client.email}</p>
                    <p className="text-xs text-slate-600">{client.phone}</p>
                  </div>

                  {/* Créditos */}
                  <div>
                    <p className="text-sm text-slate-600">Créditos Disponibles</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <span className="text-2xl font-bold text-slate-900">{client.credits}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Gastado: ${client.totalSpent}</p>
                  </div>

                  {/* Estado y acciones */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        client.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : client.status === 'inactive'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {client.status === 'active' ? '✅ Activo' : client.status === 'inactive' ? '❌ Inactivo' : '🆕 Prueba'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded transition" title="Editar">
                        <Edit2 className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded transition" title="Eliminar">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN: CRÉDITOS */}
      {section === 'credits' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-amber-500" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">💳 Gestión de Créditos</h2>
              <p className="text-slate-600 text-sm">Agregaa o ajusta créditos para tus clientes</p>
            </div>
          </div>

          <div className="grid gap-4">
            {mockClients.map((client) => (
              <div key={client.id} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  {/* Cliente */}
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Cliente</p>
                    <p className="font-bold text-slate-900">{client.name}</p>
                  </div>

                  {/* Créditos actuales */}
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Créditos Actuales</p>
                    <p className="text-xl font-bold text-indigo-600">{client.credits}</p>
                  </div>

                  {/* Input para agregar créditos */}
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Agregar Créditos</p>
                    <input
                      type="number"
                      placeholder="100"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Botón agregar */}
                  <button className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition font-semibold">
                    ➕ Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Historial de créditos */}
          <div className="mt-8 bg-slate-50 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 mb-4">📝 Historial de Transacciones</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span>Spa Belleza Premium - Compra manual</span>
                <span className="text-green-600 font-bold">+1000</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Centro Estética Sofia - Pago automático</span>
                <span className="text-green-600 font-bold">+500</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Salón Rosa - Uso de servicio</span>
                <span className="text-red-600 font-bold">-100</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN: HISTORIAL */}
      {section === 'history' && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">📊 Historial de Uso</h2>
              <p className="text-slate-600 text-sm">Analiza el uso de tus clientes</p>
            </div>
          </div>

          <div className="space-y-4">
            {mockClients.map((client) => (
              <div key={client.id} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900">{client.name}</h3>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded">Últimos 30 días</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-50 p-3 rounded">
                    <p className="text-sm text-slate-600">Llamadas</p>
                    <p className="text-xl font-bold text-slate-900">124</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded">
                    <p className="text-sm text-slate-600">Minutos</p>
                    <p className="text-xl font-bold text-slate-900">1,240</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded">
                    <p className="text-sm text-slate-600">Costo</p>
                    <p className="text-xl font-bold text-slate-900">$496</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Estadísticas generales */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-bold text-slate-900 mb-4">🎯 Estadísticas Totales</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-slate-600">Clientes Activos</p>
                <p className="text-2xl font-bold text-slate-900">3</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Llamadas</p>
                <p className="text-2xl font-bold text-slate-900">450+</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Minutos</p>
                <p className="text-2xl font-bold text-slate-900">3,500+</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Ingresos</p>
                <p className="text-2xl font-bold text-green-600">$5,000+</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN: INTEGRACIONES */}
      {section === 'integrations' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold text-slate-900">🌐 Integraciones</h2>
                <p className="text-slate-600 text-sm">Gestiona landing pages donde está integrado el asistente</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              <Plus className="w-5 h-5" />
              Nueva Integración
            </button>
          </div>

          <div className="space-y-4">
            {mockIntegrations.map((integration) => (
              <div key={integration.id} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  {/* Cliente y landing page */}
                  <div>
                    <p className="text-sm text-slate-600">Cliente</p>
                    <p className="font-bold text-slate-900">{integration.clientName}</p>
                    <p className="text-xs text-slate-600 mt-1 truncate">{integration.landingPage}</p>
                  </div>

                  {/* Estado */}
                  <div>
                    <p className="text-sm text-slate-600">Estado</p>
                    <div className="flex items-center gap-2 mt-1">
                      {integration.status === 'active' ? (
                        <>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-semibold text-green-600">Activo</span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-semibold text-red-600">Inactivo</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-2">
                      Integración: {integration.method === 'automatic' ? '🤖 Automática' : '👤 Manual'}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => copyToClipboard(integration.landingPage, integration.id)}
                      className="flex items-center gap-1 px-3 py-2 hover:bg-slate-100 rounded transition text-sm"
                      title="Copiar URL"
                    >
                      {copied === integration.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded transition" title="Ver estado">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded transition" title="Editar">
                      <Edit2 className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded transition" title="Eliminar">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Información sobre integración */}
          <div className="mt-8 bg-slate-50 rounded-lg p-6 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">📌 ¿Cómo integrar?</h3>
            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <p className="font-semibold mb-1">🤖 Integración Automática (Cliente con créditos)</p>
                <p>Si el cliente tiene créditos activos, el asistente se integra automáticamente en su landing page después del pago.</p>
              </div>
              <div>
                <p className="font-semibold mb-1">👤 Integración Manual (Cliente sin tarjeta)</p>
                <p>Para clientes que pagaron en persona sin crédito en el sistema, puedes integrar manualmente desde aquí.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

