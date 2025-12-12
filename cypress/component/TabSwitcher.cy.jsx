import { MemoryRouter } from 'react-router-dom';
import { TabSwitcher } from '../../src/components/TabSwitcher/TabSwticher';
import { __setAuthMock } from '../../src/hooks/useAuth';

const mountWithRouter = (ui) => {
    return cy.mount(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('TabSwitcher component', () => {
    it('shows login button when user is not authenticated', () => {
        __setAuthMock({
            user: null,
            loading: false,
            register: cy.stub(),
            login: cy.stub(),
            logout: cy.stub(),
        });

        mountWithRouter(<TabSwitcher />);

        cy.contains('Fit Track').should('exist');
        cy.contains('About').should('exist');
        cy.contains('Workouts').should('exist');
        cy.contains('Stats').should('exist');

        cy.contains('button', 'Start Free Trial').click();
        cy.get('input[type="email"]').should('exist');
    });

    it('shows UserMenu when user is authenticated', () => {
        __setAuthMock({
            user: { username: 'test-user' },
            loading: false,
            register: cy.stub(),
            login: cy.stub(),
            logout: cy.stub(),
        });

        mountWithRouter(<TabSwitcher />);

        cy.get('button').filter('[class*="userButton"]').should('exist');
    });
});
