'use client';

import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { trainers } from '@/lib/content';

export function TrainerShowcase() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
            Trainers
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Learn from sales leaders who&apos;ve been there
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our trainers have led sales teams at Salesforce, Freshworks, Razorpay, and Postman.
            They bring real-world playbooks, not just theory.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer, i) => (
            <Reveal key={trainer.name} delay={i * 80}>
              <div className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-brand/30 hover:shadow-float">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={trainer.avatar}
                    alt={trainer.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-display text-base font-bold text-foreground">
                      {trainer.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{trainer.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      Expertise
                    </p>
                    <p className="text-xs font-semibold text-brand">{trainer.expertise}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      Experience
                    </p>
                    <p className="text-xs font-semibold">{trainer.experience}</p>
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
