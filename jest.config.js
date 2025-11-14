module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    '*.js',
    '!eslint.config.js',
    '!jest.config.js'
  ],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ]
};