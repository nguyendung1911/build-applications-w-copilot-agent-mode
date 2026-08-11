import mongoose from 'mongoose';
import { Activity } from '../models/activity.model.js';
import { Leaderboard } from '../models/leaderboard.model.js';
import { Team } from '../models/team.model.js';
import { User } from '../models/user.model.js';
import { Workout } from '../models/workout.model.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.insertMany([
            {
                name: 'Alex Nguyen',
                email: 'alex@octofit.dev',
                age: 28,
                fitnessLevel: 'intermediate',
            },
            {
                name: 'Linh Tran',
                email: 'linh@octofit.dev',
                age: 25,
                fitnessLevel: 'beginner',
            },
            {
                name: 'Marco Le',
                email: 'marco@octofit.dev',
                age: 31,
                fitnessLevel: 'advanced',
            },
        ]);
        await Team.insertMany([
            {
                name: 'Octo Striders',
                description: 'Cardio-focused crew',
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Lift Legends',
                description: 'Strength-first team',
                members: [users[2]._id],
            },
        ]);
        await Activity.insertMany([
            {
                user: users[0]._id,
                activityType: 'run',
                durationMinutes: 42,
                caloriesBurned: 420,
            },
            {
                user: users[1]._id,
                activityType: 'yoga',
                durationMinutes: 30,
                caloriesBurned: 120,
            },
            {
                user: users[2]._id,
                activityType: 'strength',
                durationMinutes: 55,
                caloriesBurned: 510,
            },
            {
                user: users[0]._id,
                activityType: 'cycle',
                durationMinutes: 36,
                caloriesBurned: 360,
            },
        ]);
        await Workout.insertMany([
            {
                title: 'Starter Full Body',
                goal: 'strength',
                difficulty: 'beginner',
                durationMinutes: 35,
            },
            {
                title: 'Endurance Tempo Ride',
                goal: 'endurance',
                difficulty: 'intermediate',
                durationMinutes: 50,
            },
            {
                title: 'Mobility Reset Flow',
                goal: 'mobility',
                difficulty: 'beginner',
                durationMinutes: 25,
            },
        ]);
        await Leaderboard.create({
            period: 'weekly',
            rankings: [
                { user: users[2]._id, score: 980 },
                { user: users[0]._id, score: 910 },
                { user: users[1]._id, score: 640 },
            ],
        });
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
