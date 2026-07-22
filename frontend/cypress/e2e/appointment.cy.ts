describe("Appointment Flow", () => {
  it("logs in and books an appointment", () => {
    cy.visit("http://localhost:5173/login");

    cy.get('input[type="email"]').type("mohamed.hamed544@gmail.com");

    cy.get('input[type="password"]').type("Password123!");

    cy.get('button[type="submit"]').click();

    cy.url().should("not.include", "/login");

    cy.visit("http://localhost:5173/book");

    cy.get('select[name="patient"]')
      .find("option")
      .eq(1)
      .then(($option) => {
        cy.get('select[name="patient"]').select($option.val() as string);
      });

    cy.get(".cursor-pointer").first().click();

    cy.get('button[type="submit"]').click();

    cy.contains(/success|appointment/i).should("exist");
  });
});
