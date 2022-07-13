const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "s5dn1c",
    e2e: {
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
        baseUrl: "http://loja.7waytech.com.br",
    },
});
