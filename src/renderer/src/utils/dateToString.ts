import { format } from 'date-fns';

export function dateToString(date?: string | Date | null): string | null {
  if (!date) return null;
  return date instanceof Date ? format(date, "yyyy-MM-dd'T'HH:mm") : date;
}
