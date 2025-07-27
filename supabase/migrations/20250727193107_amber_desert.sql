/*
  # Create orders and order_items tables

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `shipping_address` (text)
      - `shipping_city` (text)
      - `shipping_postal_code` (text)
      - `shipping_country` (text)
      - `shipping_method` (text)
      - `payment_method` (text)
      - `subtotal` (decimal)
      - `shipping_cost` (decimal)
      - `total_amount` (decimal)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `product_type` (text) - 'tshirt' or 'hoodie'
      - `product_name` (text) - 'T-shirt' or 'Hoodie'
      - `size` (text) - XS, S, M, L, XL, XXL
      - `color` (text) - product color
      - `quantity` (integer)
      - `unit_price` (decimal)
      - `total_price` (decimal)
      - `artwork_url` (text, nullable) - URL to uploaded design
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for service role to manage orders
    - Add policies for authenticated users to read their own orders

  3. Indexes
    - Add indexes for better query performance on common lookups
*/

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  shipping_address text NOT NULL,
  shipping_city text NOT NULL,
  shipping_postal_code text NOT NULL,
  shipping_country text NOT NULL DEFAULT 'Danmark',
  shipping_method text NOT NULL DEFAULT 'standard',
  payment_method text NOT NULL DEFAULT 'dankort',
  subtotal decimal(10,2) NOT NULL DEFAULT 0,
  shipping_cost decimal(10,2) NOT NULL DEFAULT 0,
  total_amount decimal(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_type text NOT NULL,
  product_name text NOT NULL,
  size text NOT NULL,
  color text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  artwork_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for orders table
CREATE POLICY "Service role can manage all orders"
  ON orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (customer_email = auth.jwt() ->> 'email');

-- Create policies for order_items table
CREATE POLICY "Service role can manage all order items"
  ON order_items
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read their own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.customer_email = auth.jwt() ->> 'email'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at on orders
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_orders_updated_at'
  ) THEN
    CREATE TRIGGER update_orders_updated_at
      BEFORE UPDATE ON orders
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;