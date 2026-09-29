import { PROVINCE_LIST } from "./site";

export const digits = (v: FormDataEntryValue | null) => String(v ?? "").replace(/\D/g, "");
export const text = (v: FormDataEntryValue | null, max = 500) => String(v ?? "").trim().slice(0, max);

// Convert 0821234567 to 27821234567
export function normaliseZaNumber(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.startsWith("27")) return d;
  if (d.startsWith("0")) return "27" + d.slice(1);
  return d;
}

export function storeFieldsFromForm(f: FormData) {
  const province = text(f.get("province"), 40);
  return {
    name: text(f.get("name"), 80),
    tagline: text(f.get("tagline"), 120),
    description: text(f.get("description"), 1200),
    province: PROVINCE_LIST.includes(province) ? province : "",
    city: text(f.get("city"), 60),
    suburb: text(f.get("suburb"), 60),
    address: text(f.get("address"), 200),
    phone: text(f.get("phone"), 30),
    whatsapp: normaliseZaNumber(text(f.get("whatsapp"), 30)),
    email: text(f.get("email"), 120),
    website: text(f.get("website"), 200),
    instagram: text(f.get("instagram"), 60),
    hours: text(f.get("hours"), 300),
    delivery: f.get("delivery") === "on",
    collection: f.get("collection") === "on",
    lat: f.get("lat") ? Number(f.get("lat")) : null,
    lng: f.get("lng") ? Number(f.get("lng")) : null,
  };
}
