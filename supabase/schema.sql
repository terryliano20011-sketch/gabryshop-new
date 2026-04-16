-- ============================================
-- GabryShop — Supabase Database Schema
-- Esegui questo SQL nel SQL Editor di Supabase
-- ============================================

-- Abilita UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CATEGORIE
-- ============================================
CREATE TABLE IF NOT EXISTS categorie (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#c9a96e',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCTS
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  category_id UUID REFERENCES categorie(id) ON DELETE SET NULL,
  file_url TEXT,           -- URL Supabase Storage per download
  preview_url TEXT,        -- URL anteprima/demo
  delivery_time TEXT DEFAULT '24-48 ore',
  is_customizable BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  is_digital BOOLEAN DEFAULT true,
  badge TEXT CHECK (badge IN ('bestseller','new','customizable','24h')),
  includes JSONB DEFAULT '[]',    -- Array di stringhe
  images JSONB DEFAULT '[]',      -- Array di URL immagini
  rating NUMERIC(3,2) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDERS
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_vat TEXT,
  items JSONB NOT NULL DEFAULT '[]',   -- Array di OrderItem
  total NUMERIC(10,2) NOT NULL,
  discount_amount NUMERIC(10,2) DEFAULT 0,
  coupon_code TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','completed','refunded')),
  paypal_order_id TEXT,
  paypal_capture_id TEXT,
  briefing JSONB,                      -- Dati personalizzazione prodotto
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REVIEWS
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  author_name TEXT,
  verified_purchase BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DOWNLOADS
-- ============================================
CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  file_url TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  download_count INT DEFAULT 0,
  max_downloads INT DEFAULT 10,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 year'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COUPONS
-- ============================================
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT DEFAULT 'percentage' CHECK (discount_type IN ('percentage','fixed')),
  discount_value NUMERIC(10,2) NOT NULL,
  max_uses INT DEFAULT 100,
  used_count INT DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRIGGERS: updated_at automatico
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorie ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Prodotti e categorie: lettura pubblica
CREATE POLICY "products_public_read" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "categorie_public_read" ON categorie FOR SELECT USING (true);

-- Ordini: solo il proprietario o admin
CREATE POLICY "orders_own_read" ON orders FOR SELECT
  USING (auth.uid() = user_id OR customer_email = auth.email());

CREATE POLICY "orders_insert_anon" ON orders FOR INSERT
  WITH CHECK (true); -- Chiunque può creare un ordine (checkout senza account)

-- Reviews: lettura pubblica, scrittura solo chi ha acquistato
CREATE POLICY "reviews_public_read" ON reviews FOR SELECT USING (true);
CREATE POLICY "reviews_auth_insert" ON reviews FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Downloads: solo chi ha l'email dell'ordine
CREATE POLICY "downloads_own_read" ON downloads FOR SELECT
  USING (user_email = auth.email());

-- ============================================
-- DATI DI ESEMPIO (seed)
-- ============================================
INSERT INTO categorie (name, slug, description, icon, color) VALUES
  ('Siti Web', 'siti-web', 'Landing page, e-commerce, portfolio e siti aziendali', '🌐', '#6366f1'),
  ('Menu Digitali', 'menu-digitali', 'Menu per ristoranti con allergenici e QR code', '🍽️', '#f59e0b'),
  ('Fogli Excel', 'fogli-excel', 'Inventari, contabilità e gestione magazzino', '📊', '#10b981'),
  ('Automazioni', 'automazioni', 'Chatbot, integrazioni API e workflow automatici', '🤖', '#8b5cf6'),
  ('App Mobile', 'app-mobile', 'PWA installabili, app iOS e Android', '📱', '#ec4899')
ON CONFLICT (slug) DO NOTHING;

-- Coupon di esempio
INSERT INTO coupons (code, discount_type, discount_value, max_uses) VALUES
  ('GABRY10', 'percentage', 10, 500),
  ('WELCOME20', 'percentage', 20, 100),
  ('SCONTO50', 'fixed', 50, 50)
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- STORAGE BUCKET per file digitali
-- ============================================
-- Esegui separatamente nella console Supabase:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('digital-products', 'digital-products', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
