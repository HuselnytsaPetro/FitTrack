import pool from '../config/database.js';

class Exercise {
  static async findByWorkoutId(workoutId) {
    const query = `
      SELECT * FROM exercises 
      WHERE workout_id = $1 
      ORDER BY order_index ASC
    `;
    const result = await pool.query(query, [workoutId]);
    return result.rows;
  }
}

export default Exercise;
