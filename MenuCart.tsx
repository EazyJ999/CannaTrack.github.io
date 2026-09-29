"use client";
import { useMemo, useState } from "react";
import type { MenuItem } from "@/lib/types";

const zar = (n: number) => `R${Number(n).toFixed(n % 1 ? 2 : 0)}`;

export default function MenuCart({ storeName, whatsapp, menu }: { storeName: string; whatsapp: string; menu: MenuItem[] }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"collection" | "delivery">("collection");
  const [note, setNote] = useState("");

  const available = menu.filter((m) => m.available);
  const categories = Array.from(new Set(available.map((m) => m.category)));
  const set = (id: string, d: number) => setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] || 0) + d) }));

  const lines = useMemo(() => available.filter((m) => qty[m.id] > 0).map((m) => ({ m, n: qty[m.id] })), [available, qty]);
  const total = lines.reduce((t, { m, n }) => t + m.price * n, 0);

  const message = [
    `Hi ${storeName}, I'd like to order via LeafFinder:`,
    ...lines.map(({ m, n }) => `- ${n} x ${m.name} (${m.unit}) ${zar(m.price * n)}`),
    `Estimated total: ${zar(total)}`,
    `${mode === "delivery" ? "Delivery" : "Collection"}${name ? ` for ${name}` : ""}`,
    note ? `Note: ${note}` : "",
    "I confirm I am 18 or older.",
  ].filter(Boolean).join("\n");

  const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

  if (available.length === 0) return <p className="text-muted">This store hasn&apos;t published a menu yet. Message them directly.</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-8">
        {categories.map((cat) => (
          <section key={cat}>
            <h3 className="mb-3 font-display text-xl text-amber">{cat}</h3>
            <ul className="divide-y divide-line rounded-2xl border border-line bg-card">
              {available.filter((m) => m.category === cat).map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-4 p-4">
                  <div>
                    <p className="font-medium">{m.name} <span className="text-xs text-muted">· {m.unit}</span></p>
                    {m.description && <p className="text-sm text-muted">{m.description}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">{zar(m.price)}</span>
                    {whatsapp && (
                      <div className="flex items-center gap-2">
                        <button aria-label="Remove one" className="h-8 w-8 rounded-full border border-line hover:border-leaf" onClick={() => set(m.id, -1)}>−</button>
                        <span className="w-4 text-center text-sm">{qty[m.id] || 0}</span>
                        <button aria-label="Add one" className="h-8 w-8 rounded-full border border-line hover:border-leaf" onClick={() => set(m.id, 1)}>+</button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {whatsapp && (
        <aside className="h-fit rounded-2xl border border-line bg-card p-5 lg:sticky lg:top-20">
          <h3 className="font-display text-lg">Your order</h3>
          {lines.length === 0 ? <p className="mt-2 text-sm text-muted">Add items to build a WhatsApp order.</p> : (
            <>
              <ul className="mt-3 space-y-1 text-sm">
                {lines.map(({ m, n }) => <li key={m.id} className="flex justify-between"><span>{n} × {m.name}</span><span>{zar(m.price * n)}</span></li>)}
              </ul>
              <p className="mt-3 flex justify-between border-t border-line pt-3 font-semibold"><span>Estimated total</span><span>{zar(total)}</span></p>
              <div className="mt-4 space-y-3">
                <div><label className="label">Your name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div className="flex gap-2">
                  {(["collection", "delivery"] as const).map((m) => (
                    <button key={m} onClick={() => setMode(m)} className={`btn flex-1 !py-2 ${mode === m ? "btn-primary" : "btn-ghost"}`}>{m === "collection" ? "Collect" : "Deliver"}</button>
                  ))}
                </div>
                <div><label className="label">Note (optional)</label><input className="input" value={note} onChange={(e) => setNote(e.target.value)} /></div>
              </div>
              <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4 w-full">Send order on WhatsApp</a>
              <p className="mt-2 text-xs text-muted">Payment and fulfilment are arranged directly with the store. LeafFinder doesn&apos;t handle money or products.</p>
            </>
          )}
        </aside>
      )}
    </div>
  );
}
