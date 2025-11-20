/**
 * Servicio de efecto de escritura
 * Responsabilidad: Simular escritura humana con errores y correcciones
 */

import { TYPING_SPEED, TYPO_PROBABILITY, CORRECTION_DELAY } from '@/constants/agents.constants'

export class TypingService {
  /**
   * Simula escritura de texto con posibles errores
   */
  static async typeText(
    text: string,
    onUpdate: (displayedText: string, hasTypo: boolean, typoChar?: string) => void,
    onComplete: () => void
  ): Promise<void> {
    let currentText = ''
    const words = text.split(' ')

    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      const shouldAddTypo = Math.random() < TYPO_PROBABILITY && word.length > 3

      // Escribir palabra carácter por carácter
      for (let j = 0; j < word.length; j++) {
        const char = word[j]

        // Simular error de tipeo
        if (shouldAddTypo && j === Math.floor(word.length / 2)) {
          const wrongChar = this.getRandomChar()
          currentText += wrongChar
          onUpdate(currentText, true, wrongChar)

          // Esperar antes de corregir
          await this.delay(CORRECTION_DELAY)

          // Borrar carácter incorrecto
          currentText = currentText.slice(0, -1)
          onUpdate(currentText, false)

          await this.delay(TYPING_SPEED)
        }

        // Escribir carácter correcto
        currentText += char
        onUpdate(currentText, false)
        await this.delay(TYPING_SPEED)
      }

      // Agregar espacio entre palabras (excepto última)
      if (i < words.length - 1) {
        currentText += ' '
        onUpdate(currentText, false)
        await this.delay(TYPING_SPEED)
      }
    }

    onComplete()
  }

  /**
   * Genera un carácter aleatorio para simular error
   */
  private static getRandomChar(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz'
    return chars[Math.floor(Math.random() * chars.length)]
  }

  /**
   * Delay helper
   */
  private static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

