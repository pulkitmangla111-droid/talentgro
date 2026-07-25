'use client';

import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { crmFeatures } from '@/lib/content';
import { Target } from 'lucide-react';

export function CRMSandbox() {
  return (
    <section id="crm-lab" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: mock CRM */}
          <Reveal>
            <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-float">
              {/* CRM header */}
              <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
                    <Target className="h-4 w-4" />
                  </div>
                  <span className="font-display text-sm font-bold">CRM Sandbox</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
                </div>
              </div>

              {/* Pipeline view */}
              <p className="mb-2 text-xs font-semibold text-muted-foreground">Sales Pipeline</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { stage: 'New', count: 3, color: 'bg-brand/15 text-brand' },
                  { stage: 'Qualified', count: 5, color: 'bg-amber/15 text-amber' },
                  { stage: 'Demo', count: 2, color: 'bg-amber/15 text-amber' },
                  { stage: 'Closed', count: 4, color: 'bg-brand/15 text-brand' },
                ].map((col) => (
                  <div key={col.stage} className="rounded-lg bg-muted/40 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-muted-foreground">
                        {col.stage}
                      </span>
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${col.color}`}>
                        {col.count}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {Array.from({ length: Math.min(col.count, 3) }).map((_, i) => (
                        <div
                          key={i}
                          className="rounded-md border border-border/60 bg-card p-1.5"
                        >
                          <div className="h-1.5 w-3/4 rounded-full bg-muted" />
                          <div className="mt-1 h-1 w-1/2 rounded-full bg-muted/60" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dashboard mini */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: 'Revenue', value: '₹42L' },
                  { label: 'Win Rate', value: '34%' },
                  { label: 'Activities', value: '128' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-muted/40 p-2.5 text-center">
                    <p className="font-display text-base font-bold text-gradient">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: content */}
          <Reveal delay={150}>
            <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
              CRM Sandbox
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Master real CRM tools before your first day
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Practice in a fully interactive CRM environment. Create leads, move deals
              through the pipeline, log activities, generate reports — all with AI guidance.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {crmFeatures.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 60}>
                  <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-brand/30 hover:shadow-card">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{feature.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
