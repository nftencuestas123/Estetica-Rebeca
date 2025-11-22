import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ScrollToTop from '@/components/ScrollToTop'
import ElevenLabsWidget from '@/components/ElevenLabsWidget'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Rebeca Barreto Estética y Belleza | Tu Belleza Auténtica, Elevada',
  description: 'Centro de estética y belleza en Ciudad del Este, Paraguay. Tratamientos personalizados con tecnología avanzada y atención premium.',
  keywords: 'estética, belleza, Paraguay, Ciudad del Este, tratamientos faciales, botox, rellenos',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rebeca Barreto',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#D4AF37',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-PY" className={inter.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rebeca Barreto" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="touch-manipulation">
        <Providers>
          <ScrollToTop />
          {children}
          {/* Widget de ElevenLabs - Aparece en todas las pantallas según PRD */}
          <ElevenLabsWidget 
            agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}
            apiKey={process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY}
          />
        </Providers>
      </body>
    </html>
  )
}

