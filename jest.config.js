module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: [
    "<rootDir>/config/setupTests.ts"
  ],
  testMatch: ['<rootDir>/src/**/tests/**/*.(j|t)s?(x)', '<rootDir>/src/**/*.test.(j|t)s?(x)']
};