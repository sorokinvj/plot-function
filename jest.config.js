/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm", // or other ESM presets
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest-amcharts",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\](?!(@amcharts)\\/).+\\.(js|jsx|ts|tsx)$",
  ],
};
