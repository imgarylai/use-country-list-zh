# use-country-list-zh

A React hook library that provides a Chinese country selector with English input filtering support.

## Project Overview

This library solves a common UX problem in Taiwan: Chinese country dropdown menus don't support keyboard navigation by first letter (like English menus where pressing "U" jumps to countries starting with "U"). This library enables users to type in English to quickly filter Chinese country names.

## Core Features

1. **Chinese Display with English Filtering** - Display country names in Chinese, but allow English input to filter results (e.g., typing "united" shows 美國 and 英國)
2. **Optional Flag Emoji** - Support showing/hiding country flag emojis
3. **Top List Support** - Allow specifying frequently used countries to appear at the top
4. **Country Whitelist** - Support limiting the list to specific countries only
5. **Multiple Sorting Options** - Support sorting by Chinese stroke order, English alphabetical order, or Zhuyin order

## Architecture

This is a **headless** library - it only provides core filtering logic and data, allowing users to implement their own UI components with any styling solution.

### Tech Stack

- React 18+
- TypeScript
- Vite (build)
- Jest (testing)
- ESM + CommonJS dual output

### Project Structure

```
use-country-list-zh/
├── src/
│   ├── index.ts          # Main exports
│   ├── useCountryList.ts # Core hook
│   ├── types.ts          # TypeScript types
│   └── data/
│       └── countries.ts  # Country data (ISO 3166-1)
├── tests/
│   └── useCountryList/
│       └── *.test.ts
├── dist/                 # Build output
└── [config files]
```

### Main Hook API

```typescript
const {
  countries,      // Filtered country list
  query,          // Current search query
  setQuery,       // Update search query
  selectedCountry,// Currently selected country
  setSelectedCountry,
  reset,          // Reset all state
} = useCountryList(options);
```

### Options

```typescript
interface UseCountryListOptions {
  showFlag?: boolean;        // Show flag emoji (default: true)
  topList?: string[];        // ISO codes for top countries (e.g., ['TW', 'US'])
  includeOnly?: string[];    // Only show these countries (ISO codes)
  defaultSelected?: string;  // Default selected country (ISO code)
  sortBy?: 'zh' | 'en' | 'zhuyin';  // Sort order (default: 'zh')
}
```

## Development

```bash
npm install
npm run dev      # Watch mode
npm run build    # Production build
npm run test     # Run tests
npm run lint     # Lint check
```

## Related Files

- `docs/DESIGN.md` - Detailed design document
- `docs/CHANGELOG.md` - Auto-generated changelog
