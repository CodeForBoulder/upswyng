describe("Provider Portal", () => {
  beforeEach(() => {
    cy.visit("/provider");
  });

  it("loads the homepage", () => {
    cy.contains("UpSwyng Service Provider Portal");
  });
});
