/// <reference types="cypress" />

export const API_URL = 'http://localhost:5000/api';

export const mockUser = {
    username: 'test-user',
    email: 'test@example.com',
};

export const mockWorkouts = {
    workouts: [
        {
            id: 1,
            name: 'Full Body Blast',
            category: 'Strength',
            difficulty: 'Intermediate',
            duration: 30,
            exercises: [
                { id: 11, name: 'Push Ups', duration: 10 },
                { id: 12, name: 'Squats', duration: 10 },
            ],
        },
        {
            id: 2,
            name: 'Cardio Burn',
            category: 'Cardio',
            difficulty: 'Beginner',
            duration: 20,
            exercises: [{ id: 21, name: 'Running', duration: 20 }],
        },
    ],
};

export const mockStats = {
    stats: [
        {
            id: 1,
            user_id: 1,
            workout_date: '2024-01-01T00:00:00.000Z',
            workout_type: 'Strength',
            duration: 40,
            notes: 'Leg day',
            rpe: 7,
        },
        {
            id: 2,
            user_id: 1,
            workout_date: '2024-01-02T00:00:00.000Z',
            workout_type: 'HIIT',
            duration: 20,
            notes: 'Intervals',
            rpe: 8,
        },
    ],
};

export const setupUnauthenticated = () => {
    window.localStorage.removeItem('token');
    cy.intercept('GET', `${API_URL}/auth/profile`, {
        statusCode: 401,
        body: { error: 'Unauthorized' },
    }).as('getProfile');
};

export const setupAuthenticated = () => {
    window.localStorage.setItem('token', 'FAKE_TOKEN');

    cy.intercept('GET', `${API_URL}/auth/profile`, {
        statusCode: 200,
        body: mockUser,
    }).as('getProfile');
};

export const mockWorkoutsApi = () => {
    cy.intercept('GET', `${API_URL}/workouts/**`, {
        statusCode: 200,
        body: mockWorkouts,
    }).as('getWorkouts');
};

export const mockStatsApi = () => {
    cy.intercept('GET', `${API_URL}/stats*`, {
        statusCode: 200,
        body: mockStats,
    }).as('getStats');
};

export const mockLoginSuccess = () => {
    cy.intercept('POST', `${API_URL}/auth/login`, {
        statusCode: 200,
        body: {
            token: 'FAKE_TOKEN',
            user: mockUser,
        },
    }).as('login');
};

export const mockLoginFailure = () => {
    cy.intercept('POST', `${API_URL}/auth/login`, {
        statusCode: 401,
        body: {
            error: 'Invalid credentials',
        },
    }).as('loginFail');
};
