/**
 * PM2 ECOSYSTEM CONFIGURATION
 * Gestión profesional de procesos para Next.js
 */

module.exports = {
  apps: [
    {
      // Nombre de la aplicación
      name: 'estetica-rebeca',
      
      // Script a ejecutar
      script: 'node_modules/next/dist/bin/next',
      args: 'dev',
      
      // Directorio de trabajo
      cwd: './',
      
      // Variables de entorno
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      
      // Reinicio automático
      watch: false,
      autorestart: true,
      
      // Reintentos si falla
      max_restarts: 10,
      min_uptime: '10s',
      
      // Logs
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Reinicio automático si usa mucha memoria
      max_memory_restart: '500M',
      
      // Modo de ejecución
      exec_mode: 'fork',
      instances: 1,
    },
  ],
}

