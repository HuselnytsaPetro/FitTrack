import styles from './TrainingSection.module.css';
import { clsx } from 'clsx';
import { Button } from '../../../../components/Button/Button';
import { useState } from 'react';
import { WorkoutRunnerModal } from '../../../../components/WorkoutRunnerModal/WorkoutRunnerModal';

export function TrainingSection({ workouts, loading, error }) {
  const [expandedCard, setExpandedCard] = useState(null);
  const [isRunnerOpen, setIsRunnerOpen] = useState(false);
  const [runnerWorkout, setRunnerWorkout] = useState(null);

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const openRunner = (workout) => {
    if (!workout || !workout.exercises || workout.exercises.length === 0) return;
    setRunnerWorkout(workout);
    setIsRunnerOpen(true);
  };

  const closeRunner = () => {
    setIsRunnerOpen(false);
    setRunnerWorkout(null);
  };

  if (loading) {
    return (
      <section className={styles.trainingSection}>
        <div className={styles.loadingText}>Loading workouts...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.trainingSection}>
        <div className={styles.errorText}>Error: {error}</div>
      </section>
    );
  }

  if (!workouts || workouts.length === 0) {
    return (
      <section className={styles.trainingSection}>
        <div className={styles.emptyText}>No workouts found</div>
      </section>
    );
  }

  return (
    <section className={styles.trainingSection}>
      <div className={styles.grid}>
        {workouts.map((workout, index) => (
          <div
            key={workout.id}
            className={clsx(styles.card, expandedCard === index && styles.expanded)}
            onClick={() => handleCardClick(index)}
          >
            <div className={styles.imageContainer}>
              <img src={workout.image_url} alt={workout.name} className={styles.image} />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{workout.name}</h3>
              <div className={styles.tags}>
                <span className={styles.tag}>{workout.difficulty_level}</span>
                <span className={styles.tag}>{workout.estimated_duration}m</span>
                <span className={styles.tag}>{workout.category}</span>
              </div>
              <p className={styles.description}>{workout.description}</p>

              {expandedCard === index && (
                <div className={styles.details}>
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Exercises:</h4>
                    <div className={styles.exercises}>
                      {workout.exercises && workout.exercises.length > 0 ? (
                        workout.exercises.map((exercise) => (
                          <span key={exercise.id} className={styles.exerciseTag}>
                            {exercise.name} ({exercise.duration}m)
                          </span>
                        ))
                      ) : (
                        <span className={styles.exerciseTag}>No exercises yet</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.buttons}>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        openRunner(workout);
                      }}
                    >
                      Start Workout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <WorkoutRunnerModal isOpen={isRunnerOpen} onClose={closeRunner} workout={runnerWorkout} />
    </section>
  );
}
