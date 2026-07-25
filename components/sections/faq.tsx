'use client';

import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/lib/content';
import { HelpCircle } from 'lucide-react';

export function FAQ() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
            FAQ
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know before enrolling. Can&apos;t find an answer?{' '}
            <a href="#contact" className="font-medium text-brand hover:underline">
              Talk to us
            </a>
            .
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-border/60 bg-card px-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
                    <span className="flex items-start gap-3">
                      <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-7 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
