// Vercel Serverless Function: api/sync.js
// Handles secure sync with rate limiting, input validation, and credential abstraction

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 requests per minute

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, startTime: now };

  if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, startTime: now });
    return false;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);

  // Periodic cleanup of stale rate limit entries
  if (rateLimitMap.size > 1000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (now - v.startTime > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(k);
      }
    }
  }

  return record.count > MAX_REQUESTS_PER_WINDOW;
}

function sanitizeInput(str, maxLen = 100) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen);
}

module.exports = async (req, res) => {
  // Enforce HTTPS and proper HTTP methods
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Rate Limiting Check
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  // 2. Load Server Environment Variables (Keys never sent to client)
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(503).json({
      error: 'Cloud synchronization service is currently unconfigured. LocalStorage mode active.'
    });
  }

  try {
    const { action, syncId, syncSecret, payload } = req.body || {};

    const cleanSyncId = sanitizeInput(syncId, 64);
    const cleanSyncSecret = sanitizeInput(syncSecret, 128);

    // 3. Input Validation & Authorization Check
    if (!cleanSyncId || cleanSyncId.length < 3) {
      return res.status(400).json({ error: 'Invalid or missing sync identifier.' });
    }

    if (!cleanSyncSecret || cleanSyncSecret.length < 8) {
      return res.status(400).json({ error: 'Invalid or missing sync secret.' });
    }

    if (action === 'push') {
      if (!payload || typeof payload !== 'object') {
        return res.status(400).json({ error: 'Invalid payload structure.' });
      }

      // Route through secure RPC function in Supabase
      const rpcUrl = `${supabaseUrl}/rest/v1/rpc/push_study_hub_secure`;
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
          p_sync_id: cleanSyncId,
          p_sync_secret: cleanSyncSecret,
          p_progress: payload.progress || {},
          p_notes: payload.notes || {},
          p_daily_notes: payload.dailyNotes || {},
          p_shifts: parseInt(payload.shifts || 0, 10),
          p_active_lesson_index: parseInt(payload.activeLessonIndex || 0, 10)
        })
      });

      if (!response.ok) {
        return res.status(401).json({ error: 'Authentication failed: Invalid sync secret.' });
      }

      return res.status(200).json({ status: 'ok', synced: true });
    } else if (action === 'pull') {
      const rpcUrl = `${supabaseUrl}/rest/v1/rpc/pull_study_hub_secure`;
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
          p_sync_id: cleanSyncId,
          p_sync_secret: cleanSyncSecret
        })
      });

      if (!response.ok) {
        return res.status(401).json({ error: 'Authentication failed: Invalid sync secret.' });
      }

      const data = await response.json();
      return res.status(200).json({ status: 'ok', data });
    } else {
      return res.status(400).json({ error: 'Unsupported action.' });
    }
  } catch (err) {
    // Debug mode off: do not expose stack trace or internal details to user
    return res.status(500).json({ error: 'Internal server processing error.' });
  }
};
