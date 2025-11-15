-- =====================================================
-- ARREGLAR RECURSIÓN INFINITA EN RLS
-- Ejecutar esto en Supabase SQL Editor
-- =====================================================

-- PASO 1: ELIMINAR TODAS LAS POLÍTICAS PROBLEMÁTICAS
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Users view own credits" ON public.user_credits;
DROP POLICY IF EXISTS "Admins view all credits" ON public.user_credits;
DROP POLICY IF EXISTS "Admins view all videos" ON public.videos;
DROP POLICY IF EXISTS "Admins view all templates" ON public.copy_templates;
DROP POLICY IF EXISTS "Admins view all social" ON public.social_accounts;
DROP POLICY IF EXISTS "Admins view all posts" ON public.social_posts;
DROP POLICY IF EXISTS "Admins manage purchase requests" ON public.credit_purchase_requests;
DROP POLICY IF EXISTS "Admins view all transactions" ON public.credit_transactions;

-- PASO 2: CREAR FUNCIÓN SEGURA PARA VERIFICAR ROL ADMIN
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PASO 3: RECREAR POLÍTICAS SIN RECURSIÓN

-- user_profiles: Políticas simples
CREATE POLICY "Users can view own profile" 
  ON public.user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.user_profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Service role bypass" 
  ON public.user_profiles FOR ALL 
  USING (auth.role() = 'service_role');

-- user_credits: Acceso normal para usuarios
CREATE POLICY "Users view own credits" 
  ON public.user_credits FOR SELECT 
  USING (auth.uid() = user_id);

-- videos: Usuarios ven los suyos
CREATE POLICY "Users manage own videos" 
  ON public.videos FOR ALL 
  USING (auth.uid() = user_id);

-- copy_templates: Usuarios ven los suyos
CREATE POLICY "Users manage own copy templates" 
  ON public.copy_templates FOR ALL 
  USING (auth.uid() = user_id);

-- credit_purchase_requests: 
CREATE POLICY "Users view own requests" 
  ON public.credit_purchase_requests FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users create requests" 
  ON public.credit_purchase_requests FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- credit_transactions: Usuarios ven los suyos
CREATE POLICY "Users view own transactions" 
  ON public.credit_transactions FOR SELECT 
  USING (auth.uid() = user_id);

-- social_accounts: Usuarios gestionan los suyos
CREATE POLICY "Users manage own social accounts" 
  ON public.social_accounts FOR ALL 
  USING (auth.uid() = user_id);

-- social_posts: Usuarios gestionan los suyos
CREATE POLICY "Users manage own posts" 
  ON public.social_posts FOR ALL 
  USING (auth.uid() = user_id);

-- PASO 4: MENSAJE DE CONFIRMACIÓN
DO $$ 
BEGIN 
  RAISE NOTICE '✅ Políticas RLS arregladas sin recursión';
  RAISE NOTICE '✅ Los admins deben usar Service Role Key para operaciones completas';
END $$;

