import { draftMode } from "next/headers";
import { queryRoutedContentByPath } from "@/lib/cms/query";
import { LivePreviewListener } from "./LivePreviewListener";
import { RenderRoutedContent } from "./RenderRoutedContent";

export async function CMSRoute({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const [routed, draft] = await Promise.all([queryRoutedContentByPath(path), draftMode()]);
  if (!routed) return children;
  return (
    <>
      {draft.isEnabled && <LivePreviewListener />}
      <RenderRoutedContent routed={routed} fallback={children} />
    </>
  );
}
