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
        <h1 className="text-3xl font-bold">Shadcn/ui 範例</h1>
        <p className="mt-2 text-muted-foreground">
          使用 Shadcn/ui 元件搭配 Radix UI 基礎元件與 Tailwind CSS 的範例。
        </p>

        <div className="mt-12 space-y-16">
          <DemoSection
            title="基本下拉選單"
            description="使用 Radix Select 的簡單國家下拉選單。注意：此元件不支援篩選功能，如需篩選請使用 Combobox。"
          >
            <BasicSelect />
          </DemoSection>

          <DemoSection
            title="常用國家置頂"
            description="常用國家固定在頂部，並以分隔線區隔。"
          >
            <SelectWithTopList />
          </DemoSection>

          <DemoSection
            title="可搜尋下拉選單"
            description="核心功能！輸入英文即可篩選中文國家名稱。試著輸入「united」來找到美國和英國。"
          >
            <CountryCombobox />
          </DemoSection>

          <DemoSection
            title="排序選項"
            description="可切換筆畫順序、英文字母順序或注音順序排序。"
          >
            <SortOptionsDemo />
          </DemoSection>

          <DemoSection
            title="國旗開關"
            description="切換國旗表情符號的顯示與隱藏。"
          >
            <FlagToggleDemo />
          </DemoSection>

          <DemoSection
            title="國家白名單"
            description="限制只顯示特定國家（例如：亞洲國家）。"
          >
            <WhitelistDemo />
          </DemoSection>
        </div>

        <div className="mt-16 rounded-lg border bg-muted/50 p-6">
          <h2 className="text-xl font-semibold mb-4">程式碼範例</h2>
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
