// 💳 CONFIGURACIÓN DE PAGOS - MODIFICAR AQUÍ
// ⚠️ PLACEHOLDERS - Reemplazar con datos reales

export const PAYMENT_CONFIG = {
  // 🏦 TRANSFERENCIA BANCARIA
  bankTransfer: {
    bankName: '[NOMBRE DEL BANCO - MODIFICAR]',
    accountNumber: '[NÚMERO DE CUENTA - MODIFICAR]',
    accountHolder: '[NOMBRE DEL TITULAR - MODIFICAR]',
    accountType: '[TIPO DE CUENTA (Corriente/Ahorro) - MODIFICAR]',
    ruc: '[RUC/CÉDULA - MODIFICAR]',
  },

  // 📱 BILLETERA PERSONAL
  personalWallet: {
    phoneNumber: '[NÚMERO DE CELULAR - MODIFICAR]',
    holderName: '[NOMBRE TITULAR - MODIFICAR]',
    ci: '[CÉDULA - MODIFICAR]',
  },

  // 🏦 CAMBIO CHACO
  cambioChaco: {
    holderName: '[NOMBRE/EMPRESA - MODIFICAR]',
    identification: '[CÉDULA/RUC - MODIFICAR]',
    accountNumber: '[NÚMERO DE CUENTA - MODIFICAR]',
  },

  // 💵 EFECTIVO EN PERSONA
  cashInPerson: {
    address: '[DIRECCIÓN/PUNTO DE ENCUENTRO - MODIFICAR]',
    schedule: '[HORARIO DE ATENCIÓN - MODIFICAR]',
    contactPhone: '[TELÉFONO DE CONTACTO - MODIFICAR]',
    contactName: '[NOMBRE DE CONTACTO - MODIFICAR]',
  },
}

// 💰 PAQUETES DE CRÉDITOS
export const CREDIT_PACKAGES = [
  {
    id: 'basic',
    name: 'BÁSICO',
    price: 10,
    displayPrice: '$10',
    estimatedVideos: '[CALCULAR SEGÚN TOPVIEW - MODIFICAR]', // Ej: "~2 videos de 1min"
    recommended: false,
  },
  {
    id: 'standard',
    name: 'ESTÁNDAR',
    price: 50,
    displayPrice: '$50',
    estimatedVideos: '[CALCULAR SEGÚN TOPVIEW - MODIFICAR]', // Ej: "~10 videos de 1min"
    recommended: true,
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 100,
    displayPrice: '$100',
    estimatedVideos: '[CALCULAR SEGÚN TOPVIEW - MODIFICAR]', // Ej: "~20 videos de 1min"
    recommended: false,
  },
]

// 🎬 PRECIOS DE VIDEOS (BASADO EN TOPVIEW)
// ⚠️ ACTUALIZAR CUANDO TENGAMOS RESPUESTA DE TOPVIEW
export const VIDEO_PRICING = {
  costPerMinute: 0, // [ESPERAR RESPUESTA TOPVIEW - MODIFICAR]
  markup: 100, // Porcentaje de ganancia (100% = duplicar precio)
  
  // Cálculo automático (se actualiza cuando cambies costPerMinute)
  sellingPricePerMinute: function() {
    return this.costPerMinute * (1 + this.markup / 100)
  },
  
  // Duración → Precio
  getDurationCost: function(minutes: number) {
    return this.sellingPricePerMinute() * minutes
  },
  
  // Créditos → Videos estimados (1 minuto)
  estimateVideos: function(credits: number) {
    if (this.sellingPricePerMinute() === 0) {
      return '[PENDIENTE TOPVIEW]'
    }
    return `~${Math.floor(credits / this.sellingPricePerMinute())} videos de 1min`
  },
}

// 📋 MÉTODOS DE PAGO DISPONIBLES
export const PAYMENT_METHODS = [
  {
    id: 'bank_transfer',
    name: 'Transferencia Bancaria',
    icon: '🏦',
    instructionsKey: 'bankTransfer',
  },
  {
    id: 'personal_wallet',
    name: 'Billetera Personal',
    icon: '📱',
    instructionsKey: 'personalWallet',
  },
  {
    id: 'cambio_chaco',
    name: 'Cambio Chaco',
    icon: '🏦',
    instructionsKey: 'cambioChaco',
  },
  {
    id: 'cash',
    name: 'Efectivo en Persona',
    icon: '💵',
    instructionsKey: 'cashInPerson',
  },
]

// 🔔 NOTIFICACIONES
export const NOTIFICATION_CONFIG = {
  adminEmail: '[EMAIL ADMINISTRADOR - MODIFICAR]',
  adminPhone: '[TELÉFONO ADMINISTRADOR - MODIFICAR]',
  businessName: 'Rebeca Barreto Estética y Belleza',
}

