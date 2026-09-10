export const PAGE_SIZE = 6;

export function getPageCount(totalItems: number): number {
  return Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
}

export function getPageSlice<T>(items: T[], page: number): T[] {
  return items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}