import { useState, useMemo, useCallback } from "react";
import { countries, countryMap } from "./data/countries";
import type {
  Country,
  CountryItem,
  SortBy,
  UseCountryListOptions,
  UseCountryListReturn,
} from "./types";

/**
 * Compare function for sorting countries
 */
function getSortComparator(
  sortBy: SortBy
): (a: Country, b: Country) => number {
  switch (sortBy) {
    case "en":
      // Sort by English name alphabetically
      return (a, b) => a.nameEn.localeCompare(b.nameEn, "en");
    case "zhuyin":
      // Sort by Zhuyin/Bopomofo order (注音順序)
      // zh-TW with pinyin collation approximates zhuyin ordering
      return (a, b) => a.nameZh.localeCompare(b.nameZh, "zh-TW-u-co-zhuyin");
    case "zh":
    default:
      // Sort by Chinese stroke order (筆畫順序)
      // zh-TW with stroke collation
      return (a, b) => a.nameZh.localeCompare(b.nameZh, "zh-TW-u-co-stroke");
  }
}

/**
 * A React hook for managing a Chinese country list with English input filtering
 *
 * @param options - Configuration options
 * @returns Country list state and methods
 *
 * @example
 * ```tsx
 * const { countries, query, setQuery, selectedCountry, setSelectedCountry } = useCountryList({
 *   showFlag: true,
 *   topList: ['TW', 'US', 'JP'],
 *   sortBy: 'zhuyin',
 * });
 * ```
 */
export function useCountryList(
  options: UseCountryListOptions = {}
): UseCountryListReturn {
  const {
    showFlag = true,
    topList = [],
    includeOnly,
    defaultSelected,
    sortBy = "zh",
  } = options;

  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountryState] = useState<Country | null>(
    () => {
      if (defaultSelected) {
        return countryMap.get(defaultSelected) ?? null;
      }
      return null;
    }
  );

  // Get the sort comparator based on sortBy option
  const sortComparator = useMemo(() => getSortComparator(sortBy), [sortBy]);

  // Build the base country list with filtering and top list logic
  const baseCountries = useMemo((): CountryItem[] => {
    // Filter countries if includeOnly is specified
    const filtered = includeOnly
      ? countries.filter(c => includeOnly.includes(c.code))
      : countries;

    // Separate top countries from the rest
    const topSet = new Set(topList);
    const topCountries: CountryItem[] = [];
    const restCountries: CountryItem[] = [];

    for (const country of filtered) {
      if (topSet.has(country.code)) {
        topCountries.push({ ...country, isTop: true });
      } else {
        restCountries.push(country);
      }
    }

    // Sort top countries by the order specified in topList
    topCountries.sort((a, b) => {
      return topList.indexOf(a.code) - topList.indexOf(b.code);
    });

    // Sort rest countries by the specified sort order
    restCountries.sort(sortComparator);

    return [...topCountries, ...restCountries];
  }, [includeOnly, topList, sortComparator]);

  // Filter countries based on query
  const filteredCountries = useMemo((): CountryItem[] => {
    if (!query.trim()) {
      return baseCountries;
    }

    const lowerQuery = query.toLowerCase().trim();

    // Filter based on query matching English name, Chinese name, or country code
    const filtered = baseCountries.filter(country => {
      // Match against country code (exact or prefix)
      if (country.code.toLowerCase().startsWith(lowerQuery)) {
        return true;
      }

      // Match against English name (case-insensitive, contains)
      if (country.nameEn.toLowerCase().includes(lowerQuery)) {
        return true;
      }

      // Match against Chinese name (contains)
      if (country.nameZh.includes(query.trim())) {
        return true;
      }

      return false;
    });

    // Sort results by relevance
    return filtered.sort((a, b) => {
      const aCode = a.code.toLowerCase();
      const bCode = b.code.toLowerCase();
      const aEnLower = a.nameEn.toLowerCase();
      const bEnLower = b.nameEn.toLowerCase();

      // Exact code match first
      if (aCode === lowerQuery && bCode !== lowerQuery) return -1;
      if (bCode === lowerQuery && aCode !== lowerQuery) return 1;

      // Code prefix match
      if (aCode.startsWith(lowerQuery) && !bCode.startsWith(lowerQuery))
        return -1;
      if (bCode.startsWith(lowerQuery) && !aCode.startsWith(lowerQuery))
        return 1;

      // English name prefix match
      if (aEnLower.startsWith(lowerQuery) && !bEnLower.startsWith(lowerQuery))
        return -1;
      if (bEnLower.startsWith(lowerQuery) && !aEnLower.startsWith(lowerQuery))
        return 1;

      // Maintain original order for same relevance
      return 0;
    });
  }, [baseCountries, query]);

  // Get display text for a country
  const getDisplayText = useCallback(
    (country: Country): string => {
      if (showFlag) {
        return `${country.flag} ${country.nameZh}`;
      }
      return country.nameZh;
    },
    [showFlag]
  );

  // Set selected country by code or Country object
  const setSelectedCountry = useCallback(
    (country: string | Country | null): void => {
      if (country === null) {
        setSelectedCountryState(null);
        return;
      }

      if (typeof country === "string") {
        const found = countryMap.get(country);
        setSelectedCountryState(found ?? null);
      } else {
        setSelectedCountryState(country);
      }
    },
    []
  );

  // Reset all state
  const reset = useCallback((): void => {
    setQuery("");
    setSelectedCountryState(
      defaultSelected ? countryMap.get(defaultSelected) ?? null : null
    );
  }, [defaultSelected]);

  return {
    countries: filteredCountries,
    query,
    setQuery,
    selectedCountry,
    setSelectedCountry,
    getDisplayText,
    reset,
  };
}
