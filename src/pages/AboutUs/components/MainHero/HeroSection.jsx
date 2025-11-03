import styles from "./HeroSection.module.css";
import { Button } from "../../../../components/Button/Button";

export function HeroSection() {
    return (
        <div className={styles.overlay}>
            <div className={styles.mainBlock}>
                <div className={styles.titlesContainer}>
                    <p>Unleash your beast</p>
                    <p>Transcend your limits.</p>
                </div>
                <p className={styles.subtitle}>
                    Smart training plans that adapt to your performance. Track progress, build streaks,
                    and achieve your fitness goals with our AI-powered coaching platform.
                </p>
                <div className={styles.buttonsContainer}>
                    <Button className={styles.button} />
                    <Button variant="outline" className={styles.button}>Explore Workouts</Button>
                </div>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.number}>450+</span>
                        <span className={styles.label}>Training Plans</span>
                    </div>

                    <div className={styles.stat}>
                        <span className={styles.number}>10K+</span>
                        <span className={styles.label}>Active Athletes</span>
                    </div>

                    <div className={styles.stat}>
                        <span className={styles.number}>95%</span>
                        <span className={styles.label}>Success Rate</span>
                    </div>
                </div>
            </div>
        </div>
    );
}