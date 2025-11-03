import styles from './Table.module.css';
import { useState } from 'react';
import { Button } from '../../../../components/Button/Button';

export function StatsTable() {
    const [entries, setEntries] = useState([
        {
            id: 1,
            date: '2025-04-15',
            type: 'Strength',
            duration: 60,
            notes: 'Heavy squats, good form',
            rpe: 8
        },
        {
            id: 2,
            date: '2025-04-13',
            type: 'HIIT',
            duration: 45,
            notes: 'High energy, pushed hard',
            rpe: 9
        }
    ]);

    const [formData, setFormData] = useState({
        date: '',
        type: '',
        duration: '',
        notes: '',
        rpe: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddEntry = () => {
        if (!formData.date || !formData.type || !formData.duration) return;

        const newEntry = {
            id: Date.now(), 
            date: formData.date,
            type: formData.type,
            duration: parseInt(formData.duration),
            notes: formData.notes,
            rpe: parseInt(formData.rpe) || 0
        };

        setEntries(prev => [newEntry, ...prev]); 
        setFormData({ date: '', type: '', duration: '', notes: '', rpe: '' }); 
    };

    const handleDeleteEntry = (id) => {
        setEntries(prev => prev.filter(entry => entry.id !== id));
    };

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
                        {entries.length === 0 ? (
                            <tr>
                                <td colSpan="6" className={styles.empty}>
                                    No entries yet. Add your first workout!
                                </td>
                            </tr>
                        ) : (
                            entries.map(entry => (
                                <tr key={entry.id}>
                                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                                    <td>{entry.type}</td>
                                    <td>{entry.duration} min</td>
                                    <td>{entry.notes || '-'}</td>
                                    <td>{entry.rpe}/10</td>
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