import { renderHook, act } from "@testing-library/react";
import { useCountryList } from "../../src";

describe("useCountryList - Basic functionality", () => {
  test("should return initial state with all countries", () => {
    const { result } = renderHook(() => useCountryList());

    expect(result.current.countries.length).toBeGreaterThan(0);
    expect(result.current.query).toBe("");
    expect(result.current.selectedCountry).toBeNull();
    expect(typeof result.current.setQuery).toBe("function");
    expect(typeof result.current.setSelectedCountry).toBe("function");
    expect(typeof result.current.getDisplayText).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  test("should include Taiwan in the country list", () => {
    const { result } = renderHook(() => useCountryList());

    const taiwan = result.current.countries.find(c => c.code === "TW");
    expect(taiwan).toBeDefined();
    expect(taiwan?.nameZh).toBe("台灣");
    expect(taiwan?.nameEn).toBe("Taiwan");
    expect(taiwan?.flag).toBe("🇹🇼");
  });

  test("should select a country by code", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setSelectedCountry("TW");
    });

    expect(result.current.selectedCountry).not.toBeNull();
    expect(result.current.selectedCountry?.code).toBe("TW");
    expect(result.current.selectedCountry?.nameZh).toBe("台灣");
  });

  test("should select a country by Country object", () => {
    const { result } = renderHook(() => useCountryList());

    const japan = result.current.countries.find(c => c.code === "JP");
    expect(japan).toBeDefined();

    act(() => {
      result.current.setSelectedCountry(japan!);
    });

    expect(result.current.selectedCountry?.code).toBe("JP");
  });

  test("should clear selection when set to null", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setSelectedCountry("TW");
    });
    expect(result.current.selectedCountry).not.toBeNull();

    act(() => {
      result.current.setSelectedCountry(null);
    });
    expect(result.current.selectedCountry).toBeNull();
  });

  test("should handle invalid country code gracefully", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setSelectedCountry("INVALID");
    });

    expect(result.current.selectedCountry).toBeNull();
  });

  test("should reset to initial state", () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery("taiwan");
      result.current.setSelectedCountry("TW");
    });

    expect(result.current.query).toBe("taiwan");
    expect(result.current.selectedCountry).not.toBeNull();

    act(() => {
      result.current.reset();
    });

    expect(result.current.query).toBe("");
    expect(result.current.selectedCountry).toBeNull();
  });
});
