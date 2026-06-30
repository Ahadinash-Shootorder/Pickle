import JarMarquee from "./JarMarquee";
import HeroCarousel from "./HeroCarousel";
import type { HeroBanner, Product } from "@/lib/types";

type Props = {
  heroBanners: HeroBanner[];
  heroTextile: string;
  products: Product[];
};

export default function Hero({ heroBanners, heroTextile, products }: Props) {
  return (
    <section id="top" className="relative overflow-hidden bg-mango-light pt-24">
      <HeroCarousel banners={heroBanners} heroTextile={heroTextile} />

      <div className="relative border-t border-terracotta/10 bg-cream-soft/80 py-4 backdrop-blur-sm">
        <JarMarquee products={products} />
      </div>
    </section>
  );
}
