import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE } from "@/lib/site";
import AgeGate from "@/components/AgeGate";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { title: SITE.name, description: SITE.description, type: "website" },
};
export const viewport: Viewport = { themeColor: "#1b1713", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body>
        <AgeGate />
        <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-display text-xl tracking-tight">
              <span className="text-leaf">Leaf</span>Finder <span className="text-muted text-sm">ZA</span>
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <Link href="/legal" className="text-muted hover:text-cream">Legal</Link>
              <Link href="/list-your-store" className="btn btn-primary !py-2">List your store</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mt-16 border-t border-line py-8 text-center text-xs text-muted">
          <p>18+ only. {SITE.name} is a directory. We do not sell, hold or deliver any products.</p>
          <p className="mt-1">Store owners are responsible for complying with South African law. <Link href="/legal" className="underline">Read more</Link></p>
        </footer>
      </body>
    </html>
  );
}
