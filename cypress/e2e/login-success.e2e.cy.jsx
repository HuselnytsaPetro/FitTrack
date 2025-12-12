/// <reference types="cypress" />

import { setupUnauthenticated, mockLoginSuccess } from './helpers';

describe('Login success flow', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('opens login modal and logs in successfully from header button', () => {
        setupUnauthenticated();
        mockLoginSuccess();

        cy.visit('/');

        cy.contains('button', 'Start Free Trial').click();

        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('password123');

        cy.contains('button', 'Sign In').click();

        cy.wait('@login');

        cy.get('input[type="email"]').should('not.exist');
        cy.get('button').filter('[class*="userButton"]').should('exist');
    });
});
