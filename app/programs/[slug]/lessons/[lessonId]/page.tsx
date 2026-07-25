'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/lib/auth-context';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Play,
  FileText,
  HelpCircle,
  Code,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lesson {
  id: string;
  program_id: string;
  module_number: number;
  lesson_number: number;
  title: string;
  description: string;
  content: string;
  lesson_type: string;
  duration_minutes: number;
  is_preview: boolean;
}

interface Program {
  id: string;
  title: string;
  slug: string;
}

const lessonTypeIcons: Record<string, any> = {
  video: Play,
  reading: FileText,
  quiz: HelpCircle,
  project: Code,
};

const quizQuestions = [
  {
    q: 'What percentage of sales is psychology vs technique?',
    options: ['50/50', '80/20', '20/80', '60/40'],
    answer: 1,
  },
  {
    q: 'What are the five stages of a sales call?',
    options: [
      'Greeting, pitch, price, close, follow-up',
      'Opener, discovery, value pitch, objection handling, close',
      'Intro, demo, negotiate, sign, onboard',
      'Prospect, qualify, present, propose, close',
    ],
    answer: 1,
  },
  {
    q: 'What does the LAER model stand for?',
    options: [
      'Learn, Adapt, Execute, Review',
      'Lead, Assess, Engage, Report',
      'Listen, Acknowledge, Explore, Respond',
      'Locate, Analyze, Evaluate, Resolve',
    ],
    answer: 2,
  },
  {
    q: 'What is the recommended cold email reply rate target?',
    options: ['1%', '5%', '15%', '30%'],
    answer: 2,
  },
  {
    q: 'What should you never discount during negotiation?',
    options: ['Timeline', 'Price', 'Scope', 'Terms'],
    answer: 1,
  },
];

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [lesson, setLesson] = React.useState<Lesson | null>(null);
  const [program, setProgram] = React.useState<Program | null>(null);
  const [allLessons, setAllLessons] = React.useState<Lesson[]>([]);
  const [enrollmentId, setEnrollmentId] = React.useState<string | null>(null);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [notes, setNotes] = React.useState('');
  const [savingNotes, setSavingNotes] = React.useState(false);
  const [quizAnswers, setQuizAnswers] = React.useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = React.useState(false);
  const [quizScore, setQuizScore] = React.useState(0);

  const slug = params.slug as string;
  const lessonId = params.lessonId as string;

  React.useEffect(() => {
    if (!slug || !lessonId) return;

    (async () => {
      const { data: prog } = await supabase
        .from('programs')
        .select('id, title, slug')
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
        .eq('id', lessonId)
        .maybeSingle();

      if (!lessonData) {
        setLoading(false);
        return;
      }
      setLesson(lessonData);

      const { data: lessonsList } = await supabase
        .from('lessons')
        .select('*')
        .eq('program_id', prog.id)
        .order('module_number', { ascending: true })
        .order('lesson_number', { ascending: true });

      setAllLessons(lessonsList || []);

      if (user) {
        const { data: enrollment } = await supabase
          .from('enrollments')
          .select('id')
          .eq('program_id', prog.id)
          .eq('user_id', user.id)
          .maybeSingle();

        if (enrollment) {
          setEnrollmentId(enrollment.id);

          const { data: progress } = await supabase
            .from('lesson_progress')
            .select('status, score')
            .eq('enrollment_id', enrollment.id)
            .eq('lesson_key', lessonId)
            .maybeSingle();

          if (progress?.status === 'completed') {
            setIsCompleted(true);
          }
        }
      }

      setLoading(false);
    })();
  }, [slug, lessonId, user]);

  const canAccess = enrollmentId || lesson?.is_preview;

  const handleMarkComplete = async () => {
    if (!enrollmentId || !lesson) return;

    const score = lesson.lesson_type === 'quiz' && quizSubmitted ? quizScore : null;

    const { error } = await supabase.from('lesson_progress').upsert({
      enrollment_id: enrollmentId,
      user_id: user!.id,
      lesson_key: lesson.id,
      status: 'completed',
      score,
      completed_at: new Date().toISOString(),
    });

    if (!error) {
      setIsCompleted(true);
      // Update enrollment progress
      const completedCount = allLessons.filter((l) => l.id !== lesson.id).length;
      const newProgress = Math.round(((completedCount + 1) / allLessons.length) * 100);
      await supabase
        .from('enrollments')
        .update({ progress_pct: newProgress })
        .eq('id', enrollmentId);
    }
  };

  const handleQuizSubmit = () => {
    const correct = quizAnswers.filter((a, i) => a === quizQuestions[i].answer).length;
    setQuizScore(Math.round((correct / quizQuestions.length) * 100));
    setQuizSubmitted(true);
  };

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center pt-16">
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </>
    );
  }

  if (!lesson || !program) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-16">
          <p className="text-muted-foreground">Lesson not found.</p>
          <Button asChild>
            <a href="/#programs">Browse programs</a>
          </Button>
        </div>
      </>
    );
  }

  const Icon = lessonTypeIcons[lesson.lesson_type] || Play;

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <button
              onClick={() => router.push(`/programs/${program.slug}`)}
              className="text-muted-foreground hover:text-brand"
            >
              {program.title}
            </button>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium text-foreground">Module {lesson.module_number}</span>
          </div>

          {/* Lesson header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Lesson {lesson.lesson_number} · {lesson.lesson_type}
                </p>
                <h1 className="font-display text-2xl font-bold">{lesson.title}</h1>
              </div>
            </div>
            <p className="mt-3 text-muted-foreground">{lesson.description}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {lesson.duration_minutes} minutes
              </span>
              {lesson.is_preview && (
                <Badge className="bg-amber/15 text-amber text-[10px]">Free Preview</Badge>
              )}
            </div>
          </div>

          {!canAccess ? (
            <Card className="border-border/60">
              <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
                <Lock className="h-10 w-10 text-muted-foreground/40" />
                <div>
                  <p className="font-display text-lg font-bold">This lesson is locked</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enroll in this program to access all lessons.
                  </p>
                </div>
                <Button
                  className="bg-brand hover:bg-brand-dark"
                  onClick={() => router.push(user ? `/programs/${program.slug}` : '/auth')}
                >
                  {user ? 'Go to program page' : 'Sign in to enroll'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Video / Content area */}
              {lesson.lesson_type === 'video' && (
                <div className="aspect-video overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-muted/40 to-muted/10">
                  <div className="flex h-full flex-col items-center justify-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
                      <Play className="h-7 w-7 text-brand" />
                    </div>
                    <p className="text-sm text-muted-foreground">Video content — coming soon</p>
                  </div>
                </div>
              )}

              {/* Lesson content */}
              {lesson.content && lesson.lesson_type !== 'quiz' && (
                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <div className="prose prose-sm max-w-none">
                      <p className="text-foreground leading-relaxed">{lesson.content}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quiz */}
              {lesson.lesson_type === 'quiz' && (
                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-brand" />
                      <h2 className="font-display text-lg font-bold">Knowledge Check</h2>
                    </div>

                    {quizSubmitted && (
                      <div
                        className={cn(
                          'mb-6 rounded-xl p-4',
                          quizScore >= 60 ? 'bg-brand/10' : 'bg-destructive/10'
                        )}
                      >
                        <p className="font-display text-lg font-bold">
                          Score: {quizScore}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {quizScore >= 60
                            ? 'Great job! You passed this quiz.'
                            : 'Keep practicing — review the material and try again.'}
                        </p>
                      </div>
                    )}

                    <div className="space-y-6">
                      {quizQuestions.map((question, qi) => (
                        <div key={qi}>
                          <p className="mb-3 text-sm font-medium">
                            {qi + 1}. {question.q}
                          </p>
                          <div className="space-y-2">
                            {question.options.map((opt, oi) => {
                              const selected = quizAnswers[qi] === oi;
                              const isCorrect = quizSubmitted && oi === question.answer;
                              const isWrong =
                                quizSubmitted && selected && oi !== question.answer;
                              return (
                                <button
                                  key={oi}
                                  disabled={quizSubmitted}
                                  onClick={() => {
                                    const newAnswers = [...quizAnswers];
                                    newAnswers[qi] = oi;
                                    setQuizAnswers(newAnswers);
                                  }}
                                  className={cn(
                                    'flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all',
                                    isCorrect
                                      ? 'border-brand bg-brand/5'
                                      : isWrong
                                        ? 'border-destructive bg-destructive/5'
                                        : selected
                                          ? 'border-brand bg-brand/5'
                                          : 'border-border/60 hover:border-brand/30'
                                  )}
                                >
                                  <div
                                    className={cn(
                                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                                      selected || isCorrect
                                        ? 'border-brand bg-brand text-white'
                                        : 'border-border'
                                    )}
                                  >
                                    {isCorrect && <Check className="h-3 w-3" />}
                                  </div>
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {!quizSubmitted ? (
                      <Button
                        className="mt-6 bg-brand hover:bg-brand-dark"
                        onClick={handleQuizSubmit}
                        disabled={quizAnswers.length < quizQuestions.length}
                      >
                        Submit quiz
                      </Button>
                    ) : (
                      <Button
                        className="mt-6 bg-brand hover:bg-brand-dark"
                        onClick={handleMarkComplete}
                      >
                        {isCompleted ? 'Completed' : 'Mark as complete'}
                        {!isCompleted && <Check className="ml-2 h-4 w-4" />}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Notes */}
              {enrollmentId && lesson.lesson_type !== 'quiz' && (
                <Card className="border-border/60">
                  <CardContent className="p-6">
                    <h2 className="mb-3 font-display text-base font-bold">Your notes</h2>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Take notes on this lesson..."
                      className="min-h-[120px] w-full resize-none rounded-xl border border-border/60 bg-muted/20 p-4 text-sm outline-none focus:border-brand/40"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => {
                        setSavingNotes(true);
                        setTimeout(() => setSavingNotes(false), 500);
                      }}
                    >
                      {savingNotes ? 'Saved' : 'Save notes'}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Mark complete */}
              {enrollmentId && lesson.lesson_type !== 'quiz' && (
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl',
                        isCompleted ? 'bg-brand text-white' : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {isCompleted ? 'Lesson completed' : 'Mark lesson as complete'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Track your progress through the program
                      </p>
                    </div>
                  </div>
                  {!isCompleted && (
                    <Button
                      className="bg-brand hover:bg-brand-dark"
                      onClick={handleMarkComplete}
                    >
                      Mark complete
                    </Button>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between border-t border-border/60 pt-6">
                {prevLesson ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(`/programs/${program.slug}/lessons/${prevLesson.id}`)
                    }
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                ) : (
                  <div />
                )}
                {nextLesson ? (
                  <Button
                    className="bg-brand hover:bg-brand-dark"
                    onClick={() =>
                      router.push(`/programs/${program.slug}/lessons/${nextLesson.id}`)
                    }
                  >
                    Next lesson
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/programs/${program.slug}`)}
                  >
                    Back to curriculum
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
