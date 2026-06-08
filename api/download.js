// api/download.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Content-Type', 'application/octet-stream');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // حجم حقيقي: 16MB بدل 2MB مع إصلاح الحساب في الفرونت
  const MB = parseInt(req.query.size) || 16;
  const size = MB * 1024 * 1024;
  const buffer = Buffer.alloc(size, 0xff);

  res.setHeader('Content-Length', size);
  res.send(buffer);
}