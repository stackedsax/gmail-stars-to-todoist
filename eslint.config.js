const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: {
        // Google Apps Script globals
        PropertiesService: "readonly",
        GmailApp: "readonly",
        UrlFetchApp: "readonly",
        console: "readonly",
        
        // Test globals (for future tests)
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly"
      }
    },
    rules: {
      "no-unused-vars": ["warn", { 
        "varsIgnorePattern": "^(createTaskFromStarred|walkHtmlAndExtract)$"
      }],
      "no-undef": "error",
      "prefer-const": "warn",
      "no-var": "warn",
      "eqeqeq": "warn",
      "no-console": "off", // Allow console for Apps Script
      "no-extra-semi": "warn"
    }
  }
];