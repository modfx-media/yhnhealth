import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { previewFromPath } from "@/lib/cms/preview";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("previewSecret");
  const path = searchParams.get("path");

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!path || previewFromPath(path) === null) {
    return new Response("Invalid path", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(path);
}
