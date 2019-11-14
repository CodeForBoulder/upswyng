import { createPartiallyEmittedExpression } from "typescript";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })

Cypress.Commands.add("addScheduleEvent", (type, day, from, to) => {
  cy.get("[data-cy=scheduleType]")
    .click()
    .type(type);
  cy.get("[data-cy=scheduleDay]").click();
  cy.get("div")
    .contains(day)
    .click();
  cy.get("[name=from]")
    .first()
    .click()
    .type(from);
  cy.get("[name=to]")
    .first()
    .click()
    .type(to);
  cy.get("[data-cy=scheduleSubmit]").click();
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
