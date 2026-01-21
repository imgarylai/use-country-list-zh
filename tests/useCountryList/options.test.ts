import { renderHook, act } from "@testing-library/react";
import { useCountryList } from "../../src";

describe("useCountryList - Options", () => {
  describe("showFlag option", () => {
    test("should include flag in display text by default", () => {
      const { result } = renderHook(() => useCountryList());

      const taiwan = result.current.countries.find(c => c.code === "TW");
      expect(taiwan).toBeDefined();

      const displayText = result.current.getDisplayText(taiwan!);
      expect(displayText).toContain("🇹🇼");
      expect(displayText).toContain("台灣");
    });

    test("should include flag when showFlag is true", () => {
      const { result } = renderHook(() => useCountryList({ showFlag: true }));

      const taiwan = result.current.countries.find(c => c.code === "TW");
      const displayText = result.current.getDisplayText(taiwan!);

      expect(displayText).toBe("🇹🇼 台灣");
    });

    test("should exclude flag when showFlag is false", () => {
      const { result } = renderHook(() => useCountryList({ showFlag: false }));

      const taiwan = result.current.countries.find(c => c.code === "TW");
      const displayText = result.current.getDisplayText(taiwan!);

      expect(displayText).toBe("台灣");
      expect(displayText).not.toContain("🇹🇼");
    });
  });

  describe("topList option", () => {
    test("should put specified countries at the top", () => {
      const { result } = renderHook(() =>
        useCountryList({ topList: ["TW", "US", "JP"] })
      );

      const firstThree = result.current.countries.slice(0, 3);
      const codes = firstThree.map(c => c.code);

      expect(codes).toEqual(["TW", "US", "JP"]);
    });

    test("should mark top countries with isTop flag", () => {
      const { result } = renderHook(() =>
        useCountryList({ topList: ["TW", "US"] })
      );

      const taiwan = result.current.countries.find(c => c.code === "TW");
      const usa = result.current.countries.find(c => c.code === "US");
      const japan = result.current.countries.find(c => c.code === "JP");

      expect(taiwan?.isTop).toBe(true);
      expect(usa?.isTop).toBe(true);
      expect(japan?.isTop).toBeFalsy();
    });

    test("should maintain top list order", () => {
      const { result } = renderHook(() =>
        useCountryList({ topList: ["JP", "KR", "TW"] })
      );

      const firstThree = result.current.countries.slice(0, 3);
      expect(firstThree[0]?.code).toBe("JP");
      expect(firstThree[1]?.code).toBe("KR");
      expect(firstThree[2]?.code).toBe("TW");
    });

    test("should work with empty topList", () => {
      const { result } = renderHook(() => useCountryList({ topList: [] }));

      expect(result.current.countries.length).toBeGreaterThan(0);
      expect(result.current.countries[0]?.isTop).toBeFalsy();
    });
  });

  describe("includeOnly option", () => {
    test("should only include specified countries", () => {
      const { result } = renderHook(() =>
        useCountryList({ includeOnly: ["TW", "US", "JP"] })
      );

      expect(result.current.countries.length).toBe(3);
      const codes = result.current.countries.map(c => c.code);
      expect(codes).toContain("TW");
      expect(codes).toContain("US");
      expect(codes).toContain("JP");
    });

    test("should not include countries not in includeOnly", () => {
      const { result } = renderHook(() =>
        useCountryList({ includeOnly: ["TW", "US"] })
      );

      const codes = result.current.countries.map(c => c.code);
      expect(codes).not.toContain("JP");
      expect(codes).not.toContain("KR");
    });

    test("should work with empty includeOnly", () => {
      const { result } = renderHook(() => useCountryList({ includeOnly: [] }));

      expect(result.current.countries.length).toBe(0);
    });

    test("should work with topList and includeOnly together", () => {
      const { result } = renderHook(() =>
        useCountryList({
          topList: ["TW", "US"],
          includeOnly: ["TW", "US", "JP", "KR"],
        })
      );

      expect(result.current.countries.length).toBe(4);

      // Top countries should be first
      expect(result.current.countries[0]?.code).toBe("TW");
      expect(result.current.countries[1]?.code).toBe("US");
      expect(result.current.countries[0]?.isTop).toBe(true);
      expect(result.current.countries[1]?.isTop).toBe(true);
    });
  });

  describe("defaultSelected option", () => {
    test("should set initial selected country", () => {
      const { result } = renderHook(() =>
        useCountryList({ defaultSelected: "TW" })
      );

      expect(result.current.selectedCountry).not.toBeNull();
      expect(result.current.selectedCountry?.code).toBe("TW");
    });

    test("should handle invalid defaultSelected gracefully", () => {
      const { result } = renderHook(() =>
        useCountryList({ defaultSelected: "INVALID" })
      );

      expect(result.current.selectedCountry).toBeNull();
    });

    test("should restore defaultSelected after reset", () => {
      const { result } = renderHook(() =>
        useCountryList({ defaultSelected: "TW" })
      );

      act(() => {
        result.current.setSelectedCountry("US");
      });
      expect(result.current.selectedCountry?.code).toBe("US");

      act(() => {
        result.current.reset();
      });
      expect(result.current.selectedCountry?.code).toBe("TW");
    });
  });

  describe("combined options", () => {
    test("should work with all options combined", () => {
      const { result } = renderHook(() =>
        useCountryList({
          showFlag: false,
          topList: ["TW", "JP"],
          includeOnly: ["TW", "JP", "US", "KR"],
          defaultSelected: "TW",
        })
      );

      // Check includeOnly
      expect(result.current.countries.length).toBe(4);

      // Check topList order
      expect(result.current.countries[0]?.code).toBe("TW");
      expect(result.current.countries[1]?.code).toBe("JP");

      // Check showFlag
      const displayText = result.current.getDisplayText(
        result.current.countries[0]!
      );
      expect(displayText).toBe("台灣");

      // Check defaultSelected
      expect(result.current.selectedCountry?.code).toBe("TW");
    });
  });
});
