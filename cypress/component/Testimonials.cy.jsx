import { Testimonials } from '../../src/pages/AboutUs/components/Testimonials/Testimonials';

describe('Testimonials component', () => {
    it('renders title and all testimonial cards', () => {
        cy.mount(<Testimonials />);

        cy.contains('What Athletes Say').should('exist');

        cy.get('section').within(() => {
            cy.get('[class*="card"]').its('length').should('be.gte', 3);
            cy.contains('Sarah Chen').should('exist');
            cy.contains('Marcus Thompson').should('exist');
            cy.contains('Elena Rodriguez').should('exist');
        });
    });

    it('renders star ratings for each card', () => {
        cy.mount(<Testimonials />);

        cy.get('[class*="stars"]').first().within(() => {
            cy.contains('★').should('exist');
        });
    });
});
