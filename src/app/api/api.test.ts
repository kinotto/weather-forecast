import { getForecastApi } from './api';
import config from '../config.json'; // adjust path if needed

describe('getForecastApi', () => {
  afterEach(() => {
    jest.restoreAllMocks(); // clean up between tests
  });

  it('returns JSON data when fetch is successful', async () => {
    const mockData = { forecast: 'sunny' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    }) as jest.Mock;

    const result = await getForecastApi();
    expect(fetch).toHaveBeenCalledWith(config.api_url);
    expect(result).toEqual(mockData);
  });

  it('throws an error when fetch response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }) as jest.Mock;

    await expect(getForecastApi()).rejects.toThrow('Something went wrong');
  });
});