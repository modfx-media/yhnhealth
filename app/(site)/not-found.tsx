import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Your Health Now" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="bg-cream-light py-24">
      <div className="container max-w-2xl text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-accent-dark">404</p>
        <h1 className="mt-4 font-display text-4xl text-brand-dark md:text-5xl">Page not found</h1>
        <p className="mt-4 text-stone">
          That URL is not on this site. Try the homepage or contact the clinic.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
