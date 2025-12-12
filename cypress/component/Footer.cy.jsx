import { Footer } from '../../src/components/Footer/Footer';

describe('Footer component', () => {
    it('renders main text and links', () => {
        cy.mount(<Footer />);

        cy.contains('footer', 'FitTrack').should('exist');
        cy.contains('Transform your fitness journey').should('exist');

        cy.contains('About Us').should('have.attr', 'href', '#about');
        cy.contains('Pricing').should('have.attr', 'href', '#pricing');
        cy.contains('Support').should('have.attr', 'href', '#support');
        cy.contains('Privacy').should('have.attr', 'href', '#privacy');
    });
});
