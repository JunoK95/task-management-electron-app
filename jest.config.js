module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/renderer/src'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
        useESM: true
      }
    ]
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/src/renderer/src/setupTests.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx']
};
