/*
  # Create contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `subject` (text, required)
      - `message` (text, required)
      - `created_at` (timestamp)
      - `read` (boolean, default false)

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for service role to manage all data
    - No public access (admin only)
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Only service role can access contact messages (for admin purposes)
CREATE POLICY "Service role can manage contact messages"
  ON contact_messages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);