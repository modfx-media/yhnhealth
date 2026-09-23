import type { Metadata } from "next";
import { Inter, Playfair_Display, Italianno } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPublishedGlobal } from "@/lib/cms/query";
import { headerToNavItems } from "@/lib/cms/nav";
import type { Header as HeaderGlobal } from "@/payload-types";
import ScrollToTop from "@/components/ScrollToTop";
import BottomBookBanner from "@/components/BottomBookBanner";
import { BookingProvider } from "@/components/BookingPopup";
import { SITE_URL } from "@/lib/siteUrl";
import JsonLd from "@/components/JsonLd";
import { organizationGraph } from "@/lib/schema";

const DEFAULT_OG_IMAGE = "/images/yhn-clone/your-health-now.jpg";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const italianno = Italianno({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chiropractor in Chalfont, PA & Merchantville, NJ | Your Health Now",
    template: "%s | Your Health Now",
  },
  description:
    "Your Health Now is a chiropractic and functional medicine clinic in Chalfont, PA and Merchantville, NJ. Doctor-led care for back pain, neck pain, sciatica, and root-cause health. Book today.",
  openGraph: {
    siteName: "Your Health Now",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Your Health Now - Chiropractic & Functional Medicine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "RMGFvea8aBi7XU_f9P0x_D09Zqowz_9LtZmaxlwkSm4",
  },
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await getPublishedGlobal<HeaderGlobal>("header");
  const navItems = headerToNavItems(header);
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${italianno.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-cream-light text-ink antialiased">
        <JsonLd data={organizationGraph()} />
        <Script
          id="ga4-loader"
          src="https://www.googletagmanager.com/gtag/js?id=G-GX8PHZR3EG"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GX8PHZR3EG');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0].parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yj6pifnu2p");
          `}
        </Script>
        <BookingProvider>
          <ScrollToTop />
          <Header items={navItems} />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <BottomBookBanner />
        </BookingProvider>

        <Script id="knock-knock-widget" strategy="afterInteractive">
          {`
            (function () {
              var bareRoutes = ['/functional-medicine-special-offer'];
              var path = window.location.pathname.replace(/\\/$/, '');
              for (var i = 0; i < bareRoutes.length; i++) {
                if (path === bareRoutes[i] || path.indexOf(bareRoutes[i] + '/') === 0) {
                  return;
                }
              }
              window.company_id = '6a355eb46b7af26290ba9224';
              var newScript = document.createElement('script');
              newScript.src = 'https://api.knock-knockapp.com/widget/widget.js';
              document.getElementsByTagName('HEAD')[0].appendChild(newScript);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
