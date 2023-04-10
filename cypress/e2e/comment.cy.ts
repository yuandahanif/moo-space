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

describe("Comment", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Should able to login and comment.", () => {
    cy.contains("button", "Masuk").click();

    cy.get("input[type='email']").type("mona@gmail.com");
    cy.get("input[type='password']").type("123456");

    cy.get("button[type='submit']").click();
    cy.contains("mona@gmail.com");

    cy.contains("Pengalaman Belajar React di Dicoding").click();
    cy.get("div[contenteditable='true']").type("halooo dari cypress");
    cy.get("button[aria-label='post comment']").click();

    cy.contains("halooo dari cypress");
  });
});
