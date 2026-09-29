export type StoreStatus = "pending" | "approved" | "rejected";

export interface MenuItem {
  id: string;
  store_id: string;
  category: string;
  name: string;
  description: string;
  price: number; // ZAR
  unit: string; // e.g. "1g", "each", "pack"
  available: boolean;
}

export interface Store {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  province: string;
  city: string;
  suburb: string;
  address: string;
  lat: number | null;
  lng: number | null;
  phone: string;
  whatsapp: string; // digits only, international format e.g. 27821234567
  email: string;
  website: string;
  instagram: string;
  hours: string; // free text, one line per day range
  delivery: boolean;
  collection: boolean;
  status: StoreStatus;
  edit_token: string;
  created_at: string;
}

export type PublicStore = Omit<Store, "edit_token">;
