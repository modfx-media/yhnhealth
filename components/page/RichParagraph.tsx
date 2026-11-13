import Link from "next/link";
import { parseRich } from "@/content/states/richText";

const linkClass =
  "font-semibold text-brand underline decoration-accent/50 underline-offset-4 hover:text-accent-dark";

export function RichInline({ text }: { text: string }) {
  const runs = parseRich(text);
  return (
    <>
      {runs.map((run, index) => {
        if (typeof run === "string") return <span key={index}>{run}</span>;
        if (run.href.startsWith("http")) {
          return (
            <a key={index} href={run.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {run.text}
            </a>
          );
        }
        return (
          <Link key={index} href={run.href} className={linkClass}>
            {run.text}
          </Link>
        );
      })}
    </>
  );
}

export default function RichParagraph({
  text,
  className = "text-base leading-relaxed text-stone",
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={className}>
      <RichInline text={text} />
    </p>
  );
}
