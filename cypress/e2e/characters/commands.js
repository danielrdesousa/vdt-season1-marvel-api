Cypress.Commands.add('createCharacters', function(payload) {
    cy.api({
        failOnStatusCode: false,
        method: 'POST',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('APP_TOKEN')
        },
        body: payload,
    }).then(function(response) {
        return response;
    });
});

Cypress.Commands.add('findAllCharacters', function(params = {}) {
    const query = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

    cy.api({
        failOnStatusCode: false,
        method: 'GET',
        url: `/characters?${query(params)}`,
        headers: {
            Authorization: Cypress.env('APP_TOKEN')
        },
    }).then(function(response) {
        return response;
    });
});

Cypress.Commands.add('findByIdCharacters', function(id) {
    cy.api({
        failOnStatusCode: false,
        method: 'GET',
        url: `/characters/${id}`,
        headers: {
            Authorization: Cypress.env('APP_TOKEN')
        },
    }).then(function(response) {
        return response;
    });
});

Cypress.Commands.add('deleteByIdCharacters', function(id) {
    cy.api({
        failOnStatusCode: false,
        method: 'DELETE',
        url: `/characters/${id}`,
        headers: {
            Authorization: Cypress.env('APP_TOKEN')
        },
    }).then(function(response) {
        return response;
    });
});