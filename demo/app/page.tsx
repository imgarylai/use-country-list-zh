import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Search,
  Flag,
  Pin,
  ArrowUpDown,
  Palette,
  Layers,
  Layout,
  Github,
  ArrowRight,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          use-country-list-zh
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          一個 React Hook 函式庫，提供中文國家選擇器並支援英文輸入篩選。
          專為台灣應用程式設計，讓使用者能在中文下拉選單中快速找到國家。
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/shadcn">
              查看範例
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href="https://github.com/imgarylai/use-country-list-zh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">核心功能</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <FeatureCard
            icon={Search}
            title="中文顯示、英文篩選"
            description="以中文顯示國家名稱，但支援英文輸入篩選。輸入「united」即可找到美國和英國。"
          />
          <FeatureCard
            icon={Flag}
            title="可選國旗表情符號"
            description="根據您的介面需求，支援顯示或隱藏國旗表情符號。"
          />
          <FeatureCard
            icon={Pin}
            title="常用國家置頂"
            description="將常用國家（如台灣、美國、日本）固定在列表頂部。"
          />
          <FeatureCard
            icon={ArrowUpDown}
            title="多種排序選項"
            description="支援依筆畫順序、英文字母順序或注音順序排序。"
          />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">範例頁面</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <DemoCard
            href="/shadcn"
            icon={Palette}
            title="Shadcn/ui"
            description="使用 Radix UI 和 Tailwind CSS 建置的現代 React 元件"
          />
          <DemoCard
            href="/mui"
            icon={Layers}
            title="Material UI"
            description="Google Material Design 的 React 元件庫"
          />
          <DemoCard
            href="/antd"
            icon={Layout}
            title="Ant Design"
            description="企業級 UI 設計語言與 React 元件庫"
          />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">快速開始</h2>
        <div className="rounded-lg border bg-muted/50 p-6">
          <pre className="overflow-x-auto text-sm">
            <code>{`npm install use-country-list-zh

// In your component:
import { useCountryList } from 'use-country-list-zh';

function CountrySelector() {
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
    sortBy: 'zhuyin',
  });

  // Use countries array with your preferred UI library
  return (
    <select
      value={selectedCountry?.code || ''}
      onChange={(e) => setSelectedCountry(e.target.value)}
    >
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {getDisplayText(country)}
        </option>
      ))}
    </select>
  );
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border p-6">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function DemoCard({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border p-6 transition-colors hover:bg-muted/50"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
        <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
