# The Pachadi Project — Pickle Website

A responsive Next.js (App Router) + TypeScript + Tailwind CSS website for a
homemade pickle ("pachadi") brand, inspired by thepachadiproject.com.

## Features

- Fully responsive (mobile to desktop)
- Hero banner with an auto-scrolling, right-to-left infinite jar carousel
  (pauses on hover, respects prefers-reduced-motion)
- Custom illustrated SVG pickle-jar artwork (no external image dependencies,
  so the site works immediately, offline, with zero broken links)
- Veg / Non-Veg product collection with tabs
- "Our Menu" price list, "Our Story", Testimonials, and Footer with WhatsApp
  click-to-chat + contact details
- Warm, spice-shop colour palette (terracotta, maroon, mustard, olive, cream)

## Getting started

    npm install
    npm run dev

Open http://localhost:3000

## Build for production

    npm run build
    npm run start

## Project structure

    src/
      app/
        layout.tsx        Root layout + metadata
        page.tsx          Assembles all sections
        globals.css       Theme tokens (colors, fonts, marquee animation)
      components/
        Navbar.tsx
        Hero.tsx
        JarMarquee.tsx     The auto-scroll RTL carousel
        PickleJar.tsx      Reusable illustrated jar SVG
        TrustStrip.tsx
        ProductsSection.tsx  Veg/Non-veg tabbed product cards
        MenuSection.tsx   Price list
        OurStory.tsx
        Testimonials.tsx
        Footer.tsx
        WhatsAppFloat.tsx
      data/
        products.ts        All product, pricing, trust-point & testimonial data

## Customizing

- Products & prices: edit src/data/products.ts
- Colors: edit the CSS variables at the top of src/app/globals.css
- WhatsApp number / phone / contact: update in Navbar.tsx, Hero.tsx,
  Footer.tsx, and WhatsAppFloat.tsx (search for 919701973064)
- Real product photography: swap the <PickleJar /> components for
  next/image once you have real photos; the illustrated jars are designed
  as a drop-in placeholder/brand motif.
