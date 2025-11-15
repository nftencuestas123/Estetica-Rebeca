-- =====================================================
-- SQL SEGURO - Solo crea las tablas faltantes
-- COPIAR Y PEGAR EN SUPABASE SQL EDITOR
-- =====================================================

-- Verificar si el tipo user_role existe, si no, crearlo
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'client');
  END IF;
END $$;

-- Crear tabla videos si no existe
CREATE TABLE IF NOT EXISTS public.videos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text,
  description text,
  video_url text,
  thumbnail_url text,
  duration_seconds integer,
  status text DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  topview_job_id text,
  avatar_image_url text,
  script_text text,
  voice_id text,
  cost_usd numeric(10, 2),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Crear tabla copy_templates si no existe
CREATE TABLE IF NOT EXISTS public.copy_templates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  template_name text NOT NULL,
  template_text text NOT NULL,
  platform text,
  category text,
  times_used integer DEFAULT 0,
  avg_engagement numeric(5,2),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON public.videos(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON public.videos(status);
CREATE INDEX IF NOT EXISTS idx_copy_templates_user_id ON public.copy_templates(user_id);

-- Actualizar tabla social_posts si existe
DO $$
BEGIN
  -- Agregar columna video_id si no existe
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'social_posts') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'social_posts' 
      AND column_name = 'video_id'
    ) THEN
      ALTER TABLE public.social_posts ADD COLUMN video_id uuid REFERENCES public.videos(id) ON DELETE SET NULL;
    END IF;

    -- Agregar columna engagement_rate si no existe
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'social_posts' 
      AND column_name = 'engagement_rate'
    ) THEN
      ALTER TABLE public.social_posts ADD COLUMN engagement_rate numeric(5,2) DEFAULT 0;
    END IF;

    -- Agregar columna analytics_updated_at si no existe
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'social_posts' 
      AND column_name = 'analytics_updated_at'
    ) THEN
      ALTER TABLE public.social_posts ADD COLUMN analytics_updated_at timestamp with time zone;
    END IF;
  END IF;
END $$;

-- Habilitar RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.copy_templates ENABLE ROW LEVEL SECURITY;

-- Políticas para videos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'videos' 
    AND policyname = 'Users view own videos'
  ) THEN
    CREATE POLICY "Users view own videos" ON public.videos FOR ALL USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'videos' 
    AND policyname = 'Admins view all videos'
  ) THEN
    CREATE POLICY "Admins view all videos" ON public.videos FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
    );
  END IF;
END $$;

-- Políticas para copy_templates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'copy_templates' 
    AND policyname = 'Users manage own copy templates'
  ) THEN
    CREATE POLICY "Users manage own copy templates" ON public.copy_templates FOR ALL USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'copy_templates' 
    AND policyname = 'Admins view all templates'
  ) THEN
    CREATE POLICY "Admins view all templates" ON public.copy_templates FOR SELECT USING (
      EXISTS (SELECT 1 FROM public.user_profiles WHERE id = auth.uid() AND role = 'admin')
    );
  END IF;
END $$;

-- Funciones de actualización automática
CREATE OR REPLACE FUNCTION public.update_videos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_copy_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
DROP TRIGGER IF EXISTS update_videos_timestamp ON public.videos;
CREATE TRIGGER update_videos_timestamp
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_videos_updated_at();

DROP TRIGGER IF EXISTS update_copy_templates_timestamp ON public.copy_templates;
CREATE TRIGGER update_copy_templates_timestamp
  BEFORE UPDATE ON public.copy_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_copy_templates_updated_at();

-- Verificación final
SELECT 'videos' as tabla, COUNT(*) as registros FROM public.videos
UNION ALL
SELECT 'copy_templates', COUNT(*) FROM public.copy_templates;

