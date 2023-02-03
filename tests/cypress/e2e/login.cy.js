describe('Login', () => {

  before(() => {
    cy.refreshDatabase()
    cy.seed('DemoSeeder')

    cy.php(`Toby\\Eloquent\\Models\\User::first();`)
      .then(user => {
        cy.login({ email: user.email })
      })
  })

  it('Shows a homepage for logged user', () => {
    cy.visit('/');

    cy.contains('Jan Kowalski');
  });
});
