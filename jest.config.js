const { join } = require('path');
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  rootDir: __dirname,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFiles: ['<rootDir>/src/config/env.ts'],

  collectCoverageFrom: ["<rootDir>/src/modules/**/*UseCase.ts"],
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      lines: 100
    }
  },

  bail: true,
  clearMocks: true,
  displayName: 'unit-tests',
  testMatch: ["<rootDir>/src/modules/**/*.spec.ts"],
  preset: 'ts-jest',
  testEnvironment: 'node',

  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: join('<rootDir>', compilerOptions.baseUrl)
  })
};

