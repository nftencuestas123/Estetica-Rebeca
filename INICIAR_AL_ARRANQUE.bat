@echo off
chcp 65001 >nul
cls
echo =====================================
echo   ⚙️ CONFIGURAR INICIO AUTOMÁTICO
echo =====================================
echo.
echo Esta opción hará que el servidor se inicie
echo automáticamente al encender tu computadora
echo.
echo ⚠️ IMPORTANTE: Ejecuta este archivo como Administrador
echo.

cd /d "%~dp0"

echo ⏳ Configurando PM2 para inicio automático...
echo.

pm2 startup

echo.
echo =====================================
echo   📋 INSTRUCCIONES
echo =====================================
echo.
echo 1. PM2 te mostrará un comando arriba
echo 2. COPIA ese comando completo
echo 3. Abre PowerShell como ADMINISTRADOR
echo 4. PEGA y ejecuta el comando
echo 5. Luego ejecuta: pm2 save
echo.
echo ✅ Después de eso, tu servidor se iniciará automáticamente
echo    cada vez que enciendas tu computadora
echo.

pause

