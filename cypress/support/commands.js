Cypress.Commands.add('login', (nome, email, senha) => {
    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/mat-toolbar/mat-toolbar-row[1]/div[3]/app-top-menu/div/a').click();
    cy.xpath('/html/body/app-root/div[1]/div/div[2]/div/div/div/a[1]').click();
    cy.xpath('//*[@id="email"]').type(email, { log: false });
    cy.xpath('//*[@id="senha"]').type(senha, { log: false });
    cy.xpath('//*[@id="btnLogIn"]').click();
    cy.xpath('//*[@id="minhaContaLabel1"]').should('contain', 'Olá, ' + nome);
});

Cypress.Commands.add('addProdCarrinho', (nomeProd, fabricanteProd) => {
    cy.xpath('//*[@id="inputPesquisar"]').type(nomeProd);
    cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').aguardarLoad().click();
    cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', nomeProd);
    cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', fabricanteProd);
    cy.xpath('//*[@id="btnAdicionarCarrinhoControls"]').click();
});

Cypress.Commands.add('checkout', (formaPagamento, totalCarrinho) => {
    cy.xpath('//*[@id="btnFinalizarVendaCart"]').click();
    cy.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div/mat-card/mat-card-title/div').should('contain', 'Endereço');
    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-checkout/mat-horizontal-stepper/div[2]/div[1]/form/div[2]/button').click();
    cy.xpath('//*[@id="cdk-step-content-0-1"]/form/div[1]/div/span').should('contain', 'Caso o endereço de entrega seja uma agência dos correios credenciada para clique e retire, certifique-se que a forma de entrega escolhida seja um PAC ou SEDEX.');
    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-checkout/mat-horizontal-stepper/div[2]/div[2]/form/div[1]/mat-radio-group/mat-radio-button[1]').check();
    cy.xpath('//*[@id="proximo"]').click({ force: true });
    cy.xpath('//*[@id="mat-tab-label-3-0"]/div').should('contain', formaPagamento);
    cy.xpath('//*[@id="cdk-step-content-0-3"]/span/div[1]/div/h3').should('contain', 'Pedido');
    cy.xpath('//*[@id="pedidoTotal"]').should('contain', totalCarrinho);
});

Cypress.Commands.add('aguardarLoad', { prevSubject: 'element' }, $aguardarLoad => {
    return new Cypress.Promise(resolve => {
        $aguardarLoad.on('load', () => {
            resolve($aguardarLoad.contents().find('body'));
        });
    });
});
