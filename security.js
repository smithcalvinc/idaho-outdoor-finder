import crypto from 'node:crypto';

export function safeEqual(value, expected) {
  if (!value || !expected) return false;
  const a=Buffer.from(String(value));
  const b=Buffer.from(String(expected));
  return a.length===b.length && crypto.timingSafeEqual(a,b);
}

export function bearerToken(request) {
  const value=request.headers.get('authorization')||'';
  return value.toLowerCase().startsWith('bearer ')?value.slice(7).trim():'';
}

export function cleanText(value, maxLength) {
  return String(value||'').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim().slice(0,maxLength);
}
