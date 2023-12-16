import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        seedDatabase(filename) {
          // run your nodejs code
          //edit a file, run http request, etc
          // this code will run outside your browser but will be triggered from the browser
          //we can also return values here
          return null; 
        }
      });
    },
  },
});
