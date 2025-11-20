/**
 * Componente: Indicador de Pasos
 * Responsabilidad: Mostrar progreso del flujo
 */

import { Video, FileText, Send } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, title: 'Video', icon: Video },
    { number: 2, title: 'Copy', icon: FileText },
    { number: 3, title: 'Publicar', icon: Send },
  ]

  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div
            className={`flex flex-col items-center ${
              currentStep >= step.number ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= step.number
                  ? 'bg-primary text-white'
                  : 'bg-gray-200'
              }`}
            >
              <step.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium">{step.title}</span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`w-24 h-1 mx-4 ${
                currentStep > step.number ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

