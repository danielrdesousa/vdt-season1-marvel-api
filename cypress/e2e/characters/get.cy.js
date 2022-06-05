const characters = require('../../fixtures/characters.json');

describe('GET /characters', function() {
    before(function() {
        cy.setToken();
        cy.resetDB();

        characters.map(char => {
            cy.createCharacters(char).then((response) => {
                expect(response.status).to.eql(201);
                expect(response.body.character_id.length).to.eql(24);
            });
        })
    });

    it('should list all characters', function() {
        cy.findAllCharacters().then(function(response) {
            expect(response.status).to.eql(200);
            expect(response.body.length).to.eql(characters.length);

            Cypress.env('APP_DB', response.body);
        });
    });

    it('should filter the results by name', function() {
        cy.findAllCharacters({ name: Cypress.env('APP_DB')[0].name }).then(function(response) {
            expect(response.status).to.eql(200);
            expect(response.body.length).to.eql(1);
            expect(response.body[0].name).to.eql(Cypress.env('APP_DB')[0].name);
        });
    });

    it('should filter the results by id', function() {
        cy.findByIdCharacters(Cypress.env('APP_DB')[0]._id).then(function(response) {
            expect(response.status).to.eql(200);
            expect(response.body._id).to.eql(Cypress.env('APP_DB')[0]._id);
            expect(response.body.name).to.eql(Cypress.env('APP_DB')[0].name);
        });
    });

    it('should return id not found', function() {
        cy.findByIdCharacters('629d11fa19b6690016400213').then(function(response) {
            expect(response.status).to.eql(404);
        });
    });
});
