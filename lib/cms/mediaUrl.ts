import { SITE_URL } from "@/lib/siteUrl"

/** Public image URL from a populated Media doc. */
export function mediaUrl(image: unknown): string | undefined {
  if (!image || typeof image !== "object") return undefined
  const doc = image as { url?: unknown; filename?: unknown }
  const fromUrl = publicImageSrc(typeof doc.url === "string" ? doc.url : undefined)
  if (fromUrl) return fromUrl
  if (typeof doc.filename !== "string") return undefined
  const filename = doc.filename.trim().replace(/^\/+/, "")
  if (!filename || filename.split("/").includes("..")) return undefined
  return `/api/media/file/${filename.split("/").map((part) => encodeURIComponent(part)).join("/")}`
}

/**
 * Image src Next can render.
 * Designed `/images` paths and remote Blob URLs stay as-is.
 * Payload's `/media` and `https://<site>/api/media/file` URLs 404 or fail the image optimizer on Vercel;
 * the file route serves the Blob object when requested as a root-relative path.
 */
export function publicImageSrc(src: string | null | undefined): string | undefined {
  if (!src) return undefined
  const trimmed = src.trim()
  if (!trimmed) return undefined

  if (/^https?:\/\//i.test(trimmed)) {
    let url: URL
    try {
      url = new URL(trimmed)
    } catch {
      return undefined
    }
    if (url.hostname.endsWith(".blob.vercel-storage.com")) return trimmed
    if (isSameSite(url.hostname)) {
      return payloadFilePath(`${url.pathname}${url.search}`) ?? `${url.pathname}${url.search}`
    }
    return trimmed
  }

  return payloadFilePath(trimmed.startsWith("media/") ? `/${trimmed}` : trimmed) ?? trimmed
}

function isSameSite(hostname: string): boolean {
  const host = hostname.toLowerCase()
  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".vercel.app")) return true
  if (host === "yhnhealth.com" || host === "www.yhnhealth.com") return true
  try {
    return host === new URL(SITE_URL).hostname.toLowerCase()
  } catch {
    return false
  }
}

function payloadFilePath(path: string): string | undefined {
  const hashIndex = path.indexOf("#")
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path
  const queryIndex = withoutHash.indexOf("?")
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash
  const search = queryIndex >= 0 ? withoutHash.slice(queryIndex) : ""

  if (pathname.startsWith("/api/media/file/")) return `${pathname}${search}`

  if (pathname.startsWith("/media/")) {
    const rest = pathname.slice("/media/".length)
    if (!rest || rest.split("/").includes("..")) return undefined
    return `/api/media/file/${rest}${search}`
  }

  return undefined
}
