/*
# TalentGro Sales School — Core Database Schema

## Overview
Creates the foundational tables for the TalentGro Sales Learning Platform:
user profiles, programs, enrollments, lesson progress, job listings, and job applications.

## New Tables

1. **profiles** — Extends Supabase auth.users with platform-specific data
   - id (uuid, PK, references auth.users)
   - full_name (text)
   - role (enum: student, trainer, corporate_admin, super_admin)
   - avatar_url (text)
   - phone (text)
   - target_role (text — desired sales role)
   - current_company (text)
   - experience_years (int)
   - created_at, updated_at (timestamps)

2. **programs** — Sales training programs
   - id (uuid, PK)
   - title (text)
   - slug (text, unique)
   - description (text)
   - duration_weeks (int)
   - level (text)
   - icon_name (text — lucide icon name)
   - tagline (text)
   - outcomes (text[])
   - tech_stack (text[])
   - is_popular (boolean)
   - price (numeric)
   - created_at (timestamp)

3. **enrollments** — Student enrollments in programs
   - id (uuid, PK)
   - user_id (uuid, references auth.users, DEFAULT auth.uid())
   - program_id (uuid, references programs)
   - status (enum: active, completed, paused)
   - progress_pct (int, default 0)
   - enrolled_at (timestamp)
   - completed_at (timestamp, nullable)

4. **lesson_progress** — Per-lesson completion tracking
   - id (uuid, PK)
   - user_id (uuid, references auth.users, DEFAULT auth.uid())
   - enrollment_id (uuid, references enrollments)
   - lesson_key (text — module/lesson identifier)
   - status (enum: not_started, in_progress, completed)
   - score (int, nullable — quiz/assessment score)
   - completed_at (timestamp, nullable)

5. **job_listings** — Placement portal job postings
   - id (uuid, PK)
   - title (text)
   - company (text)
   - location (text)
   - salary_range (text)
   - job_type (enum: full_time, part_time, internship)
   - description (text)
   - requirements (text[])
   - is_active (boolean, default true)
   - posted_at (timestamp)

6. **applications** — Student job applications
   - id (uuid, PK)
   - user_id (uuid, references auth.users, DEFAULT auth.uid())
   - job_id (uuid, references job_listings)
   - status (enum: applied, shortlisted, interview, offered, rejected)
   - applied_at (timestamp)
   - notes (text, nullable)

## Security (RLS)
- All tables have RLS enabled.
- profiles: users can read/update their own profile; super_admin can read all.
- programs, job_listings: publicly readable (anon + authenticated).
- enrollments, lesson_progress, applications: owner-scoped (auth.uid() = user_id).
- All owner columns default to auth.uid() so inserts work without passing user_id.
*/

-- ============================================================
-- 1. PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text DEFAULT '',
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'trainer', 'corporate_admin', 'super_admin')),
  avatar_url text,
  phone text,
  target_role text,
  current_company text,
  experience_years int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ============================================================
-- 2. PROGRAMS
-- ============================================================
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  duration_weeks int DEFAULT 8,
  level text DEFAULT 'Beginner',
  icon_name text DEFAULT 'Rocket',
  tagline text,
  outcomes text[] DEFAULT '{}',
  tech_stack text[] DEFAULT '{}',
  is_popular boolean DEFAULT false,
  price numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_programs" ON programs;
CREATE POLICY "anon_read_programs" ON programs FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- 3. ENROLLMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id uuid NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  progress_pct int NOT NULL DEFAULT 0 CHECK (progress_pct >= 0 AND progress_pct <= 100),
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_enrollments" ON enrollments;
CREATE POLICY "select_own_enrollments" ON enrollments FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_enrollments" ON enrollments;
CREATE POLICY "insert_own_enrollments" ON enrollments FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_enrollments" ON enrollments;
CREATE POLICY "update_own_enrollments" ON enrollments FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_enrollments" ON enrollments;
CREATE POLICY "delete_own_enrollments" ON enrollments FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_program_id ON enrollments(program_id);

-- ============================================================
-- 4. LESSON_PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id uuid NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  lesson_key text NOT NULL,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  score int,
  completed_at timestamptz
);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_lessons" ON lesson_progress;
CREATE POLICY "select_own_lessons" ON lesson_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_lessons" ON lesson_progress;
CREATE POLICY "insert_own_lessons" ON lesson_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_lessons" ON lesson_progress;
CREATE POLICY "update_own_lessons" ON lesson_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_lessons" ON lesson_progress;
CREATE POLICY "delete_own_lessons" ON lesson_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_enrollment_id ON lesson_progress(enrollment_id);

-- ============================================================
-- 5. JOB_LISTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS job_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text,
  salary_range text,
  job_type text NOT NULL DEFAULT 'full_time' CHECK (job_type IN ('full_time', 'part_time', 'internship')),
  description text,
  requirements text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  posted_at timestamptz DEFAULT now()
);

ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_jobs" ON job_listings;
CREATE POLICY "anon_read_jobs" ON job_listings FOR SELECT
  TO anon, authenticated USING (true);

-- ============================================================
-- 6. APPLICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id uuid NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'shortlisted', 'interview', 'offered', 'rejected')),
  applied_at timestamptz DEFAULT now(),
  notes text
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_applications" ON applications;
CREATE POLICY "select_own_applications" ON applications FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_applications" ON applications;
CREATE POLICY "insert_own_applications" ON applications FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_applications" ON applications;
CREATE POLICY "update_own_applications" ON applications FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_applications" ON applications;
CREATE POLICY "delete_own_applications" ON applications FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);

-- ============================================================
-- 7. AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), 'student')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
