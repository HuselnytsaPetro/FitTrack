import { Button } from '../../src/components/Button/Button';

describe('Button component', () => {
    it('renders with default text and handles click', () => {
        const onClick = cy.stub().as('onClick');
        cy.mount(<Button onClick={onClick} />);
        cy.contains('button', 'Start Free Trial').click();
        cy.get('@onClick').should('have.been.calledOnce');
    });

    it('renders custom children and respects disabled state', () => {
        const onClick = cy.stub().as('onClick');
        cy.mount(<Button disabled onClick={onClick}> Custom </Button>);
        cy.contains('button', 'Custom').should('be.disabled').click({ force: true });
        cy.get('@onClick').should('not.have.been.called');
    });
});

