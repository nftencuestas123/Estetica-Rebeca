import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Rebeca Barreto Estética y Belleza | Tu Belleza Auténtica, Elevada',
  description: 'Centro de estética y belleza en Ciudad del Este, Paraguay. Tratamientos personalizados con tecnología avanzada y atención premium.',
  keywords: 'estética, belleza, Paraguay, Ciudad del Este, tratamientos faciales, botox, rellenos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-PY" className={inter.variable}>
      <body>
        <Providers>
          <ScrollToTop />
          {children}
        </Providers>
      </body>
    </html>
  )
}

