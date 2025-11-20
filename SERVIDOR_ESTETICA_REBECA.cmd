@echo off
cls
echo =====================================
echo   SERVIDOR ESTETICA REBECA
echo =====================================
echo.

cd /d "%~dp0"

echo Verificando carpeta actual...
echo %CD%
echo.

echo Verificando si node esta instalado...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js no esta instalado
    pause
    exit /b
)
echo.

echo Verificando si npm esta instalado...
npm --version 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: NPM no esta instalado
    echo.
    pause
    exit /b
)
echo OK: NPM instalado
echo.

echo Verificando package.json...
if not exist "package.json" (
    echo ERROR: package.json no existe en esta carpeta
    echo Carpeta actual: %CD%
    echo.
    pause
    exit /b
)
echo OK: package.json encontrado
echo.

echo Verificando node_modules...
if not exist "node_modules" (
    echo WARNING: node_modules no existe
    echo Instalando dependencias...
    echo.
    npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Fallo al instalar dependencias
        echo.
        pause
        exit /b
    )
    echo.
)
echo OK: node_modules existe
echo.

echo =====================================
echo   INICIANDO SERVIDOR...
echo =====================================
echo.
echo Para apagar: Presiona Ctrl+C
echo.

npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo =====================================
    echo ERROR: El servidor fallo al iniciar
    echo =====================================
    echo.
    echo Codigo de error: %ERRORLEVEL%
    echo.
)

echo.
echo =====================================
echo El servidor se detuvo
echo =====================================
echo.
pause

