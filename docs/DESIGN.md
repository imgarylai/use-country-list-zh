# Design Document: use-country-list-zh

## Problem Statement

在台灣，許多網站的國家選單使用中文顯示。這帶來一個使用者體驗問題：

- **英文選單**: 使用者可以按下鍵盤上的字母（如 "U"）快速跳到以該字母開頭的國家
- **中文選單**: 無法使用此功能，使用者必須滾動整個列表尋找目標國家

這個問題在需要選擇國家的表單中特別明顯，例如：
- 結帳頁面的帳單地址
- 會員註冊表單
- 國際配送地址

## Solution

建立一個 React Hook library，提供：
1. 完整的國家資料（中英文對照）
2. 基於英文輸入的即時過濾功能
3. 彈性的配置選項

## Design Goals

### 1. Headless Architecture

這個 library 只提供**核心邏輯和資料**，不包含任何 UI 元件或樣式。

**優點**:
- 使用者可以自由選擇任何 UI library（Material UI、Ant Design、Tailwind、原生 HTML 等）
- 不會與現有專案的樣式衝突
- Bundle size 最小化

### 2. Type Safety

完整的 TypeScript 支援，提供：
- 所有資料結構的型別定義
- ISO 3166-1 國家代碼的型別檢查
- 良好的 IDE 自動完成體驗

### 3. Zero Dependencies

除了 React 之外，不引入任何外部依賴，確保：
- 最小的 bundle size
- 無版本衝突風險
- 安全性簡化

## Data Structure

### Country Interface

```typescript
interface Country {
  code: string;      // ISO 3166-1 alpha-2 code (e.g., "TW")
  nameZh: string;    // 中文名稱 (e.g., "台灣")
  nameEn: string;    // English name (e.g., "Taiwan")
  flag: string;      // Emoji flag (e.g., "🇹🇼")
}
```

### Country Data Source

使用 ISO 3166-1 標準的國家列表，包含約 249 個國家和地區。資料內建於 library 中，不需要額外的 API 呼叫。

## Hook API Design

### useCountryList

主要的 hook，提供國家列表管理和過濾功能。

```typescript
function useCountryList(options?: UseCountryListOptions): UseCountryListReturn;
```

#### Options

```typescript
interface UseCountryListOptions {
  /**
   * 是否在國家名稱前顯示國旗 emoji
   * @default true
   */
  showFlag?: boolean;

  /**
   * 置頂的國家列表（使用 ISO 3166-1 alpha-2 代碼）
   * 這些國家會出現在列表最前面，並與其他國家用分隔線區分
   * @example ['TW', 'US', 'JP']
   */
  topList?: string[];

  /**
   * 只顯示指定的國家（使用 ISO 3166-1 alpha-2 代碼）
   * 如果設定此選項，只有列表中的國家會被顯示
   * @example ['TW', 'US', 'JP', 'KR', 'CN']
   */
  includeOnly?: string[];

  /**
   * 預設選擇的國家（使用 ISO 3166-1 alpha-2 代碼）
   * @example 'TW'
   */
  defaultSelected?: string;

  /**
   * 排序方式
   * - "zh": 依中文筆畫順序
   * - "en": 依英文名稱字母順序
   * - "zhuyin": 依注音順序
   * @default "zh"
   */
  sortBy?: "zh" | "en" | "zhuyin";
}
```

#### Return Value

```typescript
interface UseCountryListReturn {
  /**
   * 過濾後的國家列表
   * 如果有 topList，會包含 isTop 標記
   */
  countries: CountryItem[];

  /**
   * 當前的搜尋字串
   */
  query: string;

  /**
   * 更新搜尋字串
   * 支援英文、中文輸入
   */
  setQuery: (query: string) => void;

  /**
   * 當前選擇的國家
   */
  selectedCountry: Country | null;

  /**
   * 設定選擇的國家（使用 ISO code 或 Country 物件）
   */
  setSelectedCountry: (country: string | Country | null) => void;

  /**
   * 取得國家的顯示文字
   * 根據 showFlag 設定決定是否包含國旗
   */
  getDisplayText: (country: Country) => string;

  /**
   * 重置所有狀態（清除搜尋、取消選擇）
   */
  reset: () => void;
}

interface CountryItem extends Country {
  /**
   * 是否為置頂國家
   */
  isTop?: boolean;
}
```

## Filtering Logic

### Search Algorithm

過濾邏輯採用**模糊匹配**（fuzzy matching）策略：

1. **英文輸入**:
   - 搜尋英文國家名稱（不分大小寫）
   - 搜尋 ISO 國家代碼
   - 範例：輸入 "united" → 顯示 "美國 (United States)", "英國 (United Kingdom)", "阿拉伯聯合大公國 (United Arab Emirates)"

2. **中文輸入**:
   - 搜尋中文國家名稱
   - 範例：輸入 "美" → 顯示 "美國"

3. **混合輸入**:
   - 同時支援中英文混合搜尋

### Matching Priority

搜尋結果按以下優先順序排列：
1. 完全匹配（國家代碼）
2. 前綴匹配（名稱以搜尋字串開頭）
3. 包含匹配（名稱包含搜尋字串）

## Usage Examples

### Basic Usage

```tsx
import { useCountryList } from 'use-country-list-zh';

function CountrySelect() {
  const { countries, query, setQuery, selectedCountry, setSelectedCountry, getDisplayText } = useCountryList();

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="輸入國家名稱..."
      />
      <ul>
        {countries.map((country) => (
          <li
            key={country.code}
            onClick={() => setSelectedCountry(country)}
          >
            {getDisplayText(country)}
          </li>
        ))}
      </ul>
      {selectedCountry && <p>已選擇: {getDisplayText(selectedCountry)}</p>}
    </div>
  );
}
```

### With Top List (Taiwan E-commerce)

```tsx
const { countries } = useCountryList({
  topList: ['TW', 'JP', 'US', 'KR', 'CN'],
  showFlag: true,
});

// Result:
// 🇹🇼 台灣 (isTop: true)
// 🇯🇵 日本 (isTop: true)
// 🇺🇸 美國 (isTop: true)
// 🇰🇷 韓國 (isTop: true)
// 🇨🇳 中國 (isTop: true)
// ─────────────────
// 🇦🇫 阿富汗
// 🇦🇱 阿爾巴尼亞
// ...
```

### Limited Country List

```tsx
const { countries } = useCountryList({
  includeOnly: ['TW', 'JP', 'US'],
  showFlag: false,
});

// Result:
// 台灣
// 日本
// 美國
```

### With Default Selection

```tsx
const { selectedCountry } = useCountryList({
  defaultSelected: 'TW',
});

// selectedCountry is pre-populated with Taiwan
```

### With Sorting Options

```tsx
// Sort by English name
const { countries } = useCountryList({
  sortBy: 'en',
});
// Result: Afghanistan, Albania, Algeria, ...

// Sort by Chinese stroke order (default)
const { countries } = useCountryList({
  sortBy: 'zh',
});
// Result sorted by stroke count

// Sort by Zhuyin/Bopomofo order
const { countries } = useCountryList({
  sortBy: 'zhuyin',
});
// Result sorted by zhuyin pronunciation
```

## Implementation Notes

### Performance Considerations

1. **Memoization**: 使用 `useMemo` 快取過濾結果，避免不必要的重新計算
2. **Debouncing**: 使用者可在外部實作 debounce（library 不強制）
3. **Country Data**: 資料在 module load 時初始化，不在每次 render 時重新建立

### Bundle Size Target

- 目標 gzipped size: < 5KB（不含國家資料）
- 國家資料（249 國）: 約 15KB gzipped

### Browser Support

- 支援所有現代瀏覽器
- 不支援 IE11

## Future Considerations

以下功能可在未來版本中考慮：

1. **拼音支援**: 支援漢語拼音輸入（如 "taiwan" 或 "taiWAN"）
2. **注音支援**: 支援注音符號輸入
3. **多語言**: 支援更多語言的國家名稱
4. **地區資料**: 支援省份/州的選擇
5. **電話國碼**: 包含國際電話國碼資料

## Testing Strategy

### Unit Tests

- Hook 基本功能測試
- 過濾邏輯測試
- 選項配置測試
- Edge cases（空列表、無匹配結果等）

### Integration Tests

- 與 React 元件整合測試
- 使用 @testing-library/react-hooks

## References

- [ISO 3166-1 Country Codes](https://www.iso.org/iso-3166-country-codes.html)
- [Unicode Flag Emoji](https://emojipedia.org/flags/)
- [use-mailchimp-form](https://github.com/imgarylai/use-mailchimp-form) - Reference architecture
