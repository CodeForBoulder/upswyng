describe("upswyng-server-pages", () => {
  context("index", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("loads without crashing", () => {
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("includes navbar", () => {
      cy.get(".navbar > .navbar-brand").should("exist");
    });
  });
});
