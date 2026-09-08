import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/siteUrl";
import AutoRedirect from "./AutoRedirect";
import ThankYouClient from "./ThankYouClient";

const GOOGLE_ADS_ID = "AW-18270082937";

const TITLE = "Thank You - Consultation Booked | Your Health Now";
const DESCRIPTION =
  "Your complimentary functional medicine consultation with Your Health Now is confirmed. Here is what to expect next.";
const PATH = "/functional-medicine-special-offer/thank-you";

export const metadata: Metadata = {
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
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Script
        id="fm-thank-you-google-ads-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="fm-thank-you-google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
      <Script id="fm-thank-you-lead-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {
            'send_to': '${GOOGLE_ADS_ID}/C-5iCPHrq_EcEPmu7YdE'
          });
        `}
      </Script>
      <ThankYouClient autoRedirect={<AutoRedirect />} />
    </>
  );
}
