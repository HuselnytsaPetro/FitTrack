import { StatsTable } from '../../src/pages/Stats/components/Table/Table';
import { __setAuthMock } from '../../src/hooks/useAuth';

const createStatsData = (overrides = {}) => ({
    stats: overrides.stats ?? [],
    loading: overrides.loading ?? false,
    error: overrides.error ?? null,
    createStat: overrides.createStat ?? (() => Promise.resolve({ success: true })),
    deleteStat: overrides.deleteStat ?? (() => Promise.resolve({ success: true })),
});

describe('StatsTable component', () => {
    beforeEach(() => {
        __setAuthMock({ user: { id: 1, email: 'test@example.com' } });
    });

    it('asks user to log in when no user present', () => {
        __setAuthMock({ user: null });

        cy.mount(<StatsTable statsData={createStatsData()} />);
        cy.contains('Please log in to view and manage your workout statistics.').should('exist');
    });

    it('renders table headers and allows adding entry', () => {
        const statsData = createStatsData({ stats: [] });

        cy.mount(<StatsTable statsData={statsData} />);

        cy.contains('Workout Log').should('exist');
        cy.get('table thead tr').within(() => {
            cy.contains('Date');
            cy.contains('Type');
            cy.contains('Duration');
            cy.contains('Notes');
            cy.contains('RPE');
            cy.contains('Actions');
        });

        cy.get('input[name="date"]').type('2024-01-01');
        cy.get('select[name="type"]').select('Strength');
        cy.get('input[name="duration"]').type('30');
        cy.contains('button', 'Add Entry').click();
    });

    it('renders existing stats rows', () => {
        const stats = [
            {
                id: 1,
                date: '2024-01-01T00:00:00.000Z',
                type: 'Strength',
                duration: 60,
                notes: 'Leg day',
                rpe: 8,
            },
        ];

        const statsData = createStatsData({ stats });

        cy.mount(<StatsTable statsData={statsData} />);

        cy.contains('Leg day').should('exist');
        cy.contains('Strength').should('exist');
        cy.contains('60 min').should('exist');
    });
});
