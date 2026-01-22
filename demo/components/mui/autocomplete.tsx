"use client";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useCountryList, type SortBy, type CountryItem } from "use-country-list-zh";

export function BasicAutocomplete() {
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

  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={countries}
      value={selectedCountry as CountryItem | null}
      onChange={(_, newValue) => setSelectedCountry(newValue)}
      inputValue={query}
      onInputChange={(_, newValue) => setQuery(newValue)}
      getOptionLabel={(option) => getDisplayText(option)}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      groupBy={(option) => (option.isTop ? "Popular" : "All Countries")}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <Box component="li" key={key} {...rest}>
            {getDisplayText(option)}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a country"
          placeholder="Type in English to filter..."
        />
      )}
      filterOptions={(x) => x}
    />
  );
}

export function AutocompleteWithSortOptions() {
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl sx={{ width: 200 }} size="small">
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortBy}
          label="Sort by"
          onChange={(e) => setSortBy(e.target.value as SortBy)}
        >
          <MenuItem value="zh">Chinese Stroke Order</MenuItem>
          <MenuItem value="en">English Alphabetical</MenuItem>
          <MenuItem value="zhuyin">Zhuyin Order</MenuItem>
        </Select>
      </FormControl>

      <Autocomplete
        sx={{ width: 300 }}
        options={countries}
        value={selectedCountry as CountryItem | null}
        onChange={(_, newValue) => setSelectedCountry(newValue)}
        inputValue={query}
        onInputChange={(_, newValue) => setQuery(newValue)}
        getOptionLabel={(option) => getDisplayText(option)}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <Box component="li" key={key} {...rest}>
              {getDisplayText(option)}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a country"
            placeholder="Type in English to filter..."
          />
        )}
        filterOptions={(x) => x}
      />
    </Box>
  );
}

export function AutocompleteWithFlagToggle() {
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControlLabel
        control={
          <Switch
            checked={showFlag}
            onChange={(e) => setShowFlag(e.target.checked)}
          />
        }
        label="Show flag emoji"
      />

      <Autocomplete
        sx={{ width: 300 }}
        options={countries}
        value={selectedCountry as CountryItem | null}
        onChange={(_, newValue) => setSelectedCountry(newValue)}
        inputValue={query}
        onInputChange={(_, newValue) => setQuery(newValue)}
        getOptionLabel={(option) => getDisplayText(option)}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <Box component="li" key={key} {...rest}>
              {getDisplayText(option)}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a country"
            placeholder="Type in English to filter..."
          />
        )}
        filterOptions={(x) => x}
      />
    </Box>
  );
}

export function AutocompleteWithWhitelist() {
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ fontSize: 14, color: "text.secondary" }}>
        Showing only Asian countries (13 countries)
      </Box>
      <Autocomplete
        sx={{ width: 300 }}
        options={countries}
        value={selectedCountry as CountryItem | null}
        onChange={(_, newValue) => setSelectedCountry(newValue)}
        inputValue={query}
        onInputChange={(_, newValue) => setQuery(newValue)}
        getOptionLabel={(option) => getDisplayText(option)}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <Box component="li" key={key} {...rest}>
              {getDisplayText(option)}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a country"
            placeholder="Type in English to filter..."
          />
        )}
        filterOptions={(x) => x}
      />
    </Box>
  );
}
