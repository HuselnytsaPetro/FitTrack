import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';
import { useAuth } from './useAuth';

export function useStats() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && user) {
      fetchStats();
    } else if (!authLoading && !user) {
      setStats([]);
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchStats = async () => {
    if (!user) {
      setStats([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await apiClient.getStats();
      const normalizedStats = data.stats.map((stat) => ({
        id: stat.id,
        userId: stat.user_id,
        date: stat.workout_date,
        type: stat.workout_type,
        duration: stat.duration,
        notes: stat.notes,
        rpe: stat.rpe,
      }));
      setStats(normalizedStats);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createStat = async (statData) => {
    try {
      const data = await apiClient.createStat(statData);
      await fetchStats();
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteStat = async (id) => {
    try {
      await apiClient.deleteStat(id);
      await fetchStats();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return { stats, loading, error, createStat, deleteStat, refetch: fetchStats };
}
