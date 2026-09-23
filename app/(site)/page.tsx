import type { Metadata } from "next";
import HomePageView from "@/components/home/HomePageView";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { SITE_URL } from "@/lib/siteUrl";

const PATH = "/";

const fallbackMetadata: Metadata = {
  title: {
    absolute:
      "Chiropractor in Chalfont, PA & Merchantville, NJ | Your Health Now",
  },
  description:
    "Your Health Now is a chiropractic and functional medicine clinic in Chalfont, PA and Merchantville, NJ. Doctor-led care for back pain, neck pain, sciatica, and root-cause health. Same-week appointments.",
  keywords: [
    "chiropractor chalfont pa",
    "chiropractor merchantville nj",
    "chiropractor bucks county",
    "functional medicine chalfont",
    "chiropractor near me",
  ],
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "Chiropractor in Chalfont, PA & Merchantville, NJ | Your Health Now",
    description:
      "Chiropractic and functional medicine under one roof in Chalfont, PA and Merchantville, NJ. Book a visit.",
    url: `${SITE_URL}/`,
    type: "website",
    siteName: "Your Health Now",
    images: [
      {
        url: "/images/yhn-clone/your-health-now.jpg",
        width: 1200,
        height: 630,
        alt: "Your Health Now chiropractic and functional medicine in Chalfont, PA and Merchantville, NJ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chiropractor in Chalfont, PA & Merchantville, NJ | Your Health Now",
    description:
      "Doctor-led chiropractic and functional medicine in Chalfont, PA and Merchantville, NJ.",
    images: ["/images/yhn-clone/your-health-now.jpg"],
  },
  robots: { index: true, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, fallbackMetadata);
}

export default function HomePage() {
  return (
    <CMSRoute path={PATH}>
      <HomePageView />
    </CMSRoute>
  );
}
