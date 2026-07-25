'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Mail, Lock, User, Sparkles } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = React.useState<'signin' | 'signup'>('signup');
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    const result =
      mode === 'signin'
        ? await signIn(email, password)
        : await signUp(email, password, fullName);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand/5 to-transparent px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://talentgrosalesschool.com/wp-content/uploads/2023/09/Retina-Logo.png"
            alt="TalentGro Sales School"
            className="mx-auto h-12 w-auto"
          />
          <h1 className="mt-3 font-display text-2xl font-bold">TalentGro Sales School</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === 'signin' ? 'Welcome back. Sign in to continue.' : 'Create your account and start learning.'}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-float sm:p-8">
          {/* Tabs */}
          <div className="mb-6 flex rounded-xl bg-muted p-1">
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                mode === 'signup' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                mode === 'signin' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Priya Sharma"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark"
              disabled={loading}
            >
              {loading
                ? 'Please wait...'
                : mode === 'signin'
                  ? 'Sign In'
                  : 'Create Account'}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand/5 px-4 py-3">
            <Sparkles className="h-4 w-4 text-brand" />
            <p className="text-xs text-muted-foreground">
              Get a free AI Career Assessment after signing up.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to TalentGro&apos;s Terms &amp; Privacy Policy.
        </p>
      </div>
    </div>
  );
}
