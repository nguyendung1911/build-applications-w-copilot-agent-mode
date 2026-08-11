import cors from 'cors';
import express from 'express';
import './config/database.js';
import { createApiRouter } from './routes/api.js';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    codespaceName ? `https://${codespaceName}-5173.app.github.dev` : '',
    codespaceName ? `https://${codespaceName}-5174.app.github.dev` : '',
].filter(Boolean);
app.use(cors({
    origin: allowedOrigins,
}));
app.use(express.json());
app.use('/api', createApiRouter(port));
app.get('/', (_req, res) => {
    res.status(200).json({
        name: 'octofit-backend',
        port,
        apiHealth: `${baseUrl}/api/health`,
    });
});
app.listen(port, () => {
    console.log(`OctoFit backend running on ${baseUrl}`);
});
