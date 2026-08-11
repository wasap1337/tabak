-- ============================================================
-- Табачок-Оптовичок — SQL для Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('cigars', 'tobacco', 'hookah', 'accessories')),
    description TEXT,
    price INTEGER NOT NULL CHECK (price >= 0),
    old_price INTEGER CHECK (old_price >= 0),
    image TEXT,
    badge TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    city TEXT,
    product TEXT,
    volume TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Auth write products" ON products FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth read messages" ON messages FOR SELECT USING (auth.role() = 'authenticated');

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_messages_created ON messages(created_at DESC);

INSERT INTO products (name, category, description, price, old_price, image, badge, is_active) VALUES
('Must Have — Blueberry', 'tobacco', 'Табак премиум-класса с насыщенным вкусом черники. 125 грамм.', 890, 1100, 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&q=80', 'ХИТ', true),
('Dark Side — Core Line', 'tobacco', 'Крепкий табак для ценителей насыщенного дыма. 100 грамм.', 750, null, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', null, true),
('Al Fakher — Double Apple', 'tobacco', 'Классический вкус двойного яблока. 250 грамм.', 650, 800, 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&q=80', 'СКИДКА', true),
('Alpha Hookah Model X', 'hookah', 'Элитный кальян из нержавеющей стали. Уникальный дизайн.', 18500, 22000, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', 'ТОП', true),
('Maklaud Dzen', 'hookah', 'Компактный кальян для домашнего использования.', 12000, null, 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=400&q=80', null, true),
('Cohiba Behike 52', 'cigars', 'Премиальная сигара из Кубы. Насыщенный вкус.', 4500, 5200, 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80', 'VIP', true),
('XiKAR Xi1 Cutter', 'accessories', 'Гильотина для сигар с двойными лезвиями.', 4200, 5500, 'https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?w=400&q=80', 'СКИДКА', true),
('S.T. Dupont Ligne 2', 'accessories', 'Зажигалка премиум-класса с характерным звонком.', 95000, null, 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80', 'VIP', true);
