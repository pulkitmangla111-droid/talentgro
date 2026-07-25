'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  Programs: ['Sales Career Launchpad', 'Business Development', 'Consultative Selling', 'Enterprise Sales', 'CRM Training', 'AI Tools for Sales'],
  'AI Features': ['AI Sales Simulator', 'AI Interview Coach', 'AI Resume Builder', 'AI Career Advisor', 'AI Cold Email Generator', 'AI Objection Handler'],
  Resources: ['Blog', 'Free Resources', 'Webinars', 'CRM Sandbox', 'Career Pathways', 'Placement Portal'],
  Company: ['About Us', 'Trainers', 'Corporate Training', 'Hiring Partners', 'Contact', 'Careers'],
};

const socialLinks = ['LinkedIn', 'Twitter', 'YouTube', 'Instagram'];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      {/* Newsletter */}
      <div className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border/60 bg-card p-8 sm:flex-row">
            <div>
              <h3 className="font-display text-xl font-bold">Get sales tips in your inbox</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Weekly playbooks, templates, and AI sales insights. No spam.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input type="email" placeholder="you@example.com" className="flex-1" />
              <Button className="bg-brand hover:bg-brand-dark">
                Subscribe
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://talentgrosalesschool.com/wp-content/uploads/2023/09/Retina-Logo.png"
                alt="TalentGro Sales School"
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              India&apos;s most modern AI-powered Sales Learning Platform. Learn, practice,
              master CRM tools, and launch your sales career.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand" />
                hello@talentgro.in
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand" />
                +91 80 4567 8900
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                Bengaluru, India
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {category}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-brand"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 TalentGro Sales School. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social}
                href="#"
                className="text-xs font-medium text-muted-foreground transition-colors hover:text-brand"
              >
                {social}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-brand">Privacy</Link>
            <Link href="#" className="hover:text-brand">Terms</Link>
            <Link href="#" className="hover:text-brand">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
