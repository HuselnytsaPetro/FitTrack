import { useEffect, useRef, useState } from 'react';
import styles from './WorkoutRunnerModal.module.css';
import { Button } from '../Button/Button';

export function WorkoutRunnerModal({ isOpen, onClose, workout }) {
  const [state, setState] = useState({
    exerciseIndex: 0,
    phase: 'exercise',
    secondsLeft: 0,
    isRunning: false,
    completed: false,
  });
  const intervalRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    if (!workout || !workout.exercises || workout.exercises.length === 0) return;
    const first = workout.exercises[0];
    const durationSec = Math.max(1, Math.round((first?.duration || 0) * 60));
    setState({
      exerciseIndex: 0,
      phase: 'exercise',
      secondsLeft: durationSec,
      isRunning: true,
      completed: false,
    });
  }, [isOpen, workout]);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleClose = () => {
    clearTimer();
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    onClose();
  };

  useEffect(() => {
    clearTimer();
    if (!isOpen) return;
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        setState((prev) => {
          if (prev.secondsLeft > 1) {
            return { ...prev, secondsLeft: prev.secondsLeft - 1 };
          }

          const exercises = workout?.exercises || [];
          if (prev.phase === 'exercise') {
            const hasNext = prev.exerciseIndex < exercises.length - 1;
            if (hasNext) return { ...prev, phase: 'rest', secondsLeft: 15 };
            else
              return {
                exerciseIndex: prev.exerciseIndex,
                phase: 'exercise',
                secondsLeft: 0,
                isRunning: false,
                completed: true,
              };
          } else {
            const nextIdx = prev.exerciseIndex + 1;
            const nextEx = exercises[nextIdx];
            const nextDuration = Math.max(1, Math.round((nextEx?.duration || 0) * 60));
            return {
              ...prev,
              exerciseIndex: nextIdx,
              phase: 'exercise',
              secondsLeft: nextDuration,
            };
          }
        });
      }, 1000);
    }
    return clearTimer;
  }, [state.isRunning, state.phase, state.secondsLeft, isOpen, workout]);

  useEffect(() => {
    if (!isOpen) return;
    if (state.completed) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      closeTimeoutRef.current = setTimeout(() => {
        handleClose();
      }, 3000);
    }
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, [state.completed, isOpen]);

  const togglePause = () => setState((s) => ({ ...s, isRunning: !s.isRunning }));

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const currentExercise = workout?.exercises?.[state.exerciseIndex];

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.workoutTitle}>{workout?.name}</div>
          <button className={styles.close} onClick={handleClose} aria-label="Close">
            ×
          </button>
        </div>

        {state.completed ? (
          <div className={styles.completedContainer}>
            <div className={styles.completedTitle}>Workout Completed</div>
            <div className={styles.completedSubtitle}>Great job! Closing in 3s…</div>
          </div>
        ) : (
          <>
            <div className={styles.phase}>{state.phase === 'exercise' ? 'Exercise' : 'Rest'}</div>
            <div className={styles.currentExercise}>
              {state.phase === 'exercise' ? currentExercise?.name : 'Take a breath'}
            </div>
            <div className={styles.timer}>{formatTime(state.secondsLeft)}</div>

            <div className={styles.controls}>
              <Button variant="outline" onClick={togglePause}>
                {state.isRunning ? 'Pause' : 'Resume'}
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Stop
              </Button>
            </div>

            <div className={styles.queue}>
              {(workout?.exercises || []).map((ex, i) => (
                <div
                  key={ex.id || i}
                  className={i === state.exerciseIndex ? styles.queueItemActive : styles.queueItem}
                >
                  <span className={styles.queueName}>{ex.name}</span>
                  <span className={styles.queueDuration}>{ex.duration}m</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
