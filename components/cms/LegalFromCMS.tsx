import { Breadcrumbs } from "@/components/page/Primitives";
import type { Page } from "@/payload-types";

export function LegalFromCMS({ doc }: { doc: Page }) {
  const sections = doc.sections?.filter((section) => section.body) ?? [];
  return (
    <main>
      <section className="bg-cream-light pt-12 pb-12 md:pt-16">
        <div className="container">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: doc.title }]} />
          <h1 className="mt-6 font-display text-4xl text-brand-dark md:text-5xl">{doc.title}</h1>
          <div className="mt-4 h-[3px] w-24 bg-accent" />
          {doc.intro ? <p className="mt-4 text-sm text-stone">{doc.intro}</p> : null}
        </div>
      </section>
      <section className="bg-white py-16 md:py-24">
        <div className="container max-w-3xl prose prose-stone">
          {doc.body ? <p>{doc.body}</p> : null}
          {sections.map((section) => (
            <div key={section.heading || section.body}>
              {section.heading ? <h2>{section.heading}</h2> : null}
              {section.body?.split("\n\n").map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
