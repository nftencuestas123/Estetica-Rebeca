'use client'

import { LOGO_SIZES, COLOR_SCHEMES } from './logo/logoConfig'
import LogoIcon from './logo/LogoIcon'
import LogoText from './logo/LogoText'

interface LogoProps {
  variant?: 'default' | 'white' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  animated?: boolean
  className?: string
}

export default function Logo({ 
  variant = 'default', 
  size = 'md', 
  showText = true,
  animated = true,
  className = '' 
}: LogoProps) {
  const currentSize = LOGO_SIZES[size]
  const colors = COLOR_SCHEMES[variant]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon size={currentSize.icon} colors={colors} animated={animated} />
      {showText && (
        <LogoText 
          currentSize={currentSize} 
          size={size} 
          textColor={colors.text} 
          animated={animated} 
        />
      )}
    </div>
  )
}

