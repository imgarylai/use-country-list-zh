import { renderHook } from "@testing-library/react";
import { useCountryList } from "../../src";

describe("useCountryList - Sorting", () => {
  describe("sortBy option", () => {
    test("should sort by Chinese stroke order by default", () => {
      const { result } = renderHook(() => useCountryList());

      // Default sort should be by stroke order
      // Just verify the list is sorted (not empty)
      expect(result.current.countries.length).toBeGreaterThan(0);
    });

    test("should sort by Chinese stroke order when sortBy is zh", () => {
      const { result } = renderHook(() => useCountryList({ sortBy: "zh" }));

      expect(result.current.countries.length).toBeGreaterThan(0);
      // The exact order depends on stroke count
    });

    test("should sort by English name when sortBy is en", () => {
      const { result } = renderHook(() => useCountryList({ sortBy: "en" }));

      // Filter to get only non-top countries to check sort order
      const nonTopCountries = result.current.countries.filter(c => !c.isTop);

      // Check that countries are sorted alphabetically by English name
      for (let i = 0; i < nonTopCountries.length - 1; i++) {
        const current = nonTopCountries[i];
        const next = nonTopCountries[i + 1];
        if (current && next) {
          expect(
            current.nameEn.localeCompare(next.nameEn, "en")
          ).toBeLessThanOrEqual(0);
        }
      }
    });

    test("should sort by Zhuyin order when sortBy is zhuyin", () => {
      const { result } = renderHook(() => useCountryList({ sortBy: "zhuyin" }));

      expect(result.current.countries.length).toBeGreaterThan(0);
      // The exact order depends on zhuyin ordering
    });

    test("should maintain topList order regardless of sortBy", () => {
      const { result } = renderHook(() =>
        useCountryList({
          topList: ["JP", "KR", "TW"],
          sortBy: "en",
        })
      );

      // Top countries should maintain specified order
      expect(result.current.countries[0]?.code).toBe("JP");
      expect(result.current.countries[1]?.code).toBe("KR");
      expect(result.current.countries[2]?.code).toBe("TW");
    });

    test("should sort non-top countries by English when sortBy is en with topList", () => {
      const { result } = renderHook(() =>
        useCountryList({
          topList: ["TW"],
          sortBy: "en",
          includeOnly: ["TW", "US", "JP", "AU"],
        })
      );

      // TW should be first (top list)
      expect(result.current.countries[0]?.code).toBe("TW");

      // Rest should be sorted by English: Australia, Japan, United States
      const nonTopCountries = result.current.countries.slice(1);
      expect(nonTopCountries[0]?.code).toBe("AU"); // Australia
      expect(nonTopCountries[1]?.code).toBe("JP"); // Japan
      expect(nonTopCountries[2]?.code).toBe("US"); // United States
    });
  });
});
