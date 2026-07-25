/*
# Add lessons table for LMS curriculum

## Overview
Creates a `lessons` table to store curriculum content for each program,
enabling the LMS lesson pages and progress tracking.

## New Table

1. **lessons** — Individual lessons within a program curriculum
   - id (uuid, PK)
   - program_id (uuid, references programs, ON DELETE CASCADE)
   - module_number (int — which module/week the lesson belongs to)
   - lesson_number (int — order within the module)
   - title (text)
   - description (text)
   - content (text — markdown/lesson body)
   - lesson_type (enum: video, reading, quiz, project)
   - duration_minutes (int)
   - is_preview (boolean — freely viewable without enrollment)
   - created_at (timestamp)

## Security (RLS)
- lessons: publicly readable (anon + authenticated) so course catalogs work without login.
*/

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  module_number int NOT NULL DEFAULT 1,
  lesson_number int NOT NULL DEFAULT 1,
  title text NOT NULL,
  description text,
  content text,
  lesson_type text NOT NULL DEFAULT 'video' CHECK (lesson_type IN ('video', 'reading', 'quiz', 'project')),
  duration_minutes int DEFAULT 10,
  is_preview boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_lessons" ON lessons;
CREATE POLICY "anon_read_lessons" ON lessons FOR SELECT
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_lessons_program_id ON lessons(program_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_number, lesson_number);
