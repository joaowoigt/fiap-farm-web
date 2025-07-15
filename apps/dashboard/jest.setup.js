// Jest setup file
// Add custom jest matchers from jest-dom
// import '@testing-library/jest-dom';

// Mock Firebase if needed
jest.mock("./src/data/firebase/clientApp", () => ({
  auth: {},
  db: {},
}));

// Global test utilities
global.console = {
  ...console,
  // Suppress console.log in tests unless explicitly needed
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock sessionStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.sessionStorage = localStorageMock;
global.localStorage = localStorageMock;
