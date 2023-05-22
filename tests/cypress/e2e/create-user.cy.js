describe('Users', () => {

  before(() => {
    cy.refreshDatabase()
    cy.seed('DemoSeeder')

    cy.php(`Toby\\Eloquent\\Models\\User::first();`)
      .then(user => {
        cy.login({ email: user.email })
      })
  })

  it('Creates a user', () => {
    cy.visit('/users')

    cy.attr('create-user-button')
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

    cy.attr('save-user-button')
      .click()

    cy.url()
      .should('not.include', '/users/create')

    cy.attr('user-name')
      .contains('Nataniel Wysocki')

    cy.visit('/vacation/limits')

    cy.attr('user-vacation-button')
      .click({multiple: true})      
    
    cy.attr('user-vacation-days-input')
      .each(($user)=> {
        cy.wrap($user).then(($vacationLimitDays) => {
          if($vacationLimitDays.is(":disabled")){
            return
          }
          else{
            cy.get($user)
            .click()
            .type('10')
          }
        })
      })
    
    cy.attr('users-vacation-days-save-button')
      .click()

    cy.visit('/vacation/requests');

    cy.attr('create-vacation-request-button')
      .click()
  
    cy.url()
      .should('include', '/vacation/requests/create')
  
    cy.attr('users-listbox-button')
      .click()
        
    cy.attr('users-list')
      .should('be.visible')
      .contains('Nataniel Wysocki')
      .click()


    cy.get('#date_from')
    .parent()
    .click()
    .should('be.visible')
    .changeMonthAndDay(11, 27)

    cy.get('#date_to')
      .parent()
      .click()
      .should('be.visible')
      .changeMonthAndDay(11, 29)

    cy.attr('save-request-button')
      .click()
  
    cy.url()
      .should('not.include', '/vacation/requests/create')
  });
});
