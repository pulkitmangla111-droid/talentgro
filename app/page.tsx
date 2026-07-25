import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { TrustedCompanies } from '@/components/sections/trusted-companies';
import { Programs } from '@/components/sections/programs';
import { LearningJourney } from '@/components/sections/learning-journey';
import { AIFeatures } from '@/components/sections/ai-features';
import { SalesSimulator } from '@/components/sections/sales-simulator';
import { CRMSandbox } from '@/components/sections/crm-sandbox';
import { CareerPathways } from '@/components/sections/career-pathways';
import { PlacementSupport } from '@/components/sections/placement-support';
import { CorporateSolutions } from '@/components/sections/corporate-solutions';
import { Testimonials } from '@/components/sections/testimonials';
import { TrainerShowcase } from '@/components/sections/trainer-showcase';
import { Webinars } from '@/components/sections/webinars';
import { BlogPreviews } from '@/components/sections/blog-previews';
import { FreeResources } from '@/components/sections/free-resources';
import { FAQ } from '@/components/sections/faq';
import { FinalCTA } from '@/components/sections/final-cta';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedCompanies />
        <Programs />
        <LearningJourney />
        <AIFeatures />
        <SalesSimulator />
        <CRMSandbox />
        <CareerPathways />
        <PlacementSupport />
        <CorporateSolutions />
        <Testimonials />
        <TrainerShowcase />
        <Webinars />
        <BlogPreviews />
        <FreeResources />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
