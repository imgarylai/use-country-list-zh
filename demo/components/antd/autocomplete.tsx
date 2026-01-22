"use client";

import * as React from "react";
import { AutoComplete, Input, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useCountryList } from "use-country-list-zh";

const { Text } = Typography;

export function BasicAutoComplete() {
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
    <AutoComplete
      style={{ width: 280 }}
      options={options}
      value={selectedCountry ? getDisplayText(selectedCountry) : query}
      onSearch={setQuery}
      onSelect={(value) => {
        setSelectedCountry(value);
        setQuery("");
      }}
      placeholder="Type in English to filter..."
      notFoundContent="No country found"
    >
      <Input suffix={<SearchOutlined style={{ color: "#bfbfbf" }} />} />
    </AutoComplete>
  );
}

export function AutoCompleteWithWhitelist() {
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
      <AutoComplete
        style={{ width: 280 }}
        options={countries.map((country) => ({
          value: country.code,
          label: getDisplayText(country),
        }))}
        value={selectedCountry ? getDisplayText(selectedCountry) : query}
        onSearch={setQuery}
        onSelect={(value) => {
          setSelectedCountry(value);
          setQuery("");
        }}
        placeholder="Type in English to filter..."
        notFoundContent="No country found"
      >
        <Input suffix={<SearchOutlined style={{ color: "#bfbfbf" }} />} />
      </AutoComplete>
    </Space>
  );
}
