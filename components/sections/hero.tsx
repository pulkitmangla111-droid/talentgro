'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Play,
  Calendar,
  Sparkles,
  TrendingUp,
  Award,
  Bot,
  Phone,
  Star,
} from 'lucide-react';
import { heroStats } from '@/lib/content';

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [display, setDisplay] = React.useState('');
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
          if (isNaN(numeric)) {
            setDisplay(value);
          } else {
            const suffix = value.replace(/[0-9.]/g, '');
            let current = 0;
            const duration = 1200;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              current = numeric * eased;
              setDisplay(
                (Number.isInteger(numeric) ? Math.round(current) : current.toFixed(1)) + suffix
              );
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="flex flex-col items-center text-center" style={{ animationDelay: `${delay}ms` }}>
      <span ref={ref} className="font-display text-2xl font-bold text-gradient-brand sm:text-3xl">
        {display || '0'}
      </span>
      <span className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">{label}</span>
    </div>
  );
}

function SalaryCalculator() {
  const [experience, setExperience] = React.useState(2);
  const [role, setRole] = React.useState<'sdr' | 'ae' | 'enterprise'>('ae');

  const baseSalary = { sdr: 600000, ae: 1300000, enterprise: 2800000 };
  const multiplier = 1 + experience * 0.15;
  const estimated = Math.round((baseSalary[role] * multiplier) / 100000);

  return (
    <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10">
          <TrendingUp className="h-4 w-4 text-brand" />
        </div>
        <div>
          <p className="text-sm font-semibold">Salary Calculator</p>
          <p className="text-[11px] text-muted-foreground">Estimate your earning potential</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Target Role
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {([
              { key: 'sdr', label: 'SDR' },
              { key: 'ae', label: 'AE' },
              { key: 'enterprise', label: 'Enterprise' },
            ] as const).map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`rounded-lg px-2 py-1.5 text-xs font-medium transition-all ${
                  role === r.key
                    ? 'bg-brand text-white shadow-sm'
                    : 'bg-background text-muted-foreground hover:bg-muted'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">Experience</label>
            <span className="text-xs font-semibold text-brand">{experience} yrs</span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            value={experience}
            onChange={(e) => setExperience(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-brand"
          />
        </div>

        <div className="rounded-lg bg-brand/10 p-3">
          <p className="text-[11px] font-medium text-muted-foreground">Estimated CTC</p>
          <p className="font-display text-2xl font-bold text-gradient">
            ₹{estimated.toLocaleString('en-IN')} LPA
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 via-transparent to-transparent" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Left content */}
          <div className="lg:col-span-7">
            <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
              <Badge
                variant="outline"
                className="mb-5 gap-1.5 border-brand/20 bg-brand/5 px-3 py-1 text-brand"
              >
                <Sparkles className="h-3 w-3" />
                India&apos;s first AI-powered Sales Career OS
              </Badge>
            </div>

            <h1
              className="font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl animate-fade-up"
              style={{ animationDelay: '80ms' }}
            >
              Become an{' '}
              <span className="text-gradient">Industry-Ready</span>{' '}
              Sales Professional Using AI, Live Projects &amp; Real Business Simulations
            </h1>

            <p
              className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg animate-fade-up"
              style={{ animationDelay: '160ms' }}
            >
              Learn from experts. Practice with AI. Master CRM tools. Build confidence.
              Launch your sales career.
            </p>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up"
              style={{ animationDelay: '240ms' }}
            >
              <Button size="lg" className="bg-brand hover:bg-brand-dark group" asChild>
                <a href="#assessment">
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#counselling">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Career Counselling
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href="#demo">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div
              className="mt-10 grid grid-cols-4 gap-4 border-t border-border/60 pt-8 animate-fade-up"
              style={{ animationDelay: '320ms' }}
            >
              {heroStats.map((stat, i) => (
                <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 100} />
              ))}
            </div>
          </div>

          {/* Right visual — single self-contained card, no overlap */}
          <div className="lg:col-span-5">
            {/* TalentGro image banner */}
            <div
              className="mb-4 overflow-hidden rounded-2xl border border-border/60 shadow-float animate-fade-in"
              style={{ animationDelay: '350ms' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://talentgrosalesschool.com/wp-content/uploads/2025/02/Image-22.webp"
                alt="Sales training in action"
                className="h-44 w-full object-cover"
              />
            </div>
            <div
              className="rounded-3xl border border-border/60 bg-card p-6 shadow-float animate-fade-in"
              style={{ animationDelay: '400ms' }}
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">AI Sales Simulator</p>
                    <p className="text-[11px] text-muted-foreground">Live practice session</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                  Active
                </span>
              </div>

              {/* Scenario */}
              <div className="rounded-xl bg-muted/40 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  Scenario: Cold Call — SaaS Prospect
                </div>
                <p className="mt-2 text-sm text-foreground">
                  &ldquo;Hi, I&apos;m calling about your sales team&apos;s productivity...&rdquo;
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="rounded-md bg-brand/10 px-2 py-1 text-[10px] font-medium text-brand">
                    Confidence 88%
                  </span>
                  <span className="rounded-md bg-amber/15 px-2 py-1 text-[10px] font-medium text-amber">
                    Persuasion 85%
                  </span>
                </div>
              </div>

              {/* Score bars */}
              <div className="mt-4 space-y-2.5">
                {[
                  { label: 'Communication', val: 92 },
                  { label: 'Closing Ability', val: 79 },
                  { label: 'Empathy', val: 90 },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="mb-1 flex justify-between text-[11px]">
                      <span className="font-medium text-muted-foreground">{s.label}</span>
                      <span className="font-semibold text-foreground">{s.val}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-brand transition-all duration-1000"
                        style={{ width: `${s.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="my-4 h-px bg-border/60" />

              {/* Salary calculator inside the card */}
              <SalaryCalculator />

              {/* Bottom badges */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/30 p-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber" />
                  <div>
                    <p className="text-xs font-semibold">Certificate Earned</p>
                    <p className="text-[10px] text-muted-foreground">Sales Career Launchpad</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-7 w-7 rounded-full border-2 border-background bg-brand/60"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold">3 Job Offers</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="h-3 w-3 fill-amber text-amber" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
