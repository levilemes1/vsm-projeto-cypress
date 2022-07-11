let inputPesquisar = '//*[@id="inputPesquisar"]';
let btnAdicionarCarrinho = '//*[@id="btnAdicionarCarrinhoControls"]';

describe('Adicionando produtos no carrinho', () => {

    beforeEach(() => {
        cy.visit('/');

        cy.intercept('GET', '**/configs').as('newConfigs');
        cy.wait('@newConfigs').its('response.statusCode').should('eq', 200);

        cy.xpath('//*[@id="cdk-overlay-0"]/mat-bottom-sheet-container/app-alert-cookie-privacidade/div/h3').should('have.text', ' Atualizamos nossa política de cookies ');
        cy.xpath('//*[@id="btnAceitarCookie"]').click();
    })

    const resolucoes = require('../fixtures/resolucoes.json');
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

                cy.xpath(inputPesquisar).type('Cabo iPhone com entrada');
                cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').should('have.text', ' Cabo iPhone com entrada Usb 2.0 - 1 Metro Firebee  FIREBEE')
                cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').click();

                cy.intercept('GET', '**/produto/sku/id/**').as('newProdutoSku');
                cy.wait('@newProdutoSku').its('response.statusCode').should('eq', 200);

                cy.xpath(btnAdicionarCarrinho).should('have.text', 'shopping_cart Comprar ');
                cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'Cabo iPhone com entrada Usb 2.0 - 1 Metro Firebee');
                cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', 'FIREBEE');
                cy.xpath(btnAdicionarCarrinho).click();
            });
        });
    });

    it('Adicionar outro produto - não testar em outras resoluções', () => {
        cy.xpath(inputPesquisar).type('Caneta Marcadora Stabilo');
        cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').should('have.text', ' Caneta Marcadora Stabilo Para Brincos Ponta Fina STABILO')
        cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').click();

        cy.intercept('GET', '**/produto/sku/id/**').as('newProdutoSku');
        cy.wait('@newProdutoSku').its('response.statusCode').should('eq', 200);

        cy.xpath(btnAdicionarCarrinho).should('have.text', 'shopping_cart Comprar ');
        cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'Caneta Marcadora Stabilo Para Brincos Ponta Fina');
        cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', 'STABILO');
        cy.xpath(btnAdicionarCarrinho).click();
    });
})
