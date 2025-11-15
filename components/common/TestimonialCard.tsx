/**
 * Componente de tarjeta de testimonio
 * Responsabilidad: Renderizar testimonio de cliente
 */

'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

interface TestimonialCardProps {
  name: string
  treatment: string
  testimonial: string
  rating: number
  image?: string
  index?: number
}

export function TestimonialCard({
  name,
  treatment,
  testimonial,
  rating,
  image,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-cream-100/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary-200/50 shadow-lg hover:shadow-2xl transition-all"
    >
      {/* Quote icon */}
      <div className="mb-4">
        <Quote className="w-8 h-8 text-white opacity-50" />
      </div>

      {/* Testimonial */}
      <p className="text-white leading-relaxed mb-6 italic">"{testimonial}"</p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-primary-400 fill-primary-400' : 'text-white'
            }`}
          />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        {image && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-200">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
        )}
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-white">{treatment}</p>
        </div>
      </div>
    </motion.div>
  )
}

