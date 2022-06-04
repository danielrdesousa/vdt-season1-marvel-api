

describe('POST /characters', function() {
    before(function() {
        cy.setToken();
        cy.resetDB()
    });

    it('should create a character', function() {
        const char = {
            name: 'Wanda Maximoff',
            alias: 'Scarlet Witch',
            team: ['Avengers'],
            active: true
        };
        
        cy.api({
            method: 'POST',
            url: '/characters',
            headers: {
                Authorization: Cypress.env('APP_TOKEN')
            },
            body: char
        }).then(function(response) {
            expect(response.status).to.eql(201);
        });
    });
});
