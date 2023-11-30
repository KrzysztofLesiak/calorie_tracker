export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    ".+\\.svg?.+$": "<rootDir>/src/tests/__mocks__/fileMock.ts",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  }
};
