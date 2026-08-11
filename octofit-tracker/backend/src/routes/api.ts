import { Router } from 'express';
import { Activity } from '../models/activity.model.js';
import { getBaseUrl } from '../config/baseUrl.js';
import { Leaderboard } from '../models/leaderboard.model.js';
import { Team } from '../models/team.model.js';
import { User } from '../models/user.model.js';
import { Workout } from '../models/workout.model.js';

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

  router.get('/teams', async (_req, res) => {
    try {
      const teams = await Team.find()
        .populate('members', 'name email fitnessLevel')
        .sort({ createdAt: -1 })
        .lean();

      res.status(200).json({
        baseUrl: getBaseUrl(port),
        endpoint: `${getBaseUrl(port)}/api/teams`,
        count: teams.length,
        data: teams,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch teams',
        error: (error as Error).message,
      });
    }
  });

  router.get('/leaderboard', async (_req, res) => {
    try {
      const leaderboard = await Leaderboard.find()
        .populate('rankings.user', 'name email fitnessLevel')
        .sort({ createdAt: -1 })
        .lean();

      res.status(200).json({
        baseUrl: getBaseUrl(port),
        endpoint: `${getBaseUrl(port)}/api/leaderboard`,
        count: leaderboard.length,
        data: leaderboard,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch leaderboard',
        error: (error as Error).message,
      });
    }
  });

  router.get('/workouts', async (_req, res) => {
    try {
      const workouts = await Workout.find().sort({ createdAt: -1 }).lean();

      res.status(200).json({
        baseUrl: getBaseUrl(port),
        endpoint: `${getBaseUrl(port)}/api/workouts`,
        count: workouts.length,
        data: workouts,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to fetch workouts',
        error: (error as Error).message,
      });
    }
  });

  return router;
}
