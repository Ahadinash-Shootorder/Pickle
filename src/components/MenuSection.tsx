import type { Product, SiteContent } from "@/lib/types";

type Props = {
  menu: SiteContent["menu"];
  products: Product[];
};

export default function MenuSection({ menu, products }: Props) {
  const veg = products.filter((p) => p.category === "veg");
  const nonveg = products.filter((p) => p.category === "nonveg");

  const Row = ({ p, accent }: { p: Product; accent: string }) => (
    <div className="flex items-start justify-between gap-4 border-b border-olive/10 py-4 last:border-none">
      <div>
        <p className="font-display text-base font-semibold text-ink">{p.name}</p>
        <p className="text-xs text-ink/55">{p.tagline}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        {p.prices.map((pr) => (
          <span key={pr.weight} className="text-sm font-semibold" style={{ color: accent }}>
            ₹{pr.price}{" "}
            <span className="font-normal text-ink/45">({pr.weight})</span>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="menu" className="bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
            {menu.eyebrow}
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-maroon-dark sm:text-4xl">
            {menu.title}
          </h2>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-olive/10 bg-white shadow-[0_30px_60px_-30px_rgba(107,143,78,0.2)]">
          <div className="bg-mango-light px-6 py-5 text-center sm:px-10">
            <p className="font-display text-lg italic text-terracotta-dark">
              {menu.headerTagline}
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-2 p-6 sm:grid-cols-2 sm:p-10">
            <div>
              <h3 className="mb-2 inline-flex items-center gap-2 rounded-full bg-olive/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-olive-dark">
                Veg Pickles
              </h3>
              {veg.map((p) => (
                <Row key={p.id} p={p} accent="#51612f" />
              ))}
            </div>
            <div>
              <h3 className="mb-2 mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-terracotta-dark sm:mt-0">
                Non-Veg Pickles
              </h3>
              {nonveg.map((p) => (
                <Row key={p.id} p={p} accent="#b5462f" />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-olive/10 bg-cream-soft px-6 py-6 sm:px-10">
            <div className="flex flex-wrap gap-2">
              {menu.pairings.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-ink/70 ring-1 ring-olive/10"
                >
                  Perfect with {s}
                </span>
              ))}
            </div>
            <p className="font-display max-w-xs text-sm italic text-ink/60">
              &ldquo;{menu.footerQuote}&rdquo; 🙂
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
