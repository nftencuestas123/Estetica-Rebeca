-- Tabla de usuarios (extiende auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  whatsapp VARCHAR(20) UNIQUE,
  nombre VARCHAR(255) NOT NULL,
  edad INT,
  genero VARCHAR(20),
  foto_perfil TEXT,
  
  -- Medical
  alergias TEXT,
  medicamentos TEXT,
  contraindicaciones TEXT,
  historial_medico TEXT,
  
  -- Beauty profile
  objetivos_belleza TEXT[],
  tipo_piel VARCHAR(50),
  
  -- Gamification
  puntos_lealtad INT DEFAULT 0,
  tier VARCHAR(20) DEFAULT 'bronze',
  rating_admin DECIMAL(2,1),
  
  -- Membership
  membresia_tipo VARCHAR(20),
  membresia_inicio DATE,
  membresia_fin DATE,
  membresia_stripe_id VARCHAR(255),
  
  -- Ambassador
  es_embajador BOOLEAN DEFAULT false,
  codigo_embajador VARCHAR(50) UNIQUE,
  comision_balance DECIMAL(10,2) DEFAULT 0,
  
  -- Referral
  codigo_referido VARCHAR(50) UNIQUE,
  referido_por UUID REFERENCES users(id),
  
  -- Location
  ubicacion_lat DECIMAL(10,8),
  ubicacion_lng DECIMAL(11,8),
  sede_favorita UUID,
  
  -- Preferences
  preferencia_contacto VARCHAR(50) DEFAULT 'whatsapp',
  idioma VARCHAR(10) DEFAULT 'es-PY',
  consentimiento_datos BOOLEAN DEFAULT false,
  consentimiento_fotos BOOLEAN DEFAULT false,
  opt_out_marketing BOOLEAN DEFAULT false,
  
  -- System
  estado VARCHAR(50) DEFAULT 'activo',
  fecha_registro TIMESTAMP DEFAULT NOW(),
  ultimo_acceso TIMESTAMP,
  perfil_personalizado JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de sedes
CREATE TABLE IF NOT EXISTS sedes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  direccion TEXT NOT NULL,
  ciudad VARCHAR(100) DEFAULT 'Ciudad del Este',
  pais VARCHAR(100) DEFAULT 'Paraguay',
  latitud DECIMAL(10,8),
  longitud DECIMAL(11,8),
  telefono VARCHAR(20),
  email VARCHAR(255),
  horario_apertura TIME,
  horario_cierre TIME,
  dias_semana TEXT[],
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de especialistas
CREATE TABLE IF NOT EXISTS especialistas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  telefono VARCHAR(20),
  especialidad TEXT[],
  foto TEXT,
  bio TEXT,
  rating_promedio DECIMAL(2,1),
  total_citas INT DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de tratamientos
CREATE TABLE IF NOT EXISTS tratamientos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE,
  descripcion TEXT,
  descripcion_larga TEXT,
  
  categoria VARCHAR(100),
  subcategoria VARCHAR(100),
  tags TEXT[],
  
  precio_base DECIMAL(10,2),
  precio_membresia_silver DECIMAL(10,2),
  precio_membresia_gold DECIMAL(10,2),
  precio_membresia_platinum DECIMAL(10,2),
  permite_financiamiento BOOLEAN DEFAULT false,
  
  duracion_minutos INT,
  recuperacion_dias INT,
  beneficios TEXT[],
  riesgos TEXT[],
  indicaciones TEXT[],
  contraindicaciones TEXT[],
  
  imagen_principal TEXT,
  galeria_antes_despues TEXT[],
  video_explicativo TEXT,
  
  ar_disponible BOOLEAN DEFAULT false,
  ar_modelo_id VARCHAR(255),
  
  popularidad INT DEFAULT 0,
  total_citas INT DEFAULT 0,
  rating_promedio DECIMAL(2,1),
  
  activo BOOLEAN DEFAULT true,
  sedes_disponibles UUID[],
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de citas
CREATE TABLE IF NOT EXISTS citas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  especialista_id UUID REFERENCES especialistas(id),
  tratamiento_id UUID NOT NULL REFERENCES tratamientos(id),
  sede_id UUID NOT NULL REFERENCES sedes(id),
  
  fecha_hora TIMESTAMP NOT NULL,
  duracion_minutos INT DEFAULT 60,
  estado VARCHAR(50) DEFAULT 'pendiente',
  
  notas_medicas TEXT,
  foto_antes TEXT,
  foto_despues TEXT,
  calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
  feedback TEXT,
  resena_publica BOOLEAN DEFAULT false,
  
  recordatorio_24h BOOLEAN DEFAULT false,
  recordatorio_1h BOOLEAN DEFAULT false,
  
  precio_final DECIMAL(10,2),
  descuento_aplicado DECIMAL(10,2),
  promocion_aplicada VARCHAR(100),
  metodo_pago VARCHAR(50),
  pago_estado VARCHAR(50) DEFAULT 'pendiente',
  financiamiento_plan_id UUID,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  descripcion TEXT,
  
  categoria VARCHAR(100),
  marca VARCHAR(100),
  ingredientes TEXT[],
  
  precio DECIMAL(10,2) NOT NULL,
  precio_costo DECIMAL(10,2),
  descuento_porcentaje INT DEFAULT 0,
  
  stock_total INT DEFAULT 0,
  stock_por_sede JSONB,
  umbral_minimo INT DEFAULT 10,
  proveedor VARCHAR(255),
  
  imagenes TEXT[],
  
  recomendado_por_especialista BOOLEAN DEFAULT false,
  tratamientos_relacionados UUID[],
  
  total_ventas INT DEFAULT 0,
  rating_promedio DECIMAL(2,1),
  total_resenas INT DEFAULT 0,
  
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de conversaciones con Sofía
CREATE TABLE IF NOT EXISTS conversaciones_sofia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES users(id) ON DELETE CASCADE,
  sesion_id UUID NOT NULL,
  
  mensaje_usuario TEXT NOT NULL,
  respuesta_sofia TEXT NOT NULL,
  
  tipo_interaccion VARCHAR(50),
  intent_detectado VARCHAR(100),
  entidades_extraidas JSONB,
  
  cita_agendada_id UUID REFERENCES citas(id),
  producto_recomendado_id UUID REFERENCES productos(id),
  
  satisfaccion INT CHECK (satisfaccion >= 1 AND satisfaccion <= 5),
  escalado_a_humano BOOLEAN DEFAULT false,
  
  modelo_usado VARCHAR(100),
  tokens_consumidos INT,
  tiempo_respuesta_ms INT,
  
  timestamp TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_citas_usuario_fecha ON citas(usuario_id, fecha_hora DESC);
CREATE INDEX IF NOT EXISTS idx_citas_estado ON citas(estado);
CREATE INDEX IF NOT EXISTS idx_citas_fecha_hora ON citas(fecha_hora);
CREATE INDEX IF NOT EXISTS idx_tratamientos_activo ON tratamientos(activo);
CREATE INDEX IF NOT EXISTS idx_conversaciones_usuario ON conversaciones_sofia(usuario_id, timestamp DESC);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversaciones_sofia ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para users
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Políticas RLS para citas
CREATE POLICY "Users can view own appointments"
  ON citas FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Users can create own appointments"
  ON citas FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

-- Políticas RLS para conversaciones
CREATE POLICY "Users can view own conversations"
  ON conversaciones_sofia FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Users can create own conversations"
  ON conversaciones_sofia FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

-- Políticas públicas para tratamientos y sedes
ALTER TABLE tratamientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE sedes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active treatments"
  ON tratamientos FOR SELECT
  USING (activo = true);

CREATE POLICY "Public can view active locations"
  ON sedes FOR SELECT
  USING (activa = true);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_citas_updated_at BEFORE UPDATE ON citas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tratamientos_updated_at BEFORE UPDATE ON tratamientos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar sede por defecto (Ciudad del Este)
INSERT INTO sedes (nombre, direccion, ciudad, pais, telefono, email, horario_apertura, horario_cierre, dias_semana, activa)
VALUES (
  'Sede Principal - Ciudad del Este',
  'Av. Principal, Ciudad del Este',
  'Ciudad del Este',
  'Paraguay',
  '+595 987 123 456',
  'info@rebecabarreto.com',
  '09:00:00',
  '18:00:00',
  ARRAY['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  true
) ON CONFLICT DO NOTHING;

-- Insertar tratamientos de ejemplo
INSERT INTO tratamientos (nombre, slug, descripcion, categoria, precio_base, duracion_minutos, activo)
VALUES
  ('Botox', 'botox', 'Suaviza arrugas y líneas de expresión', 'anti-aging', 200.00, 30, true),
  ('Rellenos de Ácido Hialurónico', 'rellenos-acido-hialuronico', 'Aumento de volumen y definición', 'anti-aging', 350.00, 45, true),
  ('HIFU Facial', 'hifu-facial', 'Lifting sin cirugía', 'anti-aging', 450.00, 60, true),
  ('Limpieza Facial Profunda', 'limpieza-facial-profunda', 'Renovación y cuidado de la piel', 'facial', 80.00, 60, true),
  ('Mesoterapia', 'mesoterapia', 'Hidratación y nutrición profunda', 'facial', 120.00, 45, true)
ON CONFLICT (slug) DO NOTHING;

