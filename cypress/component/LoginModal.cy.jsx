import { LoginModal } from '../../src/components/LoginModal/LoginModal';
import { __setAuthMock } from '../../src/hooks/useAuth';

const FAKE_USER = { username: 'test-user' };

describe('LoginModal component', () => {
    it('renders form when open and calls login on submit (success)', () => {
        const onClose = cy.stub().as('onClose');
        const login = cy.stub().resolves({ success: true, data: { user: FAKE_USER } });

        __setAuthMock({
            user: null,
            loading: false,
            register: cy.stub(),
            login,
            logout: cy.stub(),
        });

        cy.mount(<LoginModal isOpen={true} onClose={onClose} />);

        cy.get('input[type="email"]').type('test@example.com');
        cy.get('input[type="password"]').type('password');
        cy.contains('button', 'Sign In').click();

        cy.wrap(null).then(() => {
            expect(login).to.have.been.calledWith('test@example.com', 'password');
            expect(onClose).to.have.been.calledOnce;
        });
    });

    it('shows error when login fails', () => {
        const onClose = cy.stub().as('onClose');
        const login = cy.stub().resolves({ success: false, error: 'Invalid credentials' });

        __setAuthMock({
            user: null,
            loading: false,
            register: cy.stub(),
            login,
            logout: cy.stub(),
        });

        cy.mount(<LoginModal isOpen={true} onClose={onClose} />);

        cy.get('input[type="email"]').type('bad@example.com');
        cy.get('input[type="password"]').type('wrong');
        cy.contains('button', 'Sign In').click();

        cy.contains('Invalid credentials').should('exist');
        cy.wrap(null).then(() => {
            expect(onClose).not.to.have.been.called;
        });
    });
});
