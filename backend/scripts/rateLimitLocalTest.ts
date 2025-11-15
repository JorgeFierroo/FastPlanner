import fetch from 'node-fetch';

const API = 'http://localhost:4001/api';

async function post(path: string, body: any) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, body: text };
}

(async () => {
  console.log('Starting local rate limit verification...');

  // 1) Simular una solicitud de registro
  const register = await post('/auth/register', { name: 'Rate Tester', email: 'local+rate@test', password: 'x' });
  console.log('register:', register.status);

  // 2) Hit login 12 times to trigger authLimiter (10 per 10 min)
  let overLimit = 0;
  for (let i = 1; i <= 12; i++) {
    const res = await post('/auth/login', { email: 'local+rate@test', password: 'x' });
    console.log(`login#${i}:`, res.status);
    if (res.status === 429) overLimit++;
  }

  // 3) Report summary
  if (overLimit > 0) {
    console.log(`OK: limiter triggered with ${overLimit} requests returning 429.`);
    process.exit(0);
  } else {
    console.error('FAIL: limiter did not trigger (no 429 received).');
    process.exit(1);
  }
})();
