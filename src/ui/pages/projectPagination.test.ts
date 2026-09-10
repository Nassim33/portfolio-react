import { getPageCount, getPageSlice, PAGE_SIZE } from "./projectPagination";

describe("getPageCount", () => {
  it("returns 1 for empty data", () => {
    expect(getPageCount(0)).toBe(1);
  });

  it("returns 1 when data fits on one page", () => {
    expect(getPageCount(PAGE_SIZE - 1)).toBe(1);
  });

  it("rounds up partial pages", () => {
    expect(getPageCount(PAGE_SIZE + 1)).toBe(2);
  });

  it("computes whole pages exactly", () => {
    expect(getPageCount(PAGE_SIZE * 3)).toBe(3);
  });
});

describe("getPageSlice", () => {
  const items = Array.from({ length: 13 }, (_, index) => index + 1);

  it("returns the first page", () => {
    expect(getPageSlice(items, 1)).toHaveLength(PAGE_SIZE);
    expect(getPageSlice(items, 1)[0]).toBe(1);
  });

  it("returns the last (partial) page", () => {
    expect(getPageSlice(items, 3)).toEqual([13]);
  });

  it("returns an empty slice for out-of-range pages", () => {
    expect(getPageSlice(items, 9)).toEqual([]);
  });
});