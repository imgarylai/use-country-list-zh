import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "use-country-list-zh Demo",
  description:
    "Demo website showcasing the use-country-list-zh React hook library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 text-center text-sm text-muted-foreground">
            <p>
              Built with{" "}
              <a
                href="https://github.com/imgarylai/use-country-list-zh"
                className="font-medium underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                use-country-list-zh
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
