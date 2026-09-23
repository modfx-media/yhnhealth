import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/page/Primitives";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { SITE_URL } from "@/lib/siteUrl";

const PATH = "/medical-disclaimer";

const fallbackMetadata: Metadata = {
  title: { absolute: "Medical Disclaimer | Your Health Now" },
  description:
    "Educational information on Your Health Now is not a diagnosis. Care is provided by licensed clinicians in Merchantville, NJ and Chalfont, PA.",
  alternates: { canonical: `${SITE_URL}/medical-disclaimer` },
  robots: { index: true, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, fallbackMetadata);
}

export default function Page() {
  return (
    <CMSRoute path={PATH}>
    <main>
      <section className="bg-cream-light pt-12 pb-12 md:pt-16">
        <div className="container">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Medical Disclaimer" }]} />
          <h1 className="mt-6 font-display text-4xl text-brand-dark md:text-5xl">
            Medical Disclaimer
          </h1>
          <div className="mt-4 h-[3px] w-24 bg-accent" />
          <p className="mt-4 text-sm text-stone">Last updated: September 2, 2026</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container max-w-3xl prose prose-stone">
          <p>
            Your Health Now LLC operates chiropractic and functional medicine clinics at
            5 W Chestnut Ave, Merchantville, NJ 08109 and 350 N Main St #201, Chalfont, PA
            18914. Content on this website is for education and to help you decide whether
            to book a visit. It is not a diagnosis, treatment plan, or a substitute for an
            in-person exam.
          </p>
          <h2>Who provides care</h2>
          <p>
            Clinical care is provided by licensed doctors of chiropractic, including Dr.
            Chris Chianese (MS, DC, CPSC, FMCP), Dr. Marc Chianese (MS, DC, CPSC), and Dr.
            Lillee Chianese (DC, ART, CPSC, NRCME). Credentials can be confirmed on our{" "}
            <a href="/meet-the-doctor">Meet the Team</a> page.
          </p>
          <h2>Results vary</h2>
          <p>
            Individual results depend on the condition, medical history, and how closely a
            plan is followed. Testimonials reflect real patients; they are not a guarantee
            of the same outcome.
          </p>
          <h2>Emergencies</h2>
          <p>
            If you have chest pain, sudden weakness, loss of bowel or bladder control, or
            another emergency, call 911 or go to the nearest emergency department. Do not
            use this website or our contact form for urgent medical needs.
          </p>
          <h2>Insurance and scheduling</h2>
          <p>
            Coverage, copays, and appointment availability change. Call the clinic you plan
            to visit to confirm benefits and whether a service is appropriate for you.
          </p>
        </div>
      </section>
    </main>
    </CMSRoute>
  );
}
