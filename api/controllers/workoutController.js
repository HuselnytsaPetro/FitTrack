import Workout from '../models/Workout.js';

export const getWorkouts = async (req, res, next) => {
  try {
    const { category, title } = req.params;
    const workouts = await Workout.findByFilters(category, title);
    res.json({ workouts });
  } catch (error) {
    next(error);
  }
};
