/**
 * Represents a country with its metadata
 */
export interface Country {
  /** ISO 3166-1 alpha-2 country code (e.g., "TW", "US") */
  code: string;
  /** Chinese name of the country (e.g., "台灣") */
  nameZh: string;
  /** English name of the country (e.g., "Taiwan") */
  nameEn: string;
  /** Flag emoji (e.g., "🇹🇼") */
  flag: string;
}

/**
 * Extended country item with additional metadata for display
 */
export interface CountryItem extends Country {
  /** Whether this country is in the top list */
  isTop?: boolean;
}

/**
 * Sorting options for the country list
 */
export type SortBy = "zh" | "en" | "zhuyin";

/**
 * Options for the useCountryList hook
 */
export interface UseCountryListOptions {
  /**
   * Whether to show flag emoji in display text
   * @default true
   */
  showFlag?: boolean;

  /**
   * List of country codes to show at the top of the list
   * These countries will be marked with isTop: true
   * @example ['TW', 'US', 'JP']
   */
  topList?: string[];

  /**
   * Only include these countries in the list
   * If not provided, all countries are included
   * @example ['TW', 'US', 'JP', 'KR', 'CN']
   */
  includeOnly?: string[];

  /**
   * Default selected country code
   * @example 'TW'
   */
  defaultSelected?: string;

  /**
   * Sort countries by:
   * - "zh": Chinese stroke order (筆畫順序)
   * - "en": English alphabetical order
   * - "zhuyin": Zhuyin/Bopomofo order (注音順序)
   * @default "zh"
   */
  sortBy?: SortBy;
}

/**
 * Return value of the useCountryList hook
 */
export interface UseCountryListReturn {
  /**
   * Filtered list of countries based on current query and options
   */
  countries: CountryItem[];

  /**
   * Current search query string
   */
  query: string;

  /**
   * Update the search query
   */
  setQuery: (query: string) => void;

  /**
   * Currently selected country, or null if none selected
   */
  selectedCountry: Country | null;

  /**
   * Set the selected country by code or Country object
   */
  setSelectedCountry: (country: string | Country | null) => void;

  /**
   * Get the display text for a country based on showFlag option
   */
  getDisplayText: (country: Country) => string;

  /**
   * Reset all state (clear query and selection)
   */
  reset: () => void;
}
