'use client';

import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { freeResources } from '@/lib/content';
import { Download, ArrowRight } from 'lucide-react';

export function FreeResources() {
  return (
    <section id="resources" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-dots opacity-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-amber/20 bg-amber/5 text-amber">
            Free Resources
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Start learning for free
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Download templates, playbooks, and guides used by 12,000+ sales professionals.
            No signup required.
          </p>
        </Reveal>

        {/* Banner image */}
        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-border/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://talentgrosalesschool.com/wp-content/uploads/2025/02/zen_54oM63WSlS.png"
              alt="Free sales resources"
              className="h-40 w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {freeResources.map((resource, i) => (
            <Reveal key={resource.title} delay={(i % 3) * 80}>
              <div className="group flex items-center justify-between rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-amber/30 hover:shadow-card">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber/10 text-amber transition-all duration-300 group-hover:bg-amber group-hover:text-white">
                    <resource.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{resource.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {resource.type} · {resource.count}
                    </p>
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 transition-all group-hover:border-amber/30 group-hover:bg-amber/5">
                  <Download className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-amber" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Button size="lg" variant="outline" asChild>
            <a href="#all-resources">
              Browse all free resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
