describe('Vacation requests', () => {

  beforeEach(() => {
    cy.refreshDatabase()
    cy.seed('DemoSeeder')

    cy.php (`Toby\\Eloquent\\Models\\User::first();`)
      .then(user=> {
        cy.login({email: user.email})
      })
  })

  it('try to create benefit, add it to a user and check if calculation are correct', () => {
    cy.visit('/benefits');

    cy.attr('create-benefit')
      .click()
    
    cy.get('#name')
      .type('gym')

    cy.attr('save-benefit')
      .click()
    
    cy.attr('benefit-name')
      .should('contain.text', 'Gym')

    cy.visit('/assigned-benefits')

    cy.attr('grid-employer').eq(0).type(10)
    cy.attr('grid-employee').eq(0).type(10)
    cy.attr('grid-employer').eq(1).type(11)
    cy.attr('grid-employee').eq(1).type(11)
    cy.attr('grid-employer').eq(2).type(27)

    cy.attr('grid-sum')
      .eq(0)
      .should('contain.text', '48')
      .wait(2000)

    cy.visit('/benefits');

    cy.attr('benefit-button')
      .eq(0)
      .click()

    cy.attr('benefit-delete')
      .eq(0)
      .click()
      .wait(2000)

    cy.visit('/assigned-benefits')

    cy.attr('grid-sum')
      .eq(0)
      .should('contain.text', '38')
  });
});
