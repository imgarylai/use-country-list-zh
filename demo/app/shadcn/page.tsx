"use client";

import { BasicSelect, SelectWithTopList } from "@/components/shadcn/basic-select";
import { CountryCombobox } from "@/components/shadcn/combobox";
import {
  SortOptionsDemo,
  FlagToggleDemo,
  WhitelistDemo,
} from "@/components/shadcn/with-options";

export default function ShadcnPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Shadcn/ui Demos</h1>
        <p className="mt-2 text-muted-foreground">
          Examples using Shadcn/ui components with Radix UI primitives and
          Tailwind CSS.
        </p>

        <div className="mt-12 space-y-16">
          <DemoSection
            title="Basic Select"
            description="A simple country dropdown using Radix Select. Note: This doesn't support filtering - use the Combobox for that."
          >
            <BasicSelect />
          </DemoSection>

          <DemoSection
            title="Select with Top List"
            description="Popular countries pinned to the top with a separator."
          >
            <SelectWithTopList />
          </DemoSection>

          <DemoSection
            title="Searchable Combobox"
            description='The main feature! Type in English to filter Chinese country names. Try typing "united" to find United States (美國) and United Kingdom (英國).'
          >
            <CountryCombobox />
          </DemoSection>

          <DemoSection
            title="Sort Options"
            description="Switch between Chinese stroke order, English alphabetical, and Zhuyin sorting."
          >
            <SortOptionsDemo />
          </DemoSection>

          <DemoSection
            title="Flag Toggle"
            description="Toggle flag emoji visibility."
          >
            <FlagToggleDemo />
          </DemoSection>

          <DemoSection
            title="Country Whitelist"
            description="Limit the list to specific countries only (e.g., Asian countries)."
          >
            <WhitelistDemo />
          </DemoSection>
        </div>

        <div className="mt-16 rounded-lg border bg-muted/50 p-6">
          <h2 className="text-xl font-semibold mb-4">Code Example</h2>
          <pre className="overflow-x-auto text-sm">
            <code>{`import { useCountryList } from 'use-country-list-zh';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

function CountryCombobox() {
  const [open, setOpen] = useState(false);
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {selectedCountry ? getDisplayText(selectedCountry) : "Select..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command shouldFilter={false}>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Type in English..."
          />
          <CommandList>
            {countries.map((country) => (
              <CommandItem
                key={country.code}
                onSelect={() => {
                  setSelectedCountry(country);
                  setOpen(false);
                }}
              >
                {getDisplayText(country)}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}`}</code>
          </pre>
        </div>
      </div>
    </div>
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
