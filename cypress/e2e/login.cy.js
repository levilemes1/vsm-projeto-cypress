describe('Acessar o ECM de Homologação da VSM', () => {

    it('Acessar o site de homologação', () => {
        cy.visit('http://master.ecm.vsm.com.br');
    })
    // beforeEach(() => {
    //     cy.visit('http://master.ecm.vsm.com.br');
    // })

    it('Aceitar cookies', () => {
        cy.clearCookies();
        cy.xpath('//*[@id="btnAceitarCookie"]').click();
    })

    it('Adicionar um produto no carrinho', () => {
        cy.xpath('//*[@id="inputPesquisar"]').type('buscopan');
        cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').click();
        cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'BUSCOPAN 10MG GTS 20ML');
        cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', ' BOEHRINGER INGELHEIM DO BRASIL QUÍMICA E FARMACÊUTICA LTDA. ');
        cy.xpath('//*[@id="btnAdicionarCarrinhoControls"]').click();
        cy.xpath('//*[@id="btnFinalizarVendaCart"]').click();
    });

    it('Acessando minha conta', () => {
        cy.login(Cypress.env('email'), Cypress.env('senha'))
        cy.xpath('//*[@id="minhaContaLabel1"]').should(' Olá, levi ');
    });

    it('Checkout', () => {
        cy.xpath('//*[@id="cartMenu"]').click();
        cy.xpath('//*[@id="mat-menu-panel-0"]/div/span/div[1]/b/span').should('contain', '1 Item no seu carrinho');
        cy.xpath('//*[@id="finalizarCart"]').click();
        cy.xpath('//*[@id="btnSelectEndereco"]/span[1]/text()').should('contain', '  Selecionar endereço de entrega ');
        cy.xpath('//*[@id="proximo"]').click();
        cy.xpath('//*[@id="cdk-step-content-0-1"]/form/div[1]/div/span/text()').should('contain', ' Caso o endereço de entrega seja uma agência dos correios credenciada para clique e retire, certifique-se que a forma de entrega escolhida seja um PAC ou SEDEX. ');
        cy.xpath('//*[@id="cdk-step-content-0-1"]/form/div[1]/mat-radio-group').click();
        cy.xpath('//*[@id="proximo"]').click();
        cy.xpath('//*[@id="mat-tab-label-3-0"]/div/text()').should('contain', 'Boleto');
        cy.xpath('//*[@id="proximo"]').click();
        cy.xpath('//*[@id="cdk-step-content-0-3"]/span/div[1]/div/h3').should('contain', 'Pedido');
        cy.xpath('//*[@id="pedidoTotal"]').should('contain', 'R$ 14,11 ');
        cy.xpath('//*[@id="confirmarPedido"]/span[1]/text()').should('contain', ' Confirmar Pedido ');
        cy.xpath('//*[@id="confirmarPedido"]').click();
    })

    it('Pedido confirmado', () => {
        cy.xpath('//*[@id="scrollAfterFinishHorizontal"]/h2').should('contain', 'Parabéns! Seu pedido foi concluído com sucesso.');
    })
})
