export type AdminView =
  | "home"
  | "business"
  | "menu-links"
  | "hero-slides"
  | "trust"
  | "products"
  | "price-menu"
  | "story"
  | "reviews"
  | "footer";

export type NavItem = {
  id: AdminView;
  icon: string;
  label: string;
  description: string;
  group: "content" | "settings";
};

export const ADMIN_NAV: NavItem[] = [
  {
    id: "hero-slides",
    icon: "🖼️",
    label: "Homepage Slides",
    description: "Big banners at the top of your homepage",
    group: "content",
  },
  {
    id: "products",
    icon: "🫙",
    label: "Pickle Products",
    description: "Add pickles, photos and prices",
    group: "content",
  },
  {
    id: "price-menu",
    icon: "📋",
    label: "Price Menu",
    description: "Menu section headings and food pairings",
    group: "content",
  },
  {
    id: "story",
    icon: "📖",
    label: "Our Story",
    description: "Tell customers about your brand",
    group: "content",
  },
  {
    id: "reviews",
    icon: "⭐",
    label: "Customer Reviews",
    description: "What happy customers are saying",
    group: "content",
  },
  {
    id: "trust",
    icon: "✅",
    label: "Why Trust Us",
    description: "Badges like 100% Natural, Halal, etc.",
    group: "content",
  },
  {
    id: "business",
    icon: "🏪",
    label: "Business Info",
    description: "Phone, WhatsApp, logo and location",
    group: "settings",
  },
  {
    id: "menu-links",
    icon: "🔗",
    label: "Top Menu Links",
    description: "Navigation bar at the top of the site",
    group: "settings",
  },
  {
    id: "footer",
    icon: "👣",
    label: "Footer",
    description: "Bottom section text and social links",
    group: "settings",
  },
];

export const TINT_OPTIONS = [
  { value: "mango", label: "Warm Yellow", color: "#fff6e8" },
  { value: "gongura", label: "Fresh Green", color: "#f2f7ea" },
  { value: "terracotta", label: "Spice Orange", color: "#f7e8e3" },
  { value: "olive", label: "Olive Green", color: "#eef3e6" },
] as const;

export function getLinkOptions(whatsapp: string) {
  return [
    { label: "Products section", value: "#collection" },
    { label: "Price menu section", value: "#menu" },
    { label: "Our story section", value: "#story" },
    { label: "Reviews section", value: "#testimonials" },
    { label: "Contact / footer", value: "#contact" },
    { label: "Top of page", value: "#top" },
    { label: "WhatsApp order chat", value: `https://wa.me/${whatsapp}` },
  ];
}
