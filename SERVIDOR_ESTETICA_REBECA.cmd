@echo off
chcp 65001 >nul
cls
echo =====================================
echo   🌸 ESTÉTICA REBECA - SERVIDOR
echo =====================================
echo.

cd /d "%~dp0"

:: Verificar si el puerto 3000 está ocupado
netstat -ano | findstr ":3000" >nul 2>&1

if %ERRORLEVEL% EQU 0 (
    :: Puerto 3000 ocupado - Servidor está corriendo
    echo 🛑 Servidor está ENCENDIDO en puerto 3000
    echo.
    echo ⏳ Apagando servidor...
    echo.
    
    :: Obtener PID del proceso en puerto 3000
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000"') do (
        taskkill /F /PID %%a >nul 2>&1
    )
    
    timeout /t 2 >nul
    echo.
    echo =====================================
    echo   ✅ SERVIDOR APAGADO
    echo =====================================
    echo.
    timeout /t 2 >nul
) else (
    :: Puerto 3000 libre - Iniciar servidor
    echo ⚡ Servidor está APAGADO
    echo.
    echo ⏳ Iniciando servidor...
    echo.
    
    :: Iniciar Next.js en segundo plano
    start /B npm run dev
    
    echo.
    echo =====================================
    echo   ✅ SERVIDOR ENCENDIDO
    echo =====================================
    echo.
    echo 🌐 URL: http://localhost:3000
    echo.
    echo 💡 El servidor está corriendo en segundo plano
    echo    Para apagarlo, ejecuta este archivo otra vez
    echo.
    timeout /t 3 >nul
)

