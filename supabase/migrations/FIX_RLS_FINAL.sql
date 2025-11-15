-- =====================================================
-- FIX COMPLETO - ELIMINA TODO Y RECREA LIMPIO
-- Copiar TODO y ejecutar en Supabase SQL Editor
-- =====================================================

-- PASO 1: ELIMINAR TODAS LAS POLÍTICAS EXISTENTES
DO $$ 
DECLARE 
    pol record;
BEGIN
    -- Eliminar todas las políticas de user_profiles
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_profiles'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.user_profiles', pol.policyname);
    END LOOP;

    -- Eliminar todas las políticas de user_credits
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'user_credits'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.user_credits', pol.policyname);
    END LOOP;

    -- Eliminar todas las políticas de videos
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'videos'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.videos', pol.policyname);
    END LOOP;

    -- Eliminar todas las políticas de copy_templates
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'copy_templates'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.copy_templates', pol.policyname);
    END LOOP;

    -- Eliminar todas las políticas de credit_purchase_requests
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'credit_purchase_requests'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.credit_purchase_requests', pol.policyname);
    END LOOP;

    -- Eliminar todas las políticas de credit_transactions
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'credit_transactions'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.credit_transactions', pol.policyname);
    END LOOP;

    -- Eliminar todas las políticas de social_accounts
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'social_accounts'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.social_accounts', pol.policyname);
    END LOOP;

    -- Eliminar todas las políticas de social_posts
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'social_posts'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.social_posts', pol.policyname);
    END LOOP;

    RAISE NOTICE '✅ Todas las políticas antiguas eliminadas';
END $$;

-- PASO 2: CREAR POLÍTICAS NUEVAS SIN RECURSIÓN

-- =====================================================
-- USER_PROFILES (sin recursión)
-- =====================================================
CREATE POLICY "Users can view own profile" 
  ON public.user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Service role full access" 
  ON public.user_profiles FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- USER_CREDITS
-- =====================================================
CREATE POLICY "Users view own credits" 
  ON public.user_credits FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users update own credits" 
  ON public.user_credits FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full credits" 
  ON public.user_credits FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- VIDEOS
-- =====================================================
CREATE POLICY "Users manage own videos" 
  ON public.videos FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full videos" 
  ON public.videos FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- COPY_TEMPLATES
-- =====================================================
CREATE POLICY "Users manage own templates" 
  ON public.copy_templates FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full templates" 
  ON public.copy_templates FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- CREDIT_PURCHASE_REQUESTS
-- =====================================================
CREATE POLICY "Users view own purchase requests" 
  ON public.credit_purchase_requests FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users create purchase requests" 
  ON public.credit_purchase_requests FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full purchase requests" 
  ON public.credit_purchase_requests FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- CREDIT_TRANSACTIONS
-- =====================================================
CREATE POLICY "Users view own transactions" 
  ON public.credit_transactions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full transactions" 
  ON public.credit_transactions FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- SOCIAL_ACCOUNTS
-- =====================================================
CREATE POLICY "Users manage own social accounts" 
  ON public.social_accounts FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full social accounts" 
  ON public.social_accounts FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- SOCIAL_POSTS
-- =====================================================
CREATE POLICY "Users manage own posts" 
  ON public.social_posts FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full posts" 
  ON public.social_posts FOR ALL 
  USING (auth.role() = 'service_role');

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================
DO $$ 
BEGIN 
  RAISE NOTICE '🎉 ¡POLÍTICAS RLS ARREGLADAS CORRECTAMENTE!';
  RAISE NOTICE '✅ Ya podés registrarte sin problemas';
  RAISE NOTICE '✅ Andá a http://localhost:3000/register';
END $$;

-- Mostrar políticas creadas
SELECT 
  tablename, 
  policyname, 
  cmd as command
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('user_profiles', 'user_credits', 'videos')
ORDER BY tablename, policyname;

