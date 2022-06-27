# Adicionando testes E2E com Cypress no ECM da VSM Informática.
## Instalando Cypress no Projeto

> Vamos iniciar um novo projeto npm através pela linha de comando. <br>
> Não vou entrar em detalhes sobre os comandos do npm. <br>
> Versão atual 10.2.0 do Cypress no momento da instalação. <br>

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

<hr>

> Para saber mais sobre Cypress, acesse a [documentação aqui](https://docs.cypress.io/guides/overview/why-cypress)
