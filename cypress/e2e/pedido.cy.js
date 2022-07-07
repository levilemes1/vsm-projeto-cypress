const usuarios = require('../fixtures/usuarios.json');

describe('Acessar o ECM da VSM e realizar um pedido', () => {
    it('Realizando um pedido completo', () => {
        cy.visit('/');
        cy.clearCookies();
        cy.xpath('//*[@id="btnAceitarCookie"]').click();
        cy.login(usuarios.email, usuarios.senha);
        cy.addProdCarrinho('Cabo iPhone com entrada', 'FIREBEE');
        cy.checkout('Boleto', 'R$ 7,50');
    });
})
