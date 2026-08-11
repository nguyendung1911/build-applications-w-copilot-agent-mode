import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    goal: {
      type: String,
      enum: ['fat-loss', 'endurance', 'strength', 'mobility'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export const Workout = model('Workout', workoutSchema);
