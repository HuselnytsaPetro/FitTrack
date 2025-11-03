import styles from './WhyChoose.module.css';

const features = [
    {
        icon: '🎯',
        title: 'Adaptive Plans',
        description: 'AI-powered progression that adapts to your performance and goals automatically.'
    },
    {
        icon: '💪',
        title: 'Coach-Curated Workouts',
        description: 'Expert-designed routines from certified trainers for optimal results.'
    },
    {
        icon: '📊',
        title: 'Real-time Stats & Streaks',
        description: 'Track every rep, set, and milestone with comprehensive analytics.'
    },
    {
        icon: '🥗',
        title: 'Nutrition Notes',
        description: 'Integrated meal planning and nutrition tracking for complete wellness.'
    },
    {
        icon: '🏆',
        title: 'Community & Badges',
        description: 'Connect with athletes worldwide and earn achievements for your progress.'
    },
    {
        icon: '⚡',
        title: 'Smart Recovery',
        description: 'Optimized rest periods and recovery recommendations based on your data.'
    }
];

export function WhyChoose() {
    return (
        <section className={styles.whyChoose}>
            <h2 className={styles.title}>Why Choose FitTrack</h2>

            <div className={styles.grid}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.icon}>{feature.icon}</div>
                        <h3 className={styles.cardTitle}>{feature.title}</h3>
                        <p className={styles.cardDescription}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}