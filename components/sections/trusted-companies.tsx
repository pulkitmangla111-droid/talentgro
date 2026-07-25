'use client';

import { trustedCompanies } from '@/lib/content';

export function TrustedCompanies() {
  const doubled = [...trustedCompanies, ...trustedCompanies];

  return (
    <section className="border-y border-border/40 bg-muted/20 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Our graduates work at 200+ leading companies
        </p>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-12">
            {doubled.map((company, i) => (
              <span
                key={`${company}-${i}`}
                className="font-display text-xl font-bold text-muted-foreground/50 transition-colors hover:text-foreground"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
