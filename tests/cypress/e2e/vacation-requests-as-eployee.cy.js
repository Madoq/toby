describe('Vacation requests', () => {

  before(() => {
    cy.refreshDatabase()
    cy.seed('DemoSeeder')
    cy.login({ email: 'jolanta.kowak@example.com' })
  })
  
  it('Creates a sick vacation request by administrator for another employee', () => {
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

    cy.attr('save-button')
      .click()

    cy.url()
      .should('not.include', '/vacation/requests/create')

    cy.attr('vacation-status')
      .should('contain.text', 'Czeka na akceptację od przełożonego technicznego')

    cy.clearCookies()
  });

  it('Accept requests by technical', () => {
    cy.login({ email: 'maciej.ziolkowski@example.com' })

    cy.visit('/vacation/requests');

    cy.attr('vacation-request')
      .click()

    cy.attr('vacation-accept-by-technical')
      .click()
      .wait(3000)

    cy.attr('vacation-status')
      .should('contain.text', 'Zaakceptowany przez przełożonego technicznego', 'Czeka na akceptację od przełożonego administracyjnego')

    cy.clearCookies()
  });
  it('Accept requests by administrator', () => {
    cy.login({ email: 'milosz.borowski@example.com' })

    cy.visit('/vacation/requests');

    cy.attr('vacation-request')
      .click()

    cy.attr('vacation-accept-by-administrator')
      .click()

    cy.attr('vacation-status')
      .should('contain.text', 'Zaakceptowany przez przełożonego administracyjnego')
  });
});
