module.exports = {
  verbose: true,
  testRegex: '((\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/node_modules/babel-jest',
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
};
