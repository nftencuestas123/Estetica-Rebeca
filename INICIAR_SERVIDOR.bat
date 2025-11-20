@echo off
chcp 65001 >nul
cls
echo =====================================
echo   🚀 INICIANDO SERVIDOR PERSISTENTE
echo =====================================
echo.
echo 📍 Proyecto: Estética Rebeca
echo 🌐 URL: http://localhost:3000
echo.

cd /d "%~dp0"

echo ⏳ Iniciando servidor con PM2...
echo.

pm2 start ecosystem.config.js

echo.
echo =====================================
echo   ✅ SERVIDOR INICIADO CORRECTAMENTE
echo =====================================
echo.
echo 📋 COMANDOS ÚTILES:
echo    • Ver estado:     pm2 status
echo    • Ver logs:       pm2 logs
echo    • Reiniciar:      pm2 restart estetica-rebeca
echo    • Detener:        pm2 stop estetica-rebeca
echo.
echo 🌐 Servidor corriendo en: http://localhost:3000
echo.
echo 💡 El servidor seguirá corriendo incluso si cierras esta ventana
echo.

pause

