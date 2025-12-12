import { UserMenu } from '../../src/components/UserMenu/UserMenu';
import { __setAuthMock } from '../../src/hooks/useAuth';

const USER = { username: 'demo-user' };

describe('UserMenu component', () => {
    it('does not render when there is no user', () => {
        __setAuthMock({
            user: null,
            loading: false,
            register: cy.stub(),
            login: cy.stub(),
            logout: cy.stub(),
        });

        cy.mount(<UserMenu />);
        cy.get('body').find('[class*="logoutButton"]').should('have.length', 0);
    });

    it('renders dropdown and calls logout', () => {
        const logout = cy.stub().as('logout');

        __setAuthMock({
            user: USER,
            loading: false,
            register: cy.stub(),
            login: cy.stub(),
            logout,
        });

        cy.mount(<UserMenu />);

        cy.get('button').filter('[class*="userButton"]').click();
        cy.contains(USER.username).should('exist');

        cy.contains('Log Out').click();
        cy.get('@logout').should('have.been.calledOnce');
    });
});
