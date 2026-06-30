import Image from "next/image";
import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
};

export default function JarMarquee({ products }: Props) {
  const track = [...products, ...products];

  return (
    <div className="group relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream-soft to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream-soft to-transparent sm:w-28" />

      <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused] sm:gap-10">
        {track.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="flex w-32 shrink-0 flex-col items-center gap-3 sm:w-40"
          >
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-terracotta/10 sm:h-36 sm:w-36">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              )}
            </div>
            <span className="text-center text-xs font-semibold tracking-wide text-ink/80 sm:text-sm">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
