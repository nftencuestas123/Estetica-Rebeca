'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Mail, CheckCircle2 } from 'lucide-react'

export default function PendingVerificationPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState<'client' | 'admin'>('client')

  useEffect(() => {
    // Obtener email de los query params
    const emailParam = searchParams.get('email')
    const typeParam = searchParams.get('type') as 'client' | 'admin'
    
    if (emailParam) setEmail(emailParam)
    if (typeParam) setUserType(typeParam)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            ¡Registro Exitoso! ✓
          </h1>

          <p className="text-slate-300 mb-6">
            Tu cuenta ha sido creada correctamente.
          </p>

          <div className="bg-green-900/20 border border-green-500 rounded-lg p-6 mb-6">
            <p className="text-green-200 text-center mb-4">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-400" />
              <strong>¡Todo listo!</strong>
            </p>
            <p className="text-slate-300 text-sm text-center">
              Tu cuenta está activa y lista para usar.
            </p>
            {email && (
              <p className="text-primary-400 font-semibold text-center mt-3 break-all">
                {email}
              </p>
            )}
          </div>

          <Link 
            href={userType === 'admin' ? '/admin/login' : '/client/login'}
            className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition text-center"
          >
            → Ir al Login
          </Link>
        </div>
      </div>
    </div>
  )
}

