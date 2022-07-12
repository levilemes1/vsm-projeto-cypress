const usuarios = require('../fixtures/usuarios.json');

describe('Acessar o ECM da VSM e realizar um pedido', () => {
    it('Realizando um pedido até o checkout', () => {
        cy.visit('/');

        cy.intercept({ url: 'https://www.vsmshop.com.br/**' }).as('newUrl');
        cy.wait('@newUrl');

        cy.xpath('//*[@id="cdk-overlay-0"]/mat-bottom-sheet-container/app-alert-cookie-privacidade/div/h3').should('have.text', ' Atualizamos nossa política de cookies ');
        cy.xpath('//*[@id="btnAceitarCookie"]').click();

        cy.login(usuarios.nome, usuarios.email, usuarios.senha);

        cy.addProdCarrinho('Filtro De Linha Ipec 7 Tomadas', 'IPEC');

        cy.checkout('Boleto', 'R$ 54,90');
    });
})
