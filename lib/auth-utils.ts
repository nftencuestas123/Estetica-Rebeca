/**
 * UTILIDADES DE AUTENTICACIÓN
 * Sistema de autenticación propio sin Supabase Auth
 */

import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// =====================================================
// TIPOS
// =====================================================

export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'client'
  fullName: string
  phone?: string
  isActive: boolean
  isVerified: boolean
}

export interface JWTPayload {
  userId: string
  email: string
  role: 'admin' | 'client'
  iat: number
  exp: number
}

// =====================================================
// CONFIGURACIÓN
// =====================================================

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tu-super-secreto-muy-largo-y-seguro-cambiar-en-produccion-2024'
)

const JWT_EXPIRES_IN = '7d' // 7 días
const COOKIE_NAME = 'auth-token' // CORREGIDO: debe coincidir con middleware
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 días en segundos

// =====================================================
// HASH DE CONTRASEÑAS
// =====================================================

/**
 * Hashea una contraseña con bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

/**
 * Verifica una contraseña contra su hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// =====================================================
// JWT - JSON WEB TOKENS
// =====================================================

/**
 * Crea un JWT token para un usuario
 */
export async function createJWT(user: AuthUser): Promise<string> {
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    userId: user.id,
    email: user.email,
    role: user.role,
  }

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET)

  return token
}

/**
 * Verifica y decodifica un JWT token
 */
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    const payload = verified.payload as unknown as JWTPayload
    return payload
  } catch (error) {
    return null
  }
}

// =====================================================
// COOKIES
// =====================================================

/**
 * Guarda el token en una cookie HttpOnly
 */
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

/**
 * Obtiene el token de la cookie
 */
export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  return cookie?.value || null
}

/**
 * Elimina la cookie de autenticación
 */
export async function deleteAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

// =====================================================
// USUARIO ACTUAL
// =====================================================

/**
 * Obtiene el usuario autenticado actual desde la cookie
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getAuthCookie()
  if (!token) return null

  const payload = await verifyJWT(token)
  return payload
}

/**
 * Verifica si el usuario está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

/**
 * Verifica si el usuario es admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

/**
 * Requiere autenticación - lanza error si no está autenticado
 */
export async function requireAuth(): Promise<JWTPayload> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('No autenticado')
  }
  return user
}

/**
 * Requiere rol admin - lanza error si no es admin
 */
export async function requireAdmin(): Promise<JWTPayload> {
  const user = await requireAuth()
  if (user.role !== 'admin') {
    throw new Error('Acceso denegado - Solo administradores')
  }
  return user
}

// =====================================================
// GENERACIÓN DE TOKENS
// =====================================================

/**
 * Genera un token aleatorio para reset de contraseña
 */
export function generateResetToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
    ''
  )
}

/**
 * Genera un token de verificación
 */
export function generateVerificationToken(): string {
  return generateResetToken()
}

// =====================================================
// VALIDACIONES
// =====================================================

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida contraseña segura
 */
export function isStrongPassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Debe tener al menos 8 caracteres')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una minúscula')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una mayúscula')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Debe contener al menos un número')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// =====================================================
// SANITIZACIÓN
// =====================================================

/**
 * Sanitiza un email
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

/**
 * Sanitiza un nombre
 */
export function sanitizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ')
}

