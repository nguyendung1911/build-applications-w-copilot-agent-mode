import express from 'express';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'octofit-backend',
    port,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend running on http://localhost:${port}`);
});
