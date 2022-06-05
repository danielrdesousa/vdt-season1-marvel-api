const character = require('../../fixtures/char.json');

describe('POST /characters', function() {
    before(function() {
        cy.setToken();
        cy.resetDB();
    });

    it('should create a character', function() {
        cy.createCharacters(character).then(function(response) {
            expect(response.status).to.eql(201);
            expect(response.body.character_id.length).to.eql(24);
        });
    });

    context('when the character already exists', function() {
        before(function () {
            cy.resetDB();
            cy.createCharacters(character).then(function(response) {
                expect(response.status).to.eql(201);
                expect(response.body.character_id.length).to.eql(24);
            });
        });

        it('should not register existing character', function() {
            cy.createCharacters(character).then(function(response) {
                expect(response.status).to.eql(400);
                expect(response.body.error).to.eql('Duplicate character');
            });
        });
    });

    context('when we pass the incorrect data', function() {
        before(function () {
            cy.resetDB();
        });

        it('name field is required', function() {
            const data = Object.assign({}, character);

            // remove property name
            delete data.name;

            cy.createCharacters(data).then(function(response) {
                expect(response.status).to.eql(400);
                expect(response.body.validation.body.keys[0]).to.eql('name');
                expect(response.body.validation.body.message).to.eql('"name" is required');
            });
        });

        it('alias field is required', function() {
            const data = Object.assign({}, character);

            // remove property alias
            delete data.alias;

            cy.createCharacters(data).then(function(response) {
                expect(response.status).to.eql(400);
                expect(response.body.validation.body.keys[0]).to.eql('alias');
                expect(response.body.validation.body.message).to.eql('"alias" is required');
            });
        });

        it('team field is required', function() {
            const data = Object.assign({}, character);

            // remove property team
            delete data.team;

            cy.createCharacters(data).then(function(response) {
                expect(response.status).to.eql(400);
                expect(response.body.validation.body.keys[0]).to.eql('team');
                expect(response.body.validation.body.message).to.eql('"team" is required');
            });
        });

        it('active field is required', function() {
            const data = Object.assign({}, character);

            // remove property active
            delete data.active;

            cy.createCharacters(data).then(function(response) {
                expect(response.status).to.eql(400);
                expect(response.body.validation.body.keys[0]).to.eql('active');
                expect(response.body.validation.body.message).to.eql('"active" is required');
            });
        });

        it('age field is optional', function() {
            const data = Object.assign({}, character);

            // remove property age
            delete data.age;

            cy.createCharacters(data).then(function(response) {
                expect(response.status).to.eql(201);
                expect(response.body.character_id.length).to.eql(24);
            });
        });
    });
});
