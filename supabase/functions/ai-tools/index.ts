import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { tool, input } = await req.json();

    let result: string;

    switch (tool) {
      case "cold-email":
        result = generateColdEmail(input);
        break;
      case "objection-handler":
        result = handleObjection(input);
        break;
      case "resume-score":
        result = scoreResume(input);
        break;
      case "interview-feedback":
        result = interviewFeedback(input);
        break;
      default:
        return new Response(
          JSON.stringify({ error: "Unknown tool. Available: cold-email, objection-handler, resume-score, interview-feedback" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    return new Response(
      JSON.stringify({ result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function generateColdEmail(input: {
  recipientName?: string;
  company?: string;
  product?: string;
  painPoint?: string;
}): string {
  const name = input?.recipientName || "[Name]";
  const company = input?.company || "[Company]";
  const product = input?.product || "our platform";
  const pain = input?.painPoint || "scaling your sales pipeline";

  return `Subject: ${company} + ${product} = 2x pipeline in 90 days

Hi ${name},

I noticed ${company} has been growing fast — congrats. Most sales leaders I talk to at similar-stage companies are struggling with ${pain}.

We helped [Customer X] go from 15% to 32% reply rates in 6 weeks using ${product}. Here's a 2-min case study: [link]

Worth a 15-min call next Tuesday or Wednesday?

Best,
[Your Name]`;
}

function handleObjection(input: {
  objection?: string;
  product?: string;
}): string {
  const objection = input?.objection || "It's too expensive.";
  const product = input?.product || "our solution";

  const responses: Record<string, string> = {
    expensive: `I understand budget is a concern. Let's look at the ROI — most clients see a 3x return within 90 days. If we can show you how to save 10+ hours/week with ${product}, would a $X/month investment feel reasonable?`,
    timing: `I hear you — timing matters. Out of curiosity, what would need to change in the next 3 months for this to become a priority? Often, teams that wait end up spending more time manually doing what ${product} automates.`,
    competitor: `Good — it means you're already thinking about this. What's working well with [Competitor], and what's missing? Many of our customers switched because they needed [specific feature] that ${product} provides out of the box.`,
    decision: `Absolutely — involving the right people is smart. Who else should be part of this conversation? I'm happy to put together a brief summary tailored to their priorities so everyone can evaluate ${product} on the same page.`,
    happy: `Great to hear things are working! Most of our happiest customers felt the same way before they discovered what was possible with ${product}. Would you be open to a 10-min benchmark comparison? No commitment — just data.`,
  };

  const key = Object.keys(responses).find((k) =>
    objection.toLowerCase().includes(k)
  );

  return key
    ? responses[key]
    : `That's a valid concern. Let me ask — what's driving that? If I can show you how ${product} specifically addresses that, would it be worth exploring further?`;
}

function scoreResume(input: {
  resumeText?: string;
  targetRole?: string;
}): string {
  const text = input?.resumeText || "";
  const role = input?.targetRole || "Sales Representative";
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const hasMetrics = /\d+%|\$|revenue|quota|pipeline|conversion/i.test(text);
  const hasActionVerbs = /led|drove|achieved|closed|built|scaled|generated/i.test(text);
  const hasCrm = /salesforce|hubspot|outreach|gong|apollo|zoho/i.test(text);
  const hasStructure = /experience|education|skills|summary/i.test(text);

  const score =
    (hasMetrics ? 25 : 0) +
    (hasActionVerbs ? 25 : 0) +
    (hasCrm ? 20 : 0) +
    (hasStructure ? 15 : 0) +
    (wordCount > 150 && wordCount < 600 ? 15 : 5);

  const tips: string[] = [];
  if (!hasMetrics) tips.push("Add quantified metrics — e.g., 'Increased conversion by 35%' or 'Closed $2.3M in pipeline'");
  if (!hasActionVerbs) tips.push("Use strong action verbs: Led, Drove, Achieved, Closed, Scaled");
  if (!hasCrm) tips.push("Mention CRM tools you've used: Salesforce, HubSpot, Outreach, Gong");
  if (!hasStructure) tips.push("Structure your resume with clear sections: Summary, Experience, Skills, Education");
  if (wordCount < 150) tips.push("Your resume is too short — aim for 200-500 words");
  if (wordCount > 600) tips.push("Your resume is too long — trim to 1-2 pages max");
  tips.push(`Tailor keywords for "${role}" — check job postings for common terms`);

  return `Resume Score: ${score}/100\n\nStrengths:\n${[
    hasMetrics ? "- Quantified metrics present" : null,
    hasActionVerbs ? "- Strong action verbs" : null,
    hasCrm ? "- CRM tools mentioned" : null,
    hasStructure ? "- Clear structure" : null,
  ].filter(Boolean).join("\n")}\n\nImprovements:\n${tips.map((t) => `- ${t}`).join("\n")}`;
}

function interviewFeedback(input: {
  transcript?: string;
  role?: string;
}): string {
  const transcript = input?.transcript || "";
  const role = input?.targetRole || "Sales Representative";
  const words = transcript.split(/\s+/).filter(Boolean);

  const hasStructure = /situation|task|action|result|star/i.test(transcript);
  const hasMetrics = /\d+%|\$|revenue|quota|pipeline/i.test(transcript);
  const hasQuestions = /\?/.test(transcript);
  const hasClosing = /close|next step|follow.?up|timeline|decision/i.test(transcript);
  const wordCount = words.length;

  const score =
    (hasStructure ? 25 : 0) +
    (hasMetrics ? 25 : 0) +
    (hasQuestions ? 20 : 0) +
    (hasClosing ? 20 : 0) +
    (wordCount > 100 ? 10 : 0);

  const feedback: string[] = [];
  if (!hasStructure) feedback.push("Use the STAR framework: Situation, Task, Action, Result");
  if (!hasMetrics) feedback.push("Quantify your achievements — numbers build credibility");
  if (!hasQuestions) feedback.push("Ask thoughtful questions — it shows genuine interest");
  if (!hasClosing) feedback.push("Close the interview — ask about next steps and timeline");
  if (wordCount < 100) feedback.push("Your answers are too brief — aim for 60-90 seconds per response");

  return `Interview Score: ${score}/100\n\nFor role: ${role}\n\nFeedback:\n${feedback.map((f) => `- ${f}`).join("\n")}\n\nKeep practicing — every interview makes you sharper.`;
}
