describe('Vacation requests', () => {

  before(() => {
    cy.refreshDatabase()
    cy.seed('DemoSeeder')
    cy.login({ email: 'jolanta.kowak@example.com' })
  })
  
  it('Creates a vacation request as employee', () => {
    cy.visit('/vacation/requests');

    cy.attr('create-vacation-request-button')
      .click()

    cy.url()
      .should('include', '/vacation/requests/create')

    cy.attr('vacation-types-listbox-button')
      .click()
      
    cy.attr('vacation-types-list')
      .should('be.visible')
      .contains('Urlop wypoczynkowy')
      .click()

    cy.get('#date_from')
      .parent()
      .click()
      .should('be.visible')
      .changeMonthAndDay(11, 18)

    cy.get('#date_to')
      .parent()
      .click()
      .should('be.visible')
      .changeMonthAndDay(11, 22)

    cy.attr('estimated-days-text')
      .should('contain.text', '5')

    cy.get('#comment')
      .type('Urlop.')

    cy.attr('save-request-button')
      .click()

    cy.url()
      .should('not.include', '/vacation/requests/create')

    cy.attr('vacation-request-status')
      .should('contain.text', 'Czeka na akceptację od przełożonego technicznego')

    cy.clearCookies()
  });

  it('Accepts the request by a technical approver', () => {
    cy.login({ email: 'maciej.ziolkowski@example.com' })

    cy.visit('/vacation/requests');

    cy.attr('single-vacation-request')
      .click()

    cy.attr('vacation-accept-by-technical')
      .click()

    cy.get('.Vue-Toastification__toast',{timeout:5000})
      .should('be.visible')

    cy.attr('vacation-request-status')
      .should('contain.text', 'Zaakceptowany przez przełożonego technicznego', 'Czeka na akceptację od przełożonego administracyjnego')

    cy.clearCookies()
  });

  it('Accepts the request by an administrative approver', () => {
    cy.login({ email: 'milosz.borowski@example.com' })

    cy.visit('/vacation/requests');

    cy.attr('single-vacation-request')
      .click()

    cy.attr('vacation-accept-by-administrative-approval')
      .click()

    cy.attr('vacation-request-status')
      .should('contain.text', 'Zaakceptowany przez przełożonego administracyjnego')
  });
});
