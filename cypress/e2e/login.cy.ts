import * as _ from "cypress";

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
});
