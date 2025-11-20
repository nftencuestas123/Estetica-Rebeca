@echo off
chcp 65001 >nul
cls
echo =====================================
echo   📊 ESTADO DEL SERVIDOR
echo =====================================
echo.

cd /d "%~dp0"

pm2 status

echo.
echo =====================================
echo   📋 INFORMACIÓN DETALLADA
echo =====================================
echo.

pm2 info estetica-rebeca

echo.
echo 💡 Para ver logs en tiempo real: pm2 logs estetica-rebeca
echo.

pause

