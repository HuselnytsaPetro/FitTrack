import { SearchSection } from './components/SearchSection/SearchSection';
import { TrainingSection } from './components/TrainingsSection/TrainingSection';
import { useState } from 'react';
import { useWorkouts } from '../../hooks/useWorkouts';

export default function WorkoutsPage() {
  const [category, setCategory] = useState('All');
  const [searchTitle, setSearchTitle] = useState('');
  const { workouts, loading, error } = useWorkouts(category, searchTitle);

  return (
    <>
      <SearchSection
        category={category}
        setCategory={setCategory}
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
      />
      <TrainingSection workouts={workouts} loading={loading} error={error} />
    </>
  );
}
