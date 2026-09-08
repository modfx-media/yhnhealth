import { revalidatePath, revalidateTag } from 'next/cache'
import { RANKED_CACHE_TAG } from './types'

export function revalidateRankedBlog() {
  revalidateTag(RANKED_CACHE_TAG, 'max')
  revalidatePath('/articles')
  revalidatePath('/articles/[slug]', 'page')
  revalidatePath('/sitemap.xml')
}
