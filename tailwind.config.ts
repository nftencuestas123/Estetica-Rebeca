import type { Config } from 'tailwindcss'

const goldenPalette = {
  50: '#FFF8E7',
  100: '#FFECC0',
  200: '#FFE09A',
  300: '#FFD26E',
  400: '#FFC342',
  500: '#FFB31A',
  600: '#E59D0F',
  700: '#C1800A',
  800: '#8F5D06',
  900: '#5E3B03',
  950: '#2F1D01',
  DEFAULT: '#FFB31A',
}

const creamPalette = {
  50: '#121212',
  100: '#161616',
  200: '#1A1A1A',
  300: '#1F1F1F',
  400: '#232323',
  500: '#262626',
  600: '#2B2B2B',
  700: '#303030',
  800: '#363636',
  900: '#3C3C3C',
  950: '#0B0B0B',
  DEFAULT: '#121212',
}

const accentPalette = goldenPalette

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores legacy (mantener compatibilidad)
        primary: goldenPalette,
        secondary: goldenPalette,
        accent: accentPalette,
        rose: goldenPalette,
        gold: goldenPalette,
        cream: creamPalette,
        neutral: creamPalette,
        
        // Nuevo sistema de variables CSS
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        '2xs': 'var(--shadow-2xs)',
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      spacing: {
        unit: 'var(--spacing)',
      },
    },
  },
  plugins: [],
}

export default config
