@echo off
chcp 65001 >nul
cls
echo =====================================
echo   🔄 REINICIANDO SERVIDOR
echo =====================================
echo.

cd /d "%~dp0"

echo ⏳ Reiniciando servidor...
echo.

pm2 restart estetica-rebeca

echo.
echo =====================================
echo   ✅ SERVIDOR REINICIADO
echo =====================================
echo.
echo 🌐 Servidor corriendo en: http://localhost:3000
echo.

pause

