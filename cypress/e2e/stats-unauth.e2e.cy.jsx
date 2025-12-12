/// <reference types="cypress" />

import { setupUnauthenticated, mockStatsApi } from './helpers';

describe('Stats page unauthenticated', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('shows login prompt on Stats page when user is not authenticated', () => {
        setupUnauthenticated();
        mockStatsApi();

        cy.visit('/stats');

        cy.contains('Please log in to view and manage your workout statistics.').should('exist');
    });
});
