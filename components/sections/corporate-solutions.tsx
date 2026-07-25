'use client';

import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';

const solutions = [
  { icon: Users, title: 'Team Upskilling', description: 'Enroll entire teams with custom learning paths tailored to your industry and sales motion.' },
  { icon: TrendingUp, title: 'Progress Analytics', description: 'Track every rep\'s progress, assessment scores, and skill gaps in a dedicated dashboard.' },
  { icon: Award, title: 'Team Certifications', description: 'Issue verifiable certifications to your team upon completion of training modules.' },
  { icon: Building2, title: 'Department Insights', description: 'Compare performance across departments and identify coaching opportunities.' },
];

export function CorporateSolutions() {
  return (
    <section id="corporate" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
              Enterprise
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Train your entire sales team with one platform
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Corporate HR and sales leaders use TalentGro to upskill teams at scale.
              Custom learning paths, real-time analytics, and 50% faster ramp times.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {solutions.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-brand/30 hover:shadow-card">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{s.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Button className="mt-6 bg-brand hover:bg-brand-dark" size="lg" asChild>
              <a href="#contact">
                Talk to our enterprise team
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </Reveal>

          {/* Dashboard mock */}
          <Reveal delay={150}>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-border/60 shadow-float">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://talentgrosalesschool.com/wp-content/uploads/2025/02/Image-19.webp"
                  alt="Corporate sales training"
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-float">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-display text-sm font-bold">Corporate Dashboard</p>
                  <p className="text-xs text-muted-foreground">Q2 2026 — Sales Team Overview</p>
                </div>
                <Badge className="bg-amber/15 text-amber">Active</Badge>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Reps Training', value: '48', change: '+12' },
                  { label: 'Avg. Score', value: '87%', change: '+5%' },
                  { label: 'Completion', value: '92%', change: '+8%' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="font-display text-xl font-bold text-gradient">{stat.value}</p>
                    <p className="text-[10px] font-medium text-amber">{stat.change} vs Q1</p>
                  </div>
                ))}
              </div>

              {/* Department breakdown */}
              <p className="mb-2 mt-5 text-xs font-semibold text-muted-foreground">
                Department Progress
              </p>
              <div className="space-y-2.5">
                {[
                  { dept: 'Inside Sales', progress: 88 },
                  { dept: 'Enterprise', progress: 72 },
                  { dept: 'Channel Sales', progress: 94 },
                  { dept: 'SDR Team', progress: 81 },
                ].map((row) => (
                  <div key={row.dept}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-medium">{row.dept}</span>
                      <span className="font-semibold text-muted-foreground">{row.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand to-amber transition-all duration-1000"
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
