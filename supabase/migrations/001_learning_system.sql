-- Sistema de Auto-Aprendizaje para Sofía
-- Tablas para almacenar y aprender de conversaciones reales

-- 1. Tabla de vocabulario paraguayo aprendido
CREATE TABLE IF NOT EXISTS vocabulario_paraguayo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  palabra_o_frase TEXT NOT NULL UNIQUE,
  significado TEXT NOT NULL,
  contexto TEXT,
  ejemplos_uso TEXT[],
  frecuencia_uso INTEGER DEFAULT 1,
  confianza DECIMAL(3,2) DEFAULT 0.5, -- 0.0 a 1.0
  aprendido_de_conversacion_id UUID,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de patrones de conversación
CREATE TABLE IF NOT EXISTS patrones_conversacion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patron_entrada TEXT NOT NULL,
  patron_respuesta TEXT NOT NULL,
  categoria TEXT, -- 'agendamiento', 'consulta', 'saludo', etc.
  efectividad DECIMAL(3,2) DEFAULT 0.5, -- Qué tan bien funcionó
  veces_usado INTEGER DEFAULT 0,
  ultima_vez_usado TIMESTAMP WITH TIME ZONE,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de feedback de conversaciones
CREATE TABLE IF NOT EXISTS feedback_conversaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversacion_id UUID REFERENCES conversaciones_sofia(id),
  usuario_id TEXT,
  mensaje_usuario TEXT NOT NULL,
  respuesta_sofia TEXT NOT NULL,
  fue_util BOOLEAN,
  requirio_correccion BOOLEAN DEFAULT FALSE,
  correccion_sugerida TEXT,
  contexto_cultural TEXT, -- Para aprender modismos
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabla de intenciones detectadas
CREATE TABLE IF NOT EXISTS intenciones_detectadas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversacion_id UUID REFERENCES conversaciones_sofia(id),
  mensaje TEXT NOT NULL,
  intencion_detectada TEXT NOT NULL, -- 'agendar', 'consultar', 'cancelar', etc.
  confianza DECIMAL(3,2) NOT NULL,
  palabras_clave TEXT[],
  fue_correcta BOOLEAN,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabla de aprendizaje continuo
CREATE TABLE IF NOT EXISTS aprendizaje_continuo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL, -- 'vocabulario', 'patron', 'intencion'
  dato_original TEXT NOT NULL,
  dato_aprendido TEXT NOT NULL,
  fuente TEXT, -- 'conversacion', 'feedback', 'correccion_manual'
  validado BOOLEAN DEFAULT FALSE,
  validado_por TEXT,
  validado_en TIMESTAMP WITH TIME ZONE,
  creado_en TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_vocabulario_palabra ON vocabulario_paraguayo(palabra_o_frase);
CREATE INDEX IF NOT EXISTS idx_vocabulario_frecuencia ON vocabulario_paraguayo(frecuencia_uso DESC);
CREATE INDEX IF NOT EXISTS idx_patrones_categoria ON patrones_conversacion(categoria);
CREATE INDEX IF NOT EXISTS idx_patrones_efectividad ON patrones_conversacion(efectividad DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_conversacion ON feedback_conversaciones(conversacion_id);
CREATE INDEX IF NOT EXISTS idx_intenciones_conversacion ON intenciones_detectadas(conversacion_id);
CREATE INDEX IF NOT EXISTS idx_aprendizaje_tipo ON aprendizaje_continuo(tipo);

-- Insertar vocabulario inicial paraguayo
INSERT INTO vocabulario_paraguayo (palabra_o_frase, significado, contexto, ejemplos_uso, frecuencia_uso, confianza) VALUES
('marcarme', 'agendar o anotar una cita', 'Cuando un cliente quiere reservar un horario', 
 ARRAY['Marcame para el viernes a las 3', '¿Qué hora me podrías marcar?', 'Marcame una cita'], 
 100, 1.0),
('marcame', 'agendame o anotame una cita', 'Solicitud de agendamiento', 
 ARRAY['Marcame para mañana', 'Marcame un turno'], 
 100, 1.0),
('nomás', 'solamente, simplemente', 'Expresión paraguaya de énfasis', 
 ARRAY['Contame nomás', 'Vení nomás', 'Decime nomás'], 
 80, 1.0),
('sos', 'eres (tú eres)', 'Segunda persona singular', 
 ARRAY['Vos sos linda', 'No sos la única'], 
 90, 1.0),
('querés', 'quieres', 'Segunda persona singular', 
 ARRAY['¿Querés agendar?', '¿Qué querés saber?'], 
 90, 1.0),
('mirá', 'mira', 'Expresión de atención', 
 ARRAY['Mirá, te explico', 'Mirá que lindo'], 
 85, 1.0)
ON CONFLICT (palabra_o_frase) DO UPDATE SET
  frecuencia_uso = vocabulario_paraguayo.frecuencia_uso + 1,
  actualizado_en = NOW();

-- Insertar patrones iniciales de agendamiento
INSERT INTO patrones_conversacion (patron_entrada, patron_respuesta, categoria, efectividad, veces_usado) VALUES
('marcar|agendar|reservar.*viernes.*3.*tarde', 
 'Perfecto! Te marco para el viernes a las 3 de la tarde. ¿Me pasás tu nombre completo y número de teléfono para confirmar tu cita?',
 'agendamiento', 0.95, 0),
('qué hora.*marcar|agendar|disponible', 
 'Tenemos disponibilidad de lunes a viernes de 9 a 18hs, y sábados de 9 a 13hs. ¿Qué día y horario te viene mejor?',
 'consulta_horarios', 0.90, 0),
('marcame|agendame.*mañana', 
 'Perfecto! Te agendo para mañana. ¿A qué hora te viene mejor? Tenemos disponibilidad de 9 a 18hs.',
 'agendamiento', 0.92, 0);

-- Función para actualizar frecuencia de uso
CREATE OR REPLACE FUNCTION actualizar_frecuencia_vocabulario()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE vocabulario_paraguayo
  SET frecuencia_uso = frecuencia_uso + 1,
      actualizado_en = NOW()
  WHERE palabra_o_frase = ANY(
    SELECT unnest(regexp_split_to_array(lower(NEW.mensaje_usuario), '\s+'))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para auto-aprendizaje
CREATE TRIGGER trigger_aprendizaje_automatico
AFTER INSERT ON conversaciones_sofia
FOR EACH ROW
EXECUTE FUNCTION actualizar_frecuencia_vocabulario();

-- Comentarios para documentación
COMMENT ON TABLE vocabulario_paraguayo IS 'Almacena vocabulario y modismos paraguayos aprendidos de conversaciones reales';
COMMENT ON TABLE patrones_conversacion IS 'Patrones de entrada-respuesta que mejoran con el uso';
COMMENT ON TABLE feedback_conversaciones IS 'Feedback de usuarios para mejorar respuestas';
COMMENT ON TABLE intenciones_detectadas IS 'Registro de intenciones detectadas para análisis';
COMMENT ON TABLE aprendizaje_continuo IS 'Log de todo lo aprendido por el sistema';

