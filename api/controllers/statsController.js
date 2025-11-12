import UserWorkoutStat from '../models/UserWorkoutStat.js';
import { validateRequired } from '../utils/validation.js';

export const createStat = async (req, res, next) => {
  try {
    const { workoutDate, workoutType, duration, notes, rpe } = req.body;

    const missing = validateRequired(['workoutDate', 'workoutType', 'duration'], req.body);
    if (missing.length > 0) return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
    if (rpe && (rpe < 1 || rpe > 10)) return res.status(400).json({ error: 'RPE must be between 1 and 10' });

    const stat = await UserWorkoutStat.create({
      userId: req.user.userId,
      workoutDate,
      workoutType,
      duration,
      notes,
      rpe,
    });

    res.status(201).json({
      message: 'Workout stat created successfully',
      stat,
    });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const stats = await UserWorkoutStat.findByUserId(req.user.userId, parseInt(limit), parseInt(offset));
    res.json({ stats });
  } catch (error) {
    next(error);
  }
};

export const deleteStat = async (req, res, next) => {
  try {
    const stat = await UserWorkoutStat.findById(req.params.id);
    if (!stat) {
      return res.status(404).json({ error: 'Stat not found' });
    }

    if (stat.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await UserWorkoutStat.delete(req.params.id);
    res.json({ message: 'Stat deleted successfully' });
  } catch (error) {
    next(error);
  }
};
