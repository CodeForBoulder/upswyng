describe("upswyng-server-pages", () => {
  context("index", () => {
    before(() => {
      cy.visit("/");
    });

    it("loads without crashing", () => {
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("includes navbar", () => {
      cy.get(".navbar > .navbar-brand").should("exist");
    });
  });

  context("/resource", () => {
    before(() => {
      cy.visit("/resource");
    });

    it("loads without crashing", () => {
      cy.url().should("eq", Cypress.config().baseUrl + "/resource");
    });

    it("links to login page", () => {
      cy.get(`a[href*="/login"]`).click();
      cy.url().should("eq", Cypress.config().baseUrl + "/login");
    });
  });

  context("/resource/create", () => {
    before(() => {
      cy.visit("/resource/create");
    });

    it("loads without crashing", () => {
      cy.url().should("eq", Cypress.config().baseUrl + "/resource/create");
    });
  });
});
