module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  moduleFileExtensions: ["ts", "js"],
  modulePathIgnorePatterns: ["node_modules"],
};
