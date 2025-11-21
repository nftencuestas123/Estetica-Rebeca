/**
 * Utilidad para detectar el género de un nombre
 * Retorna 'male', 'female' o 'unknown'
 */

// Lista de nombres comunes femeninos (en español e inglés)
const FEMALE_NAMES = [
  // Español
  'maria', 'carmen', 'ana', 'laura', 'patricia', 'lucia', 'sofia', 'elena',
  'isabel', 'cristina', 'monica', 'andrea', 'natalia', 'paula', 'sara',
  'claudia', 'diana', 'rebeca', 'rebecca', 'rosa', 'marta', 'teresa',
  'julia', 'silvia', 'angela', 'beatriz', 'pilar', 'mercedes', 'dolores',
  'carmen', 'josefa', 'francisca', 'antonia', 'dolores', 'concepcion',
  'gabriela', 'valentina', 'camila', 'isabella', 'emilia', 'adriana',
  'fernanda', 'daniela', 'alejandra', 'carolina', 'veronica', 'gabriela',
  // Inglés
  'sarah', 'emily', 'jessica', 'jennifer', 'lisa', 'michelle', 'amy',
  'melissa', 'nicole', 'stephanie', 'rachel', 'rebecca', 'laura', 'kimberly',
  'deborah', 'sharon', 'karen', 'nancy', 'betty', 'helen', 'sandra',
  'donna', 'carol', 'ruth', 'sharon', 'michelle', 'laura', 'sarah',
  'kimberly', 'deborah', 'jessica', 'shirley', 'cynthia', 'angela',
  'melissa', 'brenda', 'emily', 'amy', 'stephanie', 'rebecca', 'rachel'
]

// Lista de nombres comunes masculinos (en español e inglés)
const MALE_NAMES = [
  // Español
  'jose', 'juan', 'carlos', 'luis', 'miguel', 'francisco', 'antonio',
  'manuel', 'pedro', 'javier', 'david', 'jesus', 'jorge', 'alejandro',
  'fernando', 'rafael', 'pablo', 'sergio', 'daniel', 'mario', 'ricardo',
  'roberto', 'alberto', 'eduardo', 'oscar', 'jose', 'juan', 'carlos',
  'luis', 'miguel', 'francisco', 'antonio', 'manuel', 'pedro', 'javier',
  'david', 'jesus', 'jorge', 'alejandro', 'fernando', 'rafael', 'pablo',
  'sergio', 'daniel', 'mario', 'ricardo', 'roberto', 'alberto', 'eduardo',
  'oscar', 'richard', 'robert', 'william', 'john', 'james', 'michael',
  'david', 'richard', 'joseph', 'thomas', 'charles', 'christopher',
  'daniel', 'matthew', 'anthony', 'mark', 'donald', 'steven', 'paul',
  'andrew', 'joshua', 'kenneth', 'kevin', 'brian', 'george', 'timothy',
  // Inglés
  'richard', 'robert', 'william', 'john', 'james', 'michael', 'david',
  'joseph', 'thomas', 'charles', 'christopher', 'daniel', 'matthew',
  'anthony', 'mark', 'donald', 'steven', 'paul', 'andrew', 'joshua',
  'kenneth', 'kevin', 'brian', 'george', 'timothy', 'ronald', 'jason',
  'edward', 'jeffrey', 'ryan', 'jacob', 'gary', 'nicholas', 'eric',
  'jonathan', 'stephen', 'larry', 'justin', 'scott', 'brandon', 'benjamin',
  'samuel', 'frank', 'gregory', 'raymond', 'alexander', 'patrick', 'jack',
  'dennis', 'jerry', 'tyler', 'aaron', 'jose', 'henry', 'adam', 'douglas',
  'nathan', 'zachary', 'kyle', 'noah', 'ethan', 'jeremy', 'walter',
  'christian', 'keith', 'roger', 'terry', 'austin', 'sean', 'gerald',
  'carl', 'harold', 'dylan', 'arthur', 'lawrence', 'jordan', 'juan',
  'wayne', 'roy', 'ralph', 'benjamin', 'bruce', 'billy', 'bryan', 'eugene',
  'louis', 'harry', 'wayne', 'russell', 'alan', 'juan', 'wayne', 'roy'
]

/**
 * Detecta el género de un nombre
 * @param name - El nombre completo o primer nombre
 * @returns 'male' | 'female' | 'unknown'
 */
export function detectGender(name: string): 'male' | 'female' | 'unknown' {
  if (!name || typeof name !== 'string') {
    return 'unknown'
  }

  // Obtener el primer nombre (en caso de nombre completo)
  const firstName = name.trim().split(/\s+/)[0].toLowerCase()

  // Verificar en listas de nombres conocidos
  if (FEMALE_NAMES.includes(firstName)) {
    return 'female'
  }

  if (MALE_NAMES.includes(firstName)) {
    return 'male'
  }

  // Reglas heurísticas para español
  // Nombres que terminan en -a suelen ser femeninos (con excepciones)
  if (firstName.endsWith('a') && !firstName.endsWith('ia') && firstName.length > 3) {
    // Excepciones comunes masculinas
    const maleExceptions = ['jose', 'juan', 'luca', 'noa', 'elias', 'matias', 'tomas']
    if (!maleExceptions.includes(firstName)) {
      return 'female'
    }
  }

  // Nombres que terminan en -o suelen ser masculinos
  if (firstName.endsWith('o') && firstName.length > 3) {
    return 'male'
  }

  // Nombres que terminan en -e pueden ser ambos, pero algunos patrones
  if (firstName.endsWith('e') && firstName.length > 3) {
    // Algunos nombres femeninos comunes que terminan en -e
    const femaleE = ['marie', 'sophie', 'julie', 'nicole', 'michelle']
    if (femaleE.includes(firstName)) {
      return 'female'
    }
  }

  // Por defecto, desconocido
  return 'unknown'
}

/**
 * Obtiene el saludo apropiado según el género
 * @param name - El nombre del usuario
 * @returns 'Bienvenido' | 'Bienvenida' | 'Bienvenido/a'
 */
export function getGreeting(name: string): string {
  const gender = detectGender(name)
  
  switch (gender) {
    case 'male':
      return 'Bienvenido'
    case 'female':
      return 'Bienvenida'
    default:
      return 'Bienvenido/a'
  }
}

