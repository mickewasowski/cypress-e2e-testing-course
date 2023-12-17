/// <reference types="Cypress" />


describe('Newsletter', () => {
    beforeEach(() => {
        cy.task('seedDatabase'); // without seeding the data the first test fails because the email had already been subscribed
    });

    it('should display a success message', () => {
        cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe'); // intercept any HTTP request send to localhost:3030/newletter
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe');
        cy.contains('Thanks for signing up');
    });

    it('should display validation errors', () => {
        cy.intercept('POST', '/newsletter*', { message: 'Email exists already.' }).as('subscribe');
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe');
        cy.contains('Email exists already.');
    });

    //this test is meant to test directly the backend
    it('should successfully create new contact', () => {
        cy.request({
            method: 'POST',
            url: '/newsletter',
            body: {
                email: 'test33@example.com',
            },
            form: true // if set to false - json data will be sent, true - form data will be sent
        }).then(res => {
            expect(res.status).to.eq(201);
        });
    });
});