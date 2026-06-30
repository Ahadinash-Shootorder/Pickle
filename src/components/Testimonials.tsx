import type { SiteContent } from "@/lib/types";

type Props = {
  section: SiteContent["testimonialsSection"];
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1 text-mustard">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < count ? "opacity-100" : "opacity-25"}`}
          fill="currentColor"
        >
          <path d="M10 1.5l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L10 14.9l-5.5 3.2 1.4-6.1L1.2 7.8l6.2-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : name.slice(0, 2);
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-terracotta to-maroon text-sm font-bold uppercase text-cream shadow-sm">
      {initials}
    </span>
  );
}

export default function Testimonials({ section }: Props) {
  return (
    <section
      id="testimonials"
      className="bg-spice-texture relative overflow-hidden bg-mango-light py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-dark">
          {section.eyebrow}
        </span>
        <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
          {section.title}
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {section.items.map((t) => (
            <figure
              key={t.id}
              className="relative overflow-hidden rounded-3xl border border-terracotta/10 bg-white p-7 text-left shadow-sm"
            >
              <span
                className="pointer-events-none absolute -right-2 -top-4 font-display text-8xl leading-none text-terracotta/10"
                aria-hidden
              >
                &ldquo;
              </span>

              <Stars count={t.rating} />

              <blockquote className="relative mt-4 text-sm leading-relaxed text-ink/80 sm:text-[15px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-olive/10 pt-5">
                <Initials name={t.name} />
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink/45">Verified customer</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
