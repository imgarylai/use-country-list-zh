import { renderHook, act } from "@testing-library/react";
import { useCountryList } from "../../src";

describe("useCountryList - Filtering", () => {
  test("should filter by English name", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("taiwan");
    });

    expect(result.current.countries.length).toBeGreaterThan(0);
    expect(result.current.countries.some(c => c.code === "TW")).toBe(true);
  });

  test("should filter by partial English name", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("united");
    });

    const codes = result.current.countries.map(c => c.code);
    expect(codes).toContain("US"); // United States
    expect(codes).toContain("GB"); // United Kingdom
    expect(codes).toContain("AE"); // United Arab Emirates
  });

  test("should filter by country code", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("TW");
    });

    expect(result.current.countries.length).toBeGreaterThan(0);
    expect(result.current.countries[0]?.code).toBe("TW");
  });

  test("should filter by Chinese name", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("台灣");
    });

    expect(result.current.countries.length).toBe(1);
    expect(result.current.countries[0]?.code).toBe("TW");
  });

  test("should filter by partial Chinese name", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("美");
    });

    const codes = result.current.countries.map(c => c.code);
    expect(codes).toContain("US"); // 美國
  });

  test("should be case-insensitive for English search", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("JAPAN");
    });

    expect(result.current.countries.some(c => c.code === "JP")).toBe(true);
  });

  test("should return empty array when no match found", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("xyznonexistent");
    });

    expect(result.current.countries.length).toBe(0);
  });

  test("should prioritize exact code matches", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("US");
    });

    expect(result.current.countries[0]?.code).toBe("US");
  });

  test("should prioritize prefix matches over contains matches", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("new");
    });

    const firstTwoCountries = result.current.countries.slice(0, 2);
    const codes = firstTwoCountries.map(c => c.code);

    // New Zealand and New Caledonia should be near the top
    expect(codes.includes("NZ") || codes.includes("NC")).toBe(true);
  });

  test("should clear filter when query is empty", () => {
    const { result } = renderHook(() => useCountryList());
    const initialCount = result.current.countries.length;

    act(() => {
      result.current.setQuery("taiwan");
    });
    expect(result.current.countries.length).toBeLessThan(initialCount);

    act(() => {
      result.current.setQuery("");
    });
    expect(result.current.countries.length).toBe(initialCount);
  });

  test("should trim whitespace from query", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("  taiwan  ");
    });

    expect(result.current.countries.some(c => c.code === "TW")).toBe(true);
  });
});
