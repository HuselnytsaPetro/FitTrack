import { WhyChoose } from '../../src/pages/AboutUs/components/WhyChooseBlock/WhyChoose';

describe('WhyChoose component', () => {
    it('renders main title and feature cards', () => {
        cy.mount(<WhyChoose />);

        cy.contains('Why Choose FitTrack').should('exist');

        cy.get('section').within(() => {
            cy.get('[class*="card"]').its('length').should('be.gte', 3);
            cy.contains('Adaptive Plans').should('exist');
            cy.contains('Coach-Curated Workouts').should('exist');
            cy.contains('Real-time Stats & Streaks').should('exist');
        });
    });

    it('displays icons for each feature', () => {
        cy.mount(<WhyChoose />);

        cy.get('[class*="icon"]').its('length').should('be.gte', 3);
    });
});
