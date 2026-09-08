/**
 * Never publish another client's Ranked calendar onto yhnhealth.com
 * (Merchantville NJ / Chalfont PA).
 */

const THIS_SITE = /\b(merchantville|chalfont|haddonfield|doylestown|villanova|berwyn|furlong|bucks county|main line|camden county|new jersey|\bnj\b|pennsylvania|\bpa\b|your health now|\byhn\b)\b/i

const FOREIGN_MARKET =
  /\b(orange county|huntington beach|irvine|newport beach|costa mesa|santa ana|anaheim|los angeles|california|\bca\b|houston|austin|dallas|living light|justin healthcare)\b/i

function haystack(title: string, extra?: string | null): string {
  return `${title} ${extra ?? ''}`
}

export function mentionsForeignMarket(title: string, extra?: string | null): boolean {
  return FOREIGN_MARKET.test(haystack(title, extra))
}

export function mentionsThisSite(title: string, extra?: string | null): boolean {
  return THIS_SITE.test(haystack(title, extra))
}

/** If the calendar is clearly another market and has zero YHN geos, import nothing. */
export function rankedCalendarBelongsHere(items: Array<{ title: string; description?: string | null }>): boolean {
  if (items.length === 0) return true
  const foreign = items.filter((i) => mentionsForeignMarket(i.title, i.description)).length
  const local = items.filter((i) => mentionsThisSite(i.title, i.description)).length
  if (foreign > 0 && local === 0) {
    console.error(
      `[ranked] RANKED_PROJECT_ID is another client (${foreign}/${items.length} off-market titles). Import skipped.`,
    )
    return false
  }
  return true
}

export function isThisSiteRankedItem(item: { title: string; description?: string | null }): boolean {
  return !mentionsForeignMarket(item.title, item.description)
}

export function shouldImportRankedItem(
  item: {
    title: string
    description?: string | null
    scheduled_date: string | null
    content_type: string | null
    status: string
  },
  calendarBelongsHere: boolean,
  isBlog: (type: string | null) => boolean,
  isLive: (status: string, scheduled: string | null) => boolean,
): boolean {
  if (!calendarBelongsHere) return false
  if (!isBlog(item.content_type) || !isLive(item.status, item.scheduled_date)) return false
  return isThisSiteRankedItem(item)
}
