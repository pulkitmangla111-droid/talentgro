'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useReveal } from '@/hooks/use-reveal';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  as?: React.ElementType;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Comp = 'div',
  ...props
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Comp
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Comp>
  );
}
