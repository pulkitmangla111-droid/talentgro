'use client';

import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { careerPaths } from '@/lib/content';
import { ArrowRight, TrendingUp } from 'lucide-react';

export function CareerPathways() {
  return (
    <section id="pathways" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
            Career Pathways
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Map your sales career — step by step
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From your first SDR role to VP of Sales. See the skills, salary, and timeline
            for each stage — and let AI build your personalized path.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-amber to-brand/20 sm:left-1/2" />

          <div className="space-y-8">
            {careerPaths.map((path, i) => (
              <Reveal key={path.role} delay={i * 100}>
                <div
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand bg-background sm:left-1/2">
                    <span className="text-[10px] font-bold text-brand">{i + 1}</span>
                  </div>

                  {/* Card */}
                  <div className="ml-12 w-full sm:ml-0 sm:w-1/2 sm:px-8">
                    <div className="rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-brand/30 hover:shadow-float">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-lg font-bold">{path.role}</h3>
                        <span className="flex items-center gap-1 rounded-full bg-amber/10 px-2.5 py-1 text-xs font-semibold text-amber">
                          <TrendingUp className="h-3 w-3" />
                          {path.salary}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium text-muted-foreground">
                        {path.timeline}
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground">{path.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {path.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild>
            <a href="#assessment">
              Get your personalized career path
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
