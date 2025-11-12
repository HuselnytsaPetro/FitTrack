import styles from './Table.module.css';
import { useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { useAuth } from '../../../../hooks/useAuth';

export function StatsTable({ statsData }) {
  const { user } = useAuth();
  const { stats, loading, error, createStat, deleteStat } = statsData;

  const [formData, setFormData] = useState({
    date: '',
    type: '',
    duration: '',
    notes: '',
    rpe: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEntry = async () => {
    if (!formData.date || !formData.type || !formData.duration) return;

    const statData = {
      date: formData.date,
      type: formData.type,
      duration: parseInt(formData.duration),
      notes: formData.notes,
      rpe: parseInt(formData.rpe) || null,
    };

    const result = await createStat(statData);
    if (result.success) {
      setFormData({ date: '', type: '', duration: '', notes: '', rpe: '' });
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  const handleDeleteEntry = async (id) => {
    const result = await deleteStat(id);
    if (!result.success) {
      alert(`Error: ${result.error}`);
    }
  };

  if (!user) {
    return (
      <div className={styles.statsTable}>
        <h3 className={styles.title}>Workout Log</h3>
        <p className={styles.loginMessage}>
          Please log in to view and manage your workout statistics.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.statsTable}>
      <h3 className={styles.title}>Workout Log</h3>
      <div className={styles.form}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Date"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className={styles.select}
        >
          <option value="">Select Type</option>
          <option value="Strength">Strength</option>
          <option value="HIIT">HIIT</option>
          <option value="Mobility">Mobility</option>
          <option value="Conditioning">Conditioning</option>
        </select>

        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Duration (min)"
          min="1"
          max="300"
        />

        <input
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="Notes"
        />

        <input
          type="number"
          name="rpe"
          value={formData.rpe}
          onChange={handleInputChange}
          className={styles.input}
          placeholder="RPE"
          min="1"
          max="10"
        />

        <Button onClick={handleAddEntry} style={{ width: 'auto' }}>
          Add Entry
        </Button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Notes</th>
              <th>RPE</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className={styles.empty}>
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className={styles.empty}>
                  Error: {error}
                </td>
              </tr>
            ) : stats.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.empty}>
                  No entries yet. Add your first workout!
                </td>
              </tr>
            ) : (
              stats.map((entry) => (
                <tr key={entry.id}>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.type}</td>
                  <td>{entry.duration} min</td>
                  <td>{entry.notes || '-'}</td>
                  <td>{entry.rpe ? `${entry.rpe}/10` : '-'}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className={styles.deleteButton}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
