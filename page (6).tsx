import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreFields from "@/components/StoreFields";
import { getStoreByToken } from "@/lib/db";
import { CATEGORIES } from "@/lib/site";
import { deleteItemAction, saveItemAction, saveStoreAction } from "./actions";

export const metadata: Metadata = { title: "Manage your store", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Manage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const data = await getStoreByToken(token);
  if (!data) notFound();
  const { store, menu } = data;

  const saveStore = saveStoreAction.bind(null, token);
  const saveItem = saveItemAction.bind(null, token);
  const delItem = deleteItemAction.bind(null, token);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl">{store.name}</h1>
        <p className="mt-1 text-sm text-muted">
          Status: <span className="text-cream">{store.status}</span>
          {store.status === "approved" ? <> · <Link className="underline" href={`/store/${store.slug}`}>View public page</Link></> : " · Not public until approved."}
        </p>
        <p className="mt-1 text-xs text-muted">Keep this page&apos;s link private. Anyone with it can edit your listing.</p>
      </div>

      <section>
        <h2 className="mb-3 font-display text-xl">Store details</h2>
        <form action={saveStore} className="space-y-4 rounded-2xl border border-line bg-card p-5">
          <StoreFields s={store} />
          <button className="btn btn-primary">Save details</button>
        </form>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl">Menu</h2>
        <div className="space-y-3">
          {menu.map((m) => (
            <div key={m.id} className="rounded-2xl border border-line bg-card p-4">
              <form action={saveItem} className="grid gap-3 sm:grid-cols-6">
                <input type="hidden" name="id" value={m.id} />
                <input name="name" required className="input sm:col-span-2" defaultValue={m.name} />
                <select name="category" className="input" defaultValue={m.category}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
                <input name="price" type="number" step="0.01" min="0" className="input" defaultValue={m.price} />
                <input name="unit" className="input" defaultValue={m.unit} />
                <input name="description" className="input sm:col-span-4" defaultValue={m.description} placeholder="Description" />
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="available" defaultChecked={m.available} className="accent-[#7fb069]" /> In stock</label>
                <div className="flex gap-2"><button className="btn btn-primary !py-1.5">Save</button></div>
              </form>
              <form action={delItem} className="mt-2"><input type="hidden" name="id" value={m.id} /><button className="text-xs text-red-400 underline">Delete item</button></form>
            </div>
          ))}
        </div>

        <h3 className="mb-2 mt-6 text-sm font-semibold text-muted">Add item</h3>
        <form action={saveItem} className="grid gap-3 rounded-2xl border border-dashed border-line p-4 sm:grid-cols-6">
          <input name="name" required placeholder="Item name" className="input sm:col-span-2" />
          <select name="category" className="input">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          <input name="price" type="number" step="0.01" min="0" placeholder="Price (R)" className="input" />
          <input name="unit" placeholder="Unit (1g, each)" className="input" />
          <input name="description" placeholder="Description" className="input sm:col-span-4" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="available" defaultChecked className="accent-[#7fb069]" /> In stock</label>
          <button className="btn btn-primary !py-1.5">Add</button>
        </form>
      </section>
    </div>
  );
}
