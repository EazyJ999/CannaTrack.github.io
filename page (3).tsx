import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Legal & disclaimer" };

export default function Legal() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 text-cream/90">
      <h1 className="font-display text-4xl">Legal &amp; disclaimer</h1>
      <p>{SITE.name} is an independent directory. We list businesses, publish the menus they give us, and link you to their WhatsApp. We do not sell, store, hold, ship or deliver any product, and we never handle payments.</p>
      <p>You must be 18 or older to use this site. Cannabis law in South Africa is specific: private adult use and cultivation is decriminalised, but commercial sale is regulated and not a blanket-legal activity. Rules also differ for CBD, hemp and seeds.</p>
      <p>Every store is responsible for holding whatever licences and permissions apply to what it offers, and for complying with all applicable law. Being listed here is not an endorsement or a claim that a store or product is lawful. Buyers are responsible for their own compliance.</p>
      <p>We may remove any listing at any time, for any reason. To report a listing, message the admin on WhatsApp.</p>
      <p className="text-sm text-muted">This page is general information, not legal advice. Get proper legal advice for your business before launch.</p>
    </div>
  );
}
