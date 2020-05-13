describe("Provider Portal", () => {
  beforeEach(() => {
    cy.visit("/provider");
  });

  it("loads the homepage", () => {
    cy.contains("Upswyng Service Provider Portal");
  });
});
