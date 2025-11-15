-- ⚠️ EJECUTAR ESTE SQL EN SUPABASE SQL EDITOR
-- Panel Supabase → SQL Editor → New Query → Pegar esto → Run

-- ====================================
-- TABLAS FALTANTES - CORRECCIÓN
-- ====================================

-- 1. Tabla: videos (requerida por social_posts)
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  status TEXT DEFAULT 'completed' CHECK (status IN ('processing', 'completed', 'failed')),
  topview_job_id TEXT,
  avatar_image_url TEXT,
  script_text TEXT,
  voice_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla: copy_templates (Templates de copy guardados)
CREATE TABLE IF NOT EXISTS copy_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  template_name TEXT NOT NULL,
  template_text TEXT NOT NULL,
  platform TEXT,
  category TEXT,
  times_used INTEGER DEFAULT 0,
  avg_engagement DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- ÍNDICES PARA MEJOR RENDIMIENTO
-- ====================================

CREATE INDEX IF NOT EXISTS idx_videos_user_id ON videos(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_copy_templates_user_id ON copy_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_copy_templates_category ON copy_templates(category);

-- ====================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================

-- Habilitar RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE copy_templates ENABLE ROW LEVEL SECURITY;

-- Políticas para videos
CREATE POLICY "Users can view their own videos"
  ON videos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own videos"
  ON videos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own videos"
  ON videos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own videos"
  ON videos FOR DELETE
  USING (auth.uid() = user_id);

-- Políticas para copy_templates
CREATE POLICY "Users can view their own templates"
  ON copy_templates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own templates"
  ON copy_templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
  ON copy_templates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
  ON copy_templates FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================
-- FUNCIONES HELPER
-- ====================================

-- Función para actualizar updated_at automáticamente en videos
CREATE OR REPLACE FUNCTION update_videos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para videos
DROP TRIGGER IF EXISTS update_videos_timestamp ON videos;
CREATE TRIGGER update_videos_timestamp
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_videos_updated_at();

-- Función para actualizar updated_at automáticamente en copy_templates
CREATE OR REPLACE FUNCTION update_copy_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para copy_templates
DROP TRIGGER IF EXISTS update_copy_templates_timestamp ON copy_templates;
CREATE TRIGGER update_copy_templates_timestamp
  BEFORE UPDATE ON copy_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_copy_templates_updated_at();

-- ====================================
-- ✅ COMPLETADO
-- ====================================

-- Verificar que las tablas se crearon correctamente:
SELECT 
  'videos' as table_name, COUNT(*) as row_count 
FROM videos
UNION ALL
SELECT 
  'copy_templates', COUNT(*) 
FROM copy_templates;

