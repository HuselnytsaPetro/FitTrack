/// <reference types="cypress" />

import { setupAuthenticated, mockStatsApi } from './helpers';

describe('Stats page authenticated', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('shows analytics and stats table for authenticated user', () => {
        setupAuthenticated();
        mockStatsApi();

        cy.visit('/stats');

        cy.wait('@getStats');

        cy.contains('Total Workouts').should('exist');
        cy.contains('Average RPE').should('exist');
        cy.contains('Total Training Time').should('exist');

        cy.contains('Workout Log').should('exist');
        cy.contains('Leg day').should('exist');
        cy.contains('Intervals').should('exist');
    });
});
