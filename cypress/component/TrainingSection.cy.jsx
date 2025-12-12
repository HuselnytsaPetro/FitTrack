import { TrainingSection } from '../../src/pages/Workouts/components/TrainingsSection/TrainingSection';

const baseWorkout = {
    id: 1,
    name: 'Full Body Blast',
    difficulty_level: 'Intermediate',
    estimated_duration: 45,
    category: 'Strength',
    description: 'A complete full body workout.',
    image_url: 'https://example.com/workout.jpg',
};

describe('TrainingSection component', () => {
    it('shows loading state when loading is true', () => {
        cy.mount(<TrainingSection workouts={[]} loading={true} error={null} />);
        cy.contains('Loading workouts...').should('exist');
    });

    it('shows error state when error present', () => {
        cy.mount(<TrainingSection workouts={[]} loading={false} error="Server error" />);
        cy.contains('Error: Server error').should('exist');
    });

    it('shows empty state when no workouts', () => {
        cy.mount(<TrainingSection workouts={[]} loading={false} error={null} />);
        cy.contains('No workouts found').should('exist');
    });

    it('expands card and shows exercises when clicked', () => {
        const workouts = [
            {
                ...baseWorkout,
                exercises: [
                    { id: 11, name: 'Squats', duration: 10 },
                    { id: 12, name: 'Push Ups', duration: 5 },
                ],
            },
        ];

        cy.mount(<TrainingSection workouts={workouts} loading={false} error={null} />);

        cy.contains('h3', 'Full Body Blast').click();

        cy.contains('Exercises:').should('exist');
        cy.contains('Squats (10m)').should('exist');
        cy.contains('Push Ups (5m)').should('exist');
    });

    it('renders fallback text when no exercises in expanded card', () => {
        const workouts = [
            {
                ...baseWorkout,
                id: 2,
                exercises: [],
            },
        ];

        cy.mount(<TrainingSection workouts={workouts} loading={false} error={null} />);

        cy.contains('h3', 'Full Body Blast').click();
        cy.contains('No exercises yet').should('exist');
    });
});
