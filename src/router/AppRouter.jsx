import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import AboutUsPage from '../pages/AboutUs/AboutUs';
import WorkoutsPage from '../pages/Workouts/Workouts';
import StatsPage from '../pages/Stats/StatsPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AboutUsPage />} />
        <Route path="workouts" element={<WorkoutsPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
