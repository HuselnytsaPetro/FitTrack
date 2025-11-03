import styles from "./TabSwitcher.module.css";
import { Button } from "../Button/Button";
import { useState } from 'react';
import { LoginModal } from "../LoginModal/LoginModal";
import { NavLink } from 'react-router-dom';

export function TabSwitcher({
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <header className={styles.header}>
                <p className={styles.name}>Fit Track</p>
                <div className={styles.tabs}>
                    <NavLink to="/">About</NavLink>
                    <NavLink to="/workouts">Workouts</NavLink>
                    <NavLink to="/stats">Stats</NavLink>
                    <Button onClick={handleOpenModal} />
                </div>
            </header>

            <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}