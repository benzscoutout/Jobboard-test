import '../../support/commands_blognone.js'


describe("Login Flow", () => {
    beforeEach(() => {
        // cy.restoreLocalStorage();
    });
    afterEach(() => {
        // cy.saveLocalStorage();
    });
    it('Login', function () {
        cy.visit(Cypress.config().baseUrl)
        cy.login_blognone()
        cy.postjob_blognone()
    })


})