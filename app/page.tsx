import type { Metadata } from "next";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LocalPilot } from "@/components/home/LocalPilot";
import { ManagedSupport } from "@/components/home/ManagedSupport";
import { Networks } from "@/components/home/Networks";
import { Packages } from "@/components/home/Packages";
import { Problem } from "@/components/home/Problem";
import { Reporting } from "@/components/home/Reporting";
import { SchoolWorkflow } from "@/components/home/SchoolWorkflow";
import { siteConfig } from "@/lib/site.config";

const description =
  "MatchPoint helps local fitness, wellness, and youth-sports businesses run measurable marketing campaigns with college athletes. Plan the campaign, coordinate the athlete group, prepare the documentation, and track customer actions.";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Make local NIL perform.`,
  description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Packages />
      <Reporting />
      <Networks />
      <HowItWorks />
      <SchoolWorkflow />
      <ManagedSupport />
      <LocalPilot />
      <FaqSection />
      <FinalCta />
    </>
  );
}
