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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('setToken', function() {
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'example@provider.com',
            password: 'qa-cademy'
        }
    }).then(function(response) {
        expect(response.status).to.eql(200);
        Cypress.env('APP_TOKEN', response.body.token);
    });
});

Cypress.Commands.add('resetDB', function() {
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/USER_ID'
    }).then(function(response) {
        expect(response.status).to.eql(200);
        cy.log('Database cleaned');
    });
});