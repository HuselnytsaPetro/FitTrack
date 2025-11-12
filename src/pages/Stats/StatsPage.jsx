import { AnalyticsSection } from './components/AnalyticsSection/AnalyticsSection';
import { StatsTable } from './components/Table/Table';
import { useStats } from '../../hooks/useStats';

export default function StatsPage() {
  const statsData = useStats();

  return (
    <>
      <AnalyticsSection stats={statsData.stats} loading={statsData.loading} />
      <StatsTable statsData={statsData} />
    </>
  );
}
