import { listRankedContent } from './client'
import { getRankedCoverImage } from './cover'
import { isBlogContentType, isRankedPostLive, slugFromTitle } from './html-to-post'
import { rankedCalendarBelongsHere, shouldImportRankedItem } from './site-fit'

export async function generateLiveRankedCovers(projectId: string): Promise<string[]> {
  const items = await listRankedContent(projectId)
  if (!rankedCalendarBelongsHere(items)) return []
  const slugs: string[] = []
  const reservedUrls = new Set<string>()

  for (const item of items) {
    if (!shouldImportRankedItem(item, true, isBlogContentType, isRankedPostLive)) {
      continue
    }
    const slug = slugFromTitle(item.title)
    await getRankedCoverImage({
      contentId: item.id,
      title: item.title,
      slug,
      generate: true,
      reservedUrls,
    })
    slugs.push(slug)
  }

  return slugs
}
