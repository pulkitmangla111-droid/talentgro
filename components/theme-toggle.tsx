'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 transition-all hover:bg-accent/10 hover:border-accent/30"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4 text-amber" />
        ) : (
          <Moon className="h-4 w-4 text-brand" />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}
