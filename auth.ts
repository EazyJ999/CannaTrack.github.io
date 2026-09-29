import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "lf_admin";

function sign(v: string) {
  const secret = process.env.ADMIN_SECRET || "";
  return createHmac("sha256", secret).update(v).digest("hex");
}

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD || "";
  if (!pw || !process.env.ADMIN_SECRET) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(pw);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function setAdminCookie() {
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const v = `${exp}`;
  (await cookies()).set(COOKIE, `${v}.${sign(v)}`, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 12,
  });
}

export async function clearAdminCookie() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const c = (await cookies()).get(COOKIE)?.value;
  if (!c || !process.env.ADMIN_SECRET) return false;
  const [v, sig] = c.split(".");
  if (!v || !sig) return false;
  const expected = sign(v);
  if (sig.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  return Number(v) > Date.now();
}
