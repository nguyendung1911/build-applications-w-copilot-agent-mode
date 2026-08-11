import { Router } from 'express';
import { Activity } from '../models/activity.model.js';
import { getBaseUrl } from '../config/baseUrl.js';
import { User } from '../models/user.model.js';

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

  router.get('/users', async (_req, res) => {
    try {
      const users = await User.find().sort({ createdAt: -1 }).lean();

      res.status(200).json({
        baseUrl: getBaseUrl(port),
        endpoint: `${getBaseUrl(port)}/api/users`,
        count: users.length,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch users',
        error: (error as Error).message,
      });
    }
  });

  router.get('/activities', async (_req, res) => {
    try {
      const activities = await Activity.find()
        .populate('user', 'name email fitnessLevel')
        .sort({ loggedAt: -1 })
        .lean();

      res.status(200).json({
        baseUrl: getBaseUrl(port),
        endpoint: `${getBaseUrl(port)}/api/activities`,
        count: activities.length,
        data: activities,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch activities',
        error: (error as Error).message,
      });
    }
  });

  return router;
}
