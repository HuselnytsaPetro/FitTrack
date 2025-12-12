import { SearchSection } from '../../src/pages/Workouts/components/SearchSection/SearchSection';

describe('SearchSection component', () => {
    it('renders categories and allows selecting category', () => {
        const setCategory = cy.stub().as('setCategory');
        const setSearchTitle = cy.stub().as('setSearchTitle');

        cy.mount(
            <SearchSection
                category="All"
                setCategory={setCategory}
                searchTitle=""
                setSearchTitle={setSearchTitle}
            />,
        );

        cy.contains('button', 'Strength').click();
        cy.get('@setCategory').should('have.been.calledWith', 'Strength');
    });
});
