const MAX_BYTES = 4 * 1024 * 1024;
const DEFAULT_BYTES = 1024 * 1024;

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const requested = Number.parseInt(req.query.bytes ?? req.query.size, 10);
  const bytes = Number.isFinite(requested)
    ? Math.min(MAX_BYTES, Math.max(1, requested))
    : DEFAULT_BYTES;

  // Keep each serverless response below Vercel's response payload limit.
  const payload = Buffer.alloc(bytes, 0x61);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Length', String(bytes));
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method === 'HEAD') return res.status(200).end();
  return res.status(200).send(payload);
}
