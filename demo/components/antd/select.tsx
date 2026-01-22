"use client";

import * as React from "react";
import { Select, Space, Switch, Typography } from "antd";
import { useCountryList, type SortBy } from "use-country-list-zh";

const { Text } = Typography;

export function BasicAntdSelect() {
  const { countries, selectedCountry, setSelectedCountry, getDisplayText } =
    useCountryList({
      showFlag: true,
    });

  return (
    <Select
      style={{ width: 280 }}
      placeholder="Select a country"
      value={selectedCountry?.code}
      onChange={(value) => setSelectedCountry(value)}
      options={countries.map((country) => ({
        value: country.code,
        label: getDisplayText(country),
      }))}
    />
  );
}

export function SelectWithTopList() {
  const { countries, selectedCountry, setSelectedCountry, getDisplayText } =
    useCountryList({
      showFlag: true,
      topList: ["TW", "US", "JP", "KR"],
    });

  const topCountries = countries.filter((c) => c.isTop);
  const otherCountries = countries.filter((c) => !c.isTop);

  const options = [
    {
      label: "Popular",
      options: topCountries.map((country) => ({
        value: country.code,
        label: getDisplayText(country),
      })),
    },
    {
      label: "All Countries",
      options: otherCountries.map((country) => ({
        value: country.code,
        label: getDisplayText(country),
      })),
    },
  ];

  return (
    <Select
      style={{ width: 280 }}
      placeholder="Select a country"
      value={selectedCountry?.code}
      onChange={(value) => setSelectedCountry(value)}
      options={options}
    />
  );
}

export function SearchableSelect() {
  const {
    countries,
    query,
    setQuery,
    selectedCountry,
    setSelectedCountry,
    getDisplayText,
  } = useCountryList({
    showFlag: true,
    topList: ["TW", "US", "JP"],
  });

  const topCountries = countries.filter((c) => c.isTop);
  const otherCountries = countries.filter((c) => !c.isTop);

  const options = topCountries.length > 0
    ? [
        {
          label: "Popular",
          options: topCountries.map((country) => ({
            value: country.code,
            label: getDisplayText(country),
          })),
        },
        {
          label: "All Countries",
          options: otherCountries.map((country) => ({
            value: country.code,
            label: getDisplayText(country),
          })),
        },
      ]
    : [
        {
          label: "All Countries",
          options: countries.map((country) => ({
            value: country.code,
            label: getDisplayText(country),
          })),
        },
      ];

  return (
    <Select
      showSearch
      style={{ width: 280 }}
      placeholder="Type in English to filter..."
      value={selectedCountry?.code}
      onChange={(value) => {
        setSelectedCountry(value);
        setQuery("");
      }}
      searchValue={query}
      onSearch={setQuery}
      options={options}
      filterOption={false}
      notFoundContent="No country found"
    />
  );
}

export function SelectWithSortOptions() {
  const [sortBy, setSortBy] = React.useState<SortBy>("zh");
  const {
    countries,
    query,
    setQuery,
    selectedCountry,
    setSelectedCountry,
    getDisplayText,
  } = useCountryList({
    showFlag: true,
    sortBy,
  });

  return (
    <Space direction="vertical" size="middle">
      <Space>
        <Text type="secondary">Sort by:</Text>
        <Select
          value={sortBy}
          onChange={setSortBy}
          style={{ width: 180 }}
          options={[
            { value: "zh", label: "Chinese Stroke Order" },
            { value: "en", label: "English Alphabetical" },
            { value: "zhuyin", label: "Zhuyin Order" },
          ]}
        />
      </Space>

      <Select
        showSearch
        style={{ width: 280 }}
        placeholder="Type in English to filter..."
        value={selectedCountry?.code}
        onChange={(value) => {
          setSelectedCountry(value);
          setQuery("");
        }}
        searchValue={query}
        onSearch={setQuery}
        options={countries.map((country) => ({
          value: country.code,
          label: getDisplayText(country),
        }))}
        filterOption={false}
        notFoundContent="No country found"
      />
    </Space>
  );
}

export function SelectWithFlagToggle() {
  const [showFlag, setShowFlag] = React.useState(true);
  const {
    countries,
    query,
    setQuery,
    selectedCountry,
    setSelectedCountry,
    getDisplayText,
  } = useCountryList({
    showFlag,
    topList: ["TW", "US", "JP"],
  });

  return (
    <Space direction="vertical" size="middle">
      <Space>
        <Switch checked={showFlag} onChange={setShowFlag} />
        <Text>Show flag emoji</Text>
      </Space>

      <Select
        showSearch
        style={{ width: 280 }}
        placeholder="Type in English to filter..."
        value={selectedCountry?.code}
        onChange={(value) => {
          setSelectedCountry(value);
          setQuery("");
        }}
        searchValue={query}
        onSearch={setQuery}
        options={countries.map((country) => ({
          value: country.code,
          label: getDisplayText(country),
        }))}
        filterOption={false}
        notFoundContent="No country found"
      />
    </Space>
  );
}

export function SelectWithWhitelist() {
  const {
    countries,
    query,
    setQuery,
    selectedCountry,
    setSelectedCountry,
    getDisplayText,
  } = useCountryList({
    showFlag: true,
    includeOnly: [
      "TW",
      "JP",
      "KR",
      "CN",
      "HK",
      "MO",
      "SG",
      "MY",
      "TH",
      "VN",
      "PH",
      "ID",
      "IN",
    ],
    topList: ["TW", "JP", "KR"],
  });

  return (
    <Space direction="vertical" size="small">
      <Text type="secondary">Showing only Asian countries (13 countries)</Text>
      <Select
        showSearch
        style={{ width: 280 }}
        placeholder="Type in English to filter..."
        value={selectedCountry?.code}
        onChange={(value) => {
          setSelectedCountry(value);
          setQuery("");
        }}
        searchValue={query}
        onSearch={setQuery}
        options={countries.map((country) => ({
          value: country.code,
          label: getDisplayText(country),
        }))}
        filterOption={false}
        notFoundContent="No country found"
      />
    </Space>
  );
}
