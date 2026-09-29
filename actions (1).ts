"use server";
import { dbEnabled, insertStore } from "@/lib/db";
import { storeFieldsFromForm, text } from "@/lib/form";

export type ApplyResult = { ok: boolean; message: string };

export async function applyAction(_prev: ApplyResult | null, f: FormData): Promise<ApplyResult> {
  // Honeypot
  if (text(f.get("website_url"))) return { ok: true, message: "Thanks!" };
  if (f.get("confirm") !== "on") return { ok: false, message: "Please confirm the declaration." };
  if (!dbEnabled) return { ok: false, message: "Applications are not open yet (database not connected)." };

  const fields = storeFieldsFromForm(f);
  if (!fields.name || !fields.province || !fields.city || fields.whatsapp.length < 10) {
    return { ok: false, message: "Please fill in store name, province, city and a valid WhatsApp number." };
  }
  try {
    await insertStore({ ...fields, status: "pending" });
  } catch {
    return { ok: false, message: "Something went wrong saving your application. Please try again." };
  }
  return { ok: true, message: "Application received. We review every listing before it goes live and will contact you on WhatsApp with your private edit link." };
}
