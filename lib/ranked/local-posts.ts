import { ARTICLES, type Article, type ArticleBlock } from '@/lib/articlesData'
import { DEFAULT_CTA } from './config'
import type { BlogPostData } from './types'

const MONTHS: Record<string, string> = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
}

/** Convert "August 25, 2026" (or already-ISO) to YYYY-MM-DD for unique-date logic. */
export function displayDateToIso(date: string): string {
  const iso = date.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso
  const match = iso.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/)
  if (match) {
    const month = MONTHS[match[1].toLowerCase()]
    if (month) return `${match[3]}-${month}-${match[2].padStart(2, '0')}`
  }
  const parsed = new Date(iso)
  if (!Number.isNaN(parsed.getTime())) {
    const y = parsed.getFullYear()
    const m = String(parsed.getMonth() + 1).padStart(2, '0')
    const d = String(parsed.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  return iso.slice(0, 10)
}

function blocksToSections(body: ArticleBlock[]): { heading: string; body: string[] }[] {
  const sections: { heading: string; body: string[] }[] = []
  let current: { heading: string; body: string[] } | null = null

  const pushPara = (text: string) => {
    if (!current) {
      current = { heading: '', body: [] }
      sections.push(current)
    }
    current.body.push(text)
  }

  for (const block of body) {
    if (block.type === 'h2' || block.type === 'h3') {
      current = { heading: block.text, body: [] }
      sections.push(current)
    } else if (block.type === 'p') {
      pushPara(block.text)
    } else if (block.type === 'list') {
      pushPara(block.items.map((item) => `• ${item}`).join('\n'))
    } else if (block.type === 'quote') {
      pushPara(block.cite ? `“${block.text}” — ${block.cite}` : `“${block.text}”`)
    } else if (block.type === 'callout') {
      pushPara(`${block.title}: ${block.text}`)
    }
  }

  return sections.filter((s) => s.body.length > 0)
}

function articleToBlogPost(article: Article): BlogPostData {
  const firstP = article.body.find((b) => b.type === 'p')
  const intro = firstP && firstP.type === 'p' ? firstP.text : article.excerpt
  const related = (article.related ?? [])
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a))
    .slice(0, 3)
    .map((a) => ({ title: a.title, slug: a.slug }))

  return {
    slug: article.slug,
    title: article.title,
    metaDescription: article.excerpt,
    h1: article.title,
    publishDate: displayDateToIso(article.date),
    intro,
    coverImage: article.image,
    coverAlt: article.imageAlt,
    sections: blocksToSections(article.body),
    cta: DEFAULT_CTA,
    relatedPosts: related.length ? related : undefined,
  }
}

export function getLocalBlogPosts(): BlogPostData[] {
  return ARTICLES.map(articleToBlogPost)
}
