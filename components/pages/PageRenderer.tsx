/**
 * =====================================================
 * PAGE RENDERER
 * Mapea template_key a componentes React
 * =====================================================
 */

import React from 'react'

// Landing Pages - Originales
import EleganceGoldLanding from './landing/EleganceGoldLanding'
import MinimalChicLanding from './landing/MinimalChicLanding'
import ModernGlamLanding from './landing/ModernGlamLanding'
import SoftBeautyLanding from './landing/SoftBeautyLanding'
import BoldImpactLanding from './landing/BoldImpactLanding'

// Landing Pages - Nude Collection (20 designs)
import NudeLanding01 from './landing/NudeLanding01'
import NudeLanding02 from './landing/NudeLanding02'
import NudeLanding03 from './landing/NudeLanding03'
import NudeLanding04 from './landing/NudeLanding04'
import NudeLanding05 from './landing/NudeLanding05'
import NudeLanding06 from './landing/NudeLanding06'
import NudeLanding07 from './landing/NudeLanding07'
import NudeLanding08 from './landing/NudeLanding08'
import NudeLanding09 from './landing/NudeLanding09'
import NudeLanding10 from './landing/NudeLanding10'
import NudeLanding11 from './landing/NudeLanding11'
import NudeLanding12 from './landing/NudeLanding12'
import NudeLanding13 from './landing/NudeLanding13'
import NudeLanding14 from './landing/NudeLanding14'
import NudeLanding15 from './landing/NudeLanding15'
import NudeLanding16 from './landing/NudeLanding16'
import NudeLanding17 from './landing/NudeLanding17'
import NudeLanding18 from './landing/NudeLanding18'
import NudeLanding19 from './landing/NudeLanding19'
import NudeLanding20 from './landing/NudeLanding20'

// Capture Pages
import LeadFormClassic from './capture/LeadFormClassic'
import PromoCaptureForm from './capture/PromoCaptureForm'
import NewsletterSignup from './capture/NewsletterSignup'

// Mapa de template_key a componentes
const PAGE_COMPONENTS: Record<string, React.ComponentType> = {
  // Landing Pages - Originales
  EleganceGoldLanding,
  MinimalChicLanding,
  ModernGlamLanding,
  SoftBeautyLanding,
  BoldImpactLanding,
  
  // Landing Pages - Nude Collection
  NudeLanding01,
  NudeLanding02,
  NudeLanding03,
  NudeLanding04,
  NudeLanding05,
  NudeLanding06,
  NudeLanding07,
  NudeLanding08,
  NudeLanding09,
  NudeLanding10,
  NudeLanding11,
  NudeLanding12,
  NudeLanding13,
  NudeLanding14,
  NudeLanding15,
  NudeLanding16,
  NudeLanding17,
  NudeLanding18,
  NudeLanding19,
  NudeLanding20,
  
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

