export default function handler(req, res) {
  // إعدادات الـ CORS لتجنب مشاكل الحماية في المتصفح
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();

  // توليد رقم عشوائي لمنع المتصفح من الاعتماد على الكاش
  const randomId = Math.random();
  
  // رابط التحميل الفعلي من شبكة Cloudflare (بحجم 25 ميغابايت كمثال للسرعة)
  const targetUrl = `https://speed.cloudflare.com/__down?bytes=25000000&r=${randomId}`;

  // إعادة توجيه الطلب (307) ليقوم المتصفح بإكمال التحميل من السيرفر الجديد
  res.setHeader('Location', targetUrl);
  return res.status(307).end();
}
