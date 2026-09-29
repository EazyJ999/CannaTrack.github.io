import type { MenuItem, Store } from "./types";

// DEMO DATA ONLY. Fictional stores so the site looks alive before real listings exist.
// Once Supabase is connected, this file is ignored.
const d = "2026-09-01T00:00:00Z";
const base = {
  email: "", website: "", instagram: "", lat: null as number | null, lng: null as number | null,
  status: "approved" as const, edit_token: "", created_at: d,
};

export const SEED_STORES: Store[] = [
  { ...base, id: "s1", slug: "green-door-cape-town", name: "The Green Door (demo)", tagline: "Neighbourhood shop in the CBD", description: "Demo listing. Replace with a real store.", province: "Western Cape", city: "Cape Town", suburb: "Gardens", address: "12 Example Street, Gardens", phone: "0210000001", whatsapp: "27210000001", hours: "Mon-Fri 10:00-19:00\nSat 10:00-17:00\nSun closed", delivery: true, collection: true, lat: -33.9367, lng: 18.4116 },
  { ...base, id: "s2", slug: "highveld-leaf-johannesburg", name: "Highveld Leaf (demo)", tagline: "Joburg's friendliest counter", description: "Demo listing. Replace with a real store.", province: "Gauteng", city: "Johannesburg", suburb: "Melville", address: "4 Example Road, Melville", phone: "0110000002", whatsapp: "27110000002", hours: "Mon-Sat 09:00-18:00", delivery: true, collection: true, lat: -26.1767, lng: 28.0056 },
  { ...base, id: "s3", slug: "coastal-canopy-durban", name: "Coastal Canopy (demo)", tagline: "Sea breeze and good vibes", description: "Demo listing. Replace with a real store.", province: "KwaZulu-Natal", city: "Durban", suburb: "Morningside", address: "88 Example Avenue, Morningside", phone: "0310000003", whatsapp: "27310000003", hours: "Daily 10:00-20:00", delivery: false, collection: true, lat: -29.8302, lng: 31.0168 },
  { ...base, id: "s4", slug: "karoo-kush-bloemfontein", name: "Karoo Roots (demo)", tagline: "Free State's local stop", description: "Demo listing. Replace with a real store.", province: "Free State", city: "Bloemfontein", suburb: "Westdene", address: "21 Example Lane, Westdene", phone: "0510000004", whatsapp: "27510000004", hours: "Mon-Fri 09:00-17:30\nSat 09:00-14:00", delivery: true, collection: true, lat: -29.1170, lng: 26.2140 },
  { ...base, id: "s5", slug: "tuinroete-herb-george", name: "Garden Route Herb (demo)", tagline: "Slow days on the Garden Route", description: "Demo listing. Replace with a real store.", province: "Western Cape", city: "George", suburb: "Central", address: "5 Example Street, George", phone: "0440000005", whatsapp: "27440000005", hours: "Mon-Sat 10:00-18:00", delivery: false, collection: true, lat: -33.9630, lng: 22.4617 },
  { ...base, id: "s6", slug: "friendly-plant-east-london", name: "Buffalo Bud House (demo)", tagline: "East London's community shop", description: "Demo listing. Replace with a real store.", province: "Eastern Cape", city: "East London", suburb: "Vincent", address: "9 Example Drive, Vincent", phone: "0430000006", whatsapp: "27430000006", hours: "Mon-Sat 10:00-18:00", delivery: true, collection: true, lat: -32.9840, lng: 27.8730 },
];

const mk = (store_id: string, category: string, name: string, price: number, unit: string, description = ""): MenuItem => ({
  id: `${store_id}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  store_id, category, name, description, price, unit, available: true,
});

export const SEED_MENU: MenuItem[] = SEED_STORES.flatMap((s) => [
  mk(s.id, "Flower", "House Blend", 90, "1g", "Demo item"),
  mk(s.id, "Flower", "Premium Indoor", 140, "1g", "Demo item"),
  mk(s.id, "Pre-rolls", "Single Pre-roll", 45, "each"),
  mk(s.id, "Edibles", "Gummies", 120, "pack of 10"),
  mk(s.id, "CBD & Wellness", "CBD Oil", 350, "30ml"),
  mk(s.id, "Accessories", "Rolling Papers", 25, "pack"),
  mk(s.id, "Accessories", "Grinder", 180, "each"),
]);
