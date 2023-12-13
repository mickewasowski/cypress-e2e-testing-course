/// <reference types="Cypress" />

describe('contact form', () => {
    before(() => {
        // runs before all tests
    });
    beforeEach(() => {
        // runs before each test
        cy.visit('/about'); //http://localhost:5173/about this is what Cypress builds

        // you could also do seeding database and many more
    });
    it('should submit the form', () => {
        cy.getById('contact-input-message').type('some test message');
        cy.getById('contact-input-name').type('john doe');
        cy.getById('contact-btn-submit').then((element) => {
            expect(element.attr('disabled')).to.be.undefined;
            expect(element.text()).to.eq('Send Message');
        });
        //the same as the above
        // cy.get('[data-cy="contact-btn-submit"]')
        //     .contains('Send Message')
        //     .and('not.have.attr', 'disabled');

        cy.screenshot();
        cy.getById('contact-input-email').type('test@example.com{enter}'); //hitting enter key after typing the text to submit the form
        cy.submitForm();
        
        //option 1
        // const btn = cy.get('[data-cy="contact-btn-submit"]');
        // btn.click();
        // btn.contains('Sending...');
        // btn.should('have.attr', 'disabled');

        //option 2
        cy.getById('contact-btn-submit').as('submitBtn');
        cy.get('@submitBtn').click();
        cy.get('@submitBtn').contains('Sending...');
        cy.get('@submitBtn').should('have.attr', 'disabled');
    });

    it('should validate the form input', () => {
        cy.submitForm();
        cy.getById('contact-btn-submit')
            .then((el) => {
                expect(el).to.not.have.attr('disabled');
                expect(el.text()).to.not.eq('Sending...');
            }
        );
        cy.getById('contact-btn-submit').contains('Send Message');
        cy.getById('contact-input-message').as('messageInp')
        cy.get('@messageInp').blur(); //loose focus of the field
        cy.get('@messageInp')
            .parent()
            .should('have.attr', 'class').and('match', /invalid/); //partial match

        cy.getById('contact-input-name').as('nameInput')
        cy.get('@nameInput').focus().blur(); //loose focus of the field
        cy.get('@nameInput')
            .parent()
            .should('have.attr', 'class').and('match', /invalid/);

        cy.getById('contact-input-email').as('emailInp');
        cy.get('@emailInp').focus().blur(); //loose focus of the field
        cy.get('@emailInp')
            .parent()
            .should((el) => {
                expect(el.attr('class')).not.to.be.undefined;
                expect(el.attr('class')).contains('invalid');
            });
    });
});