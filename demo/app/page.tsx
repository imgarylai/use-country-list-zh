import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          use-country-list-zh
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          A React hook library that provides a Chinese country selector with
          English input filtering support. Perfect for Taiwanese applications
          where users need to quickly find countries in a Chinese dropdown menu.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/shadcn">View Demos</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href="https://github.com/imgarylai/use-country-list-zh"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">Core Features</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <FeatureCard
            title="Chinese Display with English Filtering"
            description='Display country names in Chinese, but allow English input to filter results. Type "united" to find 美國 and 英國.'
          />
          <FeatureCard
            title="Optional Flag Emoji"
            description="Support showing or hiding country flag emojis based on your UI needs."
          />
          <FeatureCard
            title="Top List Support"
            description="Pin frequently used countries (like Taiwan, USA, Japan) to the top of the list."
          />
          <FeatureCard
            title="Multiple Sorting Options"
            description="Sort countries by Chinese stroke order, English alphabetical order, or Zhuyin order."
          />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">Demo Pages</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <DemoCard
            href="/shadcn"
            title="Shadcn/ui"
            description="Modern React components built with Radix UI and Tailwind CSS"
          />
          <DemoCard
            href="/mui"
            title="Material UI"
            description="Google's Material Design components for React"
          />
          <DemoCard
            href="/antd"
            title="Ant Design"
            description="Enterprise-class UI design language and React components"
          />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
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
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function DemoCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border p-6 transition-colors hover:bg-muted/50"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
