-- ==============================================================================
-- Migration: Complete Setup for AI/ML Study Hub (Isolated Dedicated Database)
-- Target Database: ai-ml-study-hub (Project Ref: jqfnqnddujndveorfges)
-- ==============================================================================

-- 1. Enable pgcrypto for secure bcrypt password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Create the study_hub_sync table
CREATE TABLE IF NOT EXISTS public.study_hub_sync (
  user_id text PRIMARY KEY,
  secret_hash text NOT NULL,
  progress jsonb DEFAULT '{}'::jsonb,
  notes jsonb DEFAULT '{}'::jsonb,
  daily_notes jsonb DEFAULT '{}'::jsonb,
  shifts integer DEFAULT 0,
  active_lesson_index integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.study_hub_sync ENABLE ROW LEVEL SECURITY;

-- 4. Enable Supabase Realtime for live cross-device updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.study_hub_sync;

-- 5. Revoke direct table operations from anon/public (Prevents data dumping)
REVOKE ALL ON public.study_hub_sync FROM anon;
REVOKE ALL ON public.study_hub_sync FROM public;

-- 6. Add authenticated user policies (for Supabase Auth if needed)
CREATE POLICY "Users can only read own study record"
  ON public.study_hub_sync FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can only insert own study record"
  ON public.study_hub_sync FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can only update own study record"
  ON public.study_hub_sync FOR UPDATE TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- 7. Secure RPC Function: push_study_hub_secure
CREATE OR REPLACE FUNCTION public.push_study_hub_secure(
  p_sync_id text,
  p_sync_secret text,
  p_progress jsonb DEFAULT '{}'::jsonb,
  p_notes jsonb DEFAULT '{}'::jsonb,
  p_daily_notes jsonb DEFAULT '{}'::jsonb,
  p_shifts integer DEFAULT 0,
  p_active_lesson_index integer DEFAULT 0
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_existing_hash text;
BEGIN
  IF p_sync_id IS NULL OR length(trim(p_sync_id)) < 3 OR length(p_sync_id) > 64 THEN
    RAISE EXCEPTION 'Invalid sync identifier: length must be between 3 and 64 characters';
  END IF;

  IF p_sync_secret IS NULL OR length(p_sync_secret) < 8 THEN
    RAISE EXCEPTION 'Sync secret must be at least 8 characters for security';
  END IF;

  SELECT secret_hash INTO v_existing_hash
  FROM public.study_hub_sync
  WHERE user_id = trim(p_sync_id);

  IF NOT FOUND THEN
    INSERT INTO public.study_hub_sync (
      user_id,
      secret_hash,
      progress,
      notes,
      daily_notes,
      shifts,
      active_lesson_index,
      updated_at
    ) VALUES (
      trim(p_sync_id),
      crypt(p_sync_secret, gen_salt('bf', 8)),
      COALESCE(p_progress, '{}'::jsonb),
      COALESCE(p_notes, '{}'::jsonb),
      COALESCE(p_daily_notes, '{}'::jsonb),
      COALESCE(p_shifts, 0),
      COALESCE(p_active_lesson_index, 0),
      now()
    );
    RETURN true;
  ELSE
    IF v_existing_hash IS NULL OR crypt(p_sync_secret, v_existing_hash) != v_existing_hash THEN
      RAISE EXCEPTION 'Authorization failed: Invalid sync secret';
    END IF;

    UPDATE public.study_hub_sync
    SET
      progress = COALESCE(p_progress, '{}'::jsonb),
      notes = COALESCE(p_notes, '{}'::jsonb),
      daily_notes = COALESCE(p_daily_notes, '{}'::jsonb),
      shifts = COALESCE(p_shifts, 0),
      active_lesson_index = COALESCE(p_active_lesson_index, 0),
      updated_at = now()
    WHERE user_id = trim(p_sync_id);

    RETURN true;
  END IF;
END;
$$;

-- 8. Secure RPC Function: pull_study_hub_secure
CREATE OR REPLACE FUNCTION public.pull_study_hub_secure(
  p_sync_id text,
  p_sync_secret text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_rec record;
BEGIN
  IF p_sync_id IS NULL OR length(trim(p_sync_id)) < 3 THEN
    RAISE EXCEPTION 'Invalid sync identifier';
  END IF;

  IF p_sync_secret IS NULL OR length(p_sync_secret) < 8 THEN
    RAISE EXCEPTION 'Invalid sync secret';
  END IF;

  SELECT * INTO v_rec
  FROM public.study_hub_sync
  WHERE user_id = trim(p_sync_id);

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'status', 'not_found',
      'message', 'No sync record found'
    );
  END IF;

  IF v_rec.secret_hash IS NULL OR crypt(p_sync_secret, v_rec.secret_hash) != v_rec.secret_hash THEN
    RAISE EXCEPTION 'Authorization failed: Invalid sync secret';
  END IF;

  RETURN jsonb_build_object(
    'status', 'ok',
    'progress', v_rec.progress,
    'notes', v_rec.notes,
    'daily_notes', v_rec.daily_notes,
    'shifts', v_rec.shifts,
    'active_lesson_index', v_rec.active_lesson_index,
    'updated_at', v_rec.updated_at
  );
END;
$$;

-- 9. Grant execute permissions to anon and authenticated for the secure RPCs
GRANT EXECUTE ON FUNCTION public.push_study_hub_secure TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.pull_study_hub_secure TO anon, authenticated;
