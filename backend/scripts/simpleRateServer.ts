import express from 'express';
import { authLimiter } from '../src/middleware/rateLimit';

export function createRateApp() {
  const app = express();
  app.use(express.json());

  app.post('/api/auth/register', authLimiter, (req, res) => {
    res.status(201).json({ message: 'registered' });
  });

  app.post('/api/auth/login', authLimiter, (req, res) => {
    res.status(200).json({ message: 'logged' });
  });

  return app;
}

if (require.main === module) {
  const PORT = process.env.RATE_TEST_PORT ? Number(process.env.RATE_TEST_PORT) : 4001;
  const app = createRateApp();
  app.listen(PORT, () => {
    console.log(`Test rate server listening on http://localhost:${PORT}`);
  });
}
