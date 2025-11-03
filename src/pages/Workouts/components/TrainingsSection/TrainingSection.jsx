import styles from './TrainingSection.module.css';
import { clsx } from 'clsx';
import { Button } from '../../../../components/Button/Button'; // шлях до вашого Button
import { useState } from 'react';

const workouts = [
    {
        title: 'Full-Body HIIT',
        image: 'src/assets/training1.jpg',
        tags: ['Intermediate', '45m', 'Bodyweight'],
        description: 'High-intensity interval training targeting all major muscle groups',
        benefits: [
            'Burns calories efficiently',
            'Improves cardiovascular health',
            'Boosts metabolism for hours'
        ],
        exercises: ['Jump Squats', 'Mountain Climbers', 'Burpees']
    },
    {
        title: 'Strength Training',
        image: 'src/assets/training2.jpg',
        tags: ['Advanced', '60m', 'Weights'],
        description: 'Compound lifts with progressive overload for maximum strength gains',
        benefits: [
            'Builds muscle mass',
            'Increases bone density',
            'Boosts metabolism'
        ],
        exercises: ['Squats', 'Deadlifts', 'Bench Press', 'Rows']
    },
    {
        title: 'Mobility Flow',
        image: 'src/assets/training3.jpg',
        tags: ['All Levels', '20m', 'None'],
        description: 'Hip and shoulder routine to restore range of motion',
        benefits: [
            'Reduces injury risk',
            'Improves posture',
            'Enhances recovery'
        ],
        exercises: ['Cat-Cow', 'Shoulder Circles', 'Hip Flexor Stretch']
    },
    {
        title: 'Hypertrophy Focus',
        image: 'src/assets/training4.jpg',
        tags: ['Intermediate', '50m', 'Weights'],
        description: 'Muscle building with optimal volume and intensity',
        benefits: [
            'Maximizes muscle growth',
            'Improves muscle symmetry',
            'Enhances mind-muscle connection'
        ],
        exercises: ['Dumbbell Press', 'Leg Press', 'Lateral Raises', 'Curls']
    },
    {
        title: 'Conditioning',
        image: 'src/assets/training5.jpg',
        tags: ['Beginner', '30m', 'Minimal'],
        description: 'Build endurance and work capacity',
        benefits: [
            'Increases stamina',
            'Improves recovery between sets',
            'Prepares for longer sessions'
        ],
        exercises: ['Rowing', 'Rope Skips', 'Sled Pushes']
    }
];

export function TrainingSection() {
    const [expandedCard, setExpandedCard] = useState(null);

    const handleCardClick = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <section className={styles.trainingSection}>
            <div className={styles.grid}>
                {workouts.map((workout, index) => (
                    <div
                        key={index}
                        className={clsx(
                            styles.card,
                            expandedCard === index && styles.expanded
                        )}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className={styles.imageContainer}>
                            <img src={workout.image} alt={workout.title} className={styles.image} />
                        </div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>{workout.title}</h3>
                            <div className={styles.tags}>
                                {workout.tags.map((tag, i) => (
                                    <span key={i} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                            <p className={styles.description}>{workout.description}</p>

                            {expandedCard === index && (
                                <div className={styles.details}>
                                    <div className={styles.section}>
                                        <h4 className={styles.sectionTitle}>Benefits:</h4>
                                        <ul className={styles.list}>
                                            {workout.benefits.map((benefit, i) => (
                                                <li key={i}>{benefit}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.section}>
                                        <h4 className={styles.sectionTitle}>Sample Exercises:</h4>
                                        <div className={styles.exercises}>
                                            {workout.exercises.map((exercise, i) => (
                                                <span key={i} className={styles.exerciseTag}>{exercise}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.buttons}>
                                        <Button>Start Workout</Button>
                                        <Button variant="outline">Full Details</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}