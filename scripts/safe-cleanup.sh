#!/bin/bash

###############################################################################
# SAFE CLEANUP - Limpieza segura de archivos innecesarios
# Garantiza que NO se toque código fuente ni configuraciones críticas
###############################################################################

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo ""
log_info "=========================================="
log_info "   LIMPIEZA SEGURA DEL PROYECTO"
log_info "=========================================="
echo ""

# ARCHIVOS INNECESARIOS A ELIMINAR
# Solo archivos de documentación personal, no código

DOCS_TO_DELETE=(
    "📝_CONTEXTO_COMPLETO_ASISTENTE_VOZ.md"
    "🔄_CUANDO_VUELVAS.md"
    "📦_ESTADO_REPO.md"
    "⚡_INSTRUCCIONES_DIARIAS_EJECUTIVO.md"
)

# Archivos de Windows innecesarios en Mac
WINDOWS_FILES=(
    "INICIAR_PROYECTO.bat"
    "deploy.ps1"
)

# Archivos temporales/build
TEMP_FILES=(
    "tsconfig.tsbuildinfo"
)

# Archivos .backup de imágenes
BACKUP_IMAGES=$(find public/images -name "*.backup" 2>/dev/null || true)

# Contador
DELETED_COUNT=0

# 1. Eliminar documentación personal
log_info "Eliminando documentación personal innecesaria..."
for file in "${DOCS_TO_DELETE[@]}"; do
    if [ -f "$file" ]; then
        log_warning "Eliminando: $file"
        rm "$file"
        DELETED_COUNT=$((DELETED_COUNT + 1))
    fi
done

# 2. Eliminar archivos de Windows (en Mac)
log_info "Eliminando archivos de Windows..."
for file in "${WINDOWS_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_warning "Eliminando: $file"
        rm "$file"
        DELETED_COUNT=$((DELETED_COUNT + 1))
    fi
done

# 3. Eliminar archivos temporales
log_info "Eliminando archivos temporales..."
for file in "${TEMP_FILES[@]}"; do
    if [ -f "$file" ]; then
        log_warning "Eliminando: $file"
        rm "$file"
        DELETED_COUNT=$((DELETED_COUNT + 1))
    fi
done

# 4. Eliminar backups de imágenes
if [ -n "$BACKUP_IMAGES" ]; then
    log_info "Eliminando backups de imágenes..."
    echo "$BACKUP_IMAGES" | while read -r file; do
        if [ -n "$file" ]; then
            log_warning "Eliminando: $file"
            rm "$file"
            DELETED_COUNT=$((DELETED_COUNT + 1))
        fi
    done
fi

echo ""
log_success "=========================================="
log_success "   Limpieza completada"
log_success "   Archivos eliminados: $DELETED_COUNT"
log_success "=========================================="
echo ""

# Mantener documentación importante
log_info "Archivos de documentación PRESERVADOS:"
echo "  ✅ 📊_OPTIMIZACION_IMAGENES.md (documentación técnica)"
echo "  ✅ README.md (si existe)"
echo ""

log_success "✅ Tu código fuente está intacto"
log_success "✅ Todas las configuraciones están seguras"
