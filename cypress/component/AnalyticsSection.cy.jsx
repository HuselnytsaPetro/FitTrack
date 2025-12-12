import { AnalyticsSection } from '../../src/pages/Stats/components/AnalyticsSection/AnalyticsSection';

const buildStat = (overrides = {}) => ({
    id: overrides.id ?? Math.random(),
    date: overrides.date ?? new Date().toISOString(),
    type: overrides.type ?? 'Strength',
    duration: overrides.duration ?? 30,
    rpe: overrides.rpe ?? 7,
});

describe('AnalyticsSection component', () => {
    it('shows loading state when loading is true', () => {
        cy.mount(<AnalyticsSection stats={[]} loading={true} />);
        cy.contains('Loading statistics...').should('exist');
    });

    it('renders metrics from stats data', () => {
        const stats = [
            buildStat({ id: 1, type: 'Strength', duration: 40, rpe: 7 }),
            buildStat({ id: 2, type: 'HIIT', duration: 20, rpe: 8 }),
        ];

        cy.mount(<AnalyticsSection stats={stats} loading={false} />);

        cy.contains('Total Workouts').parent().within(() => {
            cy.contains('2');
        });

        cy.contains('Average RPE').should('exist');
        cy.contains('Total Training Time').should('exist');
        cy.contains('Favorite Workout Type').should('exist');
    });

    it('shows badges list', () => {
        const stats = Array.from({ length: 25 }).map((_, index) =>
            buildStat({ id: index + 1, type: 'Strength', duration: 30, rpe: 7 }),
        );

        cy.mount(<AnalyticsSection stats={stats} loading={false} />);

        cy.contains('Achievement Badges').should('exist');
        cy.contains('Dedicated Athlete').should('exist');
        cy.contains('Perfect Balance').should('exist');
        cy.contains('Beast Mode').should('exist');
    });
});
