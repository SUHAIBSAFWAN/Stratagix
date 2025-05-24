/*
  # Create content calendar tables

  1. New Tables
    - `content_items`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key to profiles)
      - `company_profile_id` (uuid, foreign key to company_profiles)
      - `title` (text)
      - `description` (text)
      - `content_type` (text) - e.g., 'image', 'video', 'article'
      - `platform` (text) - e.g., 'instagram', 'linkedin', 'both'
      - `scheduled_date` (timestamp)
      - `status` (text) - e.g., 'draft', 'scheduled', 'published'
      - `content_data` (jsonb) - Platform-specific content data
      - `performance_metrics` (jsonb) - Engagement, reach, etc.
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage their own data
*/

-- Create content_items table
CREATE TABLE IF NOT EXISTS content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_profile_id uuid REFERENCES company_profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  content_type text NOT NULL,
  platform text NOT NULL,
  scheduled_date timestamptz,
  status text NOT NULL DEFAULT 'draft',
  content_data jsonb DEFAULT '{}'::jsonb,
  performance_metrics jsonb DEFAULT '{
    "impressions": 0,
    "engagements": 0,
    "clicks": 0,
    "shares": 0
  }'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;

-- Create policies for content_items
CREATE POLICY "Users can view their own content items"
  ON content_items
  FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert their own content items"
  ON content_items
  FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update their own content items"
  ON content_items
  FOR UPDATE
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can delete their own content items"
  ON content_items
  FOR DELETE
  TO authenticated
  USING (profile_id = auth.uid());

-- Create trigger for updated_at
CREATE TRIGGER update_content_items_updated_at
BEFORE UPDATE ON content_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create index for scheduled_date for efficient calendar queries
CREATE INDEX idx_content_items_scheduled_date ON content_items(scheduled_date);