import Navbar from '@/components/Navbar'
import ChatSofia from '@/components/ChatSofia'
import { MapPin, Phone, Clock } from 'lucide-react'

export default function SedesPage() {
  const sedes = [
    {
      nombre: 'Sede Principal - Ciudad del Este',
      direccion: 'Av. Principal, Ciudad del Este',
      telefono: '+595 987 123 456',
      horario: 'Lunes - Sábado: 9:00 - 18:00',
    },
  ]

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary-100 mb-4">
            Nuestras Sedes
          </h1>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            Encontrá la sede más cercana a vos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sedes.map((sede, index) => (
            <div key={index} className="bg-cream-50 rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <MapPin className="w-16 h-16 text-primary opacity-50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-100 mb-4">
                  {sede.nombre}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <p className="text-primary-300">{sede.direccion}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <p className="text-primary-300">{sede.telefono}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <p className="text-primary-300">{sede.horario}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(sede.direccion)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Ver en Mapa
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatSofia />
    </div>
  )
}








