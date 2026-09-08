import { getRankedContentDetail, isRankedConfigured, listRankedContent } from './client'
import { ensureUniqueCoverImages, getRankedCoverImage } from './cover'
import { fetchGoogleDocHtml } from './google-doc'
import {
  ensureUniquePublishDates,
  htmlToBlogPost,
  isBlogContentType,
  isRankedPostLive,
  publishDateFromRanked,
  slugFromTitle,
} from './html-to-post'
import { getLocalBlogPosts } from './local-posts'
import { rankedCalendarBelongsHere, shouldImportRankedItem } from './site-fit'
import type { BlogPostData, RankedContentDetail, RankedContentListItem } from './types'

async function resolveArticleHtml(
  item: RankedContentListItem,
  detail: RankedContentDetail | null,
): Promise<string | null> {
  const fromRanked = detail?.content_body?.trim()
  if (fromRanked) return fromRanked
  const docUrl = detail?.document_url || detail?.source_url || item.document_url || item.source_url
  return fetchGoogleDocHtml(docUrl)
}

function relatedFromLocal(excludeSlug: string): { title: string; slug: string }[] {
  return [...getLocalBlogPosts()]
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 3)
    .map((p) => ({ title: p.h1, slug: p.slug }))
}

function uniqueSlug(title: string, contentId: string, taken: Set<string>): string {
  const base = slugFromTitle(title)
  if (!taken.has(base)) return base
  const withId = `${base}-${contentId.slice(0, 8)}`
  if (!taken.has(withId)) return withId
  let i = 2
  while (taken.has(`${base}-${i}`)) i += 1
  return `${base}-${i}`
}

const TITLE_STOP = new Set([
  'when',
  'to',
  'a',
  'the',
  'in',
  'for',
  'your',
  'may',
  'from',
  'what',
  'at',
  'why',
  'can',
  'is',
  'and',
  'of',
  'on',
  'with',
  'how',
  'seek',
  'help',
  'choose',
  'expect',
])

function titleTokens(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 2 && !TITLE_STOP.has(w)),
  )
}

function isSameArticleTitle(a: string, b: string): boolean {
  const na = a.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
  const nb = b.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
  if (na === nb) return true
  if (na.includes(nb) || nb.includes(na)) return true
  const A = titleTokens(a)
  const B = titleTokens(b)
  let inter = 0
  for (const t of A) if (B.has(t)) inter += 1
  const min = Math.min(A.size, B.size)
  return min > 0 && inter / min >= 0.72
}

function duplicatesLocalPost(title: string, local: BlogPostData[]): boolean {
  return local.some((p) => isSameArticleTitle(p.title, title) || isSameArticleTitle(p.h1, title))
}

export async function getLiveRankedBlogPosts(
  projectId?: string,
  opts: { generateCovers?: boolean; generateForSlug?: string } = {},
): Promise<BlogPostData[]> {
  if (!isRankedConfigured() && !projectId) return []
  const id = projectId || process.env.RANKED_PROJECT_ID
  if (!process.env.RANKED_API_KEY || !id) return []

  try {
    const items = await listRankedContent(id)
    if (!rankedCalendarBelongsHere(items)) return []
    const local = getLocalBlogPosts()
    const candidates = items.filter(
      (item) =>
        shouldImportRankedItem(item, true, isBlogContentType, isRankedPostLive) &&
        !duplicatesLocalPost(item.title, local),
    )
    const taken = new Set(local.map((p) => p.slug))
    const reservedCovers = new Set(local.map((p) => p.coverImage))
    const resolved = await Promise.all(
      candidates.map(async (item) => {
        let detail: RankedContentDetail | null = null
        try {
          detail = await getRankedContentDetail(item.id, id)
        } catch (err) {
          console.error(`[ranked] detail failed for ${item.id}`, err)
        }
        try {
          const html = await resolveArticleHtml(item, detail)
          if (!html) return null
          return { source: detail ?? item, html }
        } catch (err) {
          console.error(`[ranked] article HTML failed for ${item.id}`, err)
          return null
        }
      }),
    )

    const posts: BlogPostData[] = []
    for (const row of resolved) {
      if (!row) continue
      const { source, html } = row
      const slug = uniqueSlug(source.title, source.id, taken)
      const post = htmlToBlogPost({
        title: source.title,
        html,
        description: source.description,
        publishDate: publishDateFromRanked(source.scheduled_date, source.created_at),
        slug,
        coverImage: source.featured_image_url,
      })
      if (!post) continue
      post.coverImage = await getRankedCoverImage({
        contentId: source.id,
        title: source.title,
        slug,
        generate: Boolean(opts.generateCovers) || opts.generateForSlug === slug,
        reservedUrls: reservedCovers,
      })
      post.coverAlt = `${source.title} cover`
      post.relatedPosts = relatedFromLocal(slug)
      posts.push(post)
      taken.add(slug)
    }
    return ensureUniquePublishDates(ensureUniqueCoverImages(posts))
  } catch (err) {
    console.error('[ranked] failed to load content calendar', err)
    return []
  }
}

export async function getLiveRankedBlogPost(slug: string): Promise<BlogPostData | undefined> {
  const posts = await getLiveRankedBlogPosts(undefined, { generateForSlug: slug })
  return posts.find((p) => p.slug === slug)
}

export async function getPublishedBlogPost(slug: string): Promise<BlogPostData | undefined> {
  const posts = await getPublishedBlogPosts({ generateForSlug: slug })
  return posts.find((p) => p.slug === slug)
}

export async function getPublishedBlogPosts(opts: { generateForSlug?: string } = {}): Promise<BlogPostData[]> {
  const local = getLocalBlogPosts()
  const ranked = await getLiveRankedBlogPosts(undefined, opts)
  const taken = new Set(local.map((p) => p.slug))
  const merged = [...local, ...ranked.filter((p) => !taken.has(p.slug))]
  return ensureUniquePublishDates(ensureUniqueCoverImages(merged))
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const posts = await getPublishedBlogPosts()
  return posts.map((p) => p.slug)
}
