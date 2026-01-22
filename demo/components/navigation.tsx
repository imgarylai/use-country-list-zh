"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shadcn", label: "Shadcn/ui" },
  { href: "/mui", label: "Material UI" },
  { href: "/antd", label: "Ant Design" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl">🌏</span>
            <span className="font-bold">use-country-list-zh</span>
          </Link>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground font-medium"
                  : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <a
            href="https://github.com/imgarylai/use-country-list-zh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/60 hover:text-foreground/80"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
