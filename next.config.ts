import path from "path";
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  trailingSlash: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/**" },
    ],
  },
  outputFileTracingExcludes: {
    "*": ["./public/images/**", "./public/**/*.mp4", "./public/**/*.webm"],
  },
  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/sharp/**/*",
      "./node_modules/@img/sharp-linux-x64/**/*",
      "./node_modules/@img/sharp-libvips-linux-x64/**/*",
    ],
  },
  serverExternalPackages: [
    "pg",
    "@payloadcms/db-vercel-postgres",
    "@neondatabase/serverless",
    "@vercel/postgres",
  ],
  turbopack: {
    resolveAlias: {
      bytes: "./node_modules/bytes",
    },
  },
  // The /areas-we-serve programmatic city x service grid (~1,081 URLs) was retired
  // in favor of /functional-medicine/{state} telehealth pages + /locations. These
  // 308 redirects preserve link equity by routing every old URL to its closest
  // still-live equivalent.
  async redirects() {
    const serviceRedirects: Array<{ source: string; destination: string }> = [
      { source: "chiropractic-care", destination: "/locations" },
      { source: "family-chiropractic", destination: "/family-chiropractic-care" },
      { source: "pediatric-chiropractic", destination: "/pediatric-care" },
      { source: "pregnancy-chiropractic", destination: "/pregnancy-care" },
      { source: "webster-technique", destination: "/webster-technique" },
      { source: "sports-chiropractic", destination: "/athletic-care" },
      { source: "geriatric-chiropractic", destination: "/geriatric-care" },
      { source: "back-pain-relief", destination: "/lower-back" },
      { source: "neck-pain-relief", destination: "/head-and-neck" },
      { source: "lower-back-pain", destination: "/lower-back" },
      { source: "upper-back-pain", destination: "/upper-back" },
      { source: "shoulder-pain-relief", destination: "/shoulder-and-clavicle" },
      { source: "headache-relief", destination: "/head-and-neck" },
      { source: "migraine-relief", destination: "/head-and-neck" },
      { source: "sciatica-relief", destination: "/lower-back" },
      { source: "spinal-decompression", destination: "/decompression-therapy" },
      { source: "iastm-therapy", destination: "/iastm" },
      { source: "art-therapy", destination: "/art" },
      { source: "percussion-therapy", destination: "/percussion-therapy" },
      { source: "arthrostimulation-therapy", destination: "/arthrostimulation-therapy" },
      { source: "vibracussion-therapy", destination: "/vibracussion-therapy" },
      { source: "functional-medicine", destination: "/functional-medicine" },
      { source: "functional-kinesiology", destination: "/functional-kinesiology" },
      { source: "functional-postural-analysis", destination: "/functional-postural-analysis" },
      { source: "functional-movement-restoration", destination: "/functional-movement-restoration" },
      { source: "nutritional-counseling", destination: "/lifestyle-and-nutritional-advice" },
      { source: "integrative-nutrition", destination: "/integrative-nutrition" },
      { source: "ergonomics-consultation", destination: "/ergonomics" },
      { source: "dot-physicals", destination: "/dot-physicals" },
      { source: "lyme-disease-care", destination: "/lyme-disease-solutions" },
      { source: "athletic-care", destination: "/athletic-care" },
      { source: "corporate-wellness", destination: "/health-talks" },
      { source: "worksite-care", destination: "/worksite-care" },
      { source: "knee-pain-relief", destination: "/lower-back" },
      { source: "car-accident-recovery", destination: "/head-and-neck" },
    ];

    return [
      // CMS posts used to be stored under /blog. The public article URLs live at /articles.
      { source: "/blog", destination: "/articles", permanent: true },
      { source: "/blog/:slug", destination: "/articles/:slug", permanent: true },
      // /areas-we-serve/{city}/{service} -> closest live service/office page (one rule per service, any city)
      ...serviceRedirects.map(({ source, destination }) => ({
        source: `/areas-we-serve/:city/${source}`,
        destination,
        permanent: true,
      })),
      // Any city/service pair not listed above still leaves the retired grid.
      { source: "/areas-we-serve/:city/:service", destination: "/locations", permanent: true },
      // /areas-we-serve/{city} city index -> the two-office locations page
      { source: "/areas-we-serve/:city", destination: "/locations", permanent: true },
      // /areas-we-serve grid index -> the two-office locations page
      { source: "/areas-we-serve", destination: "/locations", permanent: true },
    ];
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      bytes: path.resolve(process.cwd(), "node_modules/bytes"),
    };
    return config;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
