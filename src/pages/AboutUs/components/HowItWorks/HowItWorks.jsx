import styles from './HowItWorks.module.css';

const steps = [
    {
        number: '1',
        title: 'Choose Your Goal',
        description: 'Set your fitness objectives and preferences'
    },
    {
        number: '2',
        title: 'Pick a Plan',
        description: 'Get a personalized training program'
    },
    {
        number: '3',
        title: 'Track & Improve',
        description: 'Monitor progress and level up continuously'
    }
];

export function HowItWorks() {
    return (
        <section className={styles.howItWorks}>
            <h2 className={styles.title}>How It Works</h2>

            <div className={styles.steps}>
                {steps.map((step, index) => (
                    <div key={index} className={styles.step}>
                        <div className={styles.circle}>{step.number}</div>
                        <h3 className={styles.stepTitle}>{step.title}</h3>
                        <p className={styles.stepDescription}>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}