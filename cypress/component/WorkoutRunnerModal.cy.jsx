import { WorkoutRunnerModal } from '../../src/components/WorkoutRunnerModal/WorkoutRunnerModal';

const WORKOUT = {
    name: 'Test Workout',
    exercises: [
        { id: 1, name: 'Push Ups', duration: 0.05 },
        { id: 2, name: 'Squats', duration: 0.05 },
    ],
};

describe('WorkoutRunnerModal component', () => {
    it('renders current exercise and allows stopping', () => {
        const onClose = cy.stub().as('onClose');

        cy.clock();
        cy.mount(<WorkoutRunnerModal isOpen={true} onClose={onClose} workout={WORKOUT} />);

        cy.contains('Test Workout').should('exist');
        cy.contains('Push Ups').should('exist');

        cy.contains('Stop').click();
        cy.get('@onClose').should('have.been.calledOnce');
    });

    it('moves through exercises queue over time', () => {
        const onClose = cy.stub().as('onClose');

        cy.clock();
        cy.mount(<WorkoutRunnerModal isOpen={true} onClose={onClose} workout={WORKOUT} />);

        cy.tick(30 * 1000);

        cy.contains('Squats').should('exist');
    });
});
