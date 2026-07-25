'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Reveal } from '@/components/reveal';
import { ArrowRight, Check, Clock, Layers } from 'lucide-react';
import { programs } from '@/lib/content';
import { cn } from '@/lib/utils';

const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  brand: {
    bg: 'bg-brand/10',
    text: 'text-brand',
    border: 'group-hover:border-brand/40',
    gradient: 'from-brand/10 to-transparent',
  },
  amber: {
    bg: 'bg-amber/10',
    text: 'text-amber',
    border: 'group-hover:border-amber/40',
    gradient: 'from-amber/10 to-transparent',
  },
};

export function Programs() {
  return (
    <section id="programs" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
            Programs
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your path to sales mastery
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every program blends expert-led training, AI-powered practice, live projects,
            and placement support — designed for real career outcomes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => {
            const c = colorMap[program.color] || colorMap.brand;
            return (
              <Reveal key={program.title} delay={i * 80}>
                <Link href={`/programs/${program.slug}`} className="block h-full">
                  <Card
                    className={cn(
                      'group relative h-full overflow-hidden border-border/60 transition-all duration-300 hover:shadow-float',
                      c.border
                    )}
                  >
                    <div
                      className={cn(
                        'absolute inset-x-0 top-0 h-32 bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                        c.gradient
                      )}
                    />
                    <CardHeader className="relative">
                      <div className="flex items-start justify-between">
                        <div
                          className={cn(
                            'flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
                            c.bg,
                            c.text
                          )}
                        >
                          <program.icon className="h-5 w-5" />
                        </div>
                        {program.popular && (
                          <Badge className="bg-amber/15 text-amber hover:bg-amber/20">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className={cn('text-xs font-medium', c.text)}>{program.tagline}</p>
                      <h3 className="font-display text-xl font-bold leading-tight">
                        {program.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{program.description}</p>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {program.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Layers className="h-3.5 w-3.5" />
                          {program.level}
                        </span>
                      </div>

                      <ul className="mt-4 space-y-1.5">
                        {program.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-center gap-2 text-sm">
                            <Check className={cn('h-4 w-4 shrink-0', c.text)} />
                            {outcome}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {program.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <span
                        className={cn(
                          'mt-4 flex items-center gap-1 text-sm font-medium',
                          c.text
                        )}
                      >
                        Explore curriculum
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
