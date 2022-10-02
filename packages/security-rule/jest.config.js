module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  watchPathIgnorePatterns: ['*.ts'],
}
