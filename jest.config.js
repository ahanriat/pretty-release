module.exports = {
  verbose: true,
  testRegex: '((\\.|/)(test|spec))\\.(tsx?)$',
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/node_modules/babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
};
