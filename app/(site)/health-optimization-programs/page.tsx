import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seoData";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import HealthOptimizationProgramsClient from "./HealthOptimizationProgramsClient";

const PATH = "/health-optimization-programs";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, buildMetadata(PATH));
}

export default function Page() {
  return (
    <CMSRoute path={PATH}>
      <HealthOptimizationProgramsClient />
    </CMSRoute>
  );
}
