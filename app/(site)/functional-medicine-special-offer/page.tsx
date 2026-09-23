import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/siteUrl";
import FunctionalMedicineLPClient from "./FunctionalMedicineLPClient";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";

const GOOGLE_ADS_ID = "AW-18270082937";

const TITLE = "Functional Medicine Special Offer | Complimentary Consultation | Your Health Now";
const DESCRIPTION =
  "Limited-time complimentary 30-minute functional medicine consultation in Merchantville, NJ & Chalfont, PA. Get root-cause answers - book today.";
const PATH = "/functional-medicine-special-offer";

const fallbackMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PATH}`,
    type: "website",
    siteName: "Your Health Now",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata(PATH, fallbackMetadata);
}

export default function Page() {
  return (
    <CMSRoute path={PATH}>
    <>
      {/* Google Ads (gtag.js) - scoped to this landing page only */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GOOGLE_ADS_ID}');

          gtag('config', '${GOOGLE_ADS_ID}/90LoCK6axsUcEPmu7YdE', {
            'phone_conversion_number': '(609) 869-9498'
          });
        `}
      </Script>
      {/* Conversion helpers: call-to-call and outbound free-consult click */}
      <Script id="gtag-conversion-helpers" strategy="afterInteractive">
        {`
          function gtag_report_conversion_call(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') { window.location = url; }
            };
            gtag('event', 'conversion', {
              'send_to': '${GOOGLE_ADS_ID}/nKGVCLGaxsUcEPmu7YdE',
              'value': 1.0,
              'currency': 'USD',
              'event_callback': callback
            });
            return false;
          }

          function gtag_report_conversion_consult(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') { window.location = url; }
            };
            gtag('event', 'conversion', {
              'send_to': '${GOOGLE_ADS_ID}/bv0_CPiPscUcEPmu7YdE',
              'event_callback': callback
            });
            return false;
          }

          // Back-compat alias matching the snippet provided by Google Ads UI.
          window.gtag_report_conversion = gtag_report_conversion_consult;
        `}
      </Script>
      <FunctionalMedicineLPClient />
    </>
    </CMSRoute>
  );
}
