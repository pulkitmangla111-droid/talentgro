'use client';

import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { learningJourney } from '@/lib/content';

export function LearningJourney() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-dots opacity-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
            Learning Journey
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            From day one to dream job
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A structured, AI-guided path that takes you from assessment to placement —
            with practice, projects, and mentorship at every step.
          </p>
        </Reveal>

        {/* Visual band with TalentGro image */}
        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-border/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://talentgrosalesschool.com/wp-content/uploads/2025/02/Image-17.webp"
              alt="Learning journey at TalentGro Sales School"
              className="h-48 w-full object-cover sm:h-64"
            />
          </div>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-5">
            {learningJourney.map((item, i) => (
              <Reveal key={item.step} delay={i * 120} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-float hover:border-brand/40">
                    <item.icon className="h-6 w-6 text-brand" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
