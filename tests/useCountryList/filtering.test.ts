import { renderHook, act } from '@testing-library/react';
import { useCountryList } from '../../src';

describe('useCountryList - Filtering', () => {
  test('should filter by English name', () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery('taiwan');
    });

    expect(result.current.countries.length).toBeGreaterThan(0);
    expect(result.current.countries.some((c) => c.code === 'TW')).toBe(true);
  });

  test('should filter by partial English name', () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery('united');
    });

    const codes = result.current.countries.map((c) => c.code);
    expect(codes).toContain('US'); // United States
    expect(codes).toContain('GB'); // United Kingdom
    expect(codes).toContain('AE'); // United Arab Emirates
  });

  test('should filter by country code', () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery('TW');
    });

    expect(result.current.countries.length).toBeGreaterThan(0);
    expect(result.current.countries[0]?.code).toBe('TW');
  });

  test('should filter by Chinese name', () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery('台灣');
    });

    expect(result.current.countries.length).toBe(1);
    expect(result.current.countries[0]?.code).toBe('TW');
  });

  test('should filter by partial Chinese name', () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery('美');
    });

    const codes = result.current.countries.map((c) => c.code);
    expect(codes).toContain('US'); // 美國
  });

  test('should be case-insensitive for English search', () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery('JAPAN');
    });

    expect(result.current.countries.some((c) => c.code === 'JP')).toBe(true);
  });

  test('should return empty array when no match found', () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery('xyznonexistent');
    });

    expect(result.current.countries.length).toBe(0);
  });

  test('should prioritize exact code matches', () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery('US');
    });

    expect(result.current.countries[0]?.code).toBe('US');
  });

  test('should sort exact code match first even when other countries match by name', () => {
    const { result } = renderHook(() => useCountryList());

    // Search "us" - should match US exactly by code, and also match countries
    // with "us" in their English name (like Belarus, Russia, Australia, Austria)
    act(() => {
      result.current.setQuery('us');
    });

    const results = result.current.countries;
    expect(results.length).toBeGreaterThan(1);

    // US should be first due to exact code match
    expect(results[0]?.code).toBe('US');

    // Other matches should follow
    const otherMatches = results.slice(1);
    expect(
      otherMatches.some(
        (c) => c.nameEn.toLowerCase().includes('us') || c.code.toLowerCase().includes('us'),
      ),
    ).toBe(true);
  });

  test('should handle exact code match sorting with limited country list', () => {
    // Use includeOnly to create a controlled set where we can verify sorting behavior
    const { result } = renderHook(() =>
      useCountryList({
        includeOnly: ['AU', 'US', 'RU'], // Australia, United States, Russia
      }),
    );

    // Search "us" - US is exact match, AU and RU contain "us" in name (aUStralia, rUSsia)
    act(() => {
      result.current.setQuery('us');
    });

    const results = result.current.countries;
    expect(results.length).toBe(3);

    // US should always be first (exact code match)
    expect(results[0]?.code).toBe('US');

    // AU and RU should follow (they match via name containing "us")
    const otherCodes = results.slice(1).map((c) => c.code);
    expect(otherCodes).toContain('AU');
    expect(otherCodes).toContain('RU');
  });

  test('should prioritize prefix matches over contains matches', () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery('new');
    });

    const firstTwoCountries = result.current.countries.slice(0, 2);
    const codes = firstTwoCountries.map((c) => c.code);

    // New Zealand and New Caledonia should be near the top
    expect(codes.includes('NZ') || codes.includes('NC')).toBe(true);
  });

  test('should clear filter when query is empty', () => {
    const { result } = renderHook(() => useCountryList());
    const initialCount = result.current.countries.length;

    act(() => {
      result.current.setQuery('taiwan');
    });
    expect(result.current.countries.length).toBeLessThan(initialCount);

    act(() => {
      result.current.setQuery('');
    });
    expect(result.current.countries.length).toBe(initialCount);
  });

  test('should trim whitespace from query', () => {
    const { result } = renderHook(() => useCountryList());

    act(() => {
      result.current.setQuery('  taiwan  ');
    });

    expect(result.current.countries.some((c) => c.code === 'TW')).toBe(true);
  });

  test('should sort code prefix matches before non-prefix matches', () => {
    const { result } = renderHook(() => useCountryList());

    // Search "u" - should prioritize countries with code starting with "U" (like US, UA, UG, etc.)
    // over countries that only match in the name (like "Australia", "Austria")
    act(() => {
      result.current.setQuery('u');
    });

    const results = result.current.countries;
    expect(results.length).toBeGreaterThan(0);

    // Find first country with code starting with "U" and first without
    const firstCodePrefixIndex = results.findIndex((c) => c.code.toLowerCase().startsWith('u'));
    const firstNonCodePrefixIndex = results.findIndex(
      (c) => !c.code.toLowerCase().startsWith('u') && c.nameEn.toLowerCase().includes('u'),
    );

    // Code prefix matches should come before non-prefix matches
    if (firstCodePrefixIndex !== -1 && firstNonCodePrefixIndex !== -1) {
      expect(firstCodePrefixIndex).toBeLessThan(firstNonCodePrefixIndex);
    }
  });

  test('should sort English name prefix matches before contains matches', () => {
    const { result } = renderHook(() => useCountryList());

    // Search "an" - should prioritize "Andorra", "Angola", "Anguilla" (name starts with "An")
    // over countries like "France", "Germany" that contain "an" but don't start with it
    act(() => {
      result.current.setQuery('an');
    });

    const results = result.current.countries;
    expect(results.length).toBeGreaterThan(0);

    // Find countries that start with "an" vs just contain "an"
    const startsWithAn = results.filter((c) => c.nameEn.toLowerCase().startsWith('an'));
    const containsButNotStartsWith = results.filter(
      (c) => c.nameEn.toLowerCase().includes('an') && !c.nameEn.toLowerCase().startsWith('an'),
    );

    // All "starts with" matches should appear before "contains" matches
    if (startsWithAn.length > 0 && containsButNotStartsWith.length > 0) {
      const lastStartsWithIndex = results.findIndex(
        (c) => c.code === startsWithAn[startsWithAn.length - 1].code,
      );
      const firstContainsIndex = results.findIndex(
        (c) => c.code === containsButNotStartsWith[0].code,
      );
      expect(lastStartsWithIndex).toBeLessThan(firstContainsIndex);
    }
  });
});
