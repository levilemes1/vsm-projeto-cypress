# Adicionando testes E2E com Cypress no ECM da VSM Informática.
![cypress version](https://img.shields.io/badge/cypress-10.3.0-brightgreen)
[![vsm-projeto-cypress](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/7wm1ei&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/7wm1ei/runs)
## Instalando Cypress em um novo Projeto

> Não vou entrar em detalhes sobre os comandos do npm ou sobre o Cypress em si. <br>

- Use `npm i cypress --save-dev` para instalar o Cypress no projeto (save-dev indica que é uma dependência de desenvolvimento).
- Se preferir usar XPath no projeto, execute `npm install -D cypress-xpath`.
- Execute o comando `npx cypress open` para configurar o ambiente.
  1. Na primeira tela clique em **E2E Testing**;
  2. Em seguida será exibido que foi adicionador alguns arquivos, clique em **Continue**;
  3. Na última tela selecione o navegador e clique em **Start E2E Testing in ...**
  4. O navegador escolhido será aberto e exibirá duas opções (não importa a opção que escolherá):
     1. Scaffold example specs: *"Geraremos vários exemplos de especificações para ajudar a orientá-lo sobre como escrever testes no Cypress."*
     2. Create new empty spec: *"Vamos gerar um arquivo spec vazio que pode ser usado para começar a testar seu aplicativo."*
  5. Os arquivos ficarão em "projeto/cypress/e2e".

## Configurando o projeto ECM VSM Informática.

- Após o clone, execute `npm i` para instalar as dependencias do projeto.
- No arquivo "cypress.config.js" deve ser adicionado a baseUrl:
  ```
    const { defineConfig } = require("cypress");

    module.exports = defineConfig({
        e2e: {
            setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "https://www.vsmshop.com.br",
    },
    });

  ```
- No diretório "projeto/cypress/fixtures", crie o arquivo "usuarios.json", ele ficará da seguinte forma:
  ```
    {
        "nome": "Seu nome de usuario"
        "email": "Seu email",
        "senha": "Sua senha",
    }
  ```

<hr>

> Para saber mais sobre Cypress, acesse a [documentação aqui](https://docs.cypress.io/guides/overview/why-cypress) <br>
> Caso queira utilizar XPath no projeto, [veja aqui](https://github.com/cypress-io/cypress-xpath)
