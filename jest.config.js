/** @type {import('jest').Config} */
module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/test/styleMock.cjs",
    "\\.(jpg|jpeg|png|gif|webp|svg|ico)$": "<rootDir>/test/fileMock.cjs",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          target: "ES2020",
          module: "commonjs",
          moduleResolution: "node",
          jsx: "react-jsx",
          esModuleInterop: true,
          allowJs: true,
          strict: true,
          types: ["jest", "node"],
        },
      },
    ],
  },
  testMatch: ["**/*.test.{ts,tsx}"],
};