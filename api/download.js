async function runDownload() {
  // إضافة رقم عشوائي (Math.random) لمنع المتصفح من قراءة الملف من الكاش تماماً
  const url = `https://speed.cloudflare.com/__down?bytes=25000000&r=${Math.random()}`;
  
  const startedAt = performance.now();
  const response = await fetch(url, { cache: 'no-store' });
  
  if (!response.ok) throw new Error('Download failed');
  
  // استخدام Stream لقراءة البيانات تدريجياً وقياس سرعة الشبكة الحقيقية
  const reader = response.body.getReader();
  let receivedLength = 0;
  
  while(true) {
    const {done, value} = await reader.read();
    if (done) break;
    // حساب حجم البيانات المستقبلة فعلياً
    receivedLength += value.length; 
  }
  
  const elapsedSeconds = (performance.now() - startedAt) / 1000;
  
  // حساب السرعة بالميجابت في الثانية
  return ((receivedLength * 8) / elapsedSeconds / 1_000_000).toFixed(2);
}
