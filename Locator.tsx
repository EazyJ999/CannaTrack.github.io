"use client";
import { useMemo, useState } from "react";
import StoreCard from "./StoreCard";
import type { PublicStore } from "@/lib/types";

function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad, dLng = (lng2 - lng1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export default function Locator({ stores, provinces }: { stores: PublicStore[]; provinces: Record<string, string[]> }) {
  const [q, setQ] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null);
  const [geoMsg, setGeoMsg] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    stores.forEach((s) => { c[s.province] = (c[s.province] || 0) + 1; });
    return c;
  }, [stores]);

  const cities = province ? Array.from(new Set([...(provinces[province] || []), ...stores.filter((s) => s.province === province).map((s) => s.city)])).sort() : [];

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = stores
      .filter((s) => (!province || s.province === province) && (!city || s.city === city) && (!delivery || s.delivery))
      .filter((s) => !needle || [s.name, s.city, s.suburb, s.province, s.tagline].join(" ").toLowerCase().includes(needle))
      .map((s) => ({ s, d: pos && s.lat != null && s.lng != null ? haversine(pos.lat, pos.lng, s.lat, s.lng) : undefined }));
    list = pos ? list.sort((a, b) => (a.d ?? 1e9) - (b.d ?? 1e9)) : list.sort((a, b) => a.s.name.localeCompare(b.s.name));
    return list;
  }, [stores, q, province, city, delivery, pos]);

  function locate() {
    if (!navigator.geolocation) { setGeoMsg("Location isn't available on this device."); return; }
    setGeoMsg("Finding you...");
    navigator.geolocation.getCurrentPosition(
      (p) => { setPos({ lat: p.coords.latitude, lng: p.coords.longitude }); setGeoMsg("Sorted by distance from you."); },
      () => setGeoMsg("Couldn't get your location. Pick a province or city instead."),
      { timeout: 8000 }
    );
  }

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[1fr_200px_200px]">
        <input className="input" placeholder="Search by store, suburb or city" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input" value={province} onChange={(e) => { setProvince(e.target.value); setCity(""); }}>
          <option value="">All provinces</option>
          {Object.keys(provinces).map((p) => <option key={p} value={p}>{p}{counts[p] ? ` (${counts[p]})` : ""}</option>)}
        </select>
        <select className="input" value={city} onChange={(e) => setCity(e.target.value)} disabled={!province}>
          <option value="">All cities</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <button className="btn btn-ghost !py-1.5" onClick={locate}>Near me</button>
        <label className="flex cursor-pointer items-center gap-2 text-muted">
          <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} className="accent-[#7fb069]" /> Delivery available
        </label>
        {geoMsg && <span className="text-xs text-muted">{geoMsg}</span>}
        {(q || province || city || delivery || pos) && (
          <button className="text-xs text-muted underline" onClick={() => { setQ(""); setProvince(""); setCity(""); setDelivery(false); setPos(null); setGeoMsg(""); }}>Clear</button>
        )}
      </div>

      <p className="mt-6 text-sm text-muted">{results.length} store{results.length === 1 ? "" : "s"}</p>
      {results.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          No stores match yet. Know one in this area? Ask them to list on LeafFinder.
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ s, d }) => <StoreCard key={s.id} store={s} distanceKm={d} />)}
        </div>
      )}
    </div>
  );
}
