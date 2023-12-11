/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173/');
    //cy.get('.main-header img');
    cy.get('.main-header').find('img'); // this will look for all images inside all main-header class elements
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h1').should('have.length', 1); // ensures there is only 1 h1 element 
    cy.get('h1').contains('My Cypress Course Tasks'); // this will succeed if the text is found in an h1 tag
    //cy.contains('My Cypress Course Tasks'); // this will succeed if the text is found anywhere on the page
  });
})