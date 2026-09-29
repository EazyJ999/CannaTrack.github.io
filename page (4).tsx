import Locator from "@/components/Locator";
import { listApprovedStores } from "@/lib/db";
import { PROVINCES, SITE } from "@/lib/site";

export const revalidate = 60;

export default async function Home() {
  const stores = await listApprovedStores();
  return (
    <div>
      <section className="mb-10">
        <h1 className="font-display text-4xl leading-tight md:text-5xl">
          Every cannabis store in <span className="text-leaf">South Africa</span>, one place.
        </h1>
        <p className="mt-3 max-w-2xl text-muted">{SITE.description}</p>
      </section>
      <Locator stores={stores} provinces={PROVINCES} />
    </div>
  );
}
