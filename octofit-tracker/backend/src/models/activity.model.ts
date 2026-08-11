import { Schema, model, Types } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    activityType: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'strength', 'yoga'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    loggedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Activity = model('Activity', activitySchema);
