const resolucoes = ['iphone-6', 'ipad-2', [1024, 768]];
const inputs = ['//*[@id="inputPesquisar"]', '//*[@id="inputPesquisarMobile"]'];


describe('Adicionando produtos no carrinho', () => {
    resolucoes.forEach((resolucao) => {
        context(`Resolução ${resolucao}`, () => {

            beforeEach(() => {
                cy.visit('/');
                cy.clearCookies();
                cy.xpath('//*[@id="btnAceitarCookie"]').click();
            })

            it('Adicionar um produto comum no carrinho', () => {

                if (Cypress._.isArray(inputs)) {
                    inputs[0];
                } else {
                    inputs;
                }

                if (Cypress._.isArray(resolucao)) {
                    cy.viewport(resolucao[0], resolucao[1]);
                } else {
                    cy.viewport(resolucao);
                }

                cy.xpath(inputs).type('buscopan');
                cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').click();
                cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'BUSCOPAN 10MG GTS 20ML');
                cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', 'BOEHRINGER INGELHEIM DO BRASIL QUÍMICA E FARMACÊUTICA LTDA.');
                cy.xpath('//*[@id="btnAdicionarCarrinhoControls"]').click();
            });

        });
    });

    it('Adicionar um produto tarjado no carrinho', () => {
        cy.xpath('//*[@id="inputPesquisar"]').type('ABLOK 50MG C/30 COMP');
        cy.xpath('/html/body/app-root/div[1]/div/div/div/div/mat-option[1]').click();
        cy.xpath('//*[@id="app"]/app-pages/mat-sidenav-container/mat-sidenav-content/div/app-product/div[1]/div[2]/app-product-header/div/h2').should('contain', 'ABLOK  50MG C/30 COMP');
        cy.xpath('//*[@id="fabricanteProduto"]/a').should('contain', 'BIOLAB SANUS FARMACÊUTICA LTDA');
        cy.xpath('//*[@id="btnAdicionarCarrinhoControls"]').click();
    });

})
