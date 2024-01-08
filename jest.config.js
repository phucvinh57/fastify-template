const { pathsToModuleNameMapper } = require('ts-jest');
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig');
const fs = require('fs');
const path = require('path');

/**
 * @type {import('@jest/types').Config.ProjectConfig}
 * Config used between test projects.
 */
const baseConfig = {
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
    transformIgnorePatterns: ['node_modules'],
    moduleDirectories: ['node_modules', 'src'],
    roots: ['<rootDir>'],
    modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
    modulePathIgnorePatterns: ['<rootDir>/dist/']
};

/**
 * For easier debugging, create a test label for each test file.
 * @param {string} baseDir
 * @returns
 */
function createTestLabels(baseDir) {
    // Read the contents of the directory synchronously
    const filePaths = fs.readdirSync(baseDir).map((f) => path.join(baseDir, f));
    const results = [];

    while (filePaths.length > 0) {
        const filePath = filePaths.pop();
        const fileStat = fs.statSync(filePath); // Get the file's stats

        if (fileStat.isDirectory()) {
            const subFiles = fs.readdirSync(filePath);
            filePaths.push(...subFiles.map((f) => path.join(filePath, f)));
            continue;
        }

        // Check if the file is test file
        let type;
        if (filePath.endsWith('.spec.ts')) type = 'spec';
        else if (filePath.endsWith('.test.ts')) type = 'test';
        else continue;

        const fileName = path.basename(filePath);
        const label = fileName.slice(0, -8);

        results.push({ label, type });
    }

    return results.map((r) => ({
        ...baseConfig,
        displayName: r.label,
        testMatch: [`**/${r.label}.${r.type}.ts`],
        setupFilesAfterEnv: r.type === 'spec' ? ['<rootDir>/src/setupTest.ts'] : undefined
    }));
}

const unitTestProject = {
    ...baseConfig,
    displayName: 'unit',
    testMatch: ['**/*.test.ts']
};

const integrationTestProject = {
    ...baseConfig,
    displayName: 'integration',
    testMatch: ['**/*.spec.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTest.ts']
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
    // Exit the test suite immediately upon the first failing test
    bail: true,
    projects: [unitTestProject, integrationTestProject, ...createTestLabels(compilerOptions.sourceRoot)]
};
