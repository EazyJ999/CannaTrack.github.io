import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SEED_MENU, SEED_STORES } from "./seed";
import type { MenuItem, PublicStore, Store } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const dbEnabled = Boolean(url && key);

function sb() {
  return createClient(url!, key!, { auth: { persistSession: false } });
}

const strip = (s: Store): PublicStore => {
  const { edit_token: _t, ...rest } = s;
  return rest;
};

export async function listApprovedStores(): Promise<PublicStore[]> {
  if (!dbEnabled) return SEED_STORES.map(strip);
  const { data, error } = await sb().from("stores").select("*").eq("status", "approved").order("name");
  if (error) throw error;
  return (data as Store[]).map(strip);
}

export async function getStoreBySlug(slug: string): Promise<{ store: PublicStore; menu: MenuItem[] } | null> {
  if (!dbEnabled) {
    const s = SEED_STORES.find((x) => x.slug === slug);
    return s ? { store: strip(s), menu: SEED_MENU.filter((m) => m.store_id === s.id) } : null;
  }
  const c = sb();
  const { data: s } = await c.from("stores").select("*").eq("slug", slug).eq("status", "approved").maybeSingle();
  if (!s) return null;
  const { data: m } = await c.from("menu_items").select("*").eq("store_id", s.id).order("category").order("name");
  return { store: strip(s as Store), menu: (m ?? []) as MenuItem[] };
}

export async function listAllStores(): Promise<Store[]> {
  if (!dbEnabled) return SEED_STORES;
  const { data, error } = await sb().from("stores").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as Store[];
}

export async function getStoreByToken(token: string): Promise<{ store: Store; menu: MenuItem[] } | null> {
  if (!dbEnabled || !token) return null;
  const c = sb();
  const { data: s } = await c.from("stores").select("*").eq("edit_token", token).maybeSingle();
  if (!s) return null;
  const { data: m } = await c.from("menu_items").select("*").eq("store_id", s.id).order("category").order("name");
  return { store: s as Store, menu: (m ?? []) as MenuItem[] };
}

export function slugify(input: string): string {
  return input.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

export async function insertStore(row: Partial<Store>): Promise<Store> {
  if (!dbEnabled) throw new Error("Database not configured");
  const c = sb();
  let slug = slugify(`${row.name}-${row.city}`);
  const { data: existing } = await c.from("stores").select("id").eq("slug", slug).maybeSingle();
  if (existing) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
  const { data, error } = await c.from("stores").insert({ ...row, slug }).select("*").single();
  if (error) throw error;
  return data as Store;
}

export async function updateStore(id: string, patch: Partial<Store>) {
  if (!dbEnabled) throw new Error("Database not configured");
  const { error } = await sb().from("stores").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteStore(id: string) {
  if (!dbEnabled) throw new Error("Database not configured");
  const { error } = await sb().from("stores").delete().eq("id", id);
  if (error) throw error;
}

export async function upsertMenuItem(item: Partial<MenuItem> & { store_id: string }) {
  if (!dbEnabled) throw new Error("Database not configured");
  const { error } = await sb().from("menu_items").upsert(item);
  if (error) throw error;
}

export async function deleteMenuItem(id: string, store_id: string) {
  if (!dbEnabled) throw new Error("Database not configured");
  const { error } = await sb().from("menu_items").delete().eq("id", id).eq("store_id", store_id);
  if (error) throw error;
}
