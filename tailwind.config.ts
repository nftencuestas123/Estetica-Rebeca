import type { Config } from 'tailwindcss'

const goldenPalette = {
  50: '#FFF9EC',
  100: '#FEF0D3',
  200: '#F8E1AD',
  300: '#F0CF87',
  400: '#E1B966',
  500: '#C9A347',
  600: '#A78139',
  700: '#856129',
  800: '#5F441B',
  900: '#3A290F',
  950: '#1D1406',
  DEFAULT: '#C9A347',
}

const creamPalette = {
  50: '#F7E6C4',
  100: '#F3D8A4',
  200: '#EFCB87',
  300: '#EABD69',
  400: '#E5AF4C',
  500: '#D79C38',
  600: '#B97E2C',
  700: '#935F20',
  800: '#6C4214',
  900: '#44280C',
  950: '#241405',
  DEFAULT: '#F3D8A4',
}

const accentPalette = {
  50: '#FFF9F0',
  100: '#FEEFD7',
  200: '#FBE1B2',
  300: '#F4CE8A',
  400: '#E9B55E',
  500: '#D39A40',
  600: '#B37733',
  700: '#8D5826',
  800: '#633B1A',
  900: '#3D230F',
  950: '#1F1107',
  DEFAULT: '#D39A40',
}

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
        secondary: {
          50: '#FFF8EC',
          100: '#FDEFD2',
          200: '#F7E0AB',
          300: '#ECC580',
          400: '#DDA65B',
          500: '#C48739',
          600: '#A0682D',
          700: '#7D4D22',
          800: '#593417',
          900: '#361E0E',
          950: '#1B0F07',
        },
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
