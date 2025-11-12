import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export function useWorkouts(category = 'All', title = '') {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, [category, title]);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getWorkouts(category, title);
      setWorkouts(data.workouts);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { workouts, loading, error, refetch: fetchWorkouts };
}
