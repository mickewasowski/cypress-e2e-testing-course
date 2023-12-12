/// <reference types="Cypress" />

describe('contact form', () => {
    it('should submit the form', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-input-message"]').type('some test message');
        cy.get('[data-cy="contact-input-name"]').type('john doe');
        cy.get('[data-cy="contact-btn-submit"]').then((element) => {
            expect(element.attr('disabled')).to.be.undefined;
            expect(element.text()).to.eq('Send Message');
        });
        //the same as the above
        // cy.get('[data-cy="contact-btn-submit"]')
        //     .contains('Send Message')
        //     .and('not.have.attr', 'disabled');

        cy.get('[data-cy="contact-input-email"]').type('test@example.com{enter}'); //hitting enter key after typing the text to submit the form

        
        //option 1
        // const btn = cy.get('[data-cy="contact-btn-submit"]');
        // btn.click();
        // btn.contains('Sending...');
        // btn.should('have.attr', 'disabled');

        //option 2
        cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');
        cy.get('@submitBtn').click();
        cy.get('@submitBtn').contains('Sending...');
        cy.get('@submitBtn').should('have.attr', 'disabled');
    });

    it('should validate the form input', () => {
        cy.visit('http://localhost:5173/about');
        cy.get('[data-cy="contact-btn-submit"]').click();
        cy.get('[data-cy="contact-btn-submit"]')
            .then((el) => {
                expect(el).to.not.have.attr('disabled');
                expect(el.text()).to.not.eq('Sending...');
            }
        );
        cy.get('[data-cy="contact-btn-submit"]').contains('Send Message');
        cy.get('[data-cy="contact-input-message"]').as('messageInp')
        cy.get('@messageInp').blur(); //loose focus of the field
        cy.get('@messageInp')
            .parent()
            .should('have.attr', 'class').and('match', /invalid/); //partial match

        cy.get('[data-cy="contact-input-name"]').as('nameInput')
        cy.get('@nameInput').focus().blur(); //loose focus of the field
        cy.get('@nameInput')
            .parent()
            .should('have.attr', 'class').and('match', /invalid/);

        cy.get('[data-cy="contact-input-email"]').as('emailInp');
        cy.get('@emailInp').focus().blur(); //loose focus of the field
        cy.get('@emailInp')
            .parent()
            .should('have.attr', 'class').and('match', /invalid/);
    });
});