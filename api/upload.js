// تعطيل معالجة البيانات داخل Vercel لأننا سنوجهها لـ Cloudflare مباشرة
export const config = { api: { bodyParser: false } };

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const randomId = Math.random();
  const targetUrl = `https://speed.cloudflare.com/__up?r=${randomId}`;

  // توجيه الطلب (307) لنقل حزمة الرفع (Payload) مباشرة إلى Cloudflare
  res.setHeader('Location', targetUrl);
  return res.status(307).end();
}
