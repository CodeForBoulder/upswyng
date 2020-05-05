describe("UpSwyng", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the homepage", () => {
    cy.contains("Upswyng Provider Portal");
  });
});

export {}; // make typescript happy
