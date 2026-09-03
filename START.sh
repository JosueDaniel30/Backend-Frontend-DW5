#!/bin/bash

# 🚀 Script para iniciar Backend + Frontend

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}🛍️  TiendaShop - E-Commerce Completo${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js no está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js encontrado: $(node -v)${NC}"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}⚠️  npm no está instalado${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm encontrado: $(npm -v)${NC}"
echo ""

# Instrucciones
echo -e "${BLUE}📋 INSTRUCCIONES DE INSTALACIÓN:${NC}"
echo ""
echo -e "${YELLOW}1. BACKEND${NC}"
echo "   cd backend-node-postgres-mongo"
echo "   npm install (si es primera vez)"
echo "   Editar .env con tus credenciales de PostgreSQL y MongoDB"
echo "   npm run dev"
echo ""
echo -e "${YELLOW}2. FRONTEND (en otra terminal)${NC}"
echo "   cd frontend"
echo "   npm install (si es primera vez)"
echo "   npm run dev"
echo ""
echo -e "${YELLOW}3. ACCEDER${NC}"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:5173"
echo ""

echo -e "${BLUE}📚 RECURSOS:${NC}"
echo "   Backend README:   backend-node-postgres-mongo/README.md"
echo "   Frontend README:  frontend/README.md"
echo "   Setup Guide:      FRONTEND_SETUP.md"
echo ""

echo -e "${GREEN}¡Listo para empezar! 🚀${NC}"
