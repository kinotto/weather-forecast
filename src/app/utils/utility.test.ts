import {
  getRandomDate,
  formatDateLocal,
  filterByDate,
  sortAlerts,
  filterBySearchQuery,
  applyAllFilters,
} from './utility';
import { AlertFeature, Filter, severityOrder } from '../model/alert';

const mockAlerts = [
  {
    properties: {
      event: 'Flood',
      areaDesc: 'New York',
      severity: 'Severe',
      effective: '2024-08-01T10:00:00Z',
      expires: '2024-08-02T10:00:00Z',
      sent: '2024-08-01T09:00:00Z',
      headline: 'Severe Flooding Expected'
    } 
  } as AlertFeature,
  {
    properties: {
      event: 'Storm',
      areaDesc: 'Texas',
      severity: 'Moderate',
      effective: '2024-07-30T10:00:00Z',
      expires: '2024-07-31T10:00:00Z',
      sent: '2024-07-30T09:00:00Z',
      headline: 'Moderate Storm Warning'
    }
  } as AlertFeature
];

describe('Utility functions', () => {
  test('getRandomDate returns a date between start and end', () => {
    const start = new Date('2024-01-01');
    const end = new Date('2024-12-31');
    const result = getRandomDate(start, end);
    expect(result.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(result.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  test('formatDateLocal returns localized date string', () => {
    const result = formatDateLocal('2024-08-01T00:00:00Z');
    expect(typeof result).toBe('string');
  });

  test('filterByDate filters correctly by date range', () => {
    const from = new Date('2024-08-01');
    const to = new Date('2024-08-01');
    const result = filterByDate(mockAlerts, from, to);
    expect(result.length).toBe(1);
    expect(result[0].properties.event).toBe('Flood');
  });

  test('sortAlerts sorts by severity correctly', () => {
    const result = sortAlerts(mockAlerts, Filter.severity);
    const [first, second] = result;
    expect(severityOrder[first.properties.severity]).toBeLessThanOrEqual(
      severityOrder[second.properties.severity]
    );
  });

  test('filterBySearchQuery filters alerts by keyword', () => {
    const result = filterBySearchQuery(mockAlerts, 'Flood');
    expect(result.length).toBe(1);
    expect(result[0].properties.areaDesc).toBe('New York');
  });

  test('applyAllFilters combines filters correctly', () => {
    const from = new Date('2024-08-01');
    const to = new Date('2024-08-01');
    const result = applyAllFilters(mockAlerts, from, to, Filter.severity, 'Flood');
    expect(result.length).toBe(1);
    expect(result[0].properties.event).toBe('Flood');
  });
});
