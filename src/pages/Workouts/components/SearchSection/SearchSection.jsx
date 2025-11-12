import styles from './SearchSection.module.css';
import clsx from 'clsx';

export function SearchSection({ category, setCategory, searchTitle, setSearchTitle }) {
  const categories = ['All', 'Strength', 'HIIT', 'Mobility', 'Hypertrophy', 'Conditioning'];

  return (
    <section className={styles.searchSection}>
      <h2 className={styles.title}>Training Library</h2>

      <div className={styles.filters}>
        {categories.map((cat, index) => (
          <button
            key={index}
            className={clsx(styles.filterButton, cat === category && styles.active)}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search workouts..."
        className={styles.searchInput}
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
    </section>
  );
}
