/**
 * TopView Avatar 4 API Integration
 * 
 * Documentación oficial: https://www.topview.ai/es/make/avatar4
 * Contacto para API: official@topview.ai
 * 
 * Este servicio maneja la integración con TopView Avatar 4 para generar videos con avatares IA
 */

// Tipos de datos
export interface TopViewConfig {
  apiKey: string
  apiUrl?: string
}

export interface AvatarVideoRequest {
  // Imagen del avatar (base64 o URL)
  avatarImage: string | File
  // Guión del video
  script: string
  // Configuración de voz
  voice?: {
    type: 'text-to-speech' | 'clone' | 'custom'
    voiceId?: string // ID de voz de la biblioteca
    audioFile?: File // Archivo de audio personalizado
  }
  // Configuración adicional
  duration?: number // Duración máxima en segundos
  resolution?: '720p' | '1080p' | '4k'
  format?: 'mp4' | 'mov'
}

export interface AvatarVideoResponse {
  jobId: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  videoUrl?: string
  thumbnailUrl?: string
  duration?: number
  message?: string
}

class TopViewService {
  private config: TopViewConfig
  private baseUrl: string

  constructor(config: TopViewConfig) {
    this.config = config
    this.baseUrl = config.apiUrl || 'https://api.topview.ai/v1' // URL ejemplo, verificar con documentación oficial
  }

  /**
   * Convierte una imagen a base64
   */
  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  /**
   * Crea un nuevo video con avatar IA
   */
  async createAvatarVideo(request: AvatarVideoRequest): Promise<AvatarVideoResponse> {
    try {
      // Convertir imagen a base64 si es un File
      let avatarImageData = request.avatarImage
      if (request.avatarImage instanceof File) {
        avatarImageData = await this.fileToBase64(request.avatarImage)
      }

      // Preparar el payload para la API
      const payload = {
        avatar_image: avatarImageData,
        script: request.script,
        voice: request.voice || {
          type: 'text-to-speech',
          voice_id: 'es-ES-Female-1'
        },
        settings: {
          duration: request.duration || 120,
          resolution: request.resolution || '1080p',
          format: request.format || 'mp4'
        }
      }

      // NOTA: Esta es una implementación de ejemplo
      // Debes reemplazar esto con la llamada real a la API de TopView
      // una vez que tengas las credenciales y la documentación oficial

      const response = await fetch(`${this.baseUrl}/avatar/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        jobId: data.job_id || data.id,
        status: data.status || 'pending',
        videoUrl: data.video_url,
        thumbnailUrl: data.thumbnail_url,
        duration: data.duration,
        message: data.message
      }
    } catch (error) {
      console.error('Error creating avatar video:', error)
      throw error
    }
  }

  /**
   * Consulta el estado de un video en generación
   */
  async getVideoStatus(jobId: string): Promise<AvatarVideoResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/avatar/status/${jobId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        }
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`)
      }

      const data = await response.json()

      return {
        jobId: data.job_id || data.id,
        status: data.status,
        videoUrl: data.video_url,
        thumbnailUrl: data.thumbnail_url,
        duration: data.duration,
        message: data.message
      }
    } catch (error) {
      console.error('Error getting video status:', error)
      throw error
    }
  }

  /**
   * Descarga un video completado
   */
  async downloadVideo(videoUrl: string): Promise<Blob> {
    try {
      const response = await fetch(videoUrl)
      
      if (!response.ok) {
        throw new Error(`Download Error: ${response.statusText}`)
      }

      return await response.blob()
    } catch (error) {
      console.error('Error downloading video:', error)
      throw error
    }
  }

  /**
   * Lista de voces disponibles
   */
  async getAvailableVoices(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        }
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.voices || []
    } catch (error) {
      console.error('Error fetching voices:', error)
      // Retornar voces por defecto en caso de error
      return [
        { id: 'es-ES-Female-1', name: 'Español - Mujer 1 (Natural)', language: 'es-ES' },
        { id: 'es-ES-Female-2', name: 'Español - Mujer 2 (Energética)', language: 'es-ES' },
        { id: 'es-ES-Male-1', name: 'Español - Hombre 1 (Profesional)', language: 'es-ES' },
      ]
    }
  }
}

// Instancia singleton del servicio
let topViewService: TopViewService | null = null

/**
 * Obtiene la instancia del servicio TopView
 * Requiere NEXT_PUBLIC_TOPVIEW_API_KEY en el .env
 */
export function getTopViewService(): TopViewService {
  if (!topViewService) {
    const apiKey = process.env.NEXT_PUBLIC_TOPVIEW_API_KEY || ''
    
    if (!apiKey) {
      console.warn('TopView API key not configured. Set NEXT_PUBLIC_TOPVIEW_API_KEY in .env.local')
    }

    topViewService = new TopViewService({
      apiKey,
      apiUrl: process.env.NEXT_PUBLIC_TOPVIEW_API_URL
    })
  }

  return topViewService
}

export default TopViewService

// Helper functions para usar directamente
export async function generateVideo(imageFile: File, script: string, voiceId: string) {
  const service = getTopViewService()
  return await service.createAvatarVideo({
    avatarImage: imageFile,
    script,
    voice: {
      type: 'text-to-speech',
      voiceId,
    },
  })
}

export async function getVideoStatus(jobId: string) {
  const service = getTopViewService()
  return await service.getVideoStatus(jobId)
}

export async function getVoices() {
  const service = getTopViewService()
  return await service.getAvailableVoices()
}

