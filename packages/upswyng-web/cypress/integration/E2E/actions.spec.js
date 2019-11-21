describe('upswyng web app E2E', () => {
    before(() => {
        cy.goHome();
    });
    context('searchbar', () => {
        it('is active', () => {
            cy.get('#search')
            .type('water')
            assert(() => {
                cy.get('#search').should('include', 'water')
            })
        });
        it('performs an acurate request', () => {
            // lookup
        });
    });
    context('navbar', () => {
        it('displays accurate info', () => {

        });
        it('routes to home', () => {
            // cy.get('span').first().click();
            cy.get('title').first().click({force: true});
            cy.url().should("eq", Cypress.config().baseUrl + "/");
        });
        it('opens menu', () => {
            cy.get('span').first().click();
        })
    })
    context('Food', () => {})
    context('Shelter', () => {})
    context('Hygiene', () => {})
    context('Transit', () => {})
    context('Resources', () => {})
    context('Hotlines', () => {})
    context('Health', () => {})
    context('Wifi', () => {})
    context('Job Training', () => {})
    context('Social Services', () => {})
    context('Coordinated Entry', () => {})
});