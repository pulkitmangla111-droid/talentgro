'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/reveal';
import { Textarea } from '@/components/ui/textarea';
import { simulatorSkills, simulatorScenarios } from '@/lib/content';
import { Bot, Phone, ArrowRight, Send, RotateCcw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'buyer' | 'rep';
  text: string;
}

const buyerResponses = [
  "Hmm, I'm not sure. We're already using something similar. What makes yours different?",
  "Interesting. But how much does it cost? We have a tight budget this quarter.",
  "I don't have time to look at this right now. Can you send me an email instead?",
  "Okay, but I'd need to check with my team first. What's the next step?",
  "That sounds good in theory, but I've been burned by tools like this before. Can you show me a case study?",
  "Alright, I'm somewhat interested. What's the implementation timeline?",
  "Wait — does it integrate with our existing CRM? We use Salesforce.",
  "I appreciate the pitch, but I need to think about it. When can we follow up?",
];

export function SalesSimulator() {
  const [activeScenario, setActiveScenario] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [scores, setScores] = React.useState(simulatorSkills.map((s) => ({ ...s, score: 0 })));
  const [turnCount, setTurnCount] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const startSession = () => {
    setStarted(true);
    setMessages([
      {
        role: 'buyer',
        text: `Hello? Yes, this is ${simulatorScenarios[activeScenario].title}. I have a few minutes — what is this about?`,
      },
    ]);
    setScores(simulatorSkills.map((s) => ({ ...s, score: 0 })));
    setTurnCount(0);
  };

  const resetSession = () => {
    setStarted(false);
    setMessages([]);
    setInput('');
    setScores(simulatorSkills.map((s) => ({ ...s, score: 0 })));
    setTurnCount(0);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'rep', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTurnCount((prev) => prev + 1);

    // Simulate buyer response after delay
    setTimeout(() => {
      const responseIdx = Math.min(turnCount, buyerResponses.length - 1);
      const buyerMsg: Message = { role: 'buyer', text: buyerResponses[responseIdx] };
      setMessages((prev) => [...prev, buyerMsg]);

      // Update scores based on input quality
      const wordCount = input.split(/\s+/).filter(Boolean).length;
      const hasQuestion = input.includes('?');
      const hasValue = /\$|%|save|increase|improve|help|grow|revenue|pipeline/i.test(input);

      setScores((prev) =>
        prev.map((s) => {
          let newScore = s.score;
          if (s.skill === 'Communication') newScore = Math.min(100, s.score + (wordCount > 10 ? 12 : 5));
          if (s.skill === 'Discovery') newScore = Math.min(100, s.score + (hasQuestion ? 15 : 3));
          if (s.skill === 'Value Pitch') newScore = Math.min(100, s.score + (hasValue ? 15 : 4));
          if (s.skill === 'Confidence') newScore = Math.min(100, s.score + 8);
          if (s.skill === 'Empathy') newScore = Math.min(100, s.score + (input.length > 50 ? 10 : 4));
          if (s.skill === 'Closing') newScore = Math.min(100, s.score + (turnCount >= 3 ? 12 : 3));
          if (s.skill === 'Persuasion') newScore = Math.min(100, s.score + (hasValue ? 10 : 5));
          return { ...s, score: newScore };
        })
      );
    }, 800);
  };

  const avgScore = Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length);

  return (
    <section id="simulator" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left: content + scores */}
          <Reveal>
            <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
              AI Sales Lab
            </Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Practice real sales calls with AI buyers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Step into realistic sales scenarios. The AI buyer adapts to your approach in
              real time and scores you across seven dimensions — then gives you targeted
              drills to close the gap.
            </p>

            {/* Score panel */}
            <div className="mt-8 space-y-3 rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Live session scores</p>
                {started && (
                  <span className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-bold',
                    avgScore >= 70 ? 'bg-brand/15 text-brand' : avgScore >= 40 ? 'bg-amber/15 text-amber' : 'bg-muted text-muted-foreground'
                  )}>
                    {avgScore}% avg
                  </span>
                )}
              </div>
              {scores.map((s, i) => (
                <div key={s.skill}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium text-muted-foreground">{s.skill}</span>
                    <span className="font-semibold">{s.score}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-amber transition-all duration-700"
                      style={{ width: `${s.score}%`, transitionDelay: `${i * 60}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              {!started ? (
                <Button className="bg-brand hover:bg-brand-dark" size="lg" onClick={startSession}>
                  <Phone className="mr-2 h-4 w-4" />
                  Start simulation
                </Button>
              ) : (
                <Button variant="outline" size="lg" onClick={resetSession}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset session
                </Button>
              )}
            </div>
          </Reveal>

          {/* Right: chat interface */}
          <Reveal delay={150}>
            <div className="mb-4 overflow-hidden rounded-2xl border border-border/60 shadow-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://talentgrosalesschool.com/wp-content/uploads/2025/02/Image-11.webp"
                alt="AI sales simulator"
                className="h-40 w-full object-cover"
              />
            </div>

            {/* Scenario picker */}
            {!started && (
              <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-float">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold">Choose a scenario</p>
                    <p className="text-xs text-muted-foreground">{simulatorScenarios.length} realistic practice modes</p>
                  </div>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {simulatorScenarios.map((scenario, i) => (
                    <button
                      key={scenario.title}
                      onClick={() => setActiveScenario(i)}
                      className={cn(
                        'flex flex-col gap-2 rounded-xl border p-4 text-left transition-all',
                        activeScenario === i
                          ? 'border-brand bg-brand/5 shadow-sm'
                          : 'border-border/60 hover:border-brand/30 hover:bg-muted/30'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <scenario.icon className={cn('h-4 w-4', activeScenario === i ? 'text-brand' : 'text-muted-foreground')} />
                        <span className="text-sm font-semibold">{scenario.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{scenario.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat interface */}
            {started && (
              <div className="rounded-3xl border border-border/60 bg-card shadow-float">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/60 p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{simulatorScenarios[activeScenario].title}</p>
                      <p className="text-[11px] text-muted-foreground">AI Buyer · Turn {turnCount}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-amber/10 px-2.5 py-1 text-[11px] font-semibold text-amber">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
                    Live
                  </span>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="max-h-[320px] min-h-[200px] space-y-3 overflow-y-auto p-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex',
                        msg.role === 'rep' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm',
                          msg.role === 'rep'
                            ? 'bg-brand text-white'
                            : 'bg-muted text-foreground'
                        )}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {turnCount === 0 && messages.length > 0 && (
                    <div className="flex justify-center">
                      <span className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
                        Type your response below to start the conversation
                      </span>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-border/60 p-4">
                  <div className="flex gap-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your sales pitch or response..."
                      className="min-h-[44px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                    />
                    <Button
                      className="bg-brand hover:bg-brand-dark"
                      onClick={handleSend}
                      disabled={!input.trim()}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
