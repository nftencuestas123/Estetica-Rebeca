'use client'

import Link from 'next/link'
import { Users, Shield, LogIn, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AuthHomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* Logo/Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent mb-2">
          ✨ Estética Rebeca
        </h1>
        <p className="text-slate-400 text-lg">
          Tu plataforma de citas y gestión
        </p>
      </div>

      {/* Selection Cards */}
      <div className="w-full max-w-2xl grid md:grid-cols-2 gap-6 mb-12">
        {/* Cliente Section */}
        <div className="group">
          <Link
            href="/client/login"
            className="block h-full p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg shadow-xl border border-slate-600 hover:border-primary-400 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20"
          >
            <div className="flex flex-col items-center h-full">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-4 group-hover:bg-primary-500/40 transition">
                <Users className="w-8 h-8 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Cliente</h2>
              <p className="text-slate-300 text-center text-sm mb-4">
                Acceso para clientes registrados
              </p>
              <div className="mt-auto">
                <p className="text-primary-300 font-semibold flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Iniciar Sesión
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Admin Section */}
        <div className="group">
          <Link
            href="/admin/login"
            className="block h-full p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg shadow-xl border border-slate-600 hover:border-amber-400 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20"
          >
            <div className="flex flex-col items-center h-full">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-full mb-4 group-hover:bg-amber-500/40 transition">
                <Shield className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Administrador</h2>
              <p className="text-slate-300 text-center text-sm mb-4">
                Solo para administradores
              </p>
              <div className="mt-auto">
                <p className="text-amber-300 font-semibold flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Acceso Admin
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Register Section */}
      <div className="w-full max-w-2xl bg-slate-800/50 rounded-lg p-8 border border-slate-600">
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          ¿No tienes cuenta?
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/client/register"
            className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition"
          >
            <UserPlus className="w-5 h-5" />
            Registro Cliente
          </Link>
          
          <Link
            href="/admin/register"
            className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition"
          >
            <Shield className="w-5 h-5" />
            Registro Admin
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-slate-400 text-sm">
        <p>
          <span className="inline-block w-1 h-1 bg-primary-400 rounded-full mx-2"></span>
          Selecciona tu tipo de acceso para continuar
          <span className="inline-block w-1 h-1 bg-primary-400 rounded-full mx-2"></span>
        </p>
      </div>
    </div>
  )
}

