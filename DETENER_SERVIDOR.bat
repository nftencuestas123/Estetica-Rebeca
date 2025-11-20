@echo off
chcp 65001 >nul
cls
echo =====================================
echo   🛑 DETENIENDO SERVIDOR
echo =====================================
echo.

cd /d "%~dp0"

echo ⏳ Deteniendo servidor...
echo.

pm2 stop estetica-rebeca

echo.
echo =====================================
echo   ✅ SERVIDOR DETENIDO
echo =====================================
echo.
echo 💡 Para iniciarlo de nuevo, ejecuta: INICIAR_SERVIDOR.bat
echo.

pause

