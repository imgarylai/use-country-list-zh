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
          <h1 className="text-3xl font-bold">Material UI Demos</h1>
          <p className="mt-2 text-muted-foreground">
            Examples using Material UI (MUI) components with Google&apos;s Material
            Design.
          </p>

          <div className="mt-12 space-y-16">
            <DemoSection
              title="Basic Select"
              description="A simple country dropdown using MUI Select. Note: This doesn't support filtering - use the Autocomplete for that."
            >
              <BasicMuiSelect />
            </DemoSection>

            <DemoSection
              title="Select with Top List"
              description="Popular countries pinned to the top with ListSubheader."
            >
              <SelectWithTopList />
            </DemoSection>

            <DemoSection
              title="Searchable Autocomplete"
              description='The main feature! Type in English to filter Chinese country names. Try typing "united" to find United States (美國) and United Kingdom (英國).'
            >
              <BasicAutocomplete />
            </DemoSection>

            <DemoSection
              title="Sort Options"
              description="Switch between Chinese stroke order, English alphabetical, and Zhuyin sorting."
            >
              <AutocompleteWithSortOptions />
            </DemoSection>

            <DemoSection
              title="Flag Toggle"
              description="Toggle flag emoji visibility."
            >
              <AutocompleteWithFlagToggle />
            </DemoSection>

            <DemoSection
              title="Country Whitelist"
              description="Limit the list to specific countries only (e.g., Asian countries)."
            >
              <AutocompleteWithWhitelist />
            </DemoSection>
          </div>

          <div className="mt-16 rounded-lg border bg-muted/50 p-6">
            <h2 className="text-xl font-semibold mb-4">Code Example</h2>
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
