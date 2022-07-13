describe('Acessar o ECM da VSM e realizar um pedido', () => {
    const usuarios = require('../../fixtures/usuarios.json');

    it('Realizando um pedido até o checkout', () => {
        cy.visit('/');
        cy.interceptNewUrl();

        cy.xpath('//*[@id="cdk-overlay-0"]/mat-bottom-sheet-container/app-alert-cookie-privacidade/div/h3').should('have.text', ' Atualizamos nossa política de cookies ');
        cy.xpath('//*[@id="btnAceitarCookie"]').click();

        cy.login(usuarios.nome, usuarios.email, usuarios.senha);
        cy.addProdCarrinho('20 BI 435MG C/30 CAPS', 'NOVARTIS BIOCIENCIAS S/A');
        cy.checkout('Boleto', 'R$ 150,00');
    });
})
