import type { Metadata } from "next";
import { Suspense } from "react";
import { CampaignIntro } from "@/components/campaigns/CampaignIntro";
import { CampaignsClosing } from "@/components/campaigns/CampaignsClosing";
import { FormatCatalogue } from "@/components/campaigns/FormatCatalogue";
import { NetworkConcepts } from "@/components/campaigns/NetworkConcepts";
import { PlannerFallback } from "@/components/planner/PlannerFallback";
import { PlannerLoader } from "@/components/planner/PlannerLoader";

const description =
  "Five example campaign formats for local fitness, wellness, and youth-sports businesses, four proposed athlete network concepts, and a planner that builds an illustrative campaign brief.";

export const metadata: Metadata = {
  title: "Campaigns",
  description,
};

export default function CampaignsPage() {
  return (
    <>
      <CampaignIntro />
      <FormatCatalogue />
      <NetworkConcepts />
      <Suspense fallback={<PlannerFallback />}>
        <PlannerLoader />
      </Suspense>
      <CampaignsClosing />
    </>
  );
}
