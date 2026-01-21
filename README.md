# use-country-list-zh

[![npm](https://img.shields.io/npm/v/use-country-list-zh)](https://www.npmjs.com/package/use-country-list-zh)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

一個提供中文國家選擇器的 React Hook，支援英文輸入快速過濾功能。

## 問題背景

在台灣，許多網站的國家下拉選單使用中文顯示。不像英文選單可以按下 "U" 快速跳到以 "U" 開頭的國家，中文選單無法使用鍵盤快速導航，使得選擇國家變得緩慢且繁瑣。

## 解決方案

這個 library 提供一個 headless React Hook：

- 以中文顯示國家名稱
- 支援英文輸入過濾（輸入 "united" 可找到 美國、英國）
- 支援鍵盤友善的國家選擇

## 功能特色

- 基於 React Hooks 的實作
- 完全可自訂 UI（headless 設計）
- 零依賴（除了 React）
- 完整的 TypeScript 支援
- 支援 ESM 和 CommonJS
- 內建國家資料（ISO 3166-1）
- 多種排序選項（筆畫順序、英文字母、注音順序）

## 系統需求

- Node.js >= 20.0.0
- npm >= 10.0.0
- React >= 18.2.0

## 安裝

```bash
npm install use-country-list-zh
```

```bash
yarn add use-country-list-zh
```

```bash
pnpm add use-country-list-zh
```

## 使用方式

### 基本範例

```tsx
import { useCountryList } from "use-country-list-zh";

function CountrySelect() {
  const {
    countries,
    query,
    setQuery,
    selectedCountry,
    setSelectedCountry,
    getDisplayText,
  } = useCountryList();

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜尋國家（例如：Taiwan、united、台灣）..."
      />

      <ul>
        {countries.map((country) => (
          <li key={country.code} onClick={() => setSelectedCountry(country)}>
            {getDisplayText(country)}
          </li>
        ))}
      </ul>

      {selectedCountry && <p>已選擇：{getDisplayText(selectedCountry)}</p>}
    </div>
  );
}
```

### 使用選項

```tsx
const { countries } = useCountryList({
  showFlag: true, // 顯示國旗 emoji（預設：true）
  topList: ["TW", "US", "JP"], // 常用國家置頂
  includeOnly: ["TW", "US", "JP", "KR", "CN"], // 只顯示這些國家
  defaultSelected: "TW", // 預設選擇台灣
  sortBy: "en", // 排序方式（選項：'zh'、'en'、'zhuyin'）
});
```

### 電商範例（台灣）

```tsx
function ShippingCountrySelect() {
  const { countries, query, setQuery, selectedCountry, setSelectedCountry } =
    useCountryList({
      topList: ["TW", "JP", "US", "KR", "CN"], // 常見配送目的地
      showFlag: true,
      defaultSelected: "TW",
    });

  return (
    <select
      value={selectedCountry?.code || ""}
      onChange={(e) => setSelectedCountry(e.target.value)}
    >
      <option value="">請選擇國家</option>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.isTop && "★ "}
          {country.flag} {country.nameZh}
        </option>
      ))}
    </select>
  );
}
```

## API

### useCountryList(options?)

回傳一個包含以下屬性的物件：

| 屬性                 | 類型                                           | 說明                   |
| -------------------- | ---------------------------------------------- | ---------------------- |
| `countries`          | `CountryItem[]`                                | 過濾並排序後的國家列表 |
| `query`              | `string`                                       | 目前的搜尋字串         |
| `setQuery`           | `(query: string) => void`                      | 更新搜尋字串           |
| `selectedCountry`    | `Country \| null`                              | 目前選擇的國家         |
| `setSelectedCountry` | `(country: string \| Country \| null) => void` | 設定選擇的國家         |
| `getDisplayText`     | `(country: Country) => string`                 | 取得顯示文字           |
| `reset`              | `() => void`                                   | 重置所有狀態           |

### 選項

| 選項              | 類型       | 預設值 | 說明                                     |
| ----------------- | ---------- | ------ | ---------------------------------------- |
| `showFlag`        | `boolean`  | `true` | 在顯示文字中包含國旗 emoji               |
| `topList`         | `string[]` | `[]`   | 要置頂的國家代碼                         |
| `includeOnly`     | `string[]` | -      | 只顯示這些國家                           |
| `defaultSelected` | `string`   | -      | 預設選擇的國家代碼                       |
| `sortBy`          | `SortBy`   | `'zh'` | 排序方式：`'zh'`、`'en'`、`'zhuyin'`     |

### 類型定義

```typescript
interface Country {
  code: string; // ISO 3166-1 alpha-2（例如 "TW"）
  nameZh: string; // 中文名稱（例如 "台灣"）
  nameEn: string; // 英文名稱（例如 "Taiwan"）
  flag: string; // 國旗 emoji（例如 "🇹🇼"）
}

interface CountryItem extends Country {
  isTop?: boolean; // 是否在置頂列表中
}

type SortBy = "zh" | "en" | "zhuyin";
```

## 排序選項

- `"zh"` - 依中文筆畫順序排序（預設）
- `"en"` - 依英文名稱字母順序排序
- `"zhuyin"` - 依注音順序排序

## 授權

MIT
