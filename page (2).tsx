import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";

export const metadata: Metadata = { title: "List your store" };

export default function ListYourStore() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-4xl">List your store</h1>
      <p className="mt-2 mb-8 text-muted">Free to apply. We review every listing. Once approved you get a private link to update your details and menu whenever you like.</p>
      <ApplyForm />
    </div>
  );
}
