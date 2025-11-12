import pool from '../config/database.js';

class UserWorkoutStat {
  static async create({ userId, workoutDate, workoutType, duration, notes, rpe }) {
    const query = `
      INSERT INTO user_workout_stats (user_id, workout_date, workout_type, duration, notes, rpe)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [userId, workoutDate, workoutType, duration, notes, rpe];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByUserId(userId, limit = 50, offset = 0) {
    const query = `
      SELECT * FROM user_workout_stats
      WHERE user_id = $1 
      ORDER BY workout_date DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [userId, limit, offset]);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM user_workout_stats WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM user_workout_stats WHERE id = $1';
    await pool.query(query, [id]);
  }
}

export default UserWorkoutStat;