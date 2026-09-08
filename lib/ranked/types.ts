export const RANKED_CACHE_TAG = 'ranked-content'

export interface BlogPostData {
  slug: string
  title: string
  metaDescription: string
  h1: string
  publishDate: string
  intro: string
  coverImage: string
  coverAlt: string
  sections: { heading: string; body: string[] }[]
  cta: { label: string; href: string }
  relatedPosts?: { title: string; slug: string }[]
}

export interface RankedContentListItem {
  id: string
  title: string
  description: string | null
  scheduled_date: string | null
  due_date: string | null
  status: string
  content_type: string | null
  document_url: string | null
  source_url: string | null
  featured_image_url: string | null
  created_at: string
  updated_at: string
}

export interface RankedContentDetail extends RankedContentListItem {
  content_body: string | null
  meta_data: {
    word_count?: number
    reading_time?: string
  } | null
}

export interface RankedListResponse {
  success?: boolean
  data: RankedContentListItem[]
}

export interface RankedDetailResponse {
  success?: boolean
  data: RankedContentDetail
}

export interface RankedProject {
  id: string
  name: string
  status: string
  websiteUrl?: string | null
  website_url?: string | null
}

export interface RankedProjectsResponse {
  success?: boolean
  data: RankedProject[]
  meta?: {
    pagination?: {
      total?: number
      has_more?: boolean
    }
  }
}
