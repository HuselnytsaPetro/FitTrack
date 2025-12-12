/// <reference types="cypress" />

import { setupUnauthenticated, mockWorkoutsApi } from './helpers';

describe('Workouts page and workout runner', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    });

    it('loads workouts list and opens workout runner from Workouts page', () => {
        setupUnauthenticated();
        mockWorkoutsApi();

        cy.visit('/workouts');

        cy.wait('@getWorkouts');

        // Переконуємось, що воркаути з моків відрендерились
        cy.contains('Full Body Blast').should('exist');
        cy.contains('Cardio Burn').should('exist');

        // Скролимо до потрібної картки і клікаємо по ній, щоб розгорнути деталі з кнопкою Start Workout
        cy.contains('Full Body Blast').scrollIntoView().click();

        // Усередині тієї ж картки натискаємо кнопку запуску воркауту
        cy.contains('Full Body Blast')
            .parents('[class*="card"]')
            .within(() => {
                cy.contains('button', 'Start Workout').click();
            });

        // Перевіряємо, що модалка раннера відкрилась і показує назву воркауту
        cy.contains('Full Body Blast').should('exist');

        // Також перевіряємо, що з'явився будь-який елемент черги вправ
        cy.get('[class*="queueItem"], [class*="queueItemActive"]').should('exist');

        cy.contains('Stop').click();
    });
});
