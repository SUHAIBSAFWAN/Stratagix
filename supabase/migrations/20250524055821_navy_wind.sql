/*
  # Create trend analysis tables

  1. New Tables
    - `trends`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text) - e.g., 'Business', 'Content', 'Strategy'
      - `platform` (text) - e.g., 'instagram', 'linkedin', 'both'
      - `description` (text)
      - `relevance` (integer) - 0-100 score
      - `growth` (integer) - percentage growth
      - `momentum` (text) - e.g., 'rising', 'stable', 'declining'
      - `hashtags` (text[])
      - `examples` (jsonb[]) - Array of example content
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `saved_trends`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key to profiles)
      - `trend_id` (uuid, foreign key to trends)
      - `notes` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS
    - All users can read trends, but only save their own
*/

-- Create trends table
CREATE TABLE IF NOT EXISTS trends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  platform text NOT NULL,
  description text,
  relevance integer NOT NULL CHECK (relevance BETWEEN 0 AND 100),
  growth integer NOT NULL,
  momentum text NOT NULL,
  hashtags text[] DEFAULT '{}'::text[],
  examples jsonb[] DEFAULT '{}'::jsonb[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create saved_trends table for user bookmarks
CREATE TABLE IF NOT EXISTS saved_trends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  trend_id uuid NOT NULL REFERENCES trends(id) ON DELETE CASCADE,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(profile_id, trend_id)
);

-- Enable Row Level Security
ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_trends ENABLE ROW LEVEL SECURITY;

-- Create policies for trends (everyone can read)
CREATE POLICY "All users can view trends"
  ON trends
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for saved_trends
CREATE POLICY "Users can view their own saved trends"
  ON saved_trends
  FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can save trends"
  ON saved_trends
  FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can delete their own saved trends"
  ON saved_trends
  FOR DELETE
  TO authenticated
  USING (profile_id = auth.uid());

-- Create trigger for updated_at
CREATE TRIGGER update_trends_updated_at
BEFORE UPDATE ON trends
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create index for category and platform for efficient filtering
CREATE INDEX idx_trends_category ON trends(category);
CREATE INDEX idx_trends_platform ON trends(platform);