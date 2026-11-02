-- Migration: Harden Study Hub Security & RLS
-- Date: 2026-11-02
-- Description: Revokes overly permissive public policies, adds strict RLS, and creates bcrypt-secured RPC functions.

-- 1. Enable pgcrypto for constant-time bcrypt hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Add secret_hash column for cryptographic verification
ALTER TABLE public.study_hub_sync ADD COLUMN IF NOT EXISTS secret_hash text;

-- 3. Drop insecure open policies allowing arbitrary anon read/write
DROP POLICY IF EXISTS "Allow public read on study_hub_sync" ON public.study_hub_sync;
DROP POLICY IF EXISTS "Allow public insert on study_hub_sync" ON public.study_hub_sync;
DROP POLICY IF EXISTS "Allow public update on study_hub_sync" ON public.study_hub_sync;

-- 4. Revoke direct SELECT, INSERT, UPDATE, DELETE from anon to prevent table dumping
REVOKE ALL ON public.study_hub_sync FROM anon;
REVOKE ALL ON public.study_hub_sync FROM public;

-- 5. Enable strict Row Level Security
ALTER TABLE public.study_hub_sync ENABLE ROW LEVEL SECURITY;

-- 6. Add authenticated policies (if Supabase Auth user session is present)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'study_hub_sync' AND policyname = 'Authenticated users can only select own study sync') THEN
    CREATE POLICY "Authenticated users can only select own study sync"
    ON public.study_hub_sync FOR SELECT TO authenticated
    USING (auth.uid()::text = user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'study_hub_sync' AND policyname = 'Authenticated users can only insert own study sync') THEN
    CREATE POLICY "Authenticated users can only insert own study sync"
    ON public.study_hub_sync FOR INSERT TO authenticated
    WITH CHECK (auth.uid()::text = user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'study_hub_sync' AND policyname = 'Authenticated users can only update own study sync') THEN
    CREATE POLICY "Authenticated users can only update own study sync"
    ON public.study_hub_sync FOR UPDATE TO authenticated
    USING (auth.uid()::text = user_id)
    WITH CHECK (auth.uid()::text = user_id);
  END IF;
END $$;

-- 7. Secure Server-Side RPC Functions for Cross-Device Synchronization
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
  -- Strict Input Validation
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
    -- First-time registration: hash secret with bcrypt (cost factor 8)
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
    -- Verify constant-time bcrypt hash
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

  -- Return sanitized record without exposing secret_hash
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

-- Grant execute permissions to anon and authenticated
GRANT EXECUTE ON FUNCTION public.push_study_hub_secure TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.pull_study_hub_secure TO anon, authenticated;
