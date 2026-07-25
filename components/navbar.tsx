'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { megaMenu } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-border/60 shadow-sm' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://talentgrosalesschool.com/wp-content/uploads/2023/09/Retina-Logo.png"
            alt="TalentGro Sales School"
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {megaMenu.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(group.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:bg-accent/5">
                {group.label}
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform',
                    openMenu === group.label && 'rotate-180'
                  )}
                />
              </button>

              {/* Mega menu panel */}
              <div
                className={cn(
                  'absolute left-0 top-full pt-2 transition-all duration-200',
                  openMenu === group.label
                    ? 'visible opacity-100 translate-y-0'
                    : 'invisible opacity-0 -translate-y-1'
                )}
              >
                <div className="w-[480px] rounded-2xl border border-border/60 bg-popover p-3 shadow-float">
                  <div className="grid grid-cols-2 gap-1">
                    {group.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-accent/5"
                      >
                        {link.icon && (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                            <link.icon className="h-4 w-4" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">
                              {link.label}
                            </span>
                            {link.badge && (
                              <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-semibold text-amber">
                                {link.badge}
                              </span>
                            )}
                          </div>
                          {link.description && (
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                              {link.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="hidden text-sm font-medium sm:inline-flex"
            asChild
          >
            <Link href="/auth">Sign in</Link>
          </Button>
          <Button
            size="sm"
            className="hidden sm:inline-flex bg-brand hover:bg-brand-dark"
            asChild
          >
            <Link href="/auth">
              Start Free Assessment
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>

          {/* Mobile toggle */}
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/60 glass">
          <div className="space-y-1 px-4 py-4">
            {megaMenu.map((group) => (
              <div key={group.label} className="py-2">
                <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </p>
                <div className="mt-1 grid grid-cols-1 gap-0.5">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium hover:bg-accent/5"
                    >
                      {link.icon && <link.icon className="h-4 w-4 text-brand" />}
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth" onClick={() => setMobileOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button size="sm" className="bg-brand hover:bg-brand-dark" asChild>
                <Link href="/auth" onClick={() => setMobileOpen(false)}>
                  Start Free Assessment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
