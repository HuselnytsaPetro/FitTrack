import styles from './InfoSection.module.css';

export function InfoSection() {
    const user = {
        name: 'Alex',
        goal: 'Muscle Building',
        streak: 7,
        stats: {
            workoutsThisWeek: 4,
            totalMinutes: 210,
            caloriesBurned: 3200,
            avgHeartRate: 128,
            volumeLifted: 15000,
            bodyWeight: 165
        }
    };

    return (
        <div className={styles.infoSection}>
            <div className={styles.header}>
                <img src="src/assets/avatar1.jpg" alt="User avatar" className={styles.avatar} />
                <div className={styles.subHeader}>
                    <h1 className={styles.greeting}>Welcome back, {user.name}!</h1>
                    <div className={styles.subHeader1}>
                        <div className={styles.goal}>
                            <span>Goal: {user.goal}</span>
                        </div>
                        <div className={styles.streak}>
                            🔥 {user.streak} day streak
                        </div>
                    </div>


                </div>



            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statValue}>{user.stats.workoutsThisWeek}</span>
                    <span className={styles.statLabel}>Workouts This Week</span>
                </div>

                <div className={styles.statCard}>
                    <span className={styles.statValue}>{user.stats.totalMinutes}</span>
                    <span className={styles.statLabel}>Total Minutes</span>
                </div>

                <div className={styles.statCard}>
                    <span className={styles.statValue}>{user.stats.caloriesBurned}</span>
                    <span className={styles.statLabel}>Calories Burned</span>
                </div>

                <div className={styles.statCard}>
                    <span className={styles.statValue}>{user.stats.avgHeartRate}</span>
                    <span className={styles.statLabel}>Avg Heart Rate</span>
                </div>

                <div className={styles.statCard}>
                    <span className={styles.statValue}>{user.stats.volumeLifted}</span>
                    <span className={styles.statLabel}>Volume Lifted</span>
                </div>

                <div className={styles.statCard}>
                    <span className={styles.statValue}>{user.stats.bodyWeight} lbs</span>
                    <span className={styles.statLabel}>Body Weight</span>
                </div>
            </div>
        </div>
    );
}