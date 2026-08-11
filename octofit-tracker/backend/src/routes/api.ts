import { Router } from 'express';
import { getBaseUrl } from '../config/baseUrl.js';

export function createApiRouter(port: number): Router {
  const router = Router();

  router.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'octofit-backend',
      port,
      baseUrl: getBaseUrl(port),
    });
  });

  return router;
}
