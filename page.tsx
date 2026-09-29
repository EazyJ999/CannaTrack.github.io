import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { dbEnabled, listAllStores } from "@/lib/db";
import { SITE } from "@/lib/site";
import StoreFields from "@/components/StoreFields";
import { addStoreAction, deleteStoreAction, loginAction, logoutAction, setStatusAction } from "./actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Admin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const sp = await searchParams;

  if (!(await isAdmin())) {
    return (
      <form action={loginAction} className="mx-auto max-w-sm space-y-4">
        <h1 className="font-display text-3xl">Admin</h1>
        <input name="password" type="password" className="input" placeholder="Password" autoFocus />
        {sp.error && <p className="text-sm text-red-400">Wrong password.</p>}
        <button className="btn btn-primary w-full">Sign in</button>
      </form>
    );
  }

  const stores = await listAllStores();
  const groups: Record<string, typeof stores> = { pending: [], approved: [], rejected: [] };
  stores.forEach((s) => groups[s.status]?.push(s));

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Admin</h1>
        <form action={logoutAction}><button className="btn btn-ghost !py-1.5">Sign out</button></form>
      </div>
      {!dbEnabled && <p className="rounded-xl border border-amber p-4 text-sm text-amber">Database isn&apos;t connected, so you&apos;re seeing demo data and changes won&apos;t save. See the README.</p>}

      {(["pending", "approved", "rejected"] as const).map((status) => (
        <section key={status}>
          <h2 className="mb-3 font-display text-xl capitalize">{status} ({groups[status].length})</h2>
          <div className="space-y-3">
            {groups[status].map((s) => {
              const editUrl = `${SITE.url}/manage/${s.edit_token}`;
              const wa = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(`Hi! Your store ${s.name} is now live on ${SITE.name}. Manage your details and menu here (keep this link private): ${editUrl}`)}`;
              return (
                <div key={s.id} className="rounded-2xl border border-line bg-card p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-sm text-muted">{s.suburb ? `${s.suburb}, ` : ""}{s.city}, {s.province} · WhatsApp {s.whatsapp} {s.email && `· ${s.email}`}</p>
                      {s.edit_token && <p className="mt-1 break-all text-xs text-muted">Edit link: {editUrl}</p>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {status !== "approved" && <form action={setStatusAction}><input type="hidden" name="id" value={s.id} /><input type="hidden" name="status" value="approved" /><button className="btn btn-primary !py-1.5">Approve</button></form>}
                      {status !== "rejected" && <form action={setStatusAction}><input type="hidden" name="id" value={s.id} /><input type="hidden" name="status" value="rejected" /><button className="btn btn-ghost !py-1.5">Reject</button></form>}
                      {s.edit_token && <a className="btn btn-ghost !py-1.5" href={wa} target="_blank" rel="noopener noreferrer">Send edit link</a>}
                      {s.status === "approved" && <Link className="btn btn-ghost !py-1.5" href={`/store/${s.slug}`}>View</Link>}
                      <form action={deleteStoreAction}><input type="hidden" name="id" value={s.id} /><button className="btn btn-ghost !py-1.5 text-red-400">Delete</button></form>
                    </div>
                  </div>
                </div>
              );
            })}
            {groups[status].length === 0 && <p className="text-sm text-muted">None.</p>}
          </div>
        </section>
      ))}

      <section>
        <h2 className="mb-3 font-display text-xl">Add a store manually</h2>
        <form action={addStoreAction} className="space-y-4 rounded-2xl border border-line bg-card p-5">
          <StoreFields />
          <button className="btn btn-primary">Add and approve</button>
        </form>
      </section>
    </div>
  );
}
