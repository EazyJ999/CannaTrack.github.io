"use client";
import { useActionState } from "react";
import { applyAction, type ApplyResult } from "@/app/list-your-store/actions";
import StoreFields from "./StoreFields";

export default function ApplyForm() {
  const [state, action, pending] = useActionState<ApplyResult | null, FormData>(applyAction, null);
  if (state?.ok) return <div className="rounded-2xl border border-leaf p-6 text-leaf">{state.message}</div>;
  return (
    <form action={action} className="space-y-6">
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <StoreFields />
      <label className="flex items-start gap-2 text-sm text-muted">
        <input type="checkbox" name="confirm" className="mt-1 accent-[#7fb069]" />
        I am authorised to list this business, I will only sell to adults (18+), and I will comply with all applicable South African law.
      </label>
      {state && !state.ok && <p className="text-sm text-red-400">{state.message}</p>}
      <button disabled={pending} className="btn btn-primary">{pending ? "Submitting..." : "Submit for review"}</button>
    </form>
  );
}
