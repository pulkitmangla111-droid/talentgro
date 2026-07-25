import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TalentGro Sales School — AI-Powered Sales Learning Platform',
  description:
    'Become an industry-ready sales professional using AI, live projects & real business simulations. Learn from experts, practice with AI, master CRM tools, and launch your sales career.',
  keywords: [
    'sales training',
    'sales course',
    'CRM training',
    'sales career',
    'AI sales simulator',
    'sales certification',
    'sales learning platform',
    'corporate sales training',
  ],
  openGraph: {
    title: 'TalentGro Sales School — AI-Powered Sales Learning Platform',
    description:
      'Become an industry-ready sales professional using AI, live projects & real business simulations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalentGro Sales School',
    description:
      'AI-powered sales learning platform. Learn, practice, master CRM, and launch your sales career.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
