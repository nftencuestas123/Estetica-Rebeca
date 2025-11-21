// ≡ƒÆ│ CONFIGURACI├ôN DE PAGOS - MODIFICAR AQU├ì
// ΓÜá∩╕Å PLACEHOLDERS - Reemplazar con datos reales

export const PAYMENT_CONFIG = {
  // ≡ƒÅª TRANSFERENCIA BANCARIA
  bankTransfer: {
    bankName: '[NOMBRE DEL BANCO - MODIFICAR]',
    accountNumber: '[N├ÜMERO DE CUENTA - MODIFICAR]',
    accountHolder: '[NOMBRE DEL TITULAR - MODIFICAR]',
    accountType: '[TIPO DE CUENTA (Corriente/Ahorro) - MODIFICAR]',
    ruc: '[RUC/C├ëDULA - MODIFICAR]',
  },

  // ≡ƒô▒ BILLETERA PERSONAL
  personalWallet: {
    phoneNumber: '[N├ÜMERO DE CELULAR - MODIFICAR]',
    holderName: '[NOMBRE TITULAR - MODIFICAR]',
    ci: '[C├ëDULA - MODIFICAR]',
  },

  // ≡ƒÅª CAMBIO CHACO
  cambioChaco: {
    holderName: '[NOMBRE/EMPRESA - MODIFICAR]',
    identification: '[C├ëDULA/RUC - MODIFICAR]',
    accountNumber: '[N├ÜMERO DE CUENTA - MODIFICAR]',
  },

  // ≡ƒÆ╡ EFECTIVO EN PERSONA
  cashInPerson: {
    address: '[DIRECCI├ôN/PUNTO DE ENCUENTRO - MODIFICAR]',
    schedule: '[HORARIO DE ATENCI├ôN - MODIFICAR]',
    contactPhone: '[TEL├ëFONO DE CONTACTO - MODIFICAR]',
    contactName: '[NOMBRE DE CONTACTO - MODIFICAR]',
  },
}

// ≡ƒÆ░ PAQUETES DE CR├ëDITOS
export const CREDIT_PACKAGES = [
  {
    id: 'basic',
    name: 'B├üSICO',
    price: 10,
    displayPrice: '$10',
    estimatedVideos: '[CALCULAR SEG├ÜN TOPVIEW - MODIFICAR]', // Ej: "~2 videos de 1min"
    recommended: false,
  },
  {
    id: 'standard',
    name: 'EST├üNDAR',
    price: 50,
    displayPrice: '$50',
    estimatedVideos: '[CALCULAR SEG├ÜN TOPVIEW - MODIFICAR]', // Ej: "~10 videos de 1min"
    recommended: true,
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    price: 100,
    displayPrice: '$100',
    estimatedVideos: '[CALCULAR SEG├ÜN TOPVIEW - MODIFICAR]', // Ej: "~20 videos de 1min"
    recommended: false,
  },
]

// ≡ƒÄ¼ PRECIOS DE VIDEOS (BASADO EN TOPVIEW)
// ΓÜá∩╕Å ACTUALIZAR CUANDO TENGAMOS RESPUESTA DE TOPVIEW
export const VIDEO_PRICING = {
  costPerMinute: 0, // [ESPERAR RESPUESTA TOPVIEW - MODIFICAR]
  markup: 100, // Porcentaje de ganancia (100% = duplicar precio)
  
  // C├ílculo autom├ítico (se actualiza cuando cambies costPerMinute)
  sellingPricePerMinute: function() {
    return this.costPerMinute * (1 + this.markup / 100)
  },
  
  // Duraci├│n ΓåÆ Precio
  getDurationCost: function(minutes: number) {
    return this.sellingPricePerMinute() * minutes
  },
  
  // Cr├⌐ditos ΓåÆ Videos estimados (1 minuto)
  estimateVideos: function(credits: number) {
    if (this.sellingPricePerMinute() === 0) {
      return '[PENDIENTE TOPVIEW]'
    }
    return `~${Math.floor(credits / this.sellingPricePerMinute())} videos de 1min`
  },
}

// ≡ƒôï M├ëTODOS DE PAGO DISPONIBLES
export const PAYMENT_METHODS = [
  {
    id: 'bank_transfer',
    name: 'Transferencia Bancaria',
    icon: '≡ƒÅª',
    instructionsKey: 'bankTransfer',
  },
  {
    id: 'personal_wallet',
    name: 'Billetera Personal',
    icon: '≡ƒô▒',
    instructionsKey: 'personalWallet',
  },
  {
    id: 'cambio_chaco',
    name: 'Cambio Chaco',
    icon: '≡ƒÅª',
    instructionsKey: 'cambioChaco',
  },
  {
    id: 'cash',
    name: 'Efectivo en Persona',
    icon: '≡ƒÆ╡',
    instructionsKey: 'cashInPerson',
  },
]

// ≡ƒöö NOTIFICACIONES
export const NOTIFICATION_CONFIG = {
  adminEmail: '[EMAIL ADMINISTRADOR - MODIFICAR]',
  adminPhone: '[TEL├ëFONO ADMINISTRADOR - MODIFICAR]',
  businessName: 'Rebeca Barreto Est├⌐tica y Belleza',
}

