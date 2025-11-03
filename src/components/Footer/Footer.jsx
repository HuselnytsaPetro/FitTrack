import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3 className={styles.logo}>FitTrack</h3>
                    <p className={styles.description}>
                        Transform your fitness journey with intelligent training plans and comprehensive progress tracking.
                    </p>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.title}>Quick Links</h4>
                    <ul className={styles.links}>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#support">Support</a></li>
                        <li><a href="#privacy">Privacy</a></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4 className={styles.title}>Stay Connected</h4>
                    <div className={styles.social}>
                        <a href="#" aria-label="Email"><span className={styles.icon}>✉️</span></a>
                        <a href="#" aria-label="Twitter"><span className={styles.icon}>🐦</span></a>
                        <a href="#" aria-label="Instagram"><span className={styles.icon}>📸</span></a>
                    </div>
                </div>
            </div>

            <div className={styles.copyright}>
                © 2024 FitTrack. All rights reserved.
            </div>
        </footer>
    );
}