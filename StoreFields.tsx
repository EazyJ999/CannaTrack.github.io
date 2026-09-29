import { PROVINCE_LIST } from "@/lib/site";
import type { Store } from "@/lib/types";

export default function StoreFields({ s }: { s?: Partial<Store> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2"><label className="label">Store name *</label><input required name="name" className="input" defaultValue={s?.name} /></div>
      <div className="sm:col-span-2"><label className="label">Tagline</label><input name="tagline" className="input" defaultValue={s?.tagline} maxLength={120} /></div>
      <div className="sm:col-span-2"><label className="label">About</label><textarea name="description" rows={4} className="input" defaultValue={s?.description} /></div>
      <div><label className="label">Province *</label>
        <select required name="province" className="input" defaultValue={s?.province || ""}>
          <option value="" disabled>Select</option>
          {PROVINCE_LIST.map((p) => <option key={p}>{p}</option>)}
        </select></div>
      <div><label className="label">City / town *</label><input required name="city" className="input" defaultValue={s?.city} /></div>
      <div><label className="label">Suburb</label><input name="suburb" className="input" defaultValue={s?.suburb} /></div>
      <div><label className="label">Street address</label><input name="address" className="input" defaultValue={s?.address} /></div>
      <div><label className="label">Latitude (optional)</label><input name="lat" inputMode="decimal" className="input" defaultValue={s?.lat ?? ""} placeholder="-33.9249" /></div>
      <div><label className="label">Longitude (optional)</label><input name="lng" inputMode="decimal" className="input" defaultValue={s?.lng ?? ""} placeholder="18.4241" /></div>
      <div><label className="label">Phone</label><input name="phone" className="input" defaultValue={s?.phone} /></div>
      <div><label className="label">WhatsApp number *</label><input required name="whatsapp" className="input" defaultValue={s?.whatsapp} placeholder="082 123 4567" /></div>
      <div><label className="label">Email</label><input name="email" type="email" className="input" defaultValue={s?.email} /></div>
      <div><label className="label">Website</label><input name="website" className="input" defaultValue={s?.website} placeholder="https://" /></div>
      <div><label className="label">Instagram</label><input name="instagram" className="input" defaultValue={s?.instagram} placeholder="@yourstore" /></div>
      <div className="sm:col-span-2"><label className="label">Opening hours</label><textarea name="hours" rows={3} className="input" defaultValue={s?.hours} placeholder={"Mon-Fri 09:00-18:00\nSat 09:00-14:00"} /></div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="collection" defaultChecked={s?.collection ?? true} className="accent-[#7fb069]" /> Collection</label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="delivery" defaultChecked={s?.delivery ?? false} className="accent-[#7fb069]" /> Delivery</label>
    </div>
  );
}
