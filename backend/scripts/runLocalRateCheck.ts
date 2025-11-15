import fetch from 'node-fetch';
import { createRateApp } from './simpleRateServer';

async function post(api: string, path: string, body: any) {
  const res = await fetch(`${api}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, body: text };
}

(async () => {
  const PORT = 4001;
  const API = `http://localhost:${PORT}/api`;

  const app = createRateApp();
  const server = app.listen(PORT);
  console.log(`Started local test server on ${PORT}`);

  try {
    console.log('Starting local rate limit verification...');

    // 1) Simular una solicitud de registro
    const register = await post(API, '/auth/register', { name: 'Rate Tester', email: 'local+rate@test', password: 'x' });
    console.log('register:', register.status);

    // 2) Hit login 12 times to trigger authLimiter (10 per 10 min)
    let overLimit = 0;
    for (let i = 1; i <= 12; i++) {
      const res = await post(API, '/auth/login', { email: 'local+rate@test', password: 'x' });
      console.log(`login#${i}:`, res.status);
      if (res.status === 429) overLimit++;
    }

    // 3) Report summary
    if (overLimit > 0) {
      console.log(`OK: limiter triggered with ${overLimit} requests returning 429.`);
      process.exitCode = 0;
    } else {
      console.error('FAIL: limiter did not trigger (no 429 received).');
      process.exitCode = 1;
    }
  } catch (err) {
    console.error('Error during test:', err);
    process.exitCode = 2;
  } finally {
    server.close();
  }
})();
