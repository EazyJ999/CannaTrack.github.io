import Link from "next/link";
import type { PublicStore } from "@/lib/types";

export default function StoreCard({ store, distanceKm }: { store: PublicStore; distanceKm?: number }) {
  return (
    <Link href={`/store/${store.slug}`} className="group block rounded-2xl border border-line bg-card p-5 transition hover:border-leaf">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg leading-snug group-hover:text-leaf">{store.name}</h3>
        {distanceKm !== undefined && <span className="chip whitespace-nowrap">{distanceKm < 10 ? distanceKm.toFixed(1) : Math.round(distanceKm)} km</span>}
      </div>
      {store.tagline && <p className="mt-1 text-sm text-muted">{store.tagline}</p>}
      <p className="mt-3 text-sm">{[store.suburb, store.city].filter(Boolean).join(", ")}</p>
      <p className="text-xs text-muted">{store.province}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {store.collection && <span className="chip">Collection</span>}
        {store.delivery && <span className="chip">Delivery</span>}
        {store.whatsapp && <span className="chip text-leaf">WhatsApp orders</span>}
      </div>
    </Link>
  );
}
