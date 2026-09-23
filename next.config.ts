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
