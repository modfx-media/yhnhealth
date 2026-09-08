import {
  ARTICLE_BY_SLUG,
  type Article,
  type ArticleBlock,
  type ArticleCategory,
} from '@/lib/articlesData'
import type { BlogPostData } from './types'

function isoToDisplayDate(iso: string): string {
  const day = iso.slice(0, 10)
  const match = day.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return iso
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])))
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function inferCategory(title: string): ArticleCategory {
  const t = title.toLowerCase()
  if (/\b(child|kid|pediatric|infant)\b/.test(t)) return 'Wellness4Kids'
  if (/\b(lyme|gut|hormone|thyroid|fatigue|functional medicine|inflammation|digest)\b/.test(t)) {
    return 'Functional Medicine'
  }
  if (/\b(sciatica|disc|headache|shoulder|knee|ankle|sprain|running injur)\b/.test(t)) {
    return 'Common Conditions Treated'
  }
  if (/\b(art|iastm|decompression|percussion|vibracussion|therapy)\b/.test(t)) {
    return 'Therapies & Techniques'
  }
  if (/\b(chiropractic|adjustment|spine|posture)\b/.test(t)) return 'About Chiropractic Care'
  return 'Health & Wellness'
}

function wordCount(post: BlogPostData): number {
  const text = [post.intro, ...post.sections.flatMap((s) => [s.heading, ...s.body])].join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

function postToBody(post: BlogPostData): ArticleBlock[] {
  const body: ArticleBlock[] = []
  if (post.intro.trim()) body.push({ type: 'p', text: post.intro })
  for (const section of post.sections) {
    if (section.heading.trim()) body.push({ type: 'h2', text: section.heading })
    for (const para of section.body) {
      if (para.trim()) body.push({ type: 'p', text: para })
    }
  }
  return body
}

export function blogPostToArticle(post: BlogPostData): Article {
  const local = ARTICLE_BY_SLUG[post.slug]
  if (local) {
    return {
      ...local,
      date: isoToDisplayDate(post.publishDate),
      image: post.coverImage || local.image,
      imageAlt: post.coverAlt || local.imageAlt,
    }
  }

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.metaDescription,
    category: inferCategory(post.title),
    date: isoToDisplayDate(post.publishDate),
    readTime: Math.max(3, Math.round(wordCount(post) / 220)),
    image: post.coverImage,
    imageAlt: post.coverAlt || `${post.title} cover`,
    body: postToBody(post),
    related: post.relatedPosts?.map((r) => r.slug),
  }
}

export function relatedArticlesFor(post: BlogPostData, all: Article[]): Article[] {
  const fromRanked = (post.relatedPosts ?? [])
    .map((r) => all.find((a) => a.slug === r.slug))
    .filter((a): a is Article => a !== undefined)
    .filter((a) => a.slug !== post.slug)

  if (fromRanked.length >= 3) return fromRanked.slice(0, 3)

  const current = all.find((a) => a.slug === post.slug)
  const fillers = all.filter(
    (x) =>
      x.slug !== post.slug &&
      !fromRanked.some((r) => r.slug === x.slug) &&
      (!current || x.category === current.category),
  )
  return [...fromRanked, ...fillers].slice(0, 3)
}
