export type NavLink = { href: string; label: string };

export type HeroBanner = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  tint: "mango" | "gongura" | "terracotta" | "olive";
};

export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: "veg" | "nonveg";
  image: string;
  prices: { weight: string; price: number }[];
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  rating: number;
};

export type SiteContent = {
  site: {
    title: string;
    description: string;
    phone: string;
    whatsapp: string;
    location: string;
    email: string;
  };
  branding: {
    logo: string;
    heroTextile: string;
  };
  navbar: {
    links: NavLink[];
    whatsappLabel: string;
  };
  heroBanners: HeroBanner[];
  trustStrip: {
    tagline: string;
    points: string[];
  };
  productsSection: {
    eyebrow: string;
    title: string;
  };
  products: Product[];
  menu: {
    eyebrow: string;
    title: string;
    headerTagline: string;
    pairings: string[];
    footerQuote: string;
  };
  ourStory: {
    eyebrow: string;
    title: string;
    contentHtml: string;
    images: [string, string];
  };
  testimonialsSection: {
    eyebrow: string;
    title: string;
    items: Testimonial[];
  };
  footer: {
    description: string;
    contactTitle: string;
    whatsappButtonLabel: string;
    facebookUrl: string;
    instagramUrl: string;
  };
};
