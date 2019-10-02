describe('Upswyng', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('navigates to /resources', () => {
		cy.get('nav a').contains('resources').click();
		cy.url().should('include', '/resource');
	});
});