@echo off
chcp 65001 >nul
cls
echo =====================================
echo   🌸 ESTÉTICA REBECA - SERVIDOR
echo =====================================
echo.

cd /d "%~dp0"

:: Verificar si PM2 está instalado
where pm2 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ PM2 no está instalado
    echo.
    echo Instalando PM2...
    npm install -g pm2
    echo.
)

:: Verificar estado del servidor
pm2 describe estetica-rebeca >nul 2>&1

if %ERRORLEVEL% EQU 0 (
    :: El servidor existe, verificar si está corriendo
    for /f "tokens=*" %%a in ('pm2 jlist') do set PM2_LIST=%%a
    echo %PM2_LIST% | findstr /C:"online" >nul
    
    if %ERRORLEVEL% EQU 0 (
        :: Servidor está CORRIENDO - APAGARLO
        echo 🛑 Servidor está ENCENDIDO
        echo.
        echo ⏳ Apagando servidor...
        echo.
        pm2 stop estetica-rebeca
        pm2 save
        echo.
        echo =====================================
        echo   ✅ SERVIDOR APAGADO
        echo =====================================
        echo.
    ) else (
        :: Servidor existe pero está detenido - ENCENDERLO
        echo ⚡ Servidor está APAGADO
        echo.
        echo ⏳ Encendiendo servidor...
        echo.
        pm2 restart estetica-rebeca
        pm2 save
        echo.
        echo =====================================
        echo   ✅ SERVIDOR ENCENDIDO
        echo =====================================
        echo.
        echo 🌐 URL: http://localhost:3000
        echo.
    )
) else (
    :: Servidor NO existe - CREARLO Y ENCENDERLO
    echo ⚡ Primera vez - Configurando servidor...
    echo.
    echo ⏳ Iniciando servidor...
    echo.
    pm2 start "node_modules/next/dist/bin/next" --name estetica-rebeca -- dev
    pm2 save
    echo.
    echo =====================================
    echo   ✅ SERVIDOR ENCENDIDO
    echo =====================================
    echo.
    echo 🌐 URL: http://localhost:3000
    echo.
)

timeout /t 3 >nul
exit

