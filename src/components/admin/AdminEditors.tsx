"use client";

import { useState } from "react";
import type { HeroBanner, Product, SiteContent, Testimonial } from "@/lib/types";
import ImageUpload from "./ImageUpload";
import RichTextEditor from "./RichTextEditor";
import { getLinkOptions } from "./nav";
import {
  AddRowButton,
  Card,
  CollectionLayout,
  EntryButton,
  Field,
  Input,
  LinkPicker,
  PageHeader,
  RemoveButton,
  Select,
  StarRating,
  Textarea,
} from "./ui";

type UpdateFn = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;

type Props = {
  view: string;
  content: SiteContent;
  update: UpdateFn;
};

export default function AdminEditors({ view, content, update }: Props) {
  const linkOptions = getLinkOptions(content.site.whatsapp);

  if (view === "business") return <BusinessEditor content={content} update={update} />;
  if (view === "menu-links") return <MenuLinksEditor content={content} update={update} linkOptions={linkOptions} />;
  if (view === "hero-slides") return <HeroSlidesEditor content={content} update={update} linkOptions={linkOptions} />;
  if (view === "trust") return <TrustEditor content={content} update={update} />;
  if (view === "products") return <ProductsEditor content={content} update={update} />;
  if (view === "price-menu") return <PriceMenuEditor content={content} update={update} />;
  if (view === "story") return <StoryEditor content={content} update={update} />;
  if (view === "reviews") return <ReviewsEditor content={content} update={update} />;
  if (view === "footer") return <FooterEditor content={content} update={update} />;

  return null;
}

function BusinessEditor({ content, update }: { content: SiteContent; update: UpdateFn }) {
  return (
    <>
      <PageHeader
        title="Business Info"
        description="Your contact details and logo — shown across the whole website."
      />
      <Card title="Contact details">
        <div style={{ display: "grid", gap: "0", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", columnGap: "1rem" }}>
          <Field label="Phone number" hint="Shown in footer — e.g. 9701973064">
            <Input
              value={content.site.phone}
              onChange={(e) => update("site", { ...content.site, phone: e.target.value })}
            />
          </Field>
          <Field label="WhatsApp number" hint="Country code + number, no + sign — e.g. 919701973064">
            <Input
              value={content.site.whatsapp}
              onChange={(e) => update("site", { ...content.site, whatsapp: e.target.value })}
            />
          </Field>
        </div>
        <Field label="City / location">
          <Input
            value={content.site.location}
            onChange={(e) => update("site", { ...content.site, location: e.target.value })}
          />
        </Field>
        <Field label="Email (optional)">
          <Input
            type="email"
            value={content.site.email}
            onChange={(e) => update("site", { ...content.site, email: e.target.value })}
          />
        </Field>
      </Card>
      <Card title="Google search info" description="Helps people find your site on Google">
        <Field label="Website title">
          <Input
            value={content.site.title}
            onChange={(e) => update("site", { ...content.site, title: e.target.value })}
          />
        </Field>
        <Field label="Short description" hint="A sentence about your pickles">
          <Textarea
            rows={3}
            value={content.site.description}
            onChange={(e) => update("site", { ...content.site, description: e.target.value })}
          />
        </Field>
      </Card>
      <Card title="Photos">
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <ImageUpload
            label="Your logo"
            hint="Shown in the top navigation bar"
            value={content.branding.logo}
            onChange={(path) => update("branding", { ...content.branding, logo: path })}
            aspect="wide"
          />
          <ImageUpload
            label="Homepage background pattern"
            hint="Subtle texture behind homepage slides"
            value={content.branding.heroTextile}
            onChange={(path) => update("branding", { ...content.branding, heroTextile: path })}
            aspect="wide"
          />
        </div>
      </Card>
    </>
  );
}

function MenuLinksEditor({
  content,
  update,
  linkOptions,
}: {
  content: SiteContent;
  update: UpdateFn;
  linkOptions: { label: string; value: string }[];
}) {
  return (
    <>
      <PageHeader
        title="Top Menu Links"
        description="The links visitors see in the navigation bar at the top."
      />
      <Card>
        <Field label="Green WhatsApp button text">
          <Input
            value={content.navbar.whatsappLabel}
            onChange={(e) =>
              update("navbar", { ...content.navbar, whatsappLabel: e.target.value })
            }
          />
        </Field>
        <p style={{ fontWeight: 600, fontSize: "0.875rem", margin: "1.5rem 0 0.75rem" }}>Menu links</p>
        {content.navbar.links.map((link, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gap: "0.75rem",
              gridTemplateColumns: "1fr 1fr auto",
              alignItems: "end",
              marginBottom: "0.75rem",
            }}
          >
            <Field label={i === 0 ? "Link name" : ""}>
              <Input
                placeholder="e.g. Our Story"
                value={link.label}
                onChange={(e) => {
                  const links = [...content.navbar.links];
                  links[i] = { ...links[i], label: e.target.value };
                  update("navbar", { ...content.navbar, links });
                }}
              />
            </Field>
            <LinkPicker
              label={i === 0 ? "Goes to" : ""}
              value={link.href}
              onChange={(href) => {
                const links = [...content.navbar.links];
                links[i] = { ...links[i], href };
                update("navbar", { ...content.navbar, links });
              }}
              options={linkOptions}
            />
            <RemoveButton
              label="✕"
              onClick={() => {
                update("navbar", {
                  ...content.navbar,
                  links: content.navbar.links.filter((_, idx) => idx !== i),
                });
              }}
            />
          </div>
        ))}
        <AddRowButton
          label="Add menu link"
          onClick={() =>
            update("navbar", {
              ...content.navbar,
              links: [...content.navbar.links, { href: "#collection", label: "New link" }],
            })
          }
        />
      </Card>
    </>
  );
}

function HeroSlidesEditor({
  content,
  update,
  linkOptions,
}: {
  content: SiteContent;
  update: UpdateFn;
  linkOptions: { label: string; value: string }[];
}) {
  const [selected, setSelected] = useState(0);
  const banners = content.heroBanners;
  const banner = banners[selected];

  const setBanner = (b: HeroBanner) => {
    const heroBanners = [...banners];
    heroBanners[selected] = b;
    update("heroBanners", heroBanners);
  };

  return (
    <CollectionLayout
      title="Homepage Slides"
      count={banners.length}
      addLabel="New slide"
      onAdd={() => {
        const newBanner: HeroBanner = {
          id: `slide-${Date.now()}`,
          eyebrow: "New slide",
          title: "Your headline",
          titleAccent: "goes here",
          description: "Write a short description for this slide.",
          image: "",
          imageAlt: "Pickle photo",
          primaryCta: { label: "See products", href: "#collection" },
          secondaryCta: { label: "WhatsApp us", href: `https://wa.me/${content.site.whatsapp}` },
          tint: "mango",
        };
        update("heroBanners", [...banners, newBanner]);
        setSelected(banners.length);
      }}
      list={
        <>
          {banners.map((b, i) => (
            <EntryButton key={b.id} active={selected === i} onClick={() => setSelected(i)}>
              {b.title || `Slide ${i + 1}`}
            </EntryButton>
          ))}
        </>
      }
      editor={
        banner ? (
          <Card
            title={`Editing: ${banner.title || "Slide"}`}
            description="This is one rotating banner on your homepage"
          >
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
              <RemoveButton
                onClick={() => {
                  const next = banners.filter((_, i) => i !== selected);
                  update("heroBanners", next);
                  setSelected(Math.max(0, selected - 1));
                }}
              />
            </div>
            <ImageUpload
              label="Slide photo"
              hint="The big image on the right side of this slide"
              value={banner.image}
              onChange={(path) => setBanner({ ...banner, image: path })}
              aspect="tall"
            />
            <Field label="Small label above headline" hint='e.g. "Tradition in every jar"'>
              <Input value={banner.eyebrow} onChange={(e) => setBanner({ ...banner, eyebrow: e.target.value })} />
            </Field>
            <Field label="Main headline">
              <Input value={banner.title} onChange={(e) => setBanner({ ...banner, title: e.target.value })} />
            </Field>
            <Field label="Headline — coloured italic part">
              <Input value={banner.titleAccent} onChange={(e) => setBanner({ ...banner, titleAccent: e.target.value })} />
            </Field>
            <Field label="Description paragraph">
              <Textarea rows={3} value={banner.description} onChange={(e) => setBanner({ ...banner, description: e.target.value })} />
            </Field>
            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr", marginTop: "1rem" }}>
              <Field label="Main button text">
                <Input
                  value={banner.primaryCta.label}
                  onChange={(e) =>
                    setBanner({ ...banner, primaryCta: { ...banner.primaryCta, label: e.target.value } })
                  }
                />
              </Field>
              <LinkPicker
                label="Main button goes to"
                value={banner.primaryCta.href}
                onChange={(href) => setBanner({ ...banner, primaryCta: { ...banner.primaryCta, href } })}
                options={linkOptions}
              />
              <Field label="Second button text">
                <Input
                  value={banner.secondaryCta.label}
                  onChange={(e) =>
                    setBanner({ ...banner, secondaryCta: { ...banner.secondaryCta, label: e.target.value } })
                  }
                />
              </Field>
              <LinkPicker
                label="Second button goes to"
                value={banner.secondaryCta.href}
                onChange={(href) => setBanner({ ...banner, secondaryCta: { ...banner.secondaryCta, href } })}
                options={linkOptions}
              />
            </div>
          </Card>
        ) : (
          <Card title="No slides yet">Click &quot;+ New slide&quot; to add your first homepage banner.</Card>
        )
      }
    />
  );
}

function TrustEditor({ content, update }: { content: SiteContent; update: UpdateFn }) {
  return (
    <>
      <PageHeader
        title="Why Trust Us"
        description="The row of badges below the homepage — e.g. 100% Natural, Halal."
      />
      <Card>
        <Field label="Heading above badges">
          <Input
            value={content.trustStrip.tagline}
            onChange={(e) => update("trustStrip", { ...content.trustStrip, tagline: e.target.value })}
          />
        </Field>
        <p style={{ fontWeight: 600, margin: "1rem 0 0.75rem", fontSize: "0.875rem" }}>Badge labels</p>
        {content.trustStrip.points.map((point, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Input
              value={point}
              onChange={(e) => {
                const points = [...content.trustStrip.points];
                points[i] = e.target.value;
                update("trustStrip", { ...content.trustStrip, points });
              }}
            />
            <RemoveButton label="✕" onClick={() => update("trustStrip", { ...content.trustStrip, points: content.trustStrip.points.filter((_, idx) => idx !== i) })} />
          </div>
        ))}
        <AddRowButton
          label="Add badge"
          onClick={() =>
            update("trustStrip", {
              ...content.trustStrip,
              points: [...content.trustStrip.points, "New badge"],
            })
          }
        />
      </Card>
    </>
  );
}

function ProductsEditor({ content, update }: { content: SiteContent; update: UpdateFn }) {
  const [selected, setSelected] = useState(0);
  const products = content.products;
  const product = products[selected];

  const setProduct = (p: Product) => {
    const next = [...products];
    next[selected] = p;
    update("products", next);
  };

  return (
    <>
      <Card title="Products section heading">
        <Field label="Small label above title">
          <Input
            value={content.productsSection.eyebrow}
            onChange={(e) =>
              update("productsSection", { ...content.productsSection, eyebrow: e.target.value })
            }
          />
        </Field>
        <Field label="Section title">
          <Input
            value={content.productsSection.title}
            onChange={(e) =>
              update("productsSection", { ...content.productsSection, title: e.target.value })
            }
          />
        </Field>
      </Card>

      <CollectionLayout
        title="Your Pickles"
        count={products.length}
        addLabel="New product"
        onAdd={() => {
          const p: Product = {
            id: `product-${Date.now()}`,
            name: "New Pickle",
            tagline: "A short catchy line",
            category: "veg",
            image: "",
            prices: [{ weight: "250g", price: 199 }],
          };
          update("products", [...products, p]);
          setSelected(products.length);
        }}
        list={
          <>
            {products.map((p, i) => (
              <EntryButton key={p.id} active={selected === i} onClick={() => setSelected(i)}>
                {p.name}
              </EntryButton>
            ))}
          </>
        }
        editor={
          product ? (
            <Card title={product.name}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
                <RemoveButton
                  onClick={() => {
                    update("products", products.filter((_, i) => i !== selected));
                    setSelected(Math.max(0, selected - 1));
                  }}
                />
              </div>
              <ImageUpload
                label="Product photo"
                value={product.image}
                onChange={(path) => setProduct({ ...product, image: path })}
                aspect="tall"
              />
              <Field label="Product name">
                <Input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
              </Field>
              <Field label="Short tagline" hint='e.g. "Bold. Fiery. Irresistible."'>
                <Input value={product.tagline} onChange={(e) => setProduct({ ...product, tagline: e.target.value })} />
              </Field>
              <Field label="Type">
                <Select
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value as Product["category"] })}
                >
                  <option value="veg">Vegetarian 🥬</option>
                  <option value="nonveg">Non-Vegetarian 🍗</option>
                </Select>
              </Field>
              <p style={{ fontWeight: 600, margin: "1rem 0 0.5rem", fontSize: "0.875rem" }}>Prices</p>
              {product.prices.map((pr, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
                  <Input
                    placeholder="Size e.g. 250g"
                    value={pr.weight}
                    onChange={(e) => {
                      const prices = [...product.prices];
                      prices[i] = { ...prices[i], weight: e.target.value };
                      setProduct({ ...product, prices });
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="₹"
                    value={pr.price}
                    onChange={(e) => {
                      const prices = [...product.prices];
                      prices[i] = { ...prices[i], price: Number(e.target.value) };
                      setProduct({ ...product, prices });
                    }}
                    style={{ maxWidth: "120px" }}
                  />
                  <RemoveButton label="✕" onClick={() => setProduct({ ...product, prices: product.prices.filter((_, idx) => idx !== i) })} />
                </div>
              ))}
              <AddRowButton
                label="Add another size/price"
                onClick={() => setProduct({ ...product, prices: [...product.prices, { weight: "500g", price: 0 }] })}
              />
            </Card>
          ) : null
        }
      />
    </>
  );
}

function PriceMenuEditor({ content, update }: { content: SiteContent; update: UpdateFn }) {
  return (
    <>
      <PageHeader
        title="Price Menu"
        description="Headings for the menu section. Prices come automatically from your products."
      />
      <Card>
        <Field label="Small label">
          <Input value={content.menu.eyebrow} onChange={(e) => update("menu", { ...content.menu, eyebrow: e.target.value })} />
        </Field>
        <Field label="Section title">
          <Input value={content.menu.title} onChange={(e) => update("menu", { ...content.menu, title: e.target.value })} />
        </Field>
        <Field label="Quote inside the menu box">
          <Input value={content.menu.headerTagline} onChange={(e) => update("menu", { ...content.menu, headerTagline: e.target.value })} />
        </Field>
        <Field label="Fun quote at the bottom">
          <Input value={content.menu.footerQuote} onChange={(e) => update("menu", { ...content.menu, footerQuote: e.target.value })} />
        </Field>
        <p style={{ fontWeight: 600, margin: "1rem 0 0.5rem" }}>Goes well with…</p>
        {content.menu.pairings.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <Input
              value={item}
              onChange={(e) => {
                const pairings = [...content.menu.pairings];
                pairings[i] = e.target.value;
                update("menu", { ...content.menu, pairings });
              }}
            />
            <RemoveButton label="✕" onClick={() => update("menu", { ...content.menu, pairings: content.menu.pairings.filter((_, idx) => idx !== i) })} />
          </div>
        ))}
        <AddRowButton label="Add food pairing" onClick={() => update("menu", { ...content.menu, pairings: [...content.menu.pairings, "Rice"] })} />
      </Card>
    </>
  );
}

function StoryEditor({ content, update }: { content: SiteContent; update: UpdateFn }) {
  return (
    <>
      <PageHeader title="Our Story" description="Share how your pickle business started." />
      <Card>
        <Field label="Small label above title">
          <Input value={content.ourStory.eyebrow} onChange={(e) => update("ourStory", { ...content.ourStory, eyebrow: e.target.value })} />
        </Field>
        <Field label="Section title">
          <Input value={content.ourStory.title} onChange={(e) => update("ourStory", { ...content.ourStory, title: e.target.value })} />
        </Field>
        <RichTextEditor
          label="Your story"
          hint="Write freely — use Bold for important lines"
          value={content.ourStory.contentHtml}
          onChange={(html) => update("ourStory", { ...content.ourStory, contentHtml: html })}
        />
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: "1rem" }}>
          <ImageUpload
            label="Photo 1"
            value={content.ourStory.images[0]}
            onChange={(path) => {
              const images = [...content.ourStory.images] as [string, string];
              images[0] = path;
              update("ourStory", { ...content.ourStory, images });
            }}
            aspect="wide"
          />
          <ImageUpload
            label="Photo 2"
            value={content.ourStory.images[1]}
            onChange={(path) => {
              const images = [...content.ourStory.images] as [string, string];
              images[1] = path;
              update("ourStory", { ...content.ourStory, images });
            }}
            aspect="wide"
          />
        </div>
      </Card>
    </>
  );
}

function ReviewsEditor({ content, update }: { content: SiteContent; update: UpdateFn }) {
  const [selected, setSelected] = useState(0);
  const items = content.testimonialsSection.items;
  const item = items[selected];

  const setItem = (t: Testimonial) => {
    const next = [...items];
    next[selected] = t;
    update("testimonialsSection", { ...content.testimonialsSection, items: next });
  };

  return (
    <>
      <Card title="Reviews section heading">
        <Field label="Small label">
          <Input
            value={content.testimonialsSection.eyebrow}
            onChange={(e) =>
              update("testimonialsSection", { ...content.testimonialsSection, eyebrow: e.target.value })
            }
          />
        </Field>
        <Field label="Section title">
          <Input
            value={content.testimonialsSection.title}
            onChange={(e) =>
              update("testimonialsSection", { ...content.testimonialsSection, title: e.target.value })
            }
          />
        </Field>
      </Card>

      <CollectionLayout
        title="Customer Reviews"
        count={items.length}
        addLabel="New review"
        onAdd={() => {
          const t: Testimonial = { id: `t-${Date.now()}`, name: "Customer name", quote: "", rating: 5 };
          update("testimonialsSection", {
            ...content.testimonialsSection,
            items: [...items, t],
          });
          setSelected(items.length);
        }}
        list={
          <>
            {items.map((t, i) => (
              <EntryButton key={t.id} active={selected === i} onClick={() => setSelected(i)}>
                {t.name}
              </EntryButton>
            ))}
          </>
        }
        editor={
          item ? (
            <Card title={item.name}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
                <RemoveButton
                  onClick={() => {
                    update("testimonialsSection", {
                      ...content.testimonialsSection,
                      items: items.filter((_, i) => i !== selected),
                    });
                    setSelected(Math.max(0, selected - 1));
                  }}
                />
              </div>
              <Field label="Customer name">
                <Input value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
              </Field>
              <Field label="What they said">
                <Textarea rows={4} value={item.quote} onChange={(e) => setItem({ ...item, quote: e.target.value })} />
              </Field>
              <Field label="Star rating">
                <StarRating value={item.rating} onChange={(rating) => setItem({ ...item, rating })} />
              </Field>
            </Card>
          ) : null
        }
      />
    </>
  );
}

function FooterEditor({ content, update }: { content: SiteContent; update: UpdateFn }) {
  return (
    <>
      <PageHeader title="Footer" description="The bottom section of your website with contact info." />
      <Card>
        <Field label="About text">
          <Textarea
            rows={4}
            value={content.footer.description}
            onChange={(e) => update("footer", { ...content.footer, description: e.target.value })}
          />
        </Field>
        <Field label="Contact box title">
          <Input
            value={content.footer.contactTitle}
            onChange={(e) => update("footer", { ...content.footer, contactTitle: e.target.value })}
          />
        </Field>
        <Field label="WhatsApp button text">
          <Input
            value={content.footer.whatsappButtonLabel}
            onChange={(e) =>
              update("footer", { ...content.footer, whatsappButtonLabel: e.target.value })
            }
          />
        </Field>
        <Field label="Facebook page link (optional)" hint="Leave empty to hide the icon">
          <Input
            value={content.footer.facebookUrl}
            onChange={(e) => update("footer", { ...content.footer, facebookUrl: e.target.value })}
            placeholder="https://facebook.com/..."
          />
        </Field>
        <Field label="Instagram page link (optional)" hint="Leave empty to hide the icon">
          <Input
            value={content.footer.instagramUrl}
            onChange={(e) => update("footer", { ...content.footer, instagramUrl: e.target.value })}
            placeholder="https://instagram.com/..."
          />
        </Field>
      </Card>
    </>
  );
}
