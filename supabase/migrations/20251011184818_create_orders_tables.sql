/*
  # Create orders and order_items tables

  1. New Tables
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `customer_name` (text) - Full name of customer
      - `customer_email` (text) - Customer email address
      - `customer_phone` (text, nullable) - Customer phone number
      - `shipping_address` (text) - Delivery address
      - `shipping_city` (text) - City for delivery
      - `shipping_postal_code` (text) - Postal code
      - `shipping_country` (text) - Country (default: Danmark)
      - `shipping_method` (text) - Shipping method chosen
      - `payment_method` (text) - Payment method chosen
      - `subtotal` (numeric) - Subtotal amount
      - `shipping_cost` (numeric) - Shipping cost
      - `total_amount` (numeric) - Total order amount
      - `status` (text) - Order status (default: pending)
      - `created_at` (timestamptz) - Order creation timestamp

    - `order_items`
      - `id` (uuid, primary key) - Unique item identifier
      - `order_id` (uuid, foreign key) - References orders table
      - `product_type` (text) - Product type (tshirt/hoodie)
      - `product_name` (text) - Product name
      - `size` (text) - Size selected
      - `color` (text) - Color selected
      - `quantity` (integer) - Quantity ordered
      - `unit_price` (numeric) - Price per unit
      - `total_price` (numeric) - Total price for this item
      - `artwork_url` (text, nullable) - URL to custom artwork if uploaded
      - `created_at` (timestamptz) - Item creation timestamp

  2. Security
    - Enable RLS on both tables
    - Add policy for authenticated service role to insert orders
    - Add policy for authenticated service role to insert order items
    - Orders are only accessible by service role (not public)
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
  subtotal numeric NOT NULL,
  shipping_cost numeric NOT NULL,
  total_amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_type text NOT NULL,
  product_name text NOT NULL,
  size text NOT NULL,
  color text NOT NULL,
  quantity integer NOT NULL,
  unit_price numeric NOT NULL,
  total_price numeric NOT NULL,
  artwork_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies for orders table (service role only)
CREATE POLICY "Service role can insert orders"
  ON orders FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can select orders"
  ON orders FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update orders"
  ON orders FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete orders"
  ON orders FOR DELETE
  TO service_role
  USING (true);

-- Policies for order_items table (service role only)
CREATE POLICY "Service role can insert order items"
  ON order_items FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can select order items"
  ON order_items FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update order items"
  ON order_items FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete order items"
  ON order_items FOR DELETE
  TO service_role
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);