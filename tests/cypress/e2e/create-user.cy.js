describe('Users', () => {

  before(() => {
    cy.refreshDatabase()
    cy.seed('DemoSeeder')

    cy.php(`Toby\\Eloquent\\Models\\User::first();`)
      .then(user => {
        cy.login({ email: user.email })
      })
  })

  it('Creates a user and save it in to database', () => {
    cy.visit('/users');

    cy.attr('create-button')
      .click()

    cy.get('#firstName')
      .type('Nataniel')

    cy.get('#lastName')
      .type('Wysocki')

    cy.get('#email')
      .type('NatanielW@example.com')

    cy.get('#position')
      .type('Programista')

    cy.get('#employment_date')
      .parent()
      .click()
      .should('be.visible')
      .changeMonthAndDayAndYear(2022, 11, 18)

    cy.get('#slack')
      .type('4102')

    cy.get('#birthday')
      .parent()
      .click()
      .should('be.visible')
      .changeMonthAndDayAndYear(1990, 4, 18)

    cy.attr('save-button')
      .click()

    cy.url()
      .should('not.include', '/users/create')

    cy.attr('user-name')
      .contains('Nataniel Wysocki')
  });
});
