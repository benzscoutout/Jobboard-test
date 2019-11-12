import "./commands";

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});

Cypress.Commands.add("restoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
Cypress.Commands.add("login_blognone", () => {
    cy.get('.navbar-nav.d-lg-block > .nav-item > .nav-link').click()
    cy.wait(2000)
    cy.get('.card-body > .css-1hw29i9 > .my-4 > .btn').click()
    cy.get('#edit-name').type("benzScoutout")
    cy.get('#edit-pass').type("Benzkung1234")
    cy.get('#edit-submit').click()
    
})

Cypress.Commands.add("postjob_blognone", () => {
    cy.get('.css-9wy3t8 > .d-flex').click()
    let readData = cy.readFile('./cypress/fixtures/jobs_blognone.json')
    readData.then((json) => {
        cy.get('#jobTitle').type(json.name_en)
        cy.get('.public-DraftStyleDefault-block').type(json.description)
        cy.SelectTypeJobs(2)
        cy.SelectJobLevel(3)
        cy.get('.mb-2 > .input-group > .form-control').clear()
        cy.get('.mb-2 > .input-group > .form-control').type(json.salary_min)
        cy.get(':nth-child(2) > .input-group > .form-control').clear()
        cy.get(':nth-child(2) > .input-group > .form-control').type(json.salary_max)
        cy.get(':nth-child(4) > .form-group > .css-10nd86i > .css-vj8t7z > .css-1hwfws3').click()
        cy.get(':nth-child(4) > .form-group > .css-10nd86i > .css-15k3avv > .css-11unzgr > #react-select-2-option-' + (2)).click()
        cy.get(':nth-child(6) > .css-10nd86i > .css-vj8t7z > .css-1hwfws3').click()
        cy.get('.css-2o5izw > .css-1hwfws3 > .css-1492t68 > .css-1g6gooi > div > input').type('typescript{enter}')
    })
})


Cypress.Commands.add("SelectTypeJobs", ( type ) => {

    if(type == 2){
        cy.get('.col-xl-8 > .d-block > .btn-group > :nth-child(2)').click()
    }else if(type == 3){
        cy.get('.col-xl-8 > .d-block > .btn-group > :nth-child(3)').click()
    }else if(type == 4){
        cy.get('.col-xl-8 > .d-block > .btn-group > :nth-child(4)').click()
    }else if(type == 5){
        cy.get('.col-xl-8 > .d-block > .btn-group > :nth-child(5)').click()
    }else{
        cy.get('.col-xl-8 > .d-block > .btn-group > :nth-child(1)').click()
    }
    
})

Cypress.Commands.add("SelectJobLevel", (level ) => {
    if(level == 1){
        cy.get('.col-xl-4 > .d-block > .btn-group > :nth-child(1)').click()
    }else if(level == 2){
        cy.get('.col-xl-4 > .d-block > .btn-group > :nth-child(2)').click()
    }else if(level == 3){
        cy.get('.col-xl-4 > .d-block > .btn-group > :nth-child(3)').click()
    }
})