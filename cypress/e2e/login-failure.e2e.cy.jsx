/// <reference types="cypress" />

import { setupUnauthenticated, mockLoginFailure } from './helpers';

describe('Login failure flow', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('shows error message when login fails', () => {
        setupUnauthenticated();
        mockLoginFailure();

        cy.visit('/');

        cy.contains('button', 'Start Free Trial').click();

        cy.get('input[type="email"]').type('bad@example.com');
        cy.get('input[type="password"]').type('wrong');

        cy.contains('button', 'Sign In').click();

        cy.wait('@loginFail');

        cy.contains('Invalid credentials').should('exist');
    });
});
