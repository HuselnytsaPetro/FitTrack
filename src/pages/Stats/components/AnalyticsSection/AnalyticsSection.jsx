import styles from './AnalyticsSection.module.css';
import { useMemo } from 'react';

export function AnalyticsSection({ stats, loading }) {
  const progressMetrics = useMemo(() => {
    if (!stats || stats.length === 0) {
      return {
        totalWorkouts: 0,
        avgRpe: 0,
        maxDailyWorkouts: 0,
        totalMinutes: 0,
        mostPopularType: '-',
        badgeConditions: {
          totalStats: false,
          avgRpe: false,
          dailyStreak: false,
        },
      };
    }

    const totalWorkouts = stats.length;

    const statsWithRpe = stats.filter((s) => s.rpe !== null && s.rpe !== undefined);
    const avgRpe =
      statsWithRpe.length > 0
        ? (statsWithRpe.reduce((sum, s) => sum + s.rpe, 0) / statsWithRpe.length).toFixed(1)
        : 0;

    const statsByDate = stats.reduce((acc, stat) => {
      const date = new Date(stat.date).toDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    const maxDailyWorkouts = Math.max(...Object.values(statsByDate), 0);

    const totalMinutes = stats.reduce((sum, stat) => sum + stat.duration, 0);

    const typeCount = stats.reduce((acc, stat) => {
      acc[stat.type] = (acc[stat.type] || 0) + 1;
      return acc;
    }, {});
    const mostPopularType =
      Object.keys(typeCount).length > 0
        ? Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0][0]
        : '-';

    return {
      totalWorkouts,
      avgRpe: parseFloat(avgRpe),
      maxDailyWorkouts,
      totalMinutes,
      mostPopularType,
      badgeConditions: {
        totalStats: totalWorkouts >= 25,
        avgRpe: avgRpe >= 6 && avgRpe <= 10,
        dailyStreak: maxDailyWorkouts > 5,
      },
    };
  }, [stats]);

  const badges = [
    {
      icon: '🏆',
      title: 'Dedicated Athlete',
      description: '25+ workouts logged',
      isActive: progressMetrics.badgeConditions.totalStats,
    },
    {
      icon: '💪',
      title: 'Perfect Balance',
      description: 'Avg RPE 6-10',
      isActive: progressMetrics.badgeConditions.avgRpe,
    },
    {
      icon: '⚡',
      title: 'Beast Mode',
      description: '5+ workouts in one day',
      isActive: progressMetrics.badgeConditions.dailyStreak,
    },
  ];

  return (
    <section className={styles.analyticsSection}>
      <div className={styles.card} style={{ width: '65%' }}>
        <h3 className={styles.title}>Progress Overview</h3>
        {loading ? (
          <div className={styles.loadingText}>Loading statistics...</div>
        ) : (
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricValue}>{progressMetrics.totalWorkouts}</div>
              <div className={styles.metricLabel}>Total Workouts</div>
              <div className={styles.metricProgress}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${Math.min((progressMetrics.totalWorkouts / 25) * 100, 100)}%` }}
                />
              </div>
              <div className={styles.metricSubtext}>
                {progressMetrics.totalWorkouts >= 25
                  ? '🏆 Badge unlocked!'
                  : `${25 - progressMetrics.totalWorkouts} to unlock badge`}
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricValue}>{progressMetrics.avgRpe || '-'}</div>
              <div className={styles.metricLabel}>Average RPE</div>
              <div className={styles.metricProgress}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${(progressMetrics.avgRpe / 10) * 100}%` }}
                />
              </div>
              <div className={styles.metricSubtext}>
                {progressMetrics.badgeConditions.avgRpe ? '💪 Badge unlocked!' : 'Target: 6-10 RPE'}
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricValue}>{progressMetrics.maxDailyWorkouts}</div>
              <div className={styles.metricLabel}>Max Daily Workouts</div>
              <div className={styles.metricProgress}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${Math.min((progressMetrics.maxDailyWorkouts / 5) * 100, 100)}%`,
                  }}
                />
              </div>
              <div className={styles.metricSubtext}>
                {progressMetrics.maxDailyWorkouts > 5
                  ? '⚡ Badge unlocked!'
                  : `${Math.max(6 - progressMetrics.maxDailyWorkouts, 0)} to unlock badge`}
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricValue}>
                {Math.floor(progressMetrics.totalMinutes / 60)}h {progressMetrics.totalMinutes % 60}
                m
              </div>
              <div className={styles.metricLabel}>Total Training Time</div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricValue}>{progressMetrics.mostPopularType}</div>
              <div className={styles.metricLabel}>Favorite Workout Type</div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.card} style={{ width: '25%' }}>
        <h3 className={styles.title}>Achievement Badges</h3>
        <div className={styles.badges}>
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`${styles.badge} ${badge.isActive ? styles.badgeActive : styles.badgeInactive}`}
            >
              <span className={styles.icon}>{badge.icon}</span>
              <div className={styles.badgeInfo}>
                <span className={styles.badgeTitle}>{badge.title}</span>
                <span className={styles.badgeDescription}>{badge.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
