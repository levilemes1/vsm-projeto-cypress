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

                cy.xpath(inputPesquisar).type('Cabo iPhone com entrada');
                cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').click();
                cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'Cabo iPhone com entrada Usb 2.0 - 1 Metro Firebee');
                cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', 'FIREBEE');
                cy.xpath(btnAdicionarCarrinho).click();
            });
        });
    });

    it('Adicionar outro produto - não testar em outras resoluções', () => {
        cy.xpath('//*[@id="inputPesquisar"]').type('Caneta Marcadora Stabilo');
        cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').click();
        cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'Caneta Marcadora Stabilo Para Brincos Ponta Fina');
        cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', 'STABILO');
        cy.xpath('//*[@id="btnAdicionarCarrinhoControls"]').click();
    });
})
