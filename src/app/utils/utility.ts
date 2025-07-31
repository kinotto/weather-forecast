import { AlertFeature, Filter, severityOrder } from "../model/alert"

export const getRandomDate = (start: Date, end: Date) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}

export const formatDateLocal = (isoString: string) => {

  // Get browser's preferred locale, fallback to 'en-US'
  const locale = navigator.language || 'en-US';

  // Format date using the locale
  return new Date(isoString).toLocaleDateString(locale);
}


export const filterByDate = (alerts: Array<AlertFeature>, from: Date | null, to: Date | null) => {
  if (!from && !to) return alerts;

  // Normalize dates: remove time for date-only comparison
  const start = from ? new Date(from.setHours(0, 0, 0, 0)) : null;
  const end = to ? new Date(to.setHours(23, 59, 59, 999)) : null;

  // Helper: check if two dates are same calendar day
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return alerts.filter(({ properties }) => {
    const dateStr = properties.effective || properties.sent;
    if (!dateStr) return false;

    const alertDate = new Date(dateStr);

    // If both from and to are today, show only alerts from today
    if (start && end && isSameDay(start, end)) {
      return isSameDay(alertDate, start);
    }

    if (start && alertDate < start) return false;
    if (end && alertDate > end) return false;

    return true;
  });
}


export const sortAlerts = (alerts: Array<AlertFeature>, selectedFilter: Filter): Array<AlertFeature> => {
  switch (selectedFilter) {
    case Filter.event: {
      return alerts.slice().sort((a, b) => a.properties.event.toLocaleLowerCase() > b.properties.event.toLocaleLowerCase() ? 1 : -1)
    }
    case Filter.severity: {
      return alerts.slice().sort((a, b) => {
        const severityA = a.properties.severity || "Unknown";
        const severityB = b.properties.severity || "Unknown";
        return severityOrder[severityA] - severityOrder[severityB];
      })
    }
    case Filter.area: {
      return alerts.slice().sort((a, b) => a.properties.areaDesc.toLocaleLowerCase() > b.properties.areaDesc.toLocaleLowerCase() ? 1 : -1)
    }
    case Filter.effectiveDate: {
      // reverse order
      return alerts.slice().sort((a, b) => new Date(a.properties.effective).getTime() > new Date(b.properties.effective).getTime() ? -1 : 1)
    }
    case Filter.expiryDate: {
      // reverse order
      return alerts.slice().sort((a, b) => new Date(a.properties.expires).getTime() > new Date(b.properties.expires).getTime() ? -1 : 1)
    }
    case Filter.headline: {
      return alerts.slice().sort((a, b) => (a.properties?.headline || "") > (b.properties?.headline || "") ? 1 : -1);
    }

    default:
      return alerts;
  }
}

export const filterBySearchQuery = (alerts: Array<AlertFeature>, searchQuery: string) => {
  return alerts.filter(el => {
    return el.properties.event.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      el.properties.areaDesc.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
      el.properties.headline?.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase());
  })
}

export const applyAllFilters = (alerts: Array<AlertFeature>, from: Date | null, to: Date | null, 
  selectedFilter: Filter, searchQuery: string) => {

  const filteredByDate = filterByDate(alerts, from, to);
  const sorted = sortAlerts(filteredByDate, selectedFilter);
  const filteredBySearchQuery = filterBySearchQuery(sorted, searchQuery);
  return filteredBySearchQuery;
}