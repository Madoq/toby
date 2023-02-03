describe('Resumes', () => {

  beforeEach(() => {
    cy.refreshDatabase()
    cy.seed('DemoSeeder')

    cy.php(`Toby\\Eloquent\\Models\\User::first();`)
      .then(user => {
        cy.login({ email: user.email })
      })
  })

  it('Create resume for a user from outside the database', () => {
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
      .type('Jacek Wojciechowski')

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
      .type('Technikum nr 5 w Legnicy')

    cy.attr('school-degree')
      .type('Średnie')

    cy.attr('school-fieldofstudy')
      .type('Informatyka')

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
      .type('Aplikacja do testowania')

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
      .type('Robienie testów')

    cy.attr('save-resume')
      .click()

    cy.url()
      .should('not.include', '/resumes/create')

    cy.attr('resume-name')
      .contains('Jacek Wojciechowski')
  });
});
