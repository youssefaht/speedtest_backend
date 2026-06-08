// api/upload.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // لازم نقرأ الـ body الفعلي عشان يُحسب upload حقيقي
  let received = 0;
  req.on('data', chunk => { received += chunk.length; });
  req.on('end', () => {
    res.json({ received });
  });
  req.on('error', () => res.status(500).end());
}