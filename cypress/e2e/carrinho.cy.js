let inputPesquisar;
let btnAdicionarCarrinho;

describe('Adicionando produtos no carrinho', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.clearCookies();
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

                cy.xpath(inputPesquisar).type('buscopan');
                cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').click();
                cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'BUSCOPAN 10MG GTS 20ML');
                cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', 'BOEHRINGER INGELHEIM DO BRASIL QUÍMICA E FARMACÊUTICA LTDA.');
                cy.xpath(btnAdicionarCarrinho).click();
            });
        });
    });

    it('Adicionar um produto tarjado', () => {
        cy.xpath('//*[@id="inputPesquisar"]').type('ABLOK 50MG C/30 COMP');
        cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').click();
        cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'ABLOK  50MG C/30 COMP');
        cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', 'BIOLAB SANUS FARMACÊUTICA LTDA');
        cy.xpath('//*[@id="btnAdicionarCarrinhoControls"]').click();
    });
})
