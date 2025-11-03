import styles from './SearchSection.module.css';
import clsx from 'clsx';
import { useState } from 'react';
export function SearchSection() {
    const [currCategory, setCurrCategoty] = useState("All");
    const categories = ['All', 'Strength', 'HIIT', 'Mobility', 'Hypertrophy', 'Conditioning'];

    return (
        <section className={styles.searchSection}>
            <h2 className={styles.title}>Training Library</h2>

            <div className={styles.filters}>
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={clsx(
                            styles.filterButton,
                            category === currCategory && styles.active
                        )}
                        onClick={() => { setCurrCategoty(category) }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <input
                type="text"
                placeholder="Search workouts..."
                className={styles.searchInput}
            />
        </section>
    );
}