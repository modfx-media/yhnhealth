import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/page/Primitives";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { SITE_URL } from "@/lib/siteUrl";

const PATH = "/privacy-policy";

const fallbackMetadata: Metadata = {
  title: { absolute: "Privacy Policy | Your Health Now" },
  description:
    "How Your Health Now collects, uses, and protects information you provide through this website.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
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
            <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
            <h1 className="mt-6 font-display text-4xl text-brand-dark md:text-5xl">
              Privacy Policy
            </h1>
            <div className="mt-4 h-[3px] w-24 bg-accent" />
            <p className="mt-4 text-sm text-stone">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container max-w-3xl prose prose-stone">
            <h2>Information We Collect</h2>
            <p>
              Your Health Now LLC (&ldquo;YHN&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;)
              collects information you provide directly through our website, including when
              you submit a contact form, request an appointment, or subscribe to our
              newsletter. This may include your name, email address, telephone number, and
              the contents of any message you choose to send. We do not request or store
              Protected Health Information (PHI) through this website.
            </p>

            <h2>How We Use Information</h2>
            <p>
              We use the information you provide to respond to your inquiries, schedule
              appointments, send appointment reminders, and provide information about our
              services. We do not sell or rent your personal information to third parties.
            </p>

            <h2>Cookies &amp; Analytics</h2>
            <p>
              Our website uses cookies and standard web analytics (such as Google
              Analytics and Google Search Console) to understand site traffic and improve
              the visitor experience. You can disable cookies in your browser settings; some
              site features may not function properly if cookies are disabled.
            </p>

            <h2>Data Security</h2>
            <p>
              We use commercially reasonable safeguards to protect the information we
              collect. However, no method of transmission over the Internet is 100% secure,
              and we cannot guarantee absolute security.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our site may contain links to third-party websites (such as appointment
              portals, social media, or industry resources). We are not responsible for the
              privacy practices of those sites and encourage you to review their policies.
            </p>

            <h2>Your Choices</h2>
            <p>
              You may opt out of marketing emails at any time using the unsubscribe link in
              any message we send. To request access, correction, or deletion of any
              personal information you have provided to us, please contact us using the
              details below.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our website is not directed to children under 13. We do not knowingly collect
              information from children under 13.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &ldquo;Last
              updated&rdquo; date above reflects the most recent revision.
            </p>

            <h2>Contact Us</h2>
            <p>
              Your Health Now LLC
              <br />
              5 W Chestnut Ave, Merchantville, NJ 08109
              <br />
              Phone:{" "}
              <a href="tel:8565322063" className="text-accent-dark">
                (856) 532-2063
              </a>
            </p>
          </div>
        </section>
      </main>
    </CMSRoute>
  );
}
