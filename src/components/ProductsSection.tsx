"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";

type Props = {
  eyebrow: string;
  title: string;
  products: Product[];
};

export default function ProductsSection({ eyebrow, title, products }: Props) {
  const [tab, setTab] = useState<"nonveg" | "veg">("nonveg");
  const items = products.filter((p) => p.category === tab);

  return (
    <section id="collection" className="bg-gongura-light py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-olive-dark">
            {eyebrow}
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-olive/15 bg-white/80 p-1.5 shadow-sm">
            <button
              onClick={() => setTab("nonveg")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                tab === "nonveg"
                  ? "bg-terracotta text-cream shadow"
                  : "text-ink/55 hover:text-ink"
              }`}
            >
              Non-Veg Pickles
            </button>
            <button
              onClick={() => setTab("veg")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                tab === "veg"
                  ? "bg-olive text-cream shadow"
                  : "text-ink/55 hover:text-ink"
              }`}
            >
              Veg Pickles
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-3xl border border-olive/10 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-soft">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm italic text-terracotta-dark">
                      {p.tagline}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
                      p.category === "veg"
                        ? "bg-olive-light text-olive-dark"
                        : "bg-terracotta-light/50 text-terracotta-dark"
                    }`}
                  >
                    {p.category === "veg" ? "Veg" : "Non-Veg"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.prices.map((pr) => (
                    <span
                      key={pr.weight}
                      className="rounded-full bg-cream-soft px-3 py-1.5 text-xs font-semibold text-ink/80 ring-1 ring-olive/10"
                    >
                      {pr.weight} · ₹{pr.price}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
