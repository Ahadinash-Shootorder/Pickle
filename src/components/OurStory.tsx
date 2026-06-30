import Image from "next/image";
import type { SiteContent } from "@/lib/types";

type Props = {
  story: SiteContent["ourStory"];
};

export default function OurStory({ story }: Props) {
  const [imageOne, imageTwo] = story.images;

  return (
    <section id="story" className="bg-cream py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
            {story.eyebrow}
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            {story.title}
          </h2>

          <div
            className="story-content mt-6 text-[15px] leading-relaxed text-ink/75"
            dangerouslySetInnerHTML={{ __html: story.contentHtml }}
          />
        </div>

        <div className="flex w-full flex-col gap-4 sm:gap-5">
          {imageOne && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-olive/10 bg-white shadow-md ring-1 ring-olive/5 sm:rounded-[1.75rem]">
              <Image
                src={imageOne}
                alt="The Pachadi Project — our story"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          )}
          {imageTwo && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-terracotta/10 bg-white shadow-md ring-1 ring-terracotta/5 sm:rounded-[1.75rem]">
              <Image
                src={imageTwo}
                alt="The Pachadi Project — happy customers"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
