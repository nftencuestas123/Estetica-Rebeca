import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B9D', // Rosa vibrante
          light: '#FFB3D1',
          dark: '#E91E63',
        },
        secondary: {
          DEFAULT: '#FFD700', // Dorado brillante
          light: '#FFE55C',
          dark: '#FFA500',
        },
        accent: {
          DEFAULT: '#C77DFF', // Púrpura suave
          light: '#E0BBFF',
          dark: '#9D4EDD',
        },
        rose: {
          DEFAULT: '#FF1493', // Rosa profundo
          light: '#FF69B4',
          dark: '#C71585',
        },
        gold: {
          DEFAULT: '#FFD700', // Oro
          light: '#FFE55C',
          dark: '#FFA500',
        },
        neutral: {
          DEFAULT: '#F5F5F0',
          light: '#FAFAF8',
          dark: '#E0E0D8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

