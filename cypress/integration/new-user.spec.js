/* Scenario: New User Registration

Flow:
- Access the automation the website http://automationpractice.com
- Click on the Sign in button
- Fill in the email information (cannot be repeated)
- Click on the "Create an Account" button
- Fill in the information on the registration form
- Click on the Register button
- Validate that you have been redirected to the correct URL
- Validate text: 'Welcome to your account'
*/

/// <reference types = "cypress" />

let Chance = require('chance');
let chance = new Chance();

chance.address

context('User Sing in', () => {
    it('Registration', () => {
        //Registration
        cy.visit('index.php');
        cy.get('.login').click();
        cy.url().should('contain', '?controller=authentication&back=my-account')
        cy.get('input#email_create').type(chance.email());
        cy.get('button[name=SubmitCreate]').click();
        cy.contains('Create an account');

        //Fill form: Personal Information
        cy.get('input#id_gender2').check('2');
        cy.get('input#customer_firstname').type(chance.first());
        cy.get('input#customer_lastname').type(chance.last());
        cy.get('input#passwd').type('Cytest123@');
        cy.get('select#days').select('25');
        cy.get('select#months').select('July');
        cy.get('select#years').select('1984');
        cy.get('#newsletter').check();
        cy.get('#optin').check();

        //Your Address
        cy.get('input[name=firstname]').type(chance.first());
        cy.get('input[name=lastname]').type(chance.last());
        cy.get('input[name=company]').type('CyTest');


        cy.get('#address1').type(chance.address());
        cy.get('input#address2').type(chance.address());
        cy.get('input[name=city]').type(chance.city());
        cy.get('select#id_country').select('United States');
        cy.get('select#id_state').select('Florida');
        cy.get('input[name=postcode]').type(chance.zip());

        cy.get('#other').type('CyTest Form');
        cy.get('input#phone').type(chance.phone({formatted: true}));
        cy.get('input#phone_mobile').type(chance.phone({formatted: true}));
        cy.get('input[name=alias]').type(' Extra Info');
        
        //Register Button
        cy.get('button[name=submitAccount]').click();

        //Url and text assertion
        cy.url().should('contain', '?controller=my-account')
        cy.get('p.info-account').should('contain', 'Welcome to your account. ');
    });
});