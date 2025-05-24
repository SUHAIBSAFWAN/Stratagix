/*
  # Create company profiles tables

  1. New Tables
    - `company_profiles`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key to profiles)
      - `name` (text)
      - `description` (text)
      - `mission` (text)
      - `audience` (jsonb) - Contains demographics, interests, pain points
      - `brand_voice` (jsonb) - Contains tone, personality, values
      - `competitors` (text[])
      - `visual_elements` (jsonb) - Contains colors, typography, image style
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create company_profiles table
CREATE TABLE IF NOT EXISTS company_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  mission text,
  audience jsonb DEFAULT '{
    "demographics": "",
    "interests": "",
    "painPoints": ""
  }'::jsonb,
  brand_voice jsonb DEFAULT '{
    "tone": "",
    "personality": "",
    "values": ""
  }'::jsonb,
  competitors text[] DEFAULT '{}'::text[],
  visual_elements jsonb DEFAULT '{
    "primaryColor": "#1E40AF",
    "secondaryColor": "#60A5FA",
    "typography": "",
    "imageStyle": ""
  }'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE company_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for company_profiles
CREATE POLICY "Users can view their own company profiles"
  ON company_profiles
  FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can insert their own company profiles"
  ON company_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update their own company profiles"
  ON company_profiles
  FOR UPDATE
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can delete their own company profiles"
  ON company_profiles
  FOR DELETE
  TO authenticated
  USING (profile_id = auth.uid());

-- Create trigger for updated_at
CREATE TRIGGER update_company_profiles_updated_at
BEFORE UPDATE ON company_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();