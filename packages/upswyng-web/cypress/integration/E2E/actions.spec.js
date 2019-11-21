describe('upswyng web app E2E', () => {
    before(() => {
        cy.visit('/')
    });
    context('searchbar', () => {
        it('is active', () => {
            cy.get('#search');
        })
    })
});