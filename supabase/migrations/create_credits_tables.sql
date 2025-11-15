-- ⚠️ EJECUTAR ESTE SQL EN SUPABASE SQL EDITOR
-- Panel Supabase → SQL Editor → New Query → Pegar esto → Run

-- ====================================
-- TABLAS PARA SISTEMA DE CRÉDITOS
-- ====================================

-- 1. Tabla: user_credits (Balance de créditos de cada usuario)
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  balance DECIMAL(10,2) DEFAULT 0 NOT NULL,
  total_purchased DECIMAL(10,2) DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. Tabla: credit_purchase_requests (Solicitudes de compra de créditos)
CREATE TABLE IF NOT EXISTS credit_purchase_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('bank_transfer', 'personal_wallet', 'cambio_chaco', 'cash')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  receipt_url TEXT,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla: credit_transactions (Historial de transacciones de créditos)
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'deduction', 'refund')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- ÍNDICES PARA MEJOR RENDIMIENTO
-- ====================================

CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_purchase_requests_user_id ON credit_purchase_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_purchase_requests_status ON credit_purchase_requests(status);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON credit_transactions(created_at DESC);

-- ====================================
-- ROW LEVEL SECURITY (RLS)
-- ====================================

-- Habilitar RLS
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_purchase_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- Políticas para user_credits
CREATE POLICY "Users can view their own credits"
  ON user_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
  ON user_credits FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credits"
  ON user_credits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Políticas para credit_purchase_requests
CREATE POLICY "Users can view their own requests"
  ON credit_purchase_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own requests"
  ON credit_purchase_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Políticas para credit_transactions
CREATE POLICY "Users can view their own transactions"
  ON credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- ====================================
-- STORAGE BUCKET PARA COMPROBANTES
-- ====================================

-- Crear bucket para comprobantes de pago
INSERT INTO storage.buckets (id, name, public)
VALUES ('credit-receipts', 'credit-receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Política de storage: usuarios pueden subir sus propios comprobantes
CREATE POLICY "Users can upload their own receipts"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'credit-receipts' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Política de storage: cualquiera puede ver comprobantes (admins necesitan acceso)
CREATE POLICY "Anyone can view receipts"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'credit-receipts');

-- ====================================
-- FUNCIONES HELPER
-- ====================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para user_credits
CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON user_credits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para credit_purchase_requests
CREATE TRIGGER update_credit_purchase_requests_updated_at
  BEFORE UPDATE ON credit_purchase_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- ✅ COMPLETADO
-- ====================================

-- Verificar que las tablas se crearon correctamente:
SELECT 
  'user_credits' as table_name, COUNT(*) as row_count 
FROM user_credits
UNION ALL
SELECT 
  'credit_purchase_requests', COUNT(*) 
FROM credit_purchase_requests
UNION ALL
SELECT 
  'credit_transactions', COUNT(*) 
FROM credit_transactions;

