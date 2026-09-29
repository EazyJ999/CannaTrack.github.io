"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, clearAdminCookie, isAdmin, setAdminCookie } from "@/lib/auth";
import { deleteStore, insertStore, updateStore } from "@/lib/db";
import { storeFieldsFromForm, text } from "@/lib/form";

export async function loginAction(f: FormData) {
  if (!checkPassword(text(f.get("password"), 200))) redirect("/admin?error=1");
  await setAdminCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin");
}

async function guard() {
  if (!(await isAdmin())) redirect("/admin");
}

export async function setStatusAction(f: FormData) {
  await guard();
  const status = text(f.get("status"), 20);
  if (!["approved", "rejected", "pending"].includes(status)) return;
  await updateStore(text(f.get("id"), 60), { status: status as "approved" | "rejected" | "pending" });
  revalidatePath("/"); revalidatePath("/admin");
}

export async function deleteStoreAction(f: FormData) {
  await guard();
  await deleteStore(text(f.get("id"), 60));
  revalidatePath("/"); revalidatePath("/admin");
}

export async function addStoreAction(f: FormData) {
  await guard();
  const fields = storeFieldsFromForm(f);
  if (!fields.name || !fields.province || !fields.city) return;
  await insertStore({ ...fields, status: "approved" });
  revalidatePath("/"); revalidatePath("/admin");
}
