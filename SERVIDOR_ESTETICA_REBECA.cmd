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
npm --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: NPM no esta instalado
    pause
    exit /b
)
echo.

echo Verificando package.json...
if not exist "package.json" (
    echo ERROR: package.json no existe en esta carpeta
    pause
    exit /b
)
echo OK: package.json encontrado
echo.

echo Verificando node_modules...
if not exist "node_modules" (
    echo WARNING: node_modules no existe
    echo Instalando dependencias...
    npm install
    echo.
)
echo.

echo =====================================
echo   INICIANDO SERVIDOR...
echo =====================================
echo.
echo Para apagar: Presiona Ctrl+C
echo.

npm run dev

echo.
echo =====================================
echo El servidor se detuvo
echo =====================================
pause

