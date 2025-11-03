
import { AnalyticsSection } from "./components/AnalyticsSection/AnalyticsSection";
import { InfoSection } from "./components/InfoSection/InfoSection";
import { StatsTable } from "./components/Table/Table";

export default function StatsPage() {
    return (
        <>
            <InfoSection />
            <AnalyticsSection />
            <StatsTable />
        </>
    )

}