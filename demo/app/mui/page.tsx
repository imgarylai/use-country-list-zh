"use client";

import { MuiThemeProvider } from "@/components/mui/theme-provider";
import { BasicMuiSelect, SelectWithTopList } from "@/components/mui/select";
import {
  BasicAutocomplete,
  AutocompleteWithSortOptions,
  AutocompleteWithFlagToggle,
  AutocompleteWithWhitelist,
} from "@/components/mui/autocomplete";

export default function MuiPage() {
  return (
    <MuiThemeProvider>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Material UI 範例</h1>
          <p className="mt-2 text-muted-foreground">
            使用 Material UI (MUI) 元件搭配 Google Material Design 的範例。
          </p>

          <div className="mt-12 space-y-16">
            <DemoSection
              title="基本下拉選單"
              description="使用 MUI Select 的簡單國家下拉選單。注意：此元件不支援篩選功能，如需篩選請使用 Autocomplete。"
            >
              <BasicMuiSelect />
            </DemoSection>

            <DemoSection
              title="常用國家置頂"
              description="常用國家固定在頂部，使用 ListSubheader 區隔。"
            >
              <SelectWithTopList />
            </DemoSection>

            <DemoSection
              title="可搜尋自動完成"
              description="核心功能！輸入英文即可篩選中文國家名稱。試著輸入「united」來找到美國和英國。"
            >
              <BasicAutocomplete />
            </DemoSection>

            <DemoSection
              title="排序選項"
              description="可切換筆畫順序、英文字母順序或注音順序排序。"
            >
              <AutocompleteWithSortOptions />
            </DemoSection>

            <DemoSection
              title="國旗開關"
              description="切換國旗表情符號的顯示與隱藏。"
            >
              <AutocompleteWithFlagToggle />
            </DemoSection>

            <DemoSection
              title="國家白名單"
              description="限制只顯示特定國家（例如：亞洲國家）。"
            >
              <AutocompleteWithWhitelist />
            </DemoSection>
          </div>

          <div className="mt-16 rounded-lg border bg-muted/50 p-6">
            <h2 className="text-xl font-semibold mb-4">程式碼範例</h2>
            <pre className="overflow-x-auto text-sm">
              <code>{`import { useCountryList } from 'use-country-list-zh';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CountryAutocomplete() {
  const {
    countries,
    query,
    setQuery,
    selectedCountry,
    setSelectedCountry,
    getDisplayText,
  } = useCountryList({
    showFlag: true,
    topList: ['TW', 'US', 'JP'],
  });

  return (
    <Autocomplete
      options={countries}
      value={selectedCountry}
      onChange={(_, newValue) => setSelectedCountry(newValue)}
      inputValue={query}
      onInputChange={(_, newValue) => setQuery(newValue)}
      getOptionLabel={(option) => getDisplayText(option)}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      groupBy={(option) => option.isTop ? 'Popular' : 'All Countries'}
      renderInput={(params) => (
        <TextField {...params} label="Select a country" />
      )}
      filterOptions={(x) => x} // Use hook's filtering
    />
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

function DemoSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}
