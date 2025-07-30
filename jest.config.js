/*module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // optional: adjust based on your alias.
     '\\.module\\.scss$': 'identity-obj-proxy',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
   moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // optional
}*/

// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);