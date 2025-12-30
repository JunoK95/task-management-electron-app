export function dateToString(date?: string | Date | null): string | null {
  if (!date) return null;
  return date instanceof Date ? date.toISOString() : date;
}
