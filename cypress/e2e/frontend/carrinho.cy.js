describe('Adicionando produtos no carrinho', () => {

    let inputPesquisar = '//*[@id="inputPesquisar"]';
    let btnAdicionarCarrinho = '//*[@id="btnAdicionarCarrinhoControls"]';

    beforeEach(() => {
        cy.visit('/');
        cy.interceptNewUrl();
        cy.clearCookies();
        cy.clearLocalStorage()

        cy.xpath('//*[@id="cdk-overlay-0"]/mat-bottom-sheet-container/app-alert-cookie-privacidade/div/h3').should('have.text', ' Atualizamos nossa política de cookies ');
        cy.xpath('//*[@id="btnAceitarCookie"]').click();
    })

    const resolucoes = require('../../fixtures/resolucoes.json');
    resolucoes.forEach((newResolucao) => {
        context(`Resolução ${newResolucao.resolucao}`, () => {

            it('Adicionar um produto comum', () => {

                if (newResolucao.resolucao == '768') {
                    cy.viewport(1024, 768);
                    inputPesquisar = '//*[@id="inputPesquisar"]';
                    btnAdicionarCarrinho = '//*[@id="btnAdicionarCarrinhoControls"]';
                } else {
                    cy.viewport(newResolucao.resolucao);
                    inputPesquisar = '//*[@id="inputPesquisarMobile"]';
                    btnAdicionarCarrinho = '//*[@id="btnAdicionarCarrinhoControlsSpan"]'
                }

                cy.xpath(inputPesquisar).type('ABLOK 50MG C/30 COMP');
                cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option/span/div/span').should('contain', 'ABLOK  50MG C/30 COMP BIOLAB SANUS FARMACÊUTICA LTDA ATENOLOL • ANGINA PECTORIS');
                cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option/span/div/span').click();

                cy.intercept('GET', '**/produto/sku/id/**').as('newProdutoSku');
                cy.wait('@newProdutoSku').its('response.statusCode').should('eq', 200);

                cy.xpath(btnAdicionarCarrinho).should('have.text', 'shopping_cart Comprar ');
                cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'ABLOK  50MG C/30 COMP');
                cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', 'BIOLAB SANUS FARMACÊUTICA LTDA');
                cy.xpath(btnAdicionarCarrinho).click();
            });
        });
    });

    it('Adicionar outro produto - não testar em outras resoluções', () => {
        cy.xpath(inputPesquisar).type('BUSCOPAN 10MG GTS 20ML');
        cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option/span/div/span').should('have.text', ' BUSCOPAN 10MG GTS 20ML BOEHRINGER BUTILBROMETO DE ESCOPOLAMINA • COLICAS (em geral)');
        cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option/span/div/span').click();

        cy.intercept('GET', '**/produto/sku/id/**').as('newProdutoSku');
        cy.wait('@newProdutoSku').its('response.statusCode').should('eq', 200);

        cy.xpath(btnAdicionarCarrinho).should('have.text', 'shopping_cart Comprar ');
        cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'BUSCOPAN 10MG GTS 20ML');
        cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', 'BOEHRINGER');
        cy.xpath(btnAdicionarCarrinho).click();
    });
})
