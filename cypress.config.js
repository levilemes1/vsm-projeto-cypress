const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "7wm1ei",

    e2e: {
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
        baseUrl: 'https://www.vsmshop.com.br',
    }
});
