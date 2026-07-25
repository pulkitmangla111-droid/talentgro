import {
  GraduationCap,
  Briefcase,
  Building2,
  Bot,
  Phone,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Target,
  Rocket,
  Headphones,
  type LucideIcon,
} from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  links: NavLink[];
}

export const megaMenu: NavGroup[] = [
  {
    label: 'Programs',
    href: '#programs',
    links: [
      { label: 'Sales Career Launchpad', href: '#programs', description: '12-week intensive bootcamp', icon: Rocket, badge: 'Popular' },
      { label: 'Business Development', href: '#programs', description: 'B2B prospecting & pipeline', icon: Briefcase },
      { label: 'Consultative Selling', href: '#programs', description: 'Solution-based methodologies', icon: Headphones },
      { label: 'Enterprise Sales', href: '#programs', description: 'Large deal cycles & stakeholders', icon: Building2 },
      { label: 'CRM Training', href: '#programs', description: 'Salesforce, HubSpot, Zoho', icon: Target },
      { label: 'AI Tools for Sales', href: '#programs', description: 'Next-gen AI sales workflows', icon: Bot, badge: 'New' },
    ],
  },
  {
    label: 'AI Lab',
    href: '#ai-features',
    links: [
      { label: 'AI Sales Simulator', href: '#simulator', description: 'Practice real sales scenarios', icon: Bot },
      { label: 'AI Interview Coach', href: '#ai-features', description: 'Mock interviews with feedback', icon: Users },
      { label: 'AI Resume Builder', href: '#ai-features', description: 'ATS-optimized resumes', icon: Award },
      { label: 'AI Cold Email Generator', href: '#ai-features', description: 'Personalized outreach at scale', icon: TrendingUp },
      { label: 'AI Career Advisor', href: '#ai-features', description: 'Personalized career path', icon: GraduationCap },
      { label: 'AI Objection Handler', href: '#ai-features', description: 'Master any objection', icon: Phone },
    ],
  },
  {
    label: 'Resources',
    href: '#resources',
    links: [
      { label: 'Blog', href: '#blog', description: 'Sales insights & trends', icon: BookOpen },
      { label: 'Free Resources', href: '#resources', description: 'Templates, playbooks, guides', icon: BookOpen },
      { label: 'Webinars', href: '#webinars', description: 'Live sessions with experts', icon: Users },
      { label: 'CRM Sandbox', href: '#crm-lab', description: 'Practice in a real CRM', icon: Target },
      { label: 'Career Pathways', href: '#pathways', description: 'Map your sales career', icon: TrendingUp },
      { label: 'Placement Portal', href: '#placements', description: 'Jobs & interview tracking', icon: Briefcase },
    ],
  },
  {
    label: 'Enterprise',
    href: '#corporate',
    links: [
      { label: 'Corporate Training', href: '#corporate', description: 'Team upskilling programs', icon: Building2 },
      { label: 'Custom Learning Paths', href: '#corporate', description: 'Tailored to your team', icon: GraduationCap },
      { label: 'Analytics & Reports', href: '#corporate', description: 'Track team progress', icon: TrendingUp },
      { label: 'Bulk Enrollment', href: '#corporate', description: 'Scale across departments', icon: Users },
    ],
  },
];

export const programs = [
  {
    title: 'Sales Career Launchpad',
    slug: 'sales-career-launchpad',
    duration: '12 Weeks',
    level: 'Beginner → Pro',
    icon: Rocket,
    tagline: 'The flagship bootcamp',
    description:
      'Go from zero to industry-ready with 12 weeks of immersive training covering the full sales lifecycle.',
    outcomes: ['Cold calling mastery', 'CRM proficiency', 'Closing techniques', 'AI-powered workflows'],
    tech: ['Salesforce', 'HubSpot', 'ChatGPT', 'Outreach'],
    color: 'brand',
    popular: true,
  },
  {
    title: 'Business Development',
    slug: 'business-development',
    duration: '8 Weeks',
    level: 'Intermediate',
    icon: Briefcase,
    tagline: 'Build the pipeline',
    description:
      'Master B2B prospecting, lead qualification, and pipeline management to consistently fill your funnel.',
    outcomes: ['Prospecting frameworks', 'Lead scoring', 'Email outreach', 'Social selling'],
    tech: ['LinkedIn Sales Nav', 'Apollo', 'Lemlist'],
    color: 'amber',
    popular: false,
  },
  {
    title: 'Consultative Selling',
    slug: 'consultative-selling',
    duration: '6 Weeks',
    level: 'Intermediate',
    icon: Headphones,
    tagline: 'Sell with trust',
    description:
      'Learn solution-based methodologies that build trust, uncover needs, and create long-term value.',
    outcomes: ['Discovery frameworks', 'SPIN selling', 'Value pitching', 'Stakeholder mapping'],
    tech: ['Notion', 'Gong', 'Chorus'],
    color: 'amber',
    popular: false,
  },
  {
    title: 'Enterprise Sales',
    slug: 'enterprise-sales',
    duration: '10 Weeks',
    level: 'Advanced',
    icon: Building2,
    tagline: 'Close the big deals',
    description:
      'Navigate complex enterprise deal cycles with multiple stakeholders, procurement, and legal.',
    outcomes: ['MEDDPICC', 'Multi-threading', 'Executive sponsorship', 'Negotiation'],
    tech: ['Salesforce', 'Clari', 'Mutiny'],
    color: 'brand',
    popular: false,
  },
  {
    title: 'CRM Training',
    slug: 'crm-training',
    duration: '4 Weeks',
    level: 'All Levels',
    icon: Target,
    tagline: 'Master the tools',
    description:
      'Hands-on training across Salesforce, HubSpot, and Zoho CRM with real pipeline scenarios.',
    outcomes: ['Pipeline management', 'Automation', 'Reporting', 'Data hygiene'],
    tech: ['Salesforce', 'HubSpot', 'Zoho'],
    color: 'amber',
    popular: false,
  },
  {
    title: 'AI Tools for Sales',
    slug: 'ai-tools-for-sales',
    duration: '6 Weeks',
    level: 'Intermediate',
    icon: Bot,
    tagline: 'The future of sales',
    description:
      'Leverage AI for prospecting, personalization, forecasting, and automation across your stack.',
    outcomes: ['AI prospecting', 'Personalized outreach', 'Forecasting', 'Workflow automation'],
    tech: ['ChatGPT', 'Claude', 'Gong AI', 'Apollo AI'],
    color: 'amber',
    popular: true,
  },
];

export const aiFeatures = [
  { title: 'AI Career Advisor', description: 'Get a personalized career roadmap based on your goals, experience, and target roles.', icon: GraduationCap },
  { title: 'AI Resume Builder', description: 'Generate ATS-optimized resumes tailored to each job description in seconds.', icon: Award },
  { title: 'AI Cover Letter Generator', description: 'Craft compelling cover letters that match the tone of each company.', icon: BookOpen },
  { title: 'AI LinkedIn Optimizer', description: 'Optimize your profile for sales recruiters with AI-driven suggestions.', icon: Users },
  { title: 'AI Sales Pitch Generator', description: 'Create persuasive pitches for any product, audience, or scenario.', icon: TrendingUp },
  { title: 'AI Cold Email Generator', description: 'Write personalized cold emails that get opens, replies, and meetings.', icon: Phone },
  { title: 'AI Interview Coach', description: 'Practice interviews with real-time feedback on tone, structure, and content.', icon: Headphones },
  { title: 'AI Mock Interview', description: 'Simulate full interview rounds with AI playing the hiring manager role.', icon: Users },
  { title: 'AI Objection Handler', description: 'Master any objection with AI-generated rebuttals and practice drills.', icon: Phone },
  { title: 'AI Sales Simulator', description: 'Run realistic sales calls with AI buyers that adapt to your approach.', icon: Bot },
  { title: 'AI CRM Assistant', description: 'Get AI guidance inside your CRM sandbox for next-best actions.', icon: Target },
  { title: 'AI Skill Gap Analysis', description: 'Identify exactly which skills to develop next for your target role.', icon: TrendingUp },
];

export const simulatorSkills = [
  { skill: 'Confidence', score: 88 },
  { skill: 'Communication', score: 92 },
  { skill: 'Persuasion', score: 85 },
  { skill: 'Closing Ability', score: 79 },
  { skill: 'Empathy', score: 90 },
  { skill: 'Product Knowledge', score: 86 },
  { skill: 'Professionalism', score: 94 },
];

export const simulatorScenarios = [
  { title: 'Cold Calling', description: 'Break the ice and book a meeting with a skeptical prospect.', icon: Phone },
  { title: 'Negotiation', description: 'Navigate pricing pushback without discounting value.', icon: TrendingUp },
  { title: 'Discovery Call', description: 'Uncover pain points and qualify with precision.', icon: Target },
  { title: 'Closing', description: 'Handle last-minute hesitation and seal the deal.', icon: Award },
  { title: 'Objection Handling', description: 'Turn "not interested" into "tell me more."', icon: Phone },
  { title: 'Upselling', description: 'Expand an existing account with relevant add-ons.', icon: TrendingUp },
];

export const crmFeatures = [
  { title: 'Create Leads', description: 'Capture and qualify leads with realistic data.', icon: Target },
  { title: 'Move Pipeline', description: 'Drag deals through stages — prospecting to closed.', icon: TrendingUp },
  { title: 'Contacts & Tasks', description: 'Manage relationships and follow-ups.', icon: Users },
  { title: 'Notes & Email', description: 'Log interactions and send tracked emails.', icon: BookOpen },
  { title: 'Deal Dashboard', description: 'Visualize your pipeline and forecast revenue.', icon: Briefcase },
  { title: 'Reports', description: 'Generate performance reports and activity analytics.', icon: Award },
];

export const careerPaths = [
  {
    role: 'SDR / BDR',
    salary: '₹4–8 LPA',
    timeline: '0–1 year',
    description: 'Start as a Sales / Business Development Representative, prospecting and qualifying leads.',
    skills: ['Cold calling', 'Email outreach', 'Lead qualification', 'CRM basics'],
  },
  {
    role: 'Account Executive',
    salary: '₹8–18 LPA',
    timeline: '1–3 years',
    description: 'Run full sales cycles, present solutions, and close deals for mid-market accounts.',
    skills: ['Discovery', 'Demos', 'Negotiation', 'Pipeline management'],
  },
  {
    role: 'Enterprise AE',
    salary: '₹18–40 LPA',
    timeline: '3–6 years',
    description: 'Manage complex enterprise deals with multiple stakeholders and long cycles.',
    skills: ['MEDDPICC', 'Multi-threading', 'Executive presence', 'Forecasting'],
  },
  {
    role: 'Sales Manager',
    salary: '₹25–60 LPA',
    timeline: '5–8 years',
    description: 'Lead a team of AEs, set quotas, coach reps, and drive revenue strategy.',
    skills: ['Team leadership', 'Coaching', 'Forecasting', 'Strategy'],
  },
  {
    role: 'VP of Sales',
    salary: '₹50L–1.5 Cr',
    timeline: '8+ years',
    description: 'Own the revenue engine, define GTM strategy, and scale the sales organization.',
    skills: ['GTM strategy', 'Org design', 'Board reporting', 'Revenue ops'],
  },
];

export const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Account Executive, Razorpay',
    content: 'TalentGro transformed my career. The AI sales simulator gave me reps before I ever picked up a real phone. I closed my first deal within 3 weeks of joining.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'SDR Lead, Zoho',
    content: 'The CRM sandbox is a game-changer. I walked into my interview already knowing Salesforce inside out. The mock interview AI caught habits I never noticed.',
    avatar: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    name: 'Ananya Iyer',
    role: 'Founder, BloomRetail',
    content: 'As an entrepreneur, the consultative selling module changed how I talk to customers. Our close rate went from 18% to 34% in two months.',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    name: 'Karan Mehta',
    role: 'Sales Manager, Swiggy',
    content: 'We enrolled our entire BDR team. The corporate dashboard let me track every rep\'s progress. Average ramp time dropped from 8 weeks to 4.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    name: 'Sneha Reddy',
    role: 'Enterprise AE, Freshworks',
    content: 'The AI objection handler is addictive. I practiced every night for a month. When I faced the same objections in real calls, I didn\'t freeze — I closed.',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
  {
    name: 'Arjun Nair',
    role: 'BDR, Postman',
    content: 'I came from a non-sales background. 12 weeks later I had three job offers. The placement team prepped me for every single interview.',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
  },
];

export const trainers = [
  {
    name: 'Vikram Kapoor',
    role: 'Ex-Sales Director, Salesforce',
    expertise: 'Enterprise Sales',
    experience: '18 years',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Deepa Krishnan',
    role: 'Ex-VP Sales, Freshworks',
    expertise: 'Consultative Selling',
    experience: '15 years',
    avatar: 'https://images.pexels.com/photos/5905912/pexels-photo-5905912.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Rohan Gupta',
    role: 'Ex-Head of SDR, Razorpay',
    expertise: 'Outbound & Prospecting',
    experience: '12 years',
    avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Meera Joshi',
    role: 'Ex-Director RevOps, Postman',
    expertise: 'CRM & Sales Ops',
    experience: '14 years',
    avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export const webinars = [
  {
    title: 'The AI-Powered Sales Rep: Working 3x Faster in 2026',
    speaker: 'Vikram Kapoor',
    date: 'Jul 20, 2026',
    time: '6:00 PM IST',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Breaking Into Enterprise Sales: A Roadmap',
    speaker: 'Deepa Krishnan',
    date: 'Jul 25, 2026',
    time: '7:00 PM IST',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Cold Email Masterclass: Templates That Get Replies',
    speaker: 'Rohan Gupta',
    date: 'Aug 02, 2026',
    time: '6:30 PM IST',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const blogPosts = [
  {
    title: 'The Sales Rep\'s Guide to AI Tools in 2026',
    excerpt: 'A practical breakdown of the AI tools every sales team should adopt this year — and how to integrate them into your workflow.',
    category: 'AI & Sales',
    date: 'Jul 12, 2026',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '8 min',
  },
  {
    title: 'How to Answer "Send Me Some Info" Without Losing the Deal',
    excerpt: 'The five words that kill more deals than any objection. Here\'s the framework to flip them into a booked meeting.',
    category: 'Sales Techniques',
    date: 'Jul 08, 2026',
    image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '6 min',
  },
  {
    title: 'MEDDPICC Explained: The Enterprise Sales Framework That Actually Works',
    excerpt: 'A step-by-step walkthrough of MEDDPICC with real examples from a $2M deal we closed last quarter.',
    category: 'Enterprise Sales',
    date: 'Jul 03, 2026',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
    readTime: '12 min',
  },
];

export const freeResources = [
  { title: 'Cold Email Template Pack', type: 'Templates', icon: BookOpen, count: '50+ templates' },
  { title: 'Sales Discovery Question Bank', type: 'Guide', icon: Target, count: '120 questions' },
  { title: 'CRM Setup Checklist', type: 'Checklist', icon: Briefcase, count: '40 steps' },
  { title: 'Objection Handling Playbook', type: 'Playbook', icon: Phone, count: '30 scenarios' },
  { title: 'Sales Interview Prep Guide', type: 'Guide', icon: Users, count: '100+ questions' },
  { title: 'AI Sales Tools Comparison', type: 'Report', icon: Bot, count: '25 tools' },
];

export const faqs = [
  {
    question: 'Do I need prior sales experience to join?',
    answer: 'No. Our Sales Career Launchpad is designed for complete beginners. We start with fundamentals and build up to advanced techniques over 12 weeks. 60% of our students come from non-sales backgrounds.',
  },
  {
    question: 'How does the AI Sales Simulator work?',
    answer: 'The simulator puts you in realistic sales scenarios with AI-powered buyers that respond dynamically to your approach. It scores you on confidence, communication, persuasion, closing ability, empathy, and professionalism — then gives you targeted drills to improve.',
  },
  {
    question: 'Which CRM tools will I learn?',
    answer: 'You get hands-on practice in our CRM Sandbox with Salesforce, HubSpot, and Zoho CRM. You\'ll create leads, manage pipelines, log activities, generate reports, and use AI assistance — all in a realistic environment.',
  },
  {
    question: 'What is the placement support like?',
    answer: 'Our placement team works with you 1-on-1: resume optimization with AI, mock interviews, LinkedIn optimization, and direct introductions to our hiring partner network of 200+ companies. We track your applications and interview status in a dedicated portal.',
  },
  {
    question: 'Can my company enroll a team?',
    answer: 'Yes. Our corporate training programs include custom learning paths, a dedicated dashboard to track every rep\'s progress, department-level analytics, and bulk enrollment. Average ramp time drops by 50%.',
  },
  {
    question: 'Are the certifications recognized?',
    answer: 'TalentGro certifications are recognized by 200+ hiring partners including Razorpay, Freshworks, Zoho, Postman, and Swiggy. Each certificate is verifiable via a unique ID and linked to your verified skill scores.',
  },
  {
    question: 'What is the time commitment?',
    answer: 'Most programs require 8–10 hours per week. The flagship bootcamp includes 4 live sessions, 2 AI practice sessions, 1 project, and daily challenges. All sessions are recorded so you never miss one.',
  },
  {
    question: 'Is there a free trial or assessment?',
    answer: 'Yes. You can take our free AI Career Assessment to get a personalized roadmap, and access select free resources — including the CRM Sandbox trial — before enrolling.',
  },
];

export const trustedCompanies = [
  'Razorpay',
  'Freshworks',
  'Zoho',
  'Postman',
  'Swiggy',
  'PhonePe',
  'Zomato',
  'Groww',
  'CRED',
  'Meesho',
];

export const heroStats = [
  { value: '12,000+', label: 'Students Trained' },
  { value: '94%', label: 'Placement Rate' },
  { value: '200+', label: 'Hiring Partners' },
  { value: '4.9/5', label: 'Student Rating' },
];

export const learningJourney = [
  {
    step: '01',
    title: 'Assess',
    description: 'Take the AI Career Assessment to identify your starting point and get a personalized learning roadmap.',
    icon: Target,
  },
  {
    step: '02',
    title: 'Learn',
    description: 'Progress through structured modules with video lessons, case studies, and interactive assignments.',
    icon: BookOpen,
  },
  {
    step: '03',
    title: 'Practice',
    description: 'Build muscle memory in the AI Sales Simulator and CRM Sandbox with realistic, scored scenarios.',
    icon: Bot,
  },
  {
    step: '04',
    title: 'Build',
    description: 'Complete live projects, build a portfolio, and generate an AI-optimized resume and LinkedIn profile.',
    icon: Award,
  },
  {
    step: '05',
    title: 'Get Placed',
    description: 'Practice interviews with AI, get matched with hiring partners, and track your applications to offer.',
    icon: Rocket,
  },
];
