import '../../support/commands_jobthai.js'
describe("Login Flow", () => {
    beforeEach(() => {
        // cy.restoreLocalStorage();
    });
    afterEach(() => {
        // cy.saveLocalStorage();
    });
    it('Login', function () {
        cy.visit(Cypress.config().baseUrl)
        cy.login_jobthai()
        cy.postjob_jobthai()
    })

  

})