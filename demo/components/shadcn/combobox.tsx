"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useCountryList } from "use-country-list-zh";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CountryCombobox() {
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
    topList: ["TW", "US", "JP"],
  });

  const topCountries = countries.filter((c) => c.isTop);
  const otherCountries = countries.filter((c) => !c.isTop);

  return (
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
            {topCountries.length > 0 && (
              <CommandGroup heading="Popular">
                {topCountries.map((country) => (
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
            )}
            {topCountries.length > 0 && otherCountries.length > 0 && (
              <CommandSeparator />
            )}
            {otherCountries.length > 0 && (
              <CommandGroup heading={topCountries.length > 0 ? "All Countries" : undefined}>
                {otherCountries.map((country) => (
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
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
