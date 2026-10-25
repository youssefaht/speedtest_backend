export const config = { api: { bodyParser: false } };

const MAX_BYTES = 4 * 1024 * 1024;

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const declaredLength = Number(req.headers['content-length'] || 0);
  if (declaredLength > MAX_BYTES) {
    return res.status(413).json({ error: 'Upload too large', maxBytes: MAX_BYTES });
  }

  let received = 0;
  let finished = false;
  req.on('data', chunk => {
    received += chunk.length;
    if (received > MAX_BYTES && !finished) {
      finished = true;
      res.status(413).json({ error: 'Upload too large', maxBytes: MAX_BYTES });
      req.resume();
    }
  });
  req.on('end', () => {
    if (finished) return;
    finished = true;
    return res.status(200).json({ received });
  });
  req.on('error', () => {
    if (finished || res.headersSent) return;
    finished = true;
    return res.status(400).json({ error: 'Could not read upload body' });
  });
}
