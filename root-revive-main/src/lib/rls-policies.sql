
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- PROFILES TABLE POLICIES
-- Users can view their own profile only
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile only
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Users can insert their own profile only
CREATE POLICY "Users can insert own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- ORDERS TABLE POLICIES
-- Users can view their own orders only
CREATE POLICY "Users can view own orders" 
ON orders FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own orders only
CREATE POLICY "Users can insert own orders" 
ON orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders only (limited - usually handled by admin)
CREATE POLICY "Users can update own orders" 
ON orders FOR UPDATE 
USING (auth.uid() = user_id AND status = 'draft');

-- ORDER_ITEMS TABLE POLICIES
-- Users can view their own order items only
CREATE POLICY "Users can view own order items" 
ON order_items FOR SELECT 
USING (auth.uid() IN (
  SELECT user_id FROM orders WHERE orders.id = order_items.order_id
));

-- Users can insert their own order items only
CREATE POLICY "Users can insert order items to own orders" 
ON order_items FOR INSERT 
WITH CHECK (auth.uid() IN (
  SELECT user_id FROM orders WHERE orders.id = order_items.order_id
));

-- PRODUCTS TABLE POLICIES
-- Everyone can view products
CREATE POLICY "Anyone can view products" 
ON products FOR SELECT 
USING (true);

-- CATEGORIES TABLE POLICIES
-- Everyone can view categories
CREATE POLICY "Anyone can view categories" 
ON categories FOR SELECT 
USING (true);

-- ADDRESSES TABLE POLICIES
-- Users can view their own addresses
CREATE POLICY "Users can view own addresses" 
ON addresses FOR SELECT 
USING (auth.uid() = user_id);

-- Users can insert their own addresses
CREATE POLICY "Users can insert own addresses" 
ON addresses FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own addresses
CREATE POLICY "Users can update own addresses" 
ON addresses FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own addresses (except default)
CREATE POLICY "Users can delete own non-default addresses" 
ON addresses FOR DELETE 
USING (auth.uid() = user_id AND is_default = false);
