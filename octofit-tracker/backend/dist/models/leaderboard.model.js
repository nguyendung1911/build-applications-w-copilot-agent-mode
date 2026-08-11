import { Schema, model, Types } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
}, { _id: false });
const leaderboardSchema = new Schema({
    period: { type: String, enum: ['weekly', 'monthly'], required: true, unique: true },
    rankings: { type: [leaderboardEntrySchema], default: [] },
}, { timestamps: true });
export const Leaderboard = model('Leaderboard', leaderboardSchema);
