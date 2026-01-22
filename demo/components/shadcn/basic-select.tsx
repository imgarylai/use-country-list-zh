"use client";

import { useCountryList } from "use-country-list-zh";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";

export function BasicSelect() {
  const { countries, selectedCountry, setSelectedCountry, getDisplayText } =
    useCountryList({
      showFlag: true,
    });

  return (
    <Select
      value={selectedCountry?.code || ""}
      onValueChange={(value) => setSelectedCountry(value)}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {getDisplayText(country)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
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

  return (
    <Select
      value={selectedCountry?.code || ""}
      onValueChange={(value) => setSelectedCountry(value)}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {topCountries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {getDisplayText(country)}
          </SelectItem>
        ))}
        {topCountries.length > 0 && otherCountries.length > 0 && (
          <SelectSeparator />
        )}
        {otherCountries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {getDisplayText(country)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
