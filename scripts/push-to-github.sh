#!/bin/bash

###############################################################################
# PUSH TO GITHUB - Script simple para subir cambios
# Uso: ./scripts/push-to-github.sh
###############################################################################

set -e

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}"
echo "=========================================="
echo "  Pusheando cambios a GitHub"
echo "=========================================="
echo -e "${NC}"

# Verificar commits pendientes
PENDING=$(git log origin/main..HEAD --oneline | wc -l | tr -d ' ')

if [ "$PENDING" -eq 0 ]; then
    echo -e "${GREEN}✅ Todo está actualizado. No hay nada que pushear.${NC}"
    exit 0
fi

echo -e "${YELLOW}📊 Commits pendientes: $PENDING${NC}"
echo ""
git log origin/main..HEAD --oneline
echo ""

# Push
echo -e "${BLUE}🚀 Pusheando...${NC}"
if git push origin main; then
    echo ""
    echo -e "${GREEN}=========================================="
    echo -e "  ✅ Push exitoso!"
    echo -e "==========================================${NC}"
else
    echo ""
    echo -e "${YELLOW}⚠️  Push falló.${NC}"
    echo -e "${YELLOW}Posibles causas:${NC}"
    echo "1. Token de GitHub expirado"
    echo "2. Sin permisos de escritura"
    echo "3. Problema de red"
    echo ""
    echo -e "${BLUE}Intenta autenticarte manualmente:${NC}"
    echo "git push origin main"
    exit 1
fi
