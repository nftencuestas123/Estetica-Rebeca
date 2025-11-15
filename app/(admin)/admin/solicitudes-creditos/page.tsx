'use client'

import { useState, useEffect } from 'react'
import { Clock, Check, X, ExternalLink, FileText } from 'lucide-react'
import { getPendingCreditRequests, approveCreditRequest, rejectCreditRequest } from '@/services/credits'
import { PAYMENT_METHODS } from '@/constants/payment-config'

export default function SolicitudesCreditosPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    loadRequests()
    // Auto-reload cada 30 segundos
    const interval = setInterval(loadRequests, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadRequests = async () => {
    setLoading(true)
    const data = await getPendingCreditRequests()
    setRequests(data)
    setLoading(false)
  }

  const handleApprove = async (requestId: string) => {
    if (!confirm('¿Estás seguro de aprobar esta solicitud? Los créditos se agregarán al usuario.')) {
      return
    }

    setProcessing(true)
    const result = await approveCreditRequest(requestId, adminNotes || undefined)
    setProcessing(false)

    if (result.success) {
      alert('✅ Solicitud aprobada exitosamente')
      setSelectedRequest(null)
      setAdminNotes('')
      loadRequests()
    } else {
      alert('❌ Error: ' + result.error)
    }
  }

  const handleReject = async (requestId: string) => {
    if (!confirm('¿Estás seguro de rechazar esta solicitud?')) {
      return
    }

    const reason = prompt('Motivo del rechazo (opcional):')
    
    setProcessing(true)
    const result = await rejectCreditRequest(requestId, reason || adminNotes || undefined)
    setProcessing(false)

    if (result.success) {
      alert('✅ Solicitud rechazada')
      setSelectedRequest(null)
      setAdminNotes('')
      loadRequests()
    } else {
      alert('❌ Error: ' + result.error)
    }
  }

  const getPaymentMethodName = (methodId: string) => {
    return PAYMENT_METHODS.find(m => m.id === methodId)?.name || methodId
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary-400" />
          Solicitudes de Créditos
        </h1>
        <p className="text-white/60">Aprobar o rechazar solicitudes de compra de créditos</p>
      </div>

      {/* Contador */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border border-yellow-400/40 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <Clock className="w-10 h-10 text-yellow-400" />
          <div>
            <p className="text-3xl font-bold text-yellow-400">{requests.length}</p>
            <p className="text-white/60">Solicitudes Pendientes</p>
          </div>
        </div>
      </div>

      {/* Lista de Solicitudes */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
          <p className="text-white/60 mt-4">Cargando solicitudes...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-black border border-primary-400/30 rounded-xl p-12 text-center">
          <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-white mb-2">¡Todo al día!</p>
          <p className="text-white/60">No hay solicitudes pendientes de aprobación</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-black border-2 border-yellow-400/40 rounded-xl p-6 hover:border-yellow-400/60 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-primary-400 mb-1">${request.amount}</p>
                  <p className="text-white font-semibold">{request.user?.full_name || request.user?.email || 'Usuario'}</p>
                  <p className="text-white/60 text-sm">{request.user?.email}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                    <Clock className="w-4 h-4" />
                    Pendiente
                  </span>
                  <p className="text-white/60 text-sm mt-2">{new Date(request.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/60 text-sm">Método de Pago:</p>
                  <p className="text-white font-semibold">{getPaymentMethodName(request.payment_method)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/60 text-sm">Comprobante:</p>
                  {request.receipt_url ? (
                    <a
                      href={request.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 font-semibold flex items-center gap-2"
                    >
                      Ver comprobante <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <p className="text-white/40 italic">Sin comprobante (efectivo)</p>
                  )}
                </div>
              </div>

              {selectedRequest?.id === request.id && (
                <div className="mb-4">
                  <label className="block text-white/80 text-sm mb-2">Notas del Administrador (opcional):</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Ej: Transferencia verificada correctamente..."
                    className="w-full bg-black border border-primary-400/30 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:border-primary-400/50"
                    rows={3}
                  ></textarea>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (selectedRequest?.id === request.id) {
                      handleApprove(request.id)
                    } else {
                      setSelectedRequest(request)
                      setAdminNotes('')
                    }
                  }}
                  disabled={processing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  {selectedRequest?.id === request.id ? 'Confirmar Aprobación' : 'Aprobar'}
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  disabled={processing}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Rechazar
                </button>
              </div>

              {selectedRequest?.id === request.id && (
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="w-full mt-2 text-white/60 hover:text-white text-sm"
                >
                  Cancelar
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Botón Refrescar */}
      <button
        onClick={loadRequests}
        className="fixed bottom-8 right-8 bg-primary-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary-500 transition-colors flex items-center gap-2"
      >
        🔄 Refrescar
      </button>
    </div>
  )
}

