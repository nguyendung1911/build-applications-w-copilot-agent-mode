import express from 'express';
import './config/database.js';
import { getBaseUrl } from './config/baseUrl.js';
import { createApiRouter } from './routes/api.js';
const app = express();
const port = 8000;
app.use(express.json());
app.use('/api', createApiRouter(port));
app.get('/', (_req, res) => {
    res.status(200).json({
        name: 'octofit-backend',
        port,
        apiHealth: `${getBaseUrl(port)}/api/health`,
    });
});
app.listen(port, () => {
    console.log(`OctoFit backend running on ${getBaseUrl(port)}`);
});
