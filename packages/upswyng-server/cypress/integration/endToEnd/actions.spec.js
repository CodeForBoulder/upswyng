describe("upswyng-server-actions", () => {
  context("resource creation", () => {
    before(() => {
      cy.visit("/resource/create");
    });

    it("fill out resource form", () => {
      cy.get("form").within(() => {
        cy.get("[data-cy=resourceName]")
          .as("Name")
          .click()
          .type("Boulder Breakfast");
        cy.get("[data-cy=description]")
          .as("Description")
          .click()
          .type("Coffee and food");
        cy.get("[data-cy=phone]")
          .as("phone")
          .click()
          .type("4444444444");
        cy.get("[data-cy=address1]")
          .as("address1")
          .click()
          .type("1234 Pearl St.");
        cy.get("[data-cy=address2]")
          .as("address2")
          .click()
          .type("#5543");
        cy.get("[data-cy=city]")
          .as("city")
          .click()
          .type("Boulder");
        cy.get("[data-cy=state]")
          .as("state")
          .click()
          .type("CO");
        cy.get("[data-cy=zip]")
          .as("zip")
          .click()
          .type("80403");
        cy.get("[data-cy=website]")
          .as("website")
          .click()
          .type("https://www.example.com");
        // cy.get("[data-cy=latitude]")
        //   .as("latitude")
        //   .type("40.01");
        // cy.get("[data-cy=longitude]")
        //   .as("longitude")
        //   .type("-105.27"); // this info is currently pre-populated
      });
    });

    it("add schedule entries", () => {
      cy.addScheduleEvent("Weekly", "Monday", "10:00 AM", "12:00 PM");
      cy.addScheduleEvent("Monthly", "Tuesday", "10:00 AM", "1:00 PM");
    });

    it("save draft", () => {});
  });
});
