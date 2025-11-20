/**
 * Componente de imagen optimizado con carga ultra-rápida
 * - Blur placeholder automático
 * - Lazy loading inteligente
 * - Compresión agresiva
 */

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
  fill?: boolean
  width?: number
  height?: number
  quality?: number
  sizes?: string
}

// Placeholder blur genérico (1x1 pixel gris claro)
const BLUR_DATA_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4='

export default function OptimizedImage({
  src,
  alt,
  priority = false,
  className = '',
  fill = false,
  width,
  height,
  quality = 75,
  sizes = '100vw'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        sizes={sizes}
        onLoadingComplete={() => setIsLoading(false)}
        loading={priority ? 'eager' : 'lazy'}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      )}
    </div>
  )
}
