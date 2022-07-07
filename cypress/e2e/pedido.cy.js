describe('Acessar o ECM de homologação da VSM e realizar um pedido', () => {
    it('Realizando um pedido completo', () => {
        cy.visit('/');
        cy.clearCookies();
        cy.xpath('//*[@id="btnAceitarCookie"]').click();
        cy.login(Cypress.env('email'), Cypress.env('senha'));
        cy.addProdCarrinho('BUSCOPAN 10MG GTS 20ML', 'BOEHRINGER INGELHEIM DO BRASIL QUÍMICA E FARMACÊUTICA LTDA');
        cy.checkout('Boleto', 'R$ 14,11');
        cy.xpath('//*[@id="scrollAfterFinishHorizontal"]/h2').should('Parabéns! Seu pedido foi concluído com sucesso.');
    })
})
