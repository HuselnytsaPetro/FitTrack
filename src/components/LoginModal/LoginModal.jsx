import styles from './LoginModal.module.css';
import { Button } from '../Button/Button';

export function LoginModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles.title}>Start Your Journey</h3>

                <input
                    type="email"
                    placeholder="Email address"
                    className={styles.input}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                />

                <Button className={styles.b}>Get Started</Button>

                <div className={styles.or}>or</div>

                <Button className={styles.googleButton} variant='outline'>
                    Continue with Google
                </Button>
            </div>
        </div>
    );
}