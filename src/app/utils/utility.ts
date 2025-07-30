import { AlertFeature } from "../model/alert"


export const formatDateLocal = (isoString: string) => {
  
  // Get browser's preferred locale, fallback to 'en-US'
  const locale = navigator.language || 'en-US';

  // Format date using the locale
  return new Date(isoString).toLocaleDateString(locale);
}


export const filterByDate = (from: Date | null, to: Date | null, elems: Array<AlertFeature>) => {
  if (!from && !to) return elems;

  // Normalize dates: remove time for date-only comparison
  const start = from ? new Date(from.setHours(0, 0, 0, 0)) : null;
  const end = to ? new Date(to.setHours(23, 59, 59, 999)) : null;

  // Helper: check if two dates are same calendar day
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return elems.filter(({ properties }) => {
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