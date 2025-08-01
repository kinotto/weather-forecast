// jest.setup.js
import '@testing-library/jest-dom'

// Mock fetch
(async () => {
  const fetch = (await import('node-fetch')).default;
  global.fetch = fetch;
})();

// Mock next/router useRouter globally
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    // add any other router methods you use
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));