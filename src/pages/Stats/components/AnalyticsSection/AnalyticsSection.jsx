import styles from './AnalyticsSection.module.css';

const badges = [
    {
        icon: '🏆',
        title: 'Consistency King',
        description: '7 day streak'
    },
    {
        icon: '💪',
        title: 'Strength Gains',
        description: 'New PR on squats'
    },
    {
        icon: '⚡',
        title: 'Speed Demon',
        description: '5K under 25 min'
    }
];

export function AnalyticsSection() {
    return (
        <section className={styles.analyticsSection}>
            <div className={styles.card} style={{ width: "65%" }}>
                <h3 className={styles.title}>Weekly Progress</h3>
                <div className={styles.chartPlaceholder}>
                    Progress Chart Visualization
                </div>
            </div>

            <div className={styles.card} style={{ width: "25%" }}>
                <h3 className={styles.title}>Recent Badges</h3>
                <div className={styles.badges}>
                    {badges.map((badge, index) => (
                        <div key={index} className={styles.badge}>
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