const characters = require('../../fixtures/characters.json');

describe('DELETE /characters', function() {
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

    it('should delete a item by id', function() {
        cy.deleteByIdCharacters(Cypress.env('APP_DB')[0]._id).then(function(response) {
            expect(response.status).to.eql(204);
        });
    });

    it('should return id not found', function() {
        cy.deleteByIdCharacters('629d11fa19b6690016400213').then(function(response) {
            expect(response.status).to.eql(404);
        });
    });

    
    it('should list the results -1', function() {
        cy.findAllCharacters().then(function(response) {
            expect(response.status).to.eql(200);
            expect(response.body.length).to.eql(characters.length - 1);
        });
    });

});
