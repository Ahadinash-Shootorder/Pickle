"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HeroBanner } from "@/lib/types";

const AUTOPLAY_MS = 4500;
const PAUSE_AFTER_MANUAL_MS = 8000;

type Props = {
  banners: HeroBanner[];
  heroTextile: string;
};

export default function HeroCarousel({ banners, heroTextile }: Props) {
  const [active, setActive] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const touchStartX = useRef(0);
  const manualPauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = banners.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total);
    },
    [total],
  );

  const pauseAutoplayBriefly = useCallback(() => {
    setAutoplayPaused(true);
    if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current);
    manualPauseTimer.current = setTimeout(() => {
      setAutoplayPaused(false);
    }, PAUSE_AFTER_MANUAL_MS);
  }, []);

  const next = useCallback(() => {
    setActive((current) => (current + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActive((current) => (current - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    return () => {
      if (manualPauseTimer.current) clearTimeout(manualPauseTimer.current);
    };
  }, []);

  useEffect(() => {
    if (autoplayPaused) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [next, autoplayPaused]);

  return (
    <div
      className="relative"
      aria-roledescription="carousel"
      aria-label="Hero banners"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 48) {
          pauseAutoplayBriefly();
          if (diff > 0) next();
          else prev();
        }
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <article
              key={banner.id}
              className="relative w-full shrink-0 bg-mango-light"
            >
              <div className="bg-spice-texture pointer-events-none absolute inset-0" />

              <Image
                src={heroTextile}
                alt=""
                fill
                priority={index === 0}
                className="pointer-events-none object-cover opacity-[0.12]"
                sizes="100vw"
              />

              <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-mustard/20 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-olive-light/35 blur-3xl" />

              <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-12 pt-8 sm:px-8 sm:pb-14 lg:grid-cols-2 lg:gap-10 lg:py-10">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/20 bg-white/65 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-dark backdrop-blur-sm">
                    {banner.eyebrow}
                  </span>

                  <h1 className="font-display mt-5 text-[2.4rem] leading-[1.05] font-semibold text-ink sm:text-5xl lg:text-[3.2rem]">
                    {banner.title}
                    <br />
                    <span className="italic text-terracotta">{banner.titleAccent}</span>
                  </h1>

                  <p className="mt-5 max-w-md text-base text-ink/75 sm:text-lg">
                    {banner.description}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                    <a
                      href={banner.primaryCta.href}
                      className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream shadow-md shadow-terracotta/20 transition-transform hover:-translate-y-0.5 hover:bg-terracotta-dark sm:px-7 sm:py-3.5"
                    >
                      {banner.primaryCta.label}
                    </a>
                    <a
                      href={banner.secondaryCta.href}
                      target={banner.secondaryCta.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        banner.secondaryCta.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="rounded-full border border-olive/30 bg-white/75 px-6 py-3 text-sm font-semibold text-olive-dark backdrop-blur-sm transition-colors hover:bg-gongura-light sm:px-7 sm:py-3.5"
                    >
                      {banner.secondaryCta.label}
                    </a>
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-terracotta/10 bg-white shadow-[0_24px_60px_-20px_rgba(196,92,62,0.22)] ring-1 ring-terracotta/5">
                    <Image
                      src={banner.image}
                      alt={banner.imageAlt}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(max-width: 1024px) 90vw, 480px"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          pauseAutoplayBriefly();
          prev();
        }}
        aria-label="Previous banner"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-terracotta/15 bg-white/85 text-terracotta shadow-sm backdrop-blur-sm transition-colors hover:bg-white sm:left-5 sm:h-11 sm:w-11"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => {
          pauseAutoplayBriefly();
          next();
        }}
        aria-label="Next banner"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-terracotta/15 bg-white/85 text-terracotta shadow-sm backdrop-blur-sm transition-colors hover:bg-white sm:right-5 sm:h-11 sm:w-11"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`Go to banner ${index + 1}`}
            onClick={() => {
              pauseAutoplayBriefly();
              goTo(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === active
                ? "w-7 bg-terracotta"
                : "w-2 bg-terracotta/30 hover:bg-terracotta/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
