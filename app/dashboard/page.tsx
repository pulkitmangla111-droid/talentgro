'use client';

import * as React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Award,
  Briefcase,
  TrendingUp,
  LogOut,
  ArrowRight,
  Target,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const [enrollments, setEnrollments] = React.useState<any[]>([]);
  const [applications, setApplications] = React.useState<any[]>([]);
  const [profileName, setProfileName] = React.useState('');
  const [dataLoading, setDataLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;
    let cancelled = false;

    (async () => {
      const [{ data: profile }, { data: enrolls }, { data: apps }] = await Promise.all([
        supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle(),
        supabase
          .from('enrollments')
          .select('id, program_id, status, progress_pct, programs(title, slug, level)')
          .eq('user_id', user.id),
        supabase
          .from('applications')
          .select('id, status, job_listings(title, company)')
          .eq('user_id', user.id),
      ]);

      if (cancelled) return;
      setProfileName(profile?.full_name || '');
      setEnrollments(enrolls || []);
      setApplications(apps || []);
      setDataLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading || dataLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Please sign in to access your dashboard.</p>
        <Button asChild>
          <Link href="/auth">Go to Sign In</Link>
        </Button>
      </div>
    );
  }

  const firstName = profileName || user.email?.split('@')[0] || 'there';

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://talentgrosalesschool.com/wp-content/uploads/2023/09/Retina-Logo.png"
              alt="TalentGro Sales School"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <LogOut className="mr-1.5 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold sm:text-3xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Track your learning progress, applications, and career growth.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, label: 'Active Courses', value: enrollments.filter((e: any) => e.status === 'active').length },
            { icon: Award, label: 'Completed', value: enrollments.filter((e: any) => e.status === 'completed').length },
            { icon: Briefcase, label: 'Applications', value: applications.length },
            { icon: TrendingUp, label: 'Avg. Progress', value: enrollments.length ? Math.round(enrollments.reduce((a: number, e: any) => a + e.progress_pct, 0) / enrollments.length) + '%' : '0%' },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/60">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Enrollments */}
          <Card className="border-border/60">
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-brand" />
                <CardTitle className="text-lg">My Courses</CardTitle>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/#programs">Browse programs</Link>
              </Button>
            </CardHeader>
            <CardContent>
              {enrollments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/60 py-12 text-center">
                  <Target className="mx-auto h-8 w-8 text-muted-foreground/40" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Not enrolled in any program yet.
                  </p>
                  <Button size="sm" className="mt-4 bg-brand hover:bg-brand-dark" asChild>
                    <Link href="/#programs">
                      Explore programs
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrollments.map((en: any) => {
                    const prog = en.programs?.[0] || en.programs;
                    return (
                      <div
                        key={en.id}
                        className="rounded-xl border border-border/60 p-4 transition-colors hover:border-brand/30"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">
                            {prog?.title || 'Unknown Program'}
                          </p>
                          <Badge
                            className={
                              en.status === 'completed'
                                ? 'bg-amber/15 text-amber'
                                : 'bg-brand/10 text-brand'
                            }
                          >
                            {en.status}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {prog?.level}
                        </p>
                        <div className="mt-3">
                          <div className="mb-1 flex justify-between text-xs">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">{en.progress_pct}%</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-brand transition-all duration-500"
                              style={{ width: `${en.progress_pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Applications */}
          <Card className="border-border/60">
            <CardHeader className="flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-brand" />
                <CardTitle className="text-lg">Job Applications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/60 py-12 text-center">
                  <Briefcase className="mx-auto h-8 w-8 text-muted-foreground/40" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    No applications yet. Check the placement portal for jobs.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app: any) => {
                    const job = app.job_listings?.[0] || app.job_listings;
                    return (
                      <div
                        key={app.id}
                        className="flex items-center justify-between rounded-xl border border-border/60 p-4"
                      >
                        <div>
                          <p className="text-sm font-semibold">
                            {job?.title || 'Unknown Position'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {job?.company}
                          </p>
                        </div>
                        <Badge className="bg-brand/10 text-brand">{app.status}</Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
