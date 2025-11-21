/**
 * Servidor personalizado para Next.js
 * Usa la variable de entorno PORT que Railway asigna automáticamente
 * Si no está definida, usa el puerto 3000 por defecto (desarrollo)
 */

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0' // Siempre escuchar en todas las interfaces para Railway
// Railway asigna automáticamente el puerto a través de la variable PORT
// Si no está definida (desarrollo local), usa 3000
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ 
  dev,
  hostname,
  port,
  // Asegurar que Next.js sepa que está en producción cuando corresponde
  dir: process.cwd()
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  server.listen(port, hostname, (err) => {
    if (err) {
      console.error('Error starting server:', err)
      process.exit(1)
    }
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`> Port: ${port}`)
    console.log(`> Health check available at: http://${hostname}:${port}/api/health`)
  })

  // Manejar errores del servidor
  server.on('error', (err) => {
    console.error('Server error:', err)
    process.exit(1)
  })
}).catch((err) => {
  console.error('Error preparing Next.js app:', err)
  process.exit(1)
})

