import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MenuCart from "@/components/MenuCart";
import { getStoreBySlug } from "@/lib/db";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getStoreBySlug(slug);
  if (!data) return { title: "Store not found" };
  return { title: `${data.store.name} — ${data.store.city}`, description: data.store.tagline || `Menu and details for ${data.store.name} in ${data.store.city}.` };
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;
  const data = await getStoreBySlug(slug);
  if (!data) notFound();
  const { store: s, menu } = data;
  const fullAddress = [s.address, s.city, s.province, "South Africa"].filter(Boolean).join(", ");
  const mapsUrl = s.lat != null && s.lng != null
    ? `https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  const ig = s.instagram.replace(/^@/, "");

  return (
    <div>
      <Link href="/" className="text-sm text-muted hover:text-cream">← All stores</Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="font-display text-4xl">{s.name}</h1>
          {s.tagline && <p className="mt-1 text-muted">{s.tagline}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {s.collection && <span className="chip">Collection</span>}
            {s.delivery && <span className="chip">Delivery</span>}
          </div>
          {s.description && <p className="mt-5 max-w-2xl whitespace-pre-line text-cream/90">{s.description}</p>}
        </div>

        <aside className="space-y-3 rounded-2xl border border-line bg-card p-5 text-sm">
          <p>{fullAddress}</p>
          {s.hours && <div><p className="label">Hours</p><p className="whitespace-pre-line">{s.hours}</p></div>}
          <div className="flex flex-wrap gap-2 pt-1">
            <a className="btn btn-ghost !py-2" href={mapsUrl} target="_blank" rel="noopener noreferrer">Directions</a>
            {s.phone && <a className="btn btn-ghost !py-2" href={`tel:${s.phone}`}>Call</a>}
            {s.whatsapp && <a className="btn btn-primary !py-2" href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
          </div>
          <div className="space-x-3 pt-1 text-muted">
            {s.website && <a className="underline" href={s.website} target="_blank" rel="noopener noreferrer">Website</a>}
            {ig && <a className="underline" href={`https://instagram.com/${ig}`} target="_blank" rel="noopener noreferrer">Instagram</a>}
          </div>
        </aside>
      </div>

      {s.lat != null && s.lng != null && (
        <iframe
          title={`Map of ${s.name}`}
          className="mt-8 h-64 w-full rounded-2xl border border-line"
          loading="lazy"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${s.lng - 0.01}%2C${s.lat - 0.007}%2C${s.lng + 0.01}%2C${s.lat + 0.007}&layer=mapnik&marker=${s.lat}%2C${s.lng}`}
        />
      )}

      <h2 className="mb-4 mt-12 font-display text-3xl">Menu</h2>
      <MenuCart storeName={s.name} whatsapp={s.whatsapp} menu={menu} />
    </div>
  );
}
