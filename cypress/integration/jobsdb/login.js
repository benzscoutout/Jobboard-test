
describe("Login Flow", () => {
    beforeEach(() => {
        // cy.restoreLocalStorage();
    });
    afterEach(() => {
        // cy.saveLocalStorage();
    });
    it('Login', function () {
        cy.visit(Cypress.config().baseUrl)
        cy.login()
    })

    it('postJob', function() {
        cy.wait(2000)
        cy.PostJob()
    })

})