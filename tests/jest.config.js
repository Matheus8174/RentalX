const { resolve } = require('path')

const root = resolve(__dirname, '..')
const rootConfig = require(`${root}/jest.config.js`)

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  ...rootConfig,
  roots: [root],
  displayName: 'end2end-tests',
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  testMatch: ['<rootDir>/tests/**/*.spec.ts']
}
