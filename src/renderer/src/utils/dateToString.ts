import { formatInTimeZone } from 'date-fns-tz';

export function dateToString(date?: string | Date | null): string | null {
  if (!date) return null;
  return date instanceof Date ? formatInTimeZone(date, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'") : date;
}
