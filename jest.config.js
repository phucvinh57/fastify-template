const { pathsToModuleNameMapper } = require('ts-jest');
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');

/** @type {import('@jest/types').Config.ProjectConfig} */
const generalConfig = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    coveragePathIgnorePatterns: ['index.ts', '/node_modules/'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    testEnvironment: 'node',
    rootDir: '.',
    // A map from regular expressions to paths to transformers
    transform: {
        '\\.(ts)$': 'ts-jest'
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    transformIgnorePatterns: ['node_modules'],
    moduleDirectories: ['node_modules', 'src'],
    roots: ['<rootDir>'],
    modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */)
};

/** @type {import('jest').Config} */
module.exports = {
    testTimeout: 120 * 1000,
    passWithNoTests: true,
    reporters: [['github-actions', { silent: false }], 'default'],
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',
    detectOpenHandles: true,

    // Wait at most 5 seconds util all promises are resolved before exiting the test
    openHandlesTimeout: 5000,
    projects: [
        {
            ...generalConfig,
            displayName: 'unit-tests',
            testMatch: ['**/*.test.ts']
        },
        {
            ...generalConfig,
            displayName: 'integration-tests',
            testMatch: ['**/*.spec.ts']
        }
    ]
};
