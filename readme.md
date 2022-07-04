# Adicionando testes E2E com Cypress no ECM da VSM Informática.
![cypress version](https://img.shields.io/badge/cypress-10.2.0-brightgreen)
## Instalando Cypress no Projeto

> Vamos iniciar um novo projeto npm através pela linha de comando. <br>
> Não vou entrar em detalhes sobre os comandos do npm. <br>

- Execute 'npm init' para iniciar um novo projeto.
  - Confirme os dados que estiver pedindo no seu terminal.
- Use 'npm i cypress --save-dev' para instalar o Cypress no projeto (save-dev indica que é uma dependência de desenvolvimento)
- Agora você pode executar o comando 'npx cypress open' para configurar o ambiente.
  1. Na primeira tela clique em **E2E Testing**;
  2. Em seguida será exibido que foi adicionador alguns arquivos, clique em **Continue**;
  3. Na última tela selecione o navegador e clique em **Start E2E Testing in ...**
  4. O navegador escolhido será aberto e exibirá duas opções:
     1. Scaffold example specs: *"Geraremos vários exemplos de especificações para ajudar a orientá-lo sobre como escrever testes no Cypress."*
     2. Create new empty spec: *"Vamos gerar um arquivo spec vazio que pode ser usado para começar a testar seu aplicativo."*
  5. O diretório onde ficará os arquivos fica em "projeto/cypress/e2e"
- O arquivo "cypress.config.js" deve ficar da seguinte forma:
  ```
    const { defineConfig } = require("cypress");

    module.exports = defineConfig({
        e2e: {
            setupNodeEvents(on, config) {
            // implement node event listeners here
            },
        },
        env: {
            email: 'SEU USUARIO',
            senha: 'SUA SENHA'
        },
    });
  ```

<hr>

> Para saber mais sobre Cypress, acesse a [documentação aqui](https://docs.cypress.io/guides/overview/why-cypress) <br>
> Caso queira utilizar xpath no projeto, [veja aqui](https://github.com/cypress-io/cypress-xpath)
