/// <reference types="cypress" />

import { setupUnauthenticated, mockWorkoutsApi, mockStatsApi } from './helpers';

describe('Navigation between main pages', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('navigates between About, Workouts and Stats via header tabs', () => {
        setupUnauthenticated();
        mockWorkoutsApi();
        mockStatsApi();

        cy.visit('/');

        cy.contains('Fit Track').should('exist');
        cy.contains('About').should('have.attr', 'href', '/');

        cy.contains('Workouts').click();
        cy.url().should('include', '/workouts');

        cy.contains('Stats').click();
        cy.url().should('include', '/stats');

        cy.contains('About').click();
        cy.url().should('match', /\/?$/);
    });
});
