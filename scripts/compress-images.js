#!/usr/bin/env node

/**
 * Script para comprimir imágenes pesadas
 * Reduce de ~1.3MB a ~100-150KB por imagen
 * Mantiene calidad visual aceptable
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const PUBLIC_DIR = path.join(__dirname, '../public/images')
const QUALITY = 80 // Calidad JPEG (80 es buen balance)
const MAX_WIDTH = 1200 // Ancho máximo en pixels

async function compressImage(filePath) {
    try {
        const ext = path.extname(filePath).toLowerCase()

        // Solo procesar JPG y PNG
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
            return
        }

        const stats = fs.statSync(filePath)
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2)

        // Solo comprimir si es mayor a 300KB
        if (stats.size < 300 * 1024) {
            console.log(`⏭️  Saltando ${path.basename(filePath)} (${sizeMB}MB - ya optimizado)`)
            return
        }

        console.log(`🔄 Comprimiendo ${path.basename(filePath)} (${sizeMB}MB)...`)

        // Crear backup
        const backupPath = filePath + '.backup'
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(filePath, backupPath)
        }

        // Comprimir
        const image = sharp(filePath)
        const metadata = await image.metadata()

        await image
            .resize(MAX_WIDTH, null, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({
                quality: QUALITY,
                progressive: true,
                mozjpeg: true
            })
            .toFile(filePath + '.tmp')

        // Reemplazar original
        fs.renameSync(filePath + '.tmp', filePath)

        const newStats = fs.statSync(filePath)
        const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2)
        const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1)

        console.log(`✅ ${path.basename(filePath)}: ${sizeMB}MB → ${newSizeMB}MB (${reduction}% reducción)`)

    } catch (error) {
        console.error(`❌ Error comprimiendo ${filePath}:`, error.message)
    }
}

async function compressDirectory(dir) {
    const files = fs.readdirSync(dir)

    for (const file of files) {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            await compressDirectory(filePath)
        } else {
            await compressImage(filePath)
        }
    }
}

async function main() {
    console.log('🚀 Iniciando compresión de imágenes...\n')
    console.log(`📁 Directorio: ${PUBLIC_DIR}`)
    console.log(`⚙️  Configuración: Calidad=${QUALITY}, MaxWidth=${MAX_WIDTH}px\n`)

    await compressDirectory(PUBLIC_DIR)

    console.log('\n✨ ¡Compresión completada!')
    console.log('💡 Los archivos originales están guardados como .backup')
}

main().catch(console.error)
