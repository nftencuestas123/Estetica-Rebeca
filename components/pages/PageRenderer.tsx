/**
 * =====================================================
 * PAGE RENDERER
 * Mapea template_key a componentes React
 * =====================================================
 */

import React from 'react'

// Landing Pages
import EleganceGoldLanding from './landing/EleganceGoldLanding'
import MinimalChicLanding from './landing/MinimalChicLanding'
import ModernGlamLanding from './landing/ModernGlamLanding'
import SoftBeautyLanding from './landing/SoftBeautyLanding'
import BoldImpactLanding from './landing/BoldImpactLanding'

// Capture Pages
import LeadFormClassic from './capture/LeadFormClassic'
import PromoCaptureForm from './capture/PromoCaptureForm'
import NewsletterSignup from './capture/NewsletterSignup'

// Mapa de template_key a componentes
const PAGE_COMPONENTS: Record<string, React.ComponentType> = {
  // Landing Pages
  EleganceGoldLanding,
  MinimalChicLanding,
  ModernGlamLanding,
  SoftBeautyLanding,
  BoldImpactLanding,
  
  // Capture Pages
  LeadFormClassic,
  PromoCaptureForm,
  NewsletterSignup,
}

interface PageRendererProps {
  templateKey: string
}

/**
 * Renderiza dinámicamente la página según el template_key
 */
export default function PageRenderer({ templateKey }: PageRendererProps) {
  const PageComponent = PAGE_COMPONENTS[templateKey]

  if (!PageComponent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-400">Error 404</h1>
          <p className="text-white/70 mb-2">Página no encontrada</p>
          <p className="text-sm text-white/50">Template: {templateKey}</p>
        </div>
      </div>
    )
  }

  return <PageComponent />
}

