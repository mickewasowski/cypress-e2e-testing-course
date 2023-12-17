/// <reference types="Cypress" />


describe('Newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase'); // without seeding the data the first test fails because the email had already been subscribed
    });

    it('should display a success message', () => {
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.contains('Thanks for signing up');
    });
});