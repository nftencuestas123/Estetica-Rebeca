/**
 * =====================================================
 * SERVICIO DE GESTI├ôN DE P├üGINAS
 * Maneja landing pages y capture pages
 * =====================================================
 */

import { supabase } from '@/lib/supabase'

// =====================================================
// TIPOS E INTERFACES
// =====================================================

export interface Page {
  id: string
  name: string
  display_name: string
  description: string | null
  type: 'landing' | 'capture'
  is_active: boolean
  is_root: boolean
  template_key: string
  preview_image: string | null
  tags: string[]
  color_scheme: string | null
  views: number
  conversions: number
  created_at: string
  updated_at: string
}

export interface PageStats {
  totalPages: number
  activeLanding: number
  activeCapture: number
  totalViews: number
  totalConversions: number
  rootPage: Page | null
}

// =====================================================
// FUNCIONES PRINCIPALES
// =====================================================

/**
 * Obtener todas las p├íginas
 */
export async function getAllPages(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error al cargar p├íginas:', error)
    throw new Error('No se pudieron cargar las p├íginas')
  }

  return data || []
}

/**
 * Obtener solo landing pages activas
 */
export async function getActiveLandingPages(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('type', 'landing')
    .eq('is_active', true)
    .order('display_name', { ascending: true })

  if (error) {
    console.error('Error al cargar landing pages:', error)
    throw new Error('No se pudieron cargar las landing pages')
  }

  return data || []
}

/**
 * Obtener solo capture pages activas
 */
export async function getActiveCapturePages(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('type', 'capture')
    .eq('is_active', true)
    .order('display_name', { ascending: true })

  if (error) {
    console.error('Error al cargar capture pages:', error)
    throw new Error('No se pudieron cargar las capture pages')
  }

  return data || []
}

/**
 * Obtener la p├ígina root activa (la que se muestra en /)
 */
export async function getRootPage(): Promise<Page | null> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('type', 'landing')
    .eq('is_root', true)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error al cargar p├ígina root:', error)
    return null
  }

  return data
}

/**
 * Establecer una p├ígina como root (p├ígina principal)
 */
export async function setRootPage(pageId: string): Promise<void> {
  // El trigger en la BD se encargar├í de desactivar las dem├ís
  const { error } = await supabase
    .from('pages')
    .update({ is_root: true })
    .eq('id', pageId)

  if (error) {
    console.error('Error al establecer p├ígina root:', error)
    throw new Error('No se pudo establecer la p├ígina como principal')
  }
}

/**
 * Activar/desactivar una p├ígina
 */
export async function togglePageActive(pageId: string, isActive: boolean): Promise<void> {
  const { error } = await supabase
    .from('pages')
    .update({ is_active: isActive })
    .eq('id', pageId)

  if (error) {
    console.error('Error al cambiar estado de p├ígina:', error)
    throw new Error('No se pudo cambiar el estado de la p├ígina')
  }
}

/**
 * Incrementar vistas de una p├ígina
 */
export async function incrementPageViews(pageId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_page_views', {
    page_id: pageId,
  })

  if (error) {
    console.error('Error al incrementar vistas:', error)
    // No lanzar error para no afectar la UX
  }
}

/**
 * Incrementar conversiones de una capture page
 */
export async function incrementPageConversions(pageId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_page_conversions', {
    page_id: pageId,
  })

  if (error) {
    console.error('Error al incrementar conversiones:', error)
    // No lanzar error para no afectar la UX
  }
}

/**
 * Obtener estad├¡sticas generales de p├íginas
 */
export async function getPagesStats(): Promise<PageStats> {
  const pages = await getAllPages()
  const rootPage = await getRootPage()

  const totalViews = pages.reduce((sum, p) => sum + p.views, 0)
  const totalConversions = pages.reduce((sum, p) => sum + p.conversions, 0)

  return {
    totalPages: pages.length,
    activeLanding: pages.filter(p => p.type === 'landing' && p.is_active).length,
    activeCapture: pages.filter(p => p.type === 'capture' && p.is_active).length,
    totalViews,
    totalConversions,
    rootPage,
  }
}

/**
 * Obtener una p├ígina por su ID
 */
export async function getPageById(pageId: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('id', pageId)
    .single()

  if (error) {
    console.error('Error al cargar p├ígina:', error)
    return null
  }

  return data
}

/**
 * Obtener una p├ígina por su template_key
 */
export async function getPageByTemplateKey(templateKey: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('template_key', templateKey)
    .single()

  if (error) {
    console.error('Error al cargar p├ígina:', error)
    return null
  }

  return data
}

