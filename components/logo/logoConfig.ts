export interface LogoSize {
  icon: number
  text: string
}

export interface ColorScheme {
  primary: string
  secondary: string
  accent: string
  text: string
}

export const LOGO_SIZES: Record<'sm' | 'md' | 'lg' | 'xl', LogoSize> = {
  sm: { icon: 32, text: 'text-sm' },
  md: { icon: 40, text: 'text-base' },
  lg: { icon: 56, text: 'text-xl' },
  xl: { icon: 80, text: 'text-3xl' }
}

export const COLOR_SCHEMES: Record<'default' | 'white' | 'gradient', ColorScheme> = {
  default: {
    primary: '#C9A347',
    secondary: '#D4AF37',
    accent: '#F0E68C',
    text: '#FFFFFF'
  },
  white: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    accent: '#E0E0E0',
    text: '#FFFFFF'
  },
  gradient: {
    primary: 'url(#logoGradient)',
    secondary: 'url(#logoGradient)',
    accent: 'url(#logoGradient)',
    text: '#FFFFFF'
  }
}

export function getTextFontSize(size: 'sm' | 'md' | 'lg' | 'xl'): string {
  const sizes = {
    xl: '0.9rem',
    lg: '0.75rem',
    md: '0.65rem',
    sm: '0.55rem'
  }
  return sizes[size]
}

