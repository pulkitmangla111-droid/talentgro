'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/lib/auth-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Reveal } from '@/components/reveal';
import {
  Clock,
  Play,
  FileText,
  HelpCircle,
  Code,
  Lock,
  Check,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Award,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration_weeks: number;
  level: string;
  icon_name: string;
  tagline: string;
  outcomes: string[];
  tech_stack: string[];
  is_popular: boolean;
  price: number;
}

interface Lesson {
  id: string;
  module_number: number;
  lesson_number: number;
  title: string;
  description: string;
  lesson_type: string;
  duration_minutes: number;
  is_preview: boolean;
}

const lessonTypeIcons: Record<string, any> = {
  video: Play,
  reading: FileText,
  quiz: HelpCircle,
  project: Code,
};

const moduleTitles = [
  'Foundations & Mindset',
  'Prospecting & Outreach',
  'CRM Mastery',
  'Closing & Objections',
  'AI Tools & Portfolio',
  'Career Launch',
];

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [program, setProgram] = React.useState<Program | null>(null);
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [enrolled, setEnrolled] = React.useState(false);
  const [enrollmentId, setEnrollmentId] = React.useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = React.useState<Set<string>>(new Set());
  const [loading, setLoading] = React.useState(true);
  const [enrolling, setEnrolling] = React.useState(false);

  React.useEffect(() => {
    const slug = params.slug as string;
    if (!slug) return;

    (async () => {
      const { data: prog } = await supabase
        .from('programs')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!prog) {
        setLoading(false);
        return;
      }

      setProgram(prog);

      const { data: lessonData } = await supabase
        .from('lessons')
        .select('*')
        .eq('program_id', prog.id)
        .order('module_number', { ascending: true })
        .order('lesson_number', { ascending: true });

      setLessons(lessonData || []);

      if (user) {
        const { data: enrollment } = await supabase
          .from('enrollments')
          .select('id, status')
          .eq('program_id', prog.id)
          .eq('user_id', user.id)
          .maybeSingle();

        if (enrollment) {
          setEnrolled(true);
          setEnrollmentId(enrollment.id);

          const { data: progress } = await supabase
            .from('lesson_progress')
            .select('lesson_key, status')
            .eq('enrollment_id', enrollment.id)
            .eq('status', 'completed');

          if (progress) {
            setCompletedLessons(new Set(progress.map((p: any) => p.lesson_key)));
          }
        }
      }

      setLoading(false);
    })();
  }, [params.slug, user]);

  const handleEnroll = async () => {
    if (!user) {
      router.push('/auth');
      return;
    }
    if (!program) return;

    setEnrolling(true);
    const { data, error } = await supabase
      .from('enrollments')
      .insert({ program_id: program.id, user_id: user.id })
      .select('id')
      .single();

    if (!error && data) {
      setEnrolled(true);
      setEnrollmentId(data.id);
    }
    setEnrolling(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center pt-16">
          <p className="text-muted-foreground">Loading program...</p>
        </div>
      </>
    );
  }

  if (!program) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-16">
          <p className="text-muted-foreground">Program not found.</p>
          <Button asChild>
            <a href="/#programs">Browse all programs</a>
          </Button>
        </div>
      </>
    );
  }

  // Group lessons by module
  const modules = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.module_number]) acc[lesson.module_number] = [];
    acc[lesson.module_number].push(lesson);
    return acc;
  }, {} as Record<number, Lesson[]>);

  const moduleNumbers = Object.keys(modules).map(Number).sort((a, b) => a - b);
  const totalLessons = lessons.length;
  const completedCount = completedLessons.size;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60 bg-muted/20 py-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-96 w-[700px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" size="sm" className="mb-6" asChild>
              <a href="/#programs">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                All programs
              </a>
            </Button>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3">
                  {program.is_popular && (
                    <Badge className="bg-amber/15 text-amber">Popular</Badge>
                  )}
                  <Badge variant="outline" className="border-brand/20 text-brand">
                    {program.level}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {program.duration_weeks} weeks
                  </span>
                </div>
                <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {program.title}
                </h1>
                <p className="mt-1 text-lg text-brand">{program.tagline}</p>
                <p className="mt-4 max-w-2xl text-muted-foreground">{program.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {program.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enroll card */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-border/60 shadow-float">
                  <CardContent className="p-6">
                    <p className="font-display text-3xl font-bold">
                      ₹{program.price.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-muted-foreground">One-time payment</p>

                    {enrolled ? (
                      <div className="mt-4 space-y-3">
                        <div className="rounded-xl bg-brand/10 p-4">
                          <div className="mb-2 flex justify-between text-sm">
                            <span className="font-medium text-muted-foreground">Your progress</span>
                            <span className="font-bold text-brand">{progressPct}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-brand transition-all duration-500"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {completedCount} of {totalLessons} lessons completed
                          </p>
                        </div>
                        <Button
                          className="w-full bg-brand hover:bg-brand-dark"
                          onClick={() =>
                            router.push(`/programs/${program.slug}/lessons/${lessons[0]?.id || ''}`)
                          }
                        >
                          Continue learning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="mt-4 w-full bg-brand hover:bg-brand-dark"
                        onClick={handleEnroll}
                        disabled={enrolling}
                      >
                        {enrolling
                          ? 'Enrolling...'
                          : user
                            ? 'Enroll now'
                            : 'Sign in to enroll'}
                        {!enrolling && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                    )}

                    <div className="mt-6 space-y-2.5 border-t border-border/60 pt-4">
                      {[
                        { icon: TrendingUp, label: `${totalLessons} lessons` },
                        { icon: Award, label: 'Certificate on completion' },
                        { icon: Users, label: 'AI Sales Simulator access' },
                        { icon: Clock, label: `${program.duration_weeks} weeks duration` },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <item.icon className="h-4 w-4 text-brand" />
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-display text-2xl font-bold">What you&apos;ll achieve</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {program.outcomes.map((outcome, i) => (
                  <div
                    key={outcome}
                    className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="font-display text-2xl font-bold">Curriculum</h2>
              <p className="mt-2 text-muted-foreground">
                {moduleNumbers.length} modules · {totalLessons} lessons · {program.duration_weeks} weeks
              </p>
            </Reveal>

            <div className="mt-8 space-y-6">
              {moduleNumbers.map((modNum, i) => {
                const modLessons = modules[modNum];
                const moduleCompleted = modLessons.every((l) => completedLessons.has(l.id));
                return (
                  <Reveal key={modNum} delay={i * 60}>
                    <Card className="overflow-hidden border-border/60">
                      <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold',
                              moduleCompleted
                                ? 'bg-brand text-white'
                                : 'bg-brand/10 text-brand'
                            )}
                          >
                            {moduleCompleted ? <Check className="h-4 w-4" /> : modNum}
                          </div>
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              Module {modNum}
                            </p>
                            <h3 className="font-display text-base font-bold">
                              {moduleTitles[modNum - 1] || `Module ${modNum}`}
                            </h3>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {modLessons.length} lessons
                        </span>
                      </div>

                      <div className="divide-y divide-border/40">
                        {modLessons.map((lesson) => {
                          const Icon = lessonTypeIcons[lesson.lesson_type] || Play;
                          const isCompleted = completedLessons.has(lesson.id);
                          const canAccess = enrolled || lesson.is_preview;
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => {
                                if (!canAccess) {
                                  if (!user) router.push('/auth');
                                  else handleEnroll();
                                  return;
                                }
                                router.push(
                                  `/programs/${program.slug}/lessons/${lesson.id}`
                                );
                              }}
                              className="flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-muted/20"
                            >
                              <div
                                className={cn(
                                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                                  isCompleted
                                    ? 'bg-brand text-white'
                                    : canAccess
                                      ? 'bg-brand/10 text-brand'
                                      : 'bg-muted text-muted-foreground'
                                )}
                              >
                                {isCompleted ? (
                                  <Check className="h-4 w-4" />
                                ) : canAccess ? (
                                  <Icon className="h-4 w-4" />
                                ) : (
                                  <Lock className="h-3.5 w-3.5" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium">{lesson.title}</p>
                                  {lesson.is_preview && !enrolled && (
                                    <Badge className="bg-amber/15 text-amber text-[10px]">
                                      Free Preview
                                    </Badge>
                                  )}
                                </div>
                                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                                  {lesson.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                {lesson.duration_minutes} min
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
