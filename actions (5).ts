"use server";
import { revalidatePath } from "next/cache";
import { deleteMenuItem, getStoreByToken, updateStore, upsertMenuItem } from "@/lib/db";
import { storeFieldsFromForm, text } from "@/lib/form";
import { CATEGORIES } from "@/lib/site";

async function owned(token: string) {
  const d = await getStoreByToken(token);
  if (!d) throw new Error("Invalid link");
  return d.store;
}

export async function saveStoreAction(token: string, f: FormData) {
  const s = await owned(token);
  const { name, ...rest } = storeFieldsFromForm(f);
  // Status and slug are never editable by owners.
  await updateStore(s.id, { name: name || s.name, ...rest });
  revalidatePath(`/store/${s.slug}`); revalidatePath("/"); revalidatePath(`/manage/${token}`);
}

export async function saveItemAction(token: string, f: FormData) {
  const s = await owned(token);
  const name = text(f.get("name"), 80);
  if (!name) return;
  const category = CATEGORIES.includes(text(f.get("category"), 40)) ? text(f.get("category"), 40) : "Other";
  const price = Math.max(0, Math.min(1000000, Number(f.get("price")) || 0));
  const id = text(f.get("id"), 60);
  await upsertMenuItem({
    ...(id ? { id } : {}),
    store_id: s.id, category, name,
    description: text(f.get("description"), 200),
    price, unit: text(f.get("unit"), 30) || "each",
    available: f.get("available") === "on",
  });
  revalidatePath(`/store/${s.slug}`); revalidatePath(`/manage/${token}`);
}

export async function deleteItemAction(token: string, f: FormData) {
  const s = await owned(token);
  await deleteMenuItem(text(f.get("id"), 60), s.id);
  revalidatePath(`/store/${s.slug}`); revalidatePath(`/manage/${token}`);
}
