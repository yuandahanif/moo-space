import * as _ from "cypress";

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Should display login modal.", () => {
    cy.contains("button", "Masuk").click();
    cy.contains("Masuk MOO Space");
  });

  it("Should able to login.", () => {
    cy.contains("button", "Masuk").click();

    cy.get("input[type='email']").type("mona@gmail.com");
    cy.get("input[type='password']").type("123456");

    cy.get("button[type='submit']").click();
    cy.contains("mona@gmail.com");
  });

  // it("Should display profile.", () => {});
});
