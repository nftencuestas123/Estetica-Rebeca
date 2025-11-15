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
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: goldenPalette,
        secondary: goldenPalette,
        accent: accentPalette,
        rose: goldenPalette,
        gold: goldenPalette,
        cream: creamPalette,
        neutral: creamPalette,
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
