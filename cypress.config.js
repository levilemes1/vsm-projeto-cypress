const { defineConfig } = require("cypress");

module.exports = defineConfig({
    // projectId: "p6xsey",
    e2e: {
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
        baseUrl: "http://www.vsmshop.com.br",
    },
});
