const usuarios = require('../fixtures/usuarios.json');

describe('Acessar o ECM da VSM e realizar um pedido', () => {
    it('Realizando um pedido até o checkout', () => {
        cy.visit('/');

        cy.intercept('GET', '**/configs').as('newConfigs');
        cy.wait('@newConfigs').its('response.statusCode').should('eq', 200);

        cy.xpath('//*[@id="cdk-overlay-0"]/mat-bottom-sheet-container/app-alert-cookie-privacidade/div/h3').should('have.text', ' Atualizamos nossa política de cookies ');
        cy.xpath('//*[@id="btnAceitarCookie"]').click();

        cy.login(usuarios.nome, usuarios.email, usuarios.senha);

        cy.addProdCarrinho('Cabo iPhone com entrada', 'FIREBEE');

        cy.intercept('GET', '**/configs').as('newConfigs');
        cy.wait('@newConfigs').its('response.statusCode').should('eq', 200);

        cy.checkout('Boleto', 'R$ 7,50');
    });
})
