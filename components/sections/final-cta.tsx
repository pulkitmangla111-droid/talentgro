'use client';

import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export function FinalCTA() {
  return (
    <section id="assessment" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-brand to-amber px-8 py-16 text-center shadow-glow sm:px-16 sm:py-20">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            </div>

            <div className="mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                <Sparkles className="h-3 w-3" />
                Start in 2 minutes — it&apos;s free
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to become an industry-ready sales professional?
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Take the free AI Career Assessment. Get your personalized learning roadmap,
                practice in the AI Sales Simulator, and start your journey today.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg" className="bg-white text-brand hover:bg-white/90 group" asChild>
                  <a href="#start">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  asChild
                >
                  <a href="#counselling">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Career Counselling
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-sm text-white/60">
                No credit card required · 94% placement rate · 200+ hiring partners
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
