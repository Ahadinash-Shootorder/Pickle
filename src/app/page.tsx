import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProductsSection from "@/components/ProductsSection";
import MenuSection from "@/components/MenuSection";
import OurStory from "@/components/OurStory";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = getContent();
  return {
    title: site.title,
    description: site.description,
  };
}

export default function Home() {
  const content = getContent();

  return (
    <main className="overflow-x-hidden">
      <Navbar
        links={content.navbar.links}
        logo={content.branding.logo}
        whatsapp={content.site.whatsapp}
        whatsappLabel={content.navbar.whatsappLabel}
      />
      <Hero
        heroBanners={content.heroBanners}
        heroTextile={content.branding.heroTextile}
        products={content.products}
      />
      <TrustStrip tagline={content.trustStrip.tagline} points={content.trustStrip.points} />
      <ProductsSection
        eyebrow={content.productsSection.eyebrow}
        title={content.productsSection.title}
        products={content.products}
      />
      <MenuSection menu={content.menu} products={content.products} />
      <OurStory story={content.ourStory} />
      <Testimonials section={content.testimonialsSection} />
      <Footer site={content.site} footer={content.footer} logo={content.branding.logo} />
      <WhatsAppFloat whatsapp={content.site.whatsapp} />
    </main>
  );
}
