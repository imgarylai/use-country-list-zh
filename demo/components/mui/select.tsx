"use client";

import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import { useCountryList } from "use-country-list-zh";

export function BasicMuiSelect() {
  const { countries, selectedCountry, setSelectedCountry, getDisplayText } =
    useCountryList({
      showFlag: true,
    });

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 280 }}>
      <InputLabel>Country</InputLabel>
      <Select
        value={selectedCountry?.code || ""}
        label="Country"
        onChange={handleChange}
      >
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {getDisplayText(country)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
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

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 280 }}>
      <InputLabel>Country</InputLabel>
      <Select
        value={selectedCountry?.code || ""}
        label="Country"
        onChange={handleChange}
      >
        <ListSubheader>Popular</ListSubheader>
        {topCountries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {getDisplayText(country)}
          </MenuItem>
        ))}
        <Divider />
        <ListSubheader>All Countries</ListSubheader>
        {otherCountries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {getDisplayText(country)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
