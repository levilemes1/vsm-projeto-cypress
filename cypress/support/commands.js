Cypress.Commands.add('login', (email, senha) => {
    cy.xpath('//*[@id="email"]').type(email, {log: false});
    cy.xpath('//*[@id="senha"]').type(senha, {log: false});
    cy.xpath('//*[@id="btnLogIn"]').click();
})
