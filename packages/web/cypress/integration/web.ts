describe("Web Client", () => {
  before(() => {
    cy.server();
    cy.route("POST", "/api/alert/search", { count: 0, alerts: [] });
    cy.route("/api/weather*", "fixture:api/weather").as("getWeather");
    cy.visit("/");
  });

  it("shows the weather", () => {
    cy.wait("@getWeather");
    cy.contains("58°");
  });
});
