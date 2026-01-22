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
          <h1 className="text-3xl font-bold">Ant Design Demos</h1>
          <p className="mt-2 text-muted-foreground">
            Examples using Ant Design components, popular in enterprise React
            applications.
          </p>

          <div className="mt-12 space-y-16">
            <DemoSection
              title="Basic Select"
              description="A simple country dropdown using Ant Design Select."
            >
              <BasicAntdSelect />
            </DemoSection>

            <DemoSection
              title="Select with Top List"
              description="Popular countries grouped at the top."
            >
              <SelectWithTopList />
            </DemoSection>

            <DemoSection
              title="Searchable Select"
              description='The main feature! Type in English to filter Chinese country names. Try typing "united" to find United States (美國) and United Kingdom (英國).'
            >
              <SearchableSelect />
            </DemoSection>

            <DemoSection
              title="AutoComplete"
              description="Alternative searchable component using Ant Design AutoComplete."
            >
              <BasicAutoComplete />
            </DemoSection>

            <DemoSection
              title="Sort Options"
              description="Switch between Chinese stroke order, English alphabetical, and Zhuyin sorting."
            >
              <SelectWithSortOptions />
            </DemoSection>

            <DemoSection
              title="Flag Toggle"
              description="Toggle flag emoji visibility."
            >
              <SelectWithFlagToggle />
            </DemoSection>

            <DemoSection
              title="Country Whitelist"
              description="Limit the list to specific countries only (e.g., Asian countries)."
            >
              <SelectWithWhitelist />
            </DemoSection>

            <DemoSection
              title="AutoComplete with Whitelist"
              description="AutoComplete component with country whitelist."
            >
              <AutoCompleteWithWhitelist />
            </DemoSection>
          </div>

          <div className="mt-16 rounded-lg border bg-muted/50 p-6">
            <h2 className="text-xl font-semibold mb-4">Code Example</h2>
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
