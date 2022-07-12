Cypress.Commands.add('login', (nome, email, senha) => {
    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/mat-toolbar/mat-toolbar-row[1]/div[3]/app-top-menu/div/a').click();
    cy.xpath('/html/body/app-root/div[1]/div/div[2]/div/div/div/a[1]').click();

    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-sign-in/mat-card/div/div[1]/form/mat-form-field[1]/div/div[1]/div/span/label/span[1]').should('have.text', 'E-mail');
    cy.xpath('//*[@id="email"]').type(email, { log: false });
    cy.xpath('//*[@id="senha"]').type(senha, { log: false });
    cy.xpath('//*[@id="btnLogIn"]').click();

    cy.intercept('POST', '**/oauth/**').as('newOauth');
    cy.wait('@newOauth').its('response.statusCode').should('eq', 200);

    cy.xpath('//*[@id="minhaContaLabel1"]').should('contain', 'Olá, ' + nome);
});

Cypress.Commands.add('addProdCarrinho', (nomeProd, fabricanteProd) => {
    cy.xpath('//*[@id="inputPesquisar"]').type(nomeProd);
    cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option/span/div/span').should('contain', nomeProd)
    cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option/span/div/span').click();

    cy.intercept('GET', '**/produto/sku/id/**').as('newProdutoSku');
    cy.wait('@newProdutoSku').its('response.statusCode').should('eq', 200);

    cy.xpath('//*[@id="btnAdicionarCarrinhoControls"]').should('have.text', 'shopping_cart Comprar ');
    cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', nomeProd);
    cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', fabricanteProd);
    cy.xpath('//*[@id="btnAdicionarCarrinhoControls"]').click();
});

Cypress.Commands.add('checkout', (formaPagamento, totalProdutos) => {
    cy.xpath('//*[@id="btnFinalizarVendaCart"]').click();

    cy.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div/mat-card/mat-card-title/div').should('contain', 'Endereço');
    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-checkout/mat-horizontal-stepper/div[2]/div[1]/form/div[2]/button').click();

    cy.xpath('//*[@id="cdk-step-content-0-1"]/form/div[1]/div/span').should('contain', 'Caso o endereço de entrega seja uma agência dos correios credenciada para clique e retire, certifique-se que a forma de entrega escolhida seja um PAC ou SEDEX.');
    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-checkout/mat-horizontal-stepper/div[2]/div[2]/form/div[1]/mat-radio-group/mat-radio-button[1]/label').click();
    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-checkout/mat-horizontal-stepper/div[2]/div[2]/form/div[2]/div[2]/button').click();

    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-checkout/mat-horizontal-stepper/div[2]/div[3]/app-forma-pagamento/mat-tab-group/mat-tab-header/div[2]/div/div/div[1]/div').should('have.text', formaPagamento);
    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-checkout/mat-horizontal-stepper/div[2]/div[3]/app-forma-pagamento/mat-tab-group/mat-tab-header/div[2]/div/div/div[1]').click();
    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-checkout/mat-horizontal-stepper/div[2]/div[3]/app-forma-pagamento/mat-tab-group/div/mat-tab-body[1]/div/div/div/div/app-boleto/form/div/div/div[1]/div/h3/b').should('have.text', ' ' + totalProdutos + ' à vista  ');
    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-checkout/mat-horizontal-stepper/div[2]/div[3]/app-forma-pagamento/div/div[2]/button').click();

    cy.xpath('/html/body/app-root/div[1]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-checkout/mat-horizontal-stepper/div[2]/div[4]/span/div[4]/div/div[2]/p/span').should('contain', formaPagamento);
    cy.xpath('//*[@id="confirmarPedido"]').should('contain', 'Confirmar Pedido');
});
