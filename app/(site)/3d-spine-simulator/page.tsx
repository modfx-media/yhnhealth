import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seoData";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import SpineSimulatorClient from "@/components/page/SpineSimulatorClient";

const PATH = "/3d-spine-simulator";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, buildMetadata(PATH));
}

export default function Page() {
  return (
    <CMSRoute path={PATH}>
      <SpineSimulatorClient />
    </CMSRoute>
  );
}
