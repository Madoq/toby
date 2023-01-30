describe('Vacation requests', () => {

  beforeEach(() => {
    cy.refreshDatabase()
    cy.seed('DemoSeeder')

    cy.php(`Toby\\Eloquent\\Models\\User::first();`)
      .then(user => {
        cy.login({ email: user.email })
      })
  })

  it('try to create benefit, add it to a user and check if calculation are correct', () => {
    cy.visit('/resumes');

    cy.attr('create-cv')
      .click()

    cy.url()
      .should('include', '/resumes/create')

    cy.attr('users-listbox-button')
      .click()

    cy.attr('users-listbox-list')
      .contains('Nie istnieje w bazie')
      .click()

    cy.get('#name')
      .type('Anna Krupa')

    cy.attr('add-school')
      .children()
      .eq(2)
      .click()

    cy.attr('add-school')
      .children()
      .eq(1)
      .children(1)
      .click()

    cy.attr('school-name')
      .type('Szkoła im. Jana Pawła II')

    cy.attr('school-degree')
      .type('Niższe')

    cy.attr('school-fieldofstudy')
      .type('IT')

    cy.attr('school-start-date')
      .siblings()
      .click()
      .changeYear(2021)
      .changeMonthInResume("Maj")

    cy.attr('school-end-date')
      .siblings()
      .eq(1)
      .click()
      .changeYear(2022)
      .changeMonthInResume("Maj")

    cy.attr('add-language')
      .children()
      .eq(2)
      .click()

    cy.attr('add-language')
      .children()
      .eq(1)
      .children(1)
      .click()

    cy.attr('language')
      .type('Polish')
      .type('{enter}')

    cy.attr('language-level')
      .children()
      .children()
      .eq(1)
      .click()

    cy.attr('add-technologies')
      .children()
      .eq(2)
      .click()

    cy.attr('add-technologies')
      .children()
      .eq(1)
      .children(1)
      .click()

    cy.attr('technology')
      .type('Golang')
      .type('{enter}')

    cy.attr('technology-level')
      .children()
      .children()
      .eq(3)
      .click()

    cy.attr('add-project')
      .children()
      .eq(2)
      .click()

    cy.attr('add-project')
      .children()
      .eq(1)
      .children(1)
      .click()

    cy.attr('project-text')
      .type('Anna Krupa')

    cy.attr('project-technology')
      .type('Golang')
      .type('{enter}')
    cy.attr('project-text')
      .click()

    cy.attr('project-start-date')
      .siblings()
      .click()
      .changeYear(2021)
      .changeMonthInResume("Maj")

    cy.attr('project-in-work-date')
      .check()

    cy.attr('project-tasks')
      .type('Anna Krupa')

    cy.attr('save-resume')
      .click()

    cy.url()
      .should('not.include', '/resumes/create')

    cy.attr('resume-name')
      .contains('Anna Krupa')
  });
});
