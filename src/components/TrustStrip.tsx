type Props = {
  tagline: string;
  points: string[];
};

export default function TrustStrip({ tagline, points }: Props) {
  return (
    <section className="border-y border-olive/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
        <p className="mb-3 text-center font-display text-sm italic text-terracotta-dark sm:text-base">
          {tagline}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {points.map((label) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl bg-gongura-light px-3 py-4 text-center shadow-sm ring-1 ring-olive/10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-olive/10 text-olive">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-xs font-semibold leading-tight text-ink/80 sm:text-[13px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
