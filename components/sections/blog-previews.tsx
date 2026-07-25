'use client';

import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/content';
import { ArrowRight } from 'lucide-react';

export function BlogPreviews() {
  return (
    <section id="blog" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
            Blog
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Insights from the sales frontline
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Practical, no-fluff articles on sales techniques, AI tools, and career growth —
            written by practitioners.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.title} delay={i * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-brand/30 hover:shadow-float">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full glass px-2.5 py-1 text-[10px] font-semibold">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                    <span>{post.readTime} read</span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold leading-tight transition-colors group-hover:text-brand">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-medium text-brand">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
