export default function handler(req, res) {
  const size = 2 * 1024 * 1024;
  const buffer = Buffer.alloc(size, 'a');
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(buffer);
}