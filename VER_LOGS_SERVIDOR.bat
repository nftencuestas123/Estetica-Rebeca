@echo off
chcp 65001 >nul
cls
echo =====================================
echo   📋 LOGS DEL SERVIDOR
echo =====================================
echo.
echo 💡 Presiona Ctrl+C para salir
echo.
echo =====================================
echo.

cd /d "%~dp0"

pm2 logs estetica-rebeca

