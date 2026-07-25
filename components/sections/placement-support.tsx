'use client';

import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, FileText, Users, TrendingUp, Award, Target } from 'lucide-react';

const features = [
  { icon: Briefcase, title: '200+ Hiring Partners', description: 'Direct introductions to companies actively hiring sales talent.' },
  { icon: FileText, title: 'AI Resume Optimization', description: 'ATS-optimized resumes tailored to each job description.' },
  { icon: Users, title: '1-on-1 Mock Interviews', description: 'Practice with AI and human mentors before every interview.' },
  { icon: TrendingUp, title: 'Application Tracker', description: 'Track every application, interview, and offer in one portal.' },
  { icon: Award, title: 'Verified Certifications', description: 'Industry-recognized certificates linked to your skill scores.' },
  { icon: Target, title: 'Interview Status Portal', description: 'Real-time updates on your interview pipeline and offers.' },
];

export function PlacementSupport() {
  return (
    <section id="placements" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/5 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-amber/20 bg-amber/5 text-amber">
            Placement Support
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            We don&apos;t just train you. We get you hired.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            94% placement rate. Dedicated 1-on-1 support from resume to offer letter —
            with AI tools and a human placement team working together.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 80}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-amber/30 hover:shadow-float">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber/10 text-amber transition-all duration-300 group-hover:bg-amber group-hover:text-white group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/60 bg-gradient-to-r from-brand/5 to-amber/5 p-8 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-6">
            <div>
              <p className="font-display text-4xl font-bold text-gradient">94%</p>
              <p className="text-sm text-muted-foreground">Placement Rate</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="font-display text-4xl font-bold text-gradient">₹8.2L</p>
              <p className="text-sm text-muted-foreground">Avg. Starting CTC</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="font-display text-4xl font-bold text-gradient">45 days</p>
              <p className="text-sm text-muted-foreground">Avg. Time to Offer</p>
            </div>
          </div>
          <Button size="lg" className="bg-brand hover:bg-brand-dark sm:ml-8" asChild>
            <a href="#assessment">Start your placement journey</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
