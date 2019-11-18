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
Cypress.Commands.add("login_jobthai", () => {
    cy.get('#login-company').click()
    cy.get('#username_company').type('Maakil_Sura')
    cy.get('#password_company').type('253425kim')
    cy.get('#login_companies > .mb10 > .login--submit > .btn-resume--lg').click()
})

Cypress.Commands.add("postjob_jobthai", () => {
   
    let readData = cy.readFile('./cypress/fixtures/jobs_blognone.json')
    readData.then((json) => {
        cy.get('#company-position-job > .text_superstore_menu_employers').click()
        cy.get('.addonline > img').click()
        // cy.get(':nth-child(3) > .postjob > img').click()
        cy.get('#jobtype').select('คอมพิวเตอร์/IT/โปรแกรมเมอร์')
        cy.get('#subjobtype').select('Programmer')
        cy.get('#jobtitle').clear()
        cy.get('#jobtitle').type(json.name_en)
        cy.get('#position').clear()
        cy.get('#position').type(json.position)
        cy.get('#salary').clear()
        cy.get('#salary').type(json.salary_min + '-'+json.salary_max)
        cy.get('#jobdescription').clear()
        cy.get('#jobdescription').type(json.description)
        cy.get('#province').select('กรุงเทพมหานคร')
        cy.get('#amphoe').select('จตุจักร')
        cy.get('#tambon').select('เสนานิคม')
        json.summarize.forEach( (element,index) => {
            cy.get('#attr'+(index+1)).clear()
            cy.get('#attr'+(index+1)).type(element)
        });
        cy.get('#openContact').click()
        cy.get('#name_contact').clear()
        cy.get('#name_contact').type(json.contact.name)
        cy.get('#tel_contact').clear()
        cy.get('#tel_contact').type(json.contact.tel)
        cy.get('#email_spacial').clear()
        cy.get('#email_spacial').type(json.contact.email)
        cy.get('#address_contact').clear()
        cy.get('#address_contact').type(json.contact.address)
        cy.get('#line_contact').clear()
        cy.get('#line_contact').type(json.contact.lineId)
        cy.get('#bt_register > img').click({force: true})
    })
})