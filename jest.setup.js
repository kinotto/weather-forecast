// jest.setup.js
import '@testing-library/jest-dom'

(async () => {
  const fetch = (await import('node-fetch')).default;
  global.fetch = fetch;
})();

