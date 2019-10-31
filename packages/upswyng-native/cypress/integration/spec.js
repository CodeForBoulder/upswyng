describe('Upswyng', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('navigates to /resources', () => {
		cy.get('nav a').contains('resources').click();
		cy.url().should('include', '/resource');
	});

	it('can create a new resource', () => {
		cy.visit('/resource/create');
		cy.contains("Create A Resource");
	})
});