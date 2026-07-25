'use client';

import * as React from 'react';
import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { testimonials } from '@/lib/content';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const [active, setActive] = React.useState(0);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-amber/20 bg-amber/5 text-amber">
            Testimonials
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by 12,000+ sales professionals
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From career switchers to enterprise reps — hear from the people who transformed
            their sales careers with TalentGro.
          </p>
        </Reveal>

        {/* Featured testimonial */}
        <Reveal className="mt-14">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border/60 bg-card p-8 shadow-float sm:p-10">
            <Quote className="h-8 w-8 text-brand/30" />
            <p className="mt-4 font-display text-lg font-medium leading-relaxed sm:text-xl">
              {testimonials[active].content}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <img
                src={testimonials[active].avatar}
                alt={testimonials[active].name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{testimonials[active].name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[active].role}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber text-amber" />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Selector dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                active === i ? 'w-8 bg-brand' : 'w-2 bg-border hover:bg-muted-foreground/40'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Grid of testimonials */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-brand/30 hover:shadow-card">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-amber text-amber" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {t.content}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-semibold">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
