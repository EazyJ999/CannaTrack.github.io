export const SITE = {
  name: "LeafFinder ZA",
  tagline: "Find cannabis stores across South Africa",
  description:
    "The national locator for cannabis stores in South Africa. Search by province and city, browse published menus and order directly on WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  adminWhatsapp: process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || "27000000000",
};

export const PROVINCES: Record<string, string[]> = {
  "Eastern Cape": ["East London", "Gqeberha", "Mthatha", "Jeffreys Bay", "Makhanda"],
  "Free State": ["Bloemfontein", "Welkom", "Bethlehem", "Parys"],
  Gauteng: ["Johannesburg", "Pretoria", "Sandton", "Randburg", "Roodepoort", "Centurion", "Midrand", "Benoni", "Vereeniging"],
  "KwaZulu-Natal": ["Durban", "Umhlanga", "Pietermaritzburg", "Ballito", "Richards Bay"],
  Limpopo: ["Polokwane", "Tzaneen", "Mokopane", "Bela-Bela"],
  Mpumalanga: ["Mbombela", "Emalahleni", "Middelburg", "Sabie"],
  "Northern Cape": ["Kimberley", "Upington", "Springbok"],
  "North West": ["Potchefstroom", "Rustenburg", "Klerksdorp", "Mahikeng", "Brits"],
  "Western Cape": ["Cape Town", "Stellenbosch", "Paarl", "George", "Knysna", "Hermanus", "Somerset West"],
};

export const CATEGORIES = [
  "Flower",
  "Pre-rolls",
  "Edibles",
  "CBD & Wellness",
  "Accessories",
  "Seeds & Clones",
  "Other",
];

export const PROVINCE_LIST = Object.keys(PROVINCES);
