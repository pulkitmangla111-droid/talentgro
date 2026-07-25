'use client';

import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { webinars } from '@/lib/content';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export function Webinars() {
  return (
    <section id="webinars" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
              Webinars
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Upcoming live sessions
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Join free live webinars with sales leaders. Get your questions answered in real time.
            </p>
          </Reveal>
          <Button variant="outline" asChild>
            <a href="#all-webinars">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {webinars.map((webinar, i) => (
            <Reveal key={webinar.title} delay={i * 100}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-brand/30 hover:shadow-float">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={webinar.image}
                    alt={webinar.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-semibold text-white">
                      Live
                    </span>
                    <span className="flex items-center gap-1 rounded-full glass px-2.5 py-1 text-[10px] font-medium">
                      <Calendar className="h-3 w-3" />
                      {webinar.date}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold leading-tight">
                    {webinar.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {webinar.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {webinar.time}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    with <span className="font-semibold text-foreground">{webinar.speaker}</span>
                  </p>
                  <Button variant="ghost" size="sm" className="mt-3 -ml-3 text-brand">
                    Register free
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
