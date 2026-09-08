import { RANKED_CACHE_TAG } from './types'

const DOC_ID_RE = /\/document\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]+)/

export function googleDocIdFromUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const match = url.match(DOC_ID_RE)
  return match?.[1] ?? null
}

function extractDocBody(html: string): string | null {
  const blocked =
    /accounts\.google\.com\/ServiceLogin|Sign in – Google accounts|<form[^>]+action="[^"]*ServiceLogin/i.test(
      html,
    )
  if (blocked) return null

  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const inner = (body?.[1] ?? html)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .trim()

  const text = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (text.length < 80) return null
  return inner
}

export async function fetchGoogleDocHtml(url: string | null | undefined): Promise<string | null> {
  const id = googleDocIdFromUrl(url)
  if (!id) return null

  const exportUrl = `https://docs.google.com/document/d/${id}/export?format=html`
  const res = await fetch(exportUrl, {
    headers: { Accept: 'text/html' },
    redirect: 'follow',
    next: { revalidate: 300, tags: [RANKED_CACHE_TAG] },
  })

  if (!res.ok) {
    console.error(`[ranked] Google Doc export ${res.status} for ${id}`)
    return null
  }

  const html = await res.text()
  const body = extractDocBody(html)
  if (!body) {
    console.error(`[ranked] Google Doc ${id} is not publicly readable (share: anyone with the link)`)
  }
  return body
}
