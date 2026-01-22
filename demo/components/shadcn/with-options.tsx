"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useCountryList, type SortBy } from "use-country-list-zh";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Combobox with different sort options
export function SortOptionsDemo() {
  const [sortBy, setSortBy] = React.useState<SortBy>("zh");
  const [open, setOpen] = React.useState(false);
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
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zh">Chinese Stroke Order</SelectItem>
            <SelectItem value="en">English Alphabetical</SelectItem>
            <SelectItem value="zhuyin">Zhuyin Order</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[280px] justify-between"
          >
            {selectedCountry
              ? getDisplayText(selectedCountry)
              : "Select a country..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Type in English to filter..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    onSelect={() => {
                      setSelectedCountry(country);
                      setQuery("");
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCountry?.code === country.code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {getDisplayText(country)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Combobox with flag toggle
export function FlagToggleDemo() {
  const [showFlag, setShowFlag] = React.useState(true);
  const [open, setOpen] = React.useState(false);
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
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showFlag}
            onChange={(e) => setShowFlag(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Show flag emoji
        </label>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[280px] justify-between"
          >
            {selectedCountry
              ? getDisplayText(selectedCountry)
              : "Select a country..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Type in English to filter..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    onSelect={() => {
                      setSelectedCountry(country);
                      setQuery("");
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCountry?.code === country.code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {getDisplayText(country)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Combobox with whitelist (Asian countries only)
export function WhitelistDemo() {
  const [open, setOpen] = React.useState(false);
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
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Showing only Asian countries (13 countries)
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[280px] justify-between"
          >
            {selectedCountry
              ? getDisplayText(selectedCountry)
              : "Select a country..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Type in English to filter..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={country.code}
                    onSelect={() => {
                      setSelectedCountry(country);
                      setQuery("");
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCountry?.code === country.code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {getDisplayText(country)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
