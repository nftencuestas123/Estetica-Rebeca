'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Upload, Check, Clock, X } from 'lucide-react'
import { CREDIT_PACKAGES, PAYMENT_METHODS, PAYMENT_CONFIG } from '@/constants/payment-config'
import { getUserBalance, createCreditPurchaseRequest, getUserCreditRequests } from '@/services/credits'
import { useAuth } from '@/hooks/useAuth'

export default function ComprarCreditosPage() {
  const { user } = useAuth()
  const [balance, setBalance] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [myRequests, setMyRequests] = useState<any[]>([])
  const [step, setStep] = useState<'select' | 'payment' | 'upload'>('select')

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    if (!user) return
    const currentBalance = await getUserBalance(user.id)
    setBalance(currentBalance)
    
    const requests = await getUserCreditRequests(user.id)
    setMyRequests(requests)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setReceiptFile(file)
      setReceiptPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (!user || !selectedPackage || !selectedPaymentMethod) {
      setError('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    setError(null)

    const result = await createCreditPurchaseRequest(
      user.id,
      selectedPackage.price,
      selectedPaymentMethod,
      receiptFile || undefined
    )

    setLoading(false)

    if (result.success) {
      setSuccess(true)
      setSelectedPackage(null)
      setSelectedPaymentMethod('')
      setReceiptFile(null)
      setReceiptPreview(null)
      setStep('select')
      await loadUserData()
      
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => setSuccess(false), 5000)
    } else {
      setError(result.error || 'Error al crear solicitud')
    }
  }

  const getPaymentInstructions = () => {
    const method = PAYMENT_METHODS.find(m => m.id === selectedPaymentMethod)
    if (!method) return null

    const config = PAYMENT_CONFIG[method.instructionsKey as keyof typeof PAYMENT_CONFIG]

    switch (selectedPaymentMethod) {
      case 'bank_transfer':
        return (
          <div className="bg-black border border-primary-400/30 rounded-lg p-4 space-y-2">
            <p className="font-semibold text-white mb-3">📋 Instrucciones:</p>
            <p className="text-white/80"><strong>Banco:</strong> {config.bankName}</p>
            <p className="text-white/80"><strong>Cuenta:</strong> {config.accountNumber}</p>
            <p className="text-white/80"><strong>Titular:</strong> {config.accountHolder}</p>
            <p className="text-white/80"><strong>Tipo:</strong> {config.accountType}</p>
            <p className="text-white/80"><strong>RUC/CI:</strong> {config.ruc}</p>
            <p className="text-white/80 mt-3"><strong>Monto:</strong> ${selectedPackage?.price}</p>
            <p className="text-white/60 text-sm mt-3">⚠️ Concepto: "Créditos Rebeca Barreto"</p>
          </div>
        )
      case 'personal_wallet':
        return (
          <div className="bg-black border border-primary-400/30 rounded-lg p-4 space-y-2">
            <p className="font-semibold text-white mb-3">📋 Instrucciones:</p>
            <p className="text-white/80"><strong>Celular:</strong> {config.phoneNumber}</p>
            <p className="text-white/80"><strong>Nombre:</strong> {config.holderName}</p>
            <p className="text-white/80"><strong>CI:</strong> {config.ci}</p>
            <p className="text-white/80 mt-3"><strong>Monto:</strong> ${selectedPackage?.price}</p>
            <p className="text-white/60 text-sm mt-3">⚠️ Luego sube captura de pantalla</p>
          </div>
        )
      case 'cambio_chaco':
        return (
          <div className="bg-black border border-primary-400/30 rounded-lg p-4 space-y-2">
            <p className="font-semibold text-white mb-3">📋 Instrucciones:</p>
            <p className="text-white/80"><strong>Nombre:</strong> {config.holderName}</p>
            <p className="text-white/80"><strong>CI/RUC:</strong> {config.identification}</p>
            <p className="text-white/80"><strong>Cuenta:</strong> {config.accountNumber}</p>
            <p className="text-white/80 mt-3"><strong>Monto:</strong> ${selectedPackage?.price}</p>
            <p className="text-white/60 text-sm mt-3">⚠️ Luego sube el comprobante de depósito</p>
          </div>
        )
      case 'cash':
        return (
          <div className="bg-black border border-primary-400/30 rounded-lg p-4 space-y-2">
            <p className="font-semibold text-white mb-3">📋 Información:</p>
            <p className="text-white/80"><strong>Ubicación:</strong> {config.address}</p>
            <p className="text-white/80"><strong>Horario:</strong> {config.schedule}</p>
            <p className="text-white/80"><strong>Contacto:</strong> {config.contactName}</p>
            <p className="text-white/80"><strong>Teléfono:</strong> {config.contactPhone}</p>
            <p className="text-white/80 mt-3"><strong>Monto:</strong> ${selectedPackage?.price}</p>
            <p className="text-white/60 text-sm mt-3">⚠️ Nos contactaremos contigo para coordinar</p>
          </div>
        )
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="flex items-center gap-1 text-yellow-400 text-sm"><Clock className="w-4 h-4" /> Pendiente</span>
      case 'approved':
        return <span className="flex items-center gap-1 text-green-400 text-sm"><Check className="w-4 h-4" /> Aprobado</span>
      case 'rejected':
        return <span className="flex items-center gap-1 text-red-400 text-sm"><X className="w-4 h-4" /> Rechazado</span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <DollarSign className="w-8 h-8 text-primary-400" />
          Comprar Créditos
        </h1>
        <p className="text-white/60">Recarga créditos para generar videos con IA</p>
      </div>

      {/* Balance Actual */}
      <div className="bg-gradient-to-r from-primary-500/20 to-primary-600/10 border border-primary-400/40 rounded-xl p-6 mb-8">
        <p className="text-white/60 text-sm mb-1">Tu saldo actual:</p>
        <p className="text-4xl font-bold text-primary-400">${balance.toFixed(2)}</p>
        <p className="text-white/40 text-sm mt-2">
          {balance > 0 ? `Aproximadamente ${balance} créditos disponibles` : 'Sin créditos disponibles'}
        </p>
      </div>

      {/* Mensaje de éxito */}
      {success && (
        <div className="bg-green-500/20 border border-green-400/40 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Check className="w-5 h-5 text-green-400 mt-0.5" />
          <div>
            <p className="text-green-400 font-semibold">¡Solicitud enviada exitosamente!</p>
            <p className="text-green-300/80 text-sm">Recibirás una notificación cuando sea aprobada (máx 24hs)</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-500/20 border border-red-400/40 rounded-lg p-4 mb-6 flex items-start gap-3">
          <X className="w-5 h-5 text-red-400 mt-0.5" />
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Pasos */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`flex items-center gap-2 ${step === 'select' ? 'text-primary-400' : 'text-white/40'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step === 'select' ? 'border-primary-400 bg-primary-400/20' : 'border-white/40'}`}>1</div>
          <span className="font-semibold">Elegir Paquete</span>
        </div>
        <div className="w-12 h-0.5 bg-white/20"></div>
        <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary-400' : 'text-white/40'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step === 'payment' ? 'border-primary-400 bg-primary-400/20' : 'border-white/40'}`}>2</div>
          <span className="font-semibold">Método de Pago</span>
        </div>
        <div className="w-12 h-0.5 bg-white/20"></div>
        <div className={`flex items-center gap-2 ${step === 'upload' ? 'text-primary-400' : 'text-white/40'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${step === 'upload' ? 'border-primary-400 bg-primary-400/20' : 'border-white/40'}`}>3</div>
          <span className="font-semibold">Subir Comprobante</span>
        </div>
      </div>

      {/* PASO 1: Seleccionar Paquete */}
      {step === 'select' && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Elige un paquete:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {CREDIT_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => {
                  setSelectedPackage(pkg)
                  setStep('payment')
                }}
                className={`relative bg-black border-2 rounded-xl p-6 cursor-pointer transition-all hover:border-primary-400/60 hover:shadow-lg hover:shadow-primary-400/20 ${
                  selectedPackage?.id === pkg.id ? 'border-primary-400 shadow-lg shadow-primary-400/30' : 'border-primary-400/30'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    RECOMENDADO
                  </div>
                )}
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-2">{pkg.name}</p>
                  <p className="text-5xl font-bold text-primary-400 mb-4">{pkg.displayPrice}</p>
                  <p className="text-white/60 text-sm mb-6">{pkg.estimatedVideos}</p>
                  <button className="w-full bg-primary-400/10 text-primary-400 py-3 rounded-lg font-semibold hover:bg-primary-400/20 transition-colors">
                    Elegir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PASO 2: Método de Pago */}
      {step === 'payment' && selectedPackage && (
        <div>
          <button onClick={() => setStep('select')} className="text-primary-400 mb-4 hover:underline flex items-center gap-2">
            ← Volver a paquetes
          </button>
          <h2 className="text-xl font-bold text-white mb-4">Paquete seleccionado: {selectedPackage.name} - {selectedPackage.displayPrice}</h2>
          <h3 className="text-lg font-semibold text-white mb-4">¿Cómo vas a pagar?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {PAYMENT_METHODS.map((method) => (
              <div
                key={method.id}
                onClick={() => {
                  setSelectedPaymentMethod(method.id)
                  setStep('upload')
                }}
                className={`bg-black border-2 rounded-xl p-4 cursor-pointer transition-all hover:border-primary-400/60 ${
                  selectedPaymentMethod === method.id ? 'border-primary-400' : 'border-primary-400/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{method.icon}</span>
                  <span className="text-white font-semibold">{method.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PASO 3: Subir Comprobante */}
      {step === 'upload' && selectedPackage && selectedPaymentMethod && (
        <div>
          <button onClick={() => setStep('payment')} className="text-primary-400 mb-4 hover:underline flex items-center gap-2">
            ← Cambiar método de pago
          </button>
          <h2 className="text-xl font-bold text-white mb-6">Instrucciones de Pago</h2>
          
          {getPaymentInstructions()}

          <div className="mt-6 bg-black border border-primary-400/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Sube tu comprobante de pago:</h3>
            
            <div className="border-2 border-dashed border-primary-400/30 rounded-lg p-6 text-center relative">
              {receiptPreview ? (
                <div>
                  <img src={receiptPreview} alt="Comprobante" className="max-h-64 mx-auto rounded-lg shadow-lg mb-4" />
                  <button
                    onClick={() => {
                      setReceiptFile(null)
                      setReceiptPreview(null)
                    }}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    ✕ Eliminar
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-white/40 mx-auto mb-3" />
                  <p className="text-white/60 font-semibold mb-2">Arrastra tu imagen aquí</p>
                  <p className="text-white/40 text-sm mb-4">o haz click para seleccionar</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <button className="bg-primary-400/10 text-primary-400 px-6 py-2 rounded-lg font-semibold hover:bg-primary-400/20 transition-colors">
                    Seleccionar Archivo
                  </button>
                </div>
              )}
            </div>

            <p className="text-white/60 text-sm mt-4 text-center">
              {selectedPaymentMethod === 'cash' 
                ? 'Puedes enviar la solicitud sin comprobante. Nos contactaremos contigo para coordinar.'
                : 'Sube una foto clara del comprobante de transferencia/depósito'}
            </p>

            <button
              onClick={handleSubmit}
              disabled={loading || (selectedPaymentMethod !== 'cash' && !receiptFile)}
              className="w-full mt-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </div>
        </div>
      )}

      {/* Mis Solicitudes */}
      {myRequests.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Mis Solicitudes</h2>
          <div className="space-y-4">
            {myRequests.map((request) => (
              <div key={request.id} className="bg-black border border-primary-400/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">${request.amount} - {PAYMENT_METHODS.find(m => m.id === request.payment_method)?.name}</p>
                    <p className="text-white/60 text-sm">{new Date(request.created_at).toLocaleString()}</p>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
                {request.admin_notes && (
                  <p className="text-white/60 text-sm mt-2 italic">Nota: {request.admin_notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

