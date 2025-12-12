import pool from '../config/database.js';
import Exercise from './Exercise.js';

class Workout {
  static async findByFilters(category, title) {
    let query = 'SELECT * FROM workouts WHERE 1 = 1';
    const placeholders = [];
    let placeholderIndx = 1;

    if (category !== "All") {
      query += ' AND category = $' + placeholderIndx;
      placeholders.push(category);
      placeholderIndx++;
    }

    if (title && title.toLowerCase() !== 'all') {
      query += ' AND name ILIKE $' + placeholderIndx;
      placeholders.push(`${title}%`);
      placeholderIndx++;
    }
    
    const result = await pool.query(query, placeholders);
    
    const workoutsWithExercises = await Promise.all(
      result.rows.map(async (workout) => {
        const exercises = await Exercise.findByWorkoutId(workout.id);
        return { ...workout, exercises };
      })
    );
    
    return workoutsWithExercises;
  }
}

export default Workout;