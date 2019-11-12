// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
//Start Function
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


Cypress.Commands.add('login', (options = {}) => {
    cy.get('.link-area > .btn-info').click()
    cy.wait(2000)
    cy.get('#userid').type('ni@hooop.io')
    cy.get('#password').type('Rc123456')
    cy.get('#btnSubmitRCLoign').click()
})

Cypress.Commands.add('PostJob', (index, options = {}) => {
    cy.get('#PostANewJobAdButton').click()
    let readData = cy.readFile('./cypress/fixtures/jobs.json')
    readData.then((json) => {
        cy.get('#c_EpJbAdSyItDap_JbTe0').type(json.name_en)
        cy.get('#c_EpJbAdSyItDap_JbTeAtLg0').type(json.name_th)
        cy.get('iframe#richTextBoxc_EpJbAdSyItDap_JbDnAdRt0_ifr')
            .then(function ($iframe) {
                const $body = $iframe.contents().find('body#tinymce > p')
                cy.wrap($body).type(json.description)
            })

        cy.get('#c_EpJbAdSyItDap_IsReAnEl0_CheckBox').click()
        cy.get('#c_EpJbAdSyItDap_StD10').type(json.summarize[0])
        cy.get('#c_EpJbAdSyItDap_StD20').type(json.summarize[1])
        cy.get('#c_EpJbAdSyItDap_StD30').type(json.summarize[2])
        cy.get('#nextBtn').click()
        cy.get('#c_EpJbAdDlItDa > div.frm-section.fn-form-section-1 > fieldset.frm-gp.box.fn-item-jobfunctions.ng-scope > div.frm-ctrlr.ctrlr-multilevel-selector.ctrlr-multilevel-selector-multiple > div.ng-isolate-scope > div > div.multilevel-selector-gp.multilevel-selector-item-1 > div.multilevel-selector-ctrl > div > div > div > select').select(json.jobFunction)
        cy.get('.need-ie-fix').select(json.subJobFunction)
        cy.get('#c_EpJbAdDlItDap_IySr0').select(json.industry)
        cy.get('#c_EpJbAdDlItDap_JbLn0Option0').select(json.location)
        cy.get('#c_EpJbAdDlItDap_JbLn0SubOption0').select(json.subLocation)
        if (json.employementTerms.type == "Full Time") {
            cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_EtTm0_1').click()
        } else if (json.employementTerms.type == "Part Time") {
            cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_EtTm0_2').click()
        } else if (json.employementTerms.type == "Permanent") {
            cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_EtTm0_3').click()
        } else if (json.employementTerms.type == "Contract") {
            cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_EtTm0_5').click()
        } else if (json.employementTerms.type == "Internship") {
            cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_EtTm0_6').click()
        } else if (json.employementTerms.type == "Freelance") {
            cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_EtTm0_7').click()
        }

        if (json.employementTerms.salaryDetail.type == "Monthly") {
            cy.get('#c_EpJbAdDlItDap_SyTe0').select('Hourly')
            cy.get('#c_EpJbAdDlItDap_SyTe0').select('Monthly')
            cy.get('#monthlyFromTHENPg225').select(json.employementTerms.salaryDetail.from)
            cy.get('#monthlyToTHENPg225').select(json.employementTerms.salaryDetail.to)
        } else {
            cy.get('#c_EpJbAdDlItDap_SyTe0').select('Monthly')
            cy.get('#c_EpJbAdDlItDap_SyTe0').select('Hourly')
            cy.get('#hourlyFromTHENPg225').select(json.employementTerms.salaryDetail.from)
            cy.get('#hourlyToTHENPg225').select(json.employementTerms.salaryDetail.to)

        }

        if (json.employementTerms.salaryDetail.additional == "Salary Negotiable") {
            cy.get('#c_EpJbAdDlItDap_SyAlIo0_1').click()
        } else if (json.employementTerms.salaryDetail.additional == "Salary High Commission with base salary") {
            cy.get('#c_EpJbAdDlItDap_SyAlIo0_2').click()
        } else {
            cy.get('#c_EpJbAdDlItDap_SyAlIo0_3').click()
        }

        if (json.employementTerms.salaryDetail.isShowSalary) {
            cy.get('#IsVisibleTHENPg225_1').click()
        }

        for (let bnf = 0; bnf < json.benefits.length; bnf++) {
            if (bnf == "Dental Insurance") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_5').click()
            }
            if (bnf == "Education allowance") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_11').click()
            }
            if (bnf == "Five day work per week") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_1').click()
            }
            if (bnf == "Flexible working hours") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_2').click()
            }
            if (bnf == "Free shuttle bus") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_14').click()
            }
            if (bnf == "Gratuity") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_9').click()
            }

            if (bnf == "Housing Allowance") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_12').click()
            }

            if (bnf == "Life Insurance") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_6').click()
            }

            if (bnf == "Medical Insurance") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_4').click()
            }

            if (bnf == "Overtime pay") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_10').click()
            }

            if (bnf == "Performance Bonus") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_8').click()
            }

            if (bnf == "Transportation Allowance") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_15').click()
            }

            if (bnf == "Work From Home") {
                cy.get('#checkboxPlaceHolderc_EpJbAdDlItDap_Bt0_3').click()
            }
        }
        cy.get('#c_EpJbAdDlItDap_CrLl0').select(json.careerLevel)
        cy.get('#c_EpJbAdDlItDap_EnLl0').select(json.minEducation)
        cy.get('#c_EpJbAdDlItDap_WkEe0').select(json.minExperience)

        if (json.isRecentGraduate) {
            cy.get('#c_EpJbAdDlItDap_FhGeWe0_CheckBox').click()
        }

        for (let keyw = 0; keyw < json.keywords.length; keyw++) {
            cy.get('#c_EpJbAdDlItDap_Kd0').type(json.keywords[keyw])
        }

        if (json.jobReference != null) {
            cy.get('#c_EpJbAdDlItDap_ReNr0').type(json.jobReference)
        }

        for (let tags = 0; tags < json.tags.length; tags++) {
            cy.get('.thelabel-container').click()
            cy.get('.text-combo-input > .ng-pristine').type(json.tags[tags])
            cy.get('#empLabelAddBtn > span').click()
        }

        cy.wait(2000)


        // Candidate Allowed to work in Thailand
        if (json.candidateAllowWorkInCoutry.status) {
            cy.get('#trigger-country').click()
            // Select Country (Hong Kong, Indonesia, Singapore, Thailand)
            cy.get('#select-country').select(json.candidateAllowWorkInCoutry.country)
        }

        // Select Country (Hong Kong, Indonesia, Singapore, Thailand)
        if (json.candidateMinimumEducation.status) {
            cy.get('#trigger-edu').click()
            cy.get('#select-edu').select(json.candidateMinimumEducation.education)
        }
        cy.get('#nextBtn').click()
    })

})
