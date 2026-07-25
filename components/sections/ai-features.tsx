'use client';

import * as React from 'react';
import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { aiFeatures } from '@/lib/content';
import { Mail, Shield, FileText, Mic, Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToolId = 'cold-email' | 'objection-handler' | 'resume-score' | 'interview-feedback';

const tools = [
  { id: 'cold-email' as ToolId, label: 'Cold Email Generator', icon: Mail },
  { id: 'objection-handler' as ToolId, label: 'Objection Handler', icon: Shield },
  { id: 'resume-score' as ToolId, label: 'Resume Scorer', icon: FileText },
  { id: 'interview-feedback' as ToolId, label: 'Interview Coach', icon: Mic },
];

export function AIFeatures() {
  const [activeTool, setActiveTool] = React.useState<ToolId>('cold-email');
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  // Form state
  const [emailForm, setEmailForm] = React.useState({ recipientName: '', company: '', product: '', painPoint: '' });
  const [objectionForm, setObjectionForm] = React.useState({ objection: '', product: '' });
  const [resumeForm, setResumeForm] = React.useState({ resumeText: '', targetRole: '' });
  const [interviewForm, setInterviewForm] = React.useState({ transcript: '', role: '' });

  const handleRun = async () => {
    setLoading(true);
    setResult('');
    setCopied(false);

    const inputMap: Record<ToolId, any> = {
      'cold-email': emailForm,
      'objection-handler': objectionForm,
      'resume-score': resumeForm,
      'interview-feedback': interviewForm,
    };

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const response = await fetch(`${supabaseUrl}/functions/v1/ai-tools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${anonKey}`,
          apikey: anonKey!,
        },
        body: JSON.stringify({ tool: activeTool, input: inputMap[activeTool] }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      const data = await response.json();
      setResult(data.result || data.error || 'No result returned.');
    } catch (err: any) {
      setResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-features" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute left-0 bottom-20 h-96 w-96 rounded-full bg-amber/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-brand/20 bg-brand/5 text-brand">
            <Sparkles className="mr-1 h-3 w-3" />
            AI Features
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Your AI-powered sales career toolkit
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            12 AI tools built specifically for sales professionals. Try them live below —
            generate cold emails, handle objections, score your resume, and practice interviews.
          </p>
        </Reveal>

        {/* Feature grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {aiFeatures.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 4) * 80}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-brand/30 hover:shadow-float">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:scale-110">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-sm font-bold">{feature.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Interactive demo */}
        <Reveal className="mt-16">
          <Card className="overflow-hidden border-border/60 shadow-float">
            <CardContent className="p-0">
              {/* Tool tabs */}
              <div className="flex flex-wrap gap-2 border-b border-border/60 bg-muted/20 p-4">
                {tools.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setActiveTool(t.id); setResult(''); }}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      activeTool === t.id
                        ? 'bg-brand text-white shadow-sm'
                        : 'bg-background text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <t.icon className="h-4 w-4" />
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-2">
                {/* Input side */}
                <div className="space-y-4">
                  {activeTool === 'cold-email' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="ce-recipient">Recipient Name</Label>
                        <Input id="ce-recipient" placeholder="Priya Sharma" value={emailForm.recipientName} onChange={(e) => setEmailForm({ ...emailForm, recipientName: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ce-company">Company</Label>
                        <Input id="ce-company" placeholder="Acme Corp" value={emailForm.company} onChange={(e) => setEmailForm({ ...emailForm, company: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ce-product">Product / Service</Label>
                        <Input id="ce-product" placeholder="SalesFlow CRM" value={emailForm.product} onChange={(e) => setEmailForm({ ...emailForm, product: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ce-pain">Pain Point</Label>
                        <Input id="ce-pain" placeholder="scaling outbound pipeline" value={emailForm.painPoint} onChange={(e) => setEmailForm({ ...emailForm, painPoint: e.target.value })} />
                      </div>
                    </>
                  )}

                  {activeTool === 'objection-handler' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="ob-objection">Customer Objection</Label>
                        <Textarea id="ob-objection" placeholder="It's too expensive / We already use a competitor / The timing isn't right" value={objectionForm.objection} onChange={(e) => setObjectionForm({ ...objectionForm, objection: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ob-product">Your Product</Label>
                        <Input id="ob-product" placeholder="SalesFlow CRM" value={objectionForm.product} onChange={(e) => setObjectionForm({ ...objectionForm, product: e.target.value })} />
                      </div>
                    </>
                  )}

                  {activeTool === 'resume-score' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="rs-text">Paste Your Resume Text</Label>
                        <Textarea id="rs-text" placeholder="Paste your full resume text here..." className="min-h-[180px]" value={resumeForm.resumeText} onChange={(e) => setResumeForm({ ...resumeForm, resumeText: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rs-role">Target Role</Label>
                        <Input id="rs-role" placeholder="Enterprise Account Executive" value={resumeForm.targetRole} onChange={(e) => setResumeForm({ ...resumeForm, targetRole: e.target.value })} />
                      </div>
                    </>
                  )}

                  {activeTool === 'interview-feedback' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="iv-transcript">Your Interview Answer</Label>
                        <Textarea id="iv-transcript" placeholder="Type or paste your response to an interview question..." className="min-h-[180px]" value={interviewForm.transcript} onChange={(e) => setInterviewForm({ ...interviewForm, transcript: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="iv-role">Target Role</Label>
                        <Input id="iv-role" placeholder="SDR at SaaS company" value={interviewForm.role} onChange={(e) => setInterviewForm({ ...interviewForm, role: e.target.value })} />
                      </div>
                    </>
                  )}

                  <Button className="w-full bg-brand hover:bg-brand-dark" onClick={handleRun} disabled={loading}>
                    {loading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles className="mr-2 h-4 w-4" /> Run AI Tool</>
                    )}
                  </Button>
                </div>

                {/* Output side */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-muted-foreground">AI Output</p>
                    {result && (
                      <Button variant="ghost" size="sm" onClick={handleCopy}>
                        {copied ? <><Check className="mr-1 h-3.5 w-3.5" /> Copied</> : <><Copy className="mr-1 h-3.5 w-3.5" /> Copy</>}
                      </Button>
                    )}
                  </div>
                  <div className="min-h-[300px] rounded-xl border border-border/60 bg-muted/20 p-4">
                    {result ? (
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{result}</pre>
                    ) : (
                      <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
                        <Sparkles className="h-8 w-8 text-muted-foreground/30" />
                        <p className="mt-3 text-sm text-muted-foreground">
                          Fill in the fields and click Run to see AI-generated results.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
