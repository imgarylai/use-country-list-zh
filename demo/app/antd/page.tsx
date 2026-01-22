"use client";

import AntdRegistry from "@/components/antd/antd-registry";
import {
  BasicAntdSelect,
  SelectWithTopList,
  SearchableSelect,
  SelectWithSortOptions,
  SelectWithFlagToggle,
  SelectWithWhitelist,
} from "@/components/antd/select";
import {
  BasicAutoComplete,
  AutoCompleteWithWhitelist,
} from "@/components/antd/autocomplete";

export default function AntdPage() {
  return (
    <AntdRegistry>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Ant Design 範例</h1>
          <p className="mt-2 text-muted-foreground">
            使用 Ant Design 元件的範例，廣泛應用於企業級 React 應用程式。
          </p>

          <div className="mt-12 space-y-16">
            <DemoSection
              title="基本下拉選單"
              description="使用 Ant Design Select 的簡單國家下拉選單。"
            >
              <BasicAntdSelect />
            </DemoSection>

            <DemoSection
              title="常用國家置頂"
              description="常用國家分組顯示在頂部。"
            >
              <SelectWithTopList />
            </DemoSection>

            <DemoSection
              title="可搜尋下拉選單"
              description="核心功能！輸入英文即可篩選中文國家名稱。試著輸入「united」來找到美國和英國。"
            >
              <SearchableSelect />
            </DemoSection>

            <DemoSection
              title="自動完成"
              description="使用 Ant Design AutoComplete 的另一種可搜尋元件。"
            >
              <BasicAutoComplete />
            </DemoSection>

            <DemoSection
              title="排序選項"
              description="可切換筆畫順序、英文字母順序或注音順序排序。"
            >
              <SelectWithSortOptions />
            </DemoSection>

            <DemoSection
              title="國旗開關"
              description="切換國旗表情符號的顯示與隱藏。"
            >
              <SelectWithFlagToggle />
            </DemoSection>

            <DemoSection
              title="國家白名單"
              description="限制只顯示特定國家（例如：亞洲國家）。"
            >
              <SelectWithWhitelist />
            </DemoSection>

            <DemoSection
              title="自動完成加白名單"
              description="結合白名單功能的自動完成元件。"
            >
              <AutoCompleteWithWhitelist />
            </DemoSection>
          </div>

          <div className="mt-16 rounded-lg border bg-muted/50 p-6">
            <h2 className="text-xl font-semibold mb-4">程式碼範例</h2>
            <pre className="overflow-x-auto text-sm">
              <code>{`import { useCountryList } from 'use-country-list-zh';
import { Select } from 'antd';

function CountrySelect() {
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

  const topCountries = countries.filter((c) => c.isTop);
  const otherCountries = countries.filter((c) => !c.isTop);

  const options = [
    {
      label: 'Popular',
      options: topCountries.map((country) => ({
        value: country.code,
        label: getDisplayText(country),
      })),
    },
    {
      label: 'All Countries',
      options: otherCountries.map((country) => ({
        value: country.code,
        label: getDisplayText(country),
      })),
    },
  ];

  return (
    <Select
      showSearch
      placeholder="Type in English to filter..."
      value={selectedCountry?.code}
      onChange={(value) => setSelectedCountry(value)}
      searchValue={query}
      onSearch={setQuery}
      options={options}
      filterOption={false} // Use hook's filtering
    />
  );
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </AntdRegistry>
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
