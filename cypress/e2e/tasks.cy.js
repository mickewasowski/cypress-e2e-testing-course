/// <reference types="Cypress" />

describe('tasks management', () => {
    it('should open and close the new task modal', () => {
        cy.visit('http://localhost:5173/');
        //cy.get('button');
        cy.contains('Add Task').click();
        cy.get('.backdrop').click({ force: true });
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');

        cy.contains('Add Task').click();
        cy.get('.actions button').contains('Cancel').click();
        cy.get('.modal').should('not.exist');
        cy.get('.backdrop').should('not.exist');
    });

    it('should create a new task', () => {
        cy.visit('http://localhost:5173/');
        cy.get('#task-control button')
            .contains('Add Task').click();
        cy.get('#title').type('New task');
        cy.get('#summary').type('some summary');
        cy.get('.actions button').contains('Add Task').click();
        cy.get('.modal').should('not.exist');
        cy.get('.backdrop').should('not.exist');
        cy.get('.task').should('have.length', 1);
        cy.get('.task h2').contains('New task');
        cy.get('.task p').contains('some summary');
    });

    it('should validate user input', () => {
        cy.visit('http://localhost:5173/');
        cy.get('#task-control button')
            .contains('Add Task').click();
        cy.get('#title');
        cy.get('#summary');
        cy.get('.actions button').contains('Add Task').click();
        cy.get('#new-task-form p.error-message').contains('Please provide values for');
    });
});