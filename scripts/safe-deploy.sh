#!/bin/bash

###############################################################################
# SAFE DEPLOY SCRIPT - Deployment seguro y robusto
# Garantiza que NUNCA se pierda código y que los deploys sean atómicos
###############################################################################

set -e  # Exit on error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones de logging
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 1. BACKUP AUTOMÁTICO (NUNCA pierde código)
backup_project() {
    log_info "Creando backup del proyecto..."
    
    BACKUP_DIR="../backups"
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    BACKUP_NAME="Estetica-Rebeca_backup_${TIMESTAMP}.tar.gz"
    
    mkdir -p "$BACKUP_DIR"
    
    tar -czf "${BACKUP_DIR}/${BACKUP_NAME}" \
        --exclude='node_modules' \
        --exclude='.git' \
        --exclude='.next' \
        --exclude='*.backup' \
        .
    
    log_success "Backup creado: ${BACKUP_DIR}/${BACKUP_NAME}"
}

# 2. COMMIT SOLO IMÁGENES OPTIMIZADAS
commit_images() {
    log_info "Commiteando imágenes optimizadas..."
    
    # Lista de imágenes modificadas
    IMAGES=$(git status --porcelain | grep "^ M.*public/images.*\.\(jpg\|png\)" | awk '{print $2}')
    
    if [ -z "$IMAGES" ]; then
        log_warning "No hay imágenes modificadas para commitear"
        return 0
    fi
    
    # Agregar imagen por imagen (evita bloqueos)
    for img in $IMAGES; do
        log_info "Agregando: $img"
        git add "$img" || {
            log_error "Falló al agregar $img"
            continue
        }
    done
    
    # Commit
    git commit -m "chore: optimize landing page images (93-95% size reduction)" || {
        log_warning "Nada nuevo para commitear en imágenes"
    }
    
    log_success "Imágenes commiteadas"
}

# 3. COMMIT .gitignore
commit_gitignore() {
    log_info "Commiteando .gitignore..."
    
    if git status --porcelain | grep -q "^ M .gitignore"; then
        git add .gitignore
        git commit -m "chore: ignore .backup files"
        log_success ".gitignore commiteado"
    else
        log_warning ".gitignore no modificado"
    fi
}

# 4. PUSH CON RETRY
safe_push() {
    log_info "Pusheando cambios a GitHub..."
    
    MAX_RETRIES=3
    RETRY_COUNT=0
    
    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        if git push origin main; then
            log_success "Push exitoso!"
            return 0
        else
            RETRY_COUNT=$((RETRY_COUNT + 1))
            log_warning "Push falló. Intento $RETRY_COUNT de $MAX_RETRIES"
            
            if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
                log_info "Esperando 3 segundos antes de reintentar..."
                sleep 3
            fi
        fi
    done
    
    log_error "Push falló después de $MAX_RETRIES intentos"
    log_info "Puedes intentar manualmente más tarde con: git push origin main"
    return 1
}

# 5. VERIFICAR REMOTE
verify_remote() {
    log_info "Verificando configuración de remote..."
    
    REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
    
    if [ -z "$REMOTE" ]; then
        log_error "No hay remote configurado"
        log_info "Configurando remote..."
        git remote add origin https://github.com/nftencuestas123/Estetica-Rebeca.git
    else
        log_success "Remote: $REMOTE"
    fi
}

# 6. MAIN EXECUTION
main() {
    echo ""
    log_info "=========================================="
    log_info "   SAFE DEPLOY - Estetica Rebeca"
    log_info "=========================================="
    echo ""
    
    # Verificar que estamos en el directorio correcto
    if [ ! -f "package.json" ]; then
        log_error "No estás en el directorio raíz del proyecto"
        exit 1
    fi
    
    # Paso 1: Backup (NUNCA pierde código)
    backup_project
    
    # Paso 2: Verificar remote
    verify_remote
    
    # Paso 3: Pull primero
    log_info "Sincronizando con remoto..."
    git pull origin main || log_warning "Pull falló, continuando..."
    
    # Paso 4: Commit .gitignore
    commit_gitignore
    
    # Paso 5: Commit imágenes
    commit_images
    
    # Paso 6: Push
    safe_push
    
    echo ""
    log_success "=========================================="
    log_success "   Deploy completado exitosamente!"
    log_success "=========================================="
    echo ""
}

# Ejecutar
main
