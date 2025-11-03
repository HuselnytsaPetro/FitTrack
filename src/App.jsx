import { Routes, Route, Navigate } from "react-router-dom"
import { TabSwitcher } from "./components/TabSwitcher/TabSwticher";
import AboutUsPage from "./pages/AboutUs/AboutUs";
import WorkoutsPage from "./pages/Workouts/Workouts";
import StatsPage from "./pages/Stats/StatsPage";
import './global.css'
import { Footer } from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <TabSwitcher />
      <Routes>
        <Route path="/" element={<AboutUsPage />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
