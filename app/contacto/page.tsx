import Navbar from '@/components/Navbar'
import ChatSofia from '@/components/ChatSofia'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary-100 mb-4">
            Contactanos
          </h1>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            Estamos acá para ayudarte. Contactanos de la forma que prefieras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-cream-50 rounded-lg shadow-lg p-8">
            <MapPin className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-primary-100 mb-4">
              Ubicación
            </h3>
            <p className="text-primary-300">
              Av. Principal, Ciudad del Este<br />
              Paraguay
            </p>
          </div>

          <div className="bg-cream-50 rounded-lg shadow-lg p-8">
            <Phone className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-primary-100 mb-4">
              Teléfono
            </h3>
            <p className="text-primary-300">
              +595 987 123 456<br />
              +595 212 123 456
            </p>
          </div>

          <div className="bg-cream-50 rounded-lg shadow-lg p-8">
            <Mail className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-primary-100 mb-4">
              Email
            </h3>
            <p className="text-primary-300">
              info@rebecabarreto.com<br />
              consultas@rebecabarreto.com
            </p>
          </div>

          <div className="bg-cream-50 rounded-lg shadow-lg p-8">
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-primary-100 mb-4">
              Horarios
            </h3>
            <p className="text-primary-300">
              Lunes - Sábado: 9:00 - 18:00<br />
              Domingo: Cerrado
            </p>
          </div>
        </div>

        <div className="bg-cream-50 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-primary-100 mb-4">
            ¿Tenés alguna pregunta?
          </h2>
          <p className="text-primary-300 mb-6">
            Hablá con Sofía, nuestra asistente virtual, o contactanos directamente.
            Estamos acá para ayudarte en cada paso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/595987123456"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-center"
            >
              WhatsApp
            </a>
            <a
              href="tel:+595212123456"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
            >
              Llamar Ahora
            </a>
          </div>
        </div>
      </div>
      <ChatSofia />
    </div>
  )
}








