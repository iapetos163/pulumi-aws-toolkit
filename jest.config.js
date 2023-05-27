module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteNameTemplate: (vars) =>
          /^src\/(.+)(\/index)?\.test\.ts$/.exec(vars.filepath)[1],
      },
    ],
  ],
};
