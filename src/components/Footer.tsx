import Image from "next/image";
import type { SiteContent } from "@/lib/types";

type Props = {
  site: SiteContent["site"];
  footer: SiteContent["footer"];
  logo: string;
};

export default function Footer({ site, footer, logo }: Props) {
  const phoneDisplay = site.phone.replace(/(\d{5})(\d{5})/, "$1 $2");

  return (
    <footer id="contact" className="bg-cream-soft pt-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-8 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="flex items-center gap-2.5">
            {logo ? (
              <span className="relative block h-11 w-[160px] shrink-0">
                <Image
                  src={logo}
                  alt="The Pachadi Project"
                  fill
                  className="object-contain object-left"
                  sizes="160px"
                />
              </span>
            ) : (
              <span className="font-display text-2xl font-semibold text-maroon">
                The Pachadi Project
              </span>
            )}
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
            {footer.description}
          </p>

          <div className="mt-6 flex gap-3">
            {footer.facebookUrl && (
              <a
                href={footer.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/10 text-terracotta transition-colors hover:bg-terracotta hover:text-cream"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.8V12H8v3h2v6h3v-6h2.4l.6-3H13v-1.8c0-.66.34-1.2 1.5-1.2Z" />
                </svg>
              </a>
            )}
            {footer.instagramUrl && (
              <a
                href={footer.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/10 text-terracotta transition-colors hover:bg-terracotta hover:text-cream"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm4 3.2A4.8 4.8 0 1 1 7.2 13 4.8 4.8 0 0 1 12 8.2Zm0 2A2.8 2.8 0 1 0 14.8 13 2.8 2.8 0 0 0 12 10.2ZM17.3 6.7a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-olive/15 bg-white p-8 shadow-sm sm:p-10">
          <h3 className="font-display text-2xl font-semibold text-ink">
            {footer.contactTitle}
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-ink/75">
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-olive-light text-olive-dark">
                📞
              </span>
              <a href={`tel:+91${site.phone}`} className="hover:text-terracotta">
                +91 {phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-olive-light text-olive-dark">
                📍
              </span>
              {site.location}
            </li>
            {site.email && (
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-olive-light text-olive-dark">
                  ✉️
                </span>
                <a href={`mailto:${site.email}`} className="hover:text-terracotta">
                  {site.email}
                </a>
              </li>
            )}
          </ul>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block w-full rounded-full bg-olive px-6 py-3.5 text-center text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5 hover:bg-olive-dark"
          >
            {footer.whatsappButtonLabel}
          </a>
        </div>
      </div>

      <div className="border-t border-terracotta/10 py-6 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} The Pachadi Project. All rights reserved.
      </div>
    </footer>
  );
}
