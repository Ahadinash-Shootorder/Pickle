"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { NavLink } from "@/lib/types";

type Props = {
  links: NavLink[];
  logo: string;
  whatsapp: string;
  whatsappLabel: string;
};

export default function Navbar({ links, logo, whatsapp, whatsappLabel }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || open
          ? "bg-cream/95 shadow-[0_2px_18px_rgba(61,50,41,0.08)] backdrop-blur"
          : "bg-cream/70 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" className="block shrink-0 py-0.5">
          {logo ? (
            <Image
              src={logo}
              alt="The Pachadi Project"
              width={480}
              height={160}
              priority
              className="h-16 w-auto max-w-[200px] object-contain object-left sm:h-20 sm:max-w-[280px]"
            />
          ) : (
            <span className="font-display text-xl font-semibold text-maroon">
              The Pachadi Project
            </span>
          )}
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/75 transition-colors hover:text-terracotta"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-olive px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-olive-dark"
          >
            {whatsappLabel}
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-terracotta/20 text-terracotta lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-terracotta/10 bg-cream px-5 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink/85 hover:bg-cream-soft"
              >
                {l.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-full bg-olive px-5 py-3 text-center text-sm font-semibold text-cream"
            >
              {whatsappLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
