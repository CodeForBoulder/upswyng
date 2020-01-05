Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

describe("upswyng web app E2E", () => {
  beforeEach(() => {
    cy.goHome();
  });
  context("searchbar", () => {
    it("is active", () => {
      cy.get("#search").type("water");
      assert(() => {
        cy.get("#search").should("include", "water");
      });
    });
    it("performs an acurate request", () => {
      // TODO
    });
  });
  context("navbar", () => {
    it("routes to home", () => {
      cy.get("title")
        .first()
        .click({ force: true });
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
    it("opens menu", () => {
      cy.get("span")
        .first()
        .click();
    });
    it("displays accurate info", () => {
      cy.get("a")
        .contains("About")
        .should("exist");
    });
    it("exits", () => {
      cy.get(".MuiBackdrop-root")
        .first()
        .click();
    });
  });
  context("Food", () => {
    it("Opens successfully", () => {
      cy.get("a")
        .contains("Food")
        .click();
      cy.get("ul").should("exist");
    });
    it("Exits", () => {
      cy.get("span")
        .contains("go back to pervious page")
        .click();
    });
  });
  context("Shelter", () => {
    it("Opens successfully", () => {
      cy.get("a")
        .contains("Shelter")
        .click();
      cy.get("ul").should("exist");
    });
    it("Exits", () => {
      cy.get("span")
        .contains("go back to pervious page")
        .click();
    });
  });
  context("Hygiene", () => {
    it("Opens successfully", () => {
      cy.get("a")
        .contains("Hygiene")
        .click();
      cy.get("ul").should("exist");
    });
    it("Exits", () => {
      cy.get("span")
        .contains("go back to pervious page")
        .click();
    });
  });
  context("Transit", () => {
    it("Opens successfully", () => {
      cy.get("a")
        .contains("Transit")
        .click();
      cy.get("ul").should("exist");
    });
    it("Exits", () => {
      cy.get("span")
        .contains("go back to pervious page")
        .click();
    });
  });
  context("Resources", () => {
    it("Opens successfully", () => {
      cy.get("a")
        .contains("Resources")
        .click();
      cy.get("ul").should("exist");
    });
    it("Exits", () => {
      cy.get("span")
        .contains("go back to pervious page")
        .click();
    });
  });
  context("Hotlines", () => {
    it("Opens successfully", () => {
      cy.get("a")
        .contains("Hotlines")
        .click();
      cy.get("ul").should("exist");
    });
    it("Exits", () => {
      cy.get("span")
        .contains("go back to pervious page")
        .click();
    });
  });
  context("Health", () => {
    it("Opens successfully", () => {
      cy.get("a")
        .contains("Health")
        .click();
      cy.get("ul").should("exist");
    });
    it("Exits", () => {
      cy.get("span")
        .contains("go back to pervious page")
        .click();
    });
  });
  context("Wifi", () => {
    it("Opens successfully", () => {
      cy.get("a")
        .contains("Wifi")
        .click();
      cy.get("ul").should("exist");
    });
    it("Exits", () => {
      cy.get("span")
        .contains("go back to pervious page")
        .click();
    });
  });
  context("Job Training", () => {
    it("Opens successfully", () => {
      cy.get("a")
        .contains("Job Training")
        .click();
      cy.get("ul").should("exist");
    });
    it("Exits", () => {
      cy.get("span")
        .contains("go back to pervious page")
        .click();
    });
  });
  context("Social Services", () => {
    it("Opens successfully", () => {
      cy.get("a")
        .contains("Social Services")
        .click();
      cy.get("ul").should("exist");
    });
    it("Exits", () => {
      cy.get("span")
        .contains("go back to pervious page")
        .click();
    });
  });
  context("Coordinated Entry", () => {
    it("Exists", () => {
      cy.get("span")
        .contains("Coordinated Entry")
        .should("exist");
    });
  });
});
