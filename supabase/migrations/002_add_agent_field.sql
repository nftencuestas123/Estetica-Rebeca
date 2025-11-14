-- Agregar campo agente_asignado a la tabla conversaciones_sofia
ALTER TABLE conversaciones_sofia 
ADD COLUMN IF NOT EXISTS agente_asignado VARCHAR(100) DEFAULT 'Sofía';

-- Agregar índice para búsqueda por agente
CREATE INDEX IF NOT EXISTS idx_conversaciones_agente ON conversaciones_sofia(agente_asignado);

-- Comentario
COMMENT ON COLUMN conversaciones_sofia.agente_asignado IS 'Nombre del agente que atendió la conversación (Sofía, Carolina, Valentina, etc.)';

