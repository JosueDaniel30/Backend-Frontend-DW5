@echo off
REM 🚀 Script para iniciar Backend + Frontend en Windows

cls
echo ========================================
echo 🛍️  TiendaShop - E-Commerce Completo
echo ========================================
echo.

REM Verificar Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ⚠️  Node.js no está instalado
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js encontrado: %NODE_VERSION%

REM Verificar npm
where npm >nul 2>nul
if errorlevel 1 (
    echo ⚠️  npm no está instalado
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm encontrado: %NPM_VERSION%
echo.

echo 📋 INSTRUCCIONES DE INSTALACIÓN:
echo.
echo 1. BACKEND
echo    cd backend-node-postgres-mongo
echo    npm install (si es primera vez)
echo    Editar .env con tus credenciales de PostgreSQL y MongoDB
echo    npm run dev
echo.
echo 2. FRONTEND (en otra terminal)
echo    cd frontend
echo    npm install (si es primera vez)
echo    npm run dev
echo.
echo 3. ACCEDER
echo    Backend:  http://localhost:3000
echo    Frontend: http://localhost:5173
echo.
echo 📚 RECURSOS:
echo    Backend README:   backend-node-postgres-mongo\README.md
echo    Frontend README:  frontend\README.md
echo    Setup Guide:      FRONTEND_SETUP.md
echo.
echo ¡Listo para empezar! 🚀
echo.
pause
