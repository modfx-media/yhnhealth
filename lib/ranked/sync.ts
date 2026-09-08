import { hasRankedApiKey, listRankedProjects } from './client'
import { generateLiveRankedCovers } from './publish'
import { revalidateRankedBlog } from './revalidate'
import { getRankedSiteTargets, isLocalOrigin, type RankedSiteTarget } from './sites'
import type { RankedProject } from './types'

function projectWebsite(project: RankedProject): string | null {
  return project.websiteUrl || project.website_url || null
}

async function pingRemoteCron(site: RankedSiteTarget): Promise<{ ok: boolean; error?: string }> {
  const secret = process.env.CRON_SECRET
  if (!secret) return { ok: false, error: 'CRON_SECRET missing' }

  const url = `${site.origin.replace(/\/$/, '')}/api/cron/publish-posts`
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: 'no-store',
    })
    if (!res.ok) return { ok: false, error: `${res.status}` }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'fetch failed' }
  }
}

export async function syncAllRankedSites() {
  const projects = hasRankedApiKey() ? await listRankedProjects().catch(() => []) : []
  const targets = getRankedSiteTargets()
  const mappedIds = new Set(targets.map((t) => t.projectId))

  const unmapped = projects
    .filter((p) => !mappedIds.has(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      status: p.status,
      websiteUrl: projectWebsite(p),
    }))

  const published: Array<{
    projectId: string
    name: string
    origin: string
    local: boolean
    livePosts: number
    slugs: string[]
    ping?: { ok: boolean; error?: string }
  }> = []

  for (const site of targets) {
    if (isLocalOrigin(site.origin)) {
      revalidateRankedBlog()
      const slugs = await generateLiveRankedCovers(site.projectId)
      published.push({
        projectId: site.projectId,
        name: site.name,
        origin: site.origin,
        local: true,
        livePosts: slugs.length,
        slugs,
      })
      continue
    }

    const ping = await pingRemoteCron(site)
    published.push({
      projectId: site.projectId,
      name: site.name,
      origin: site.origin,
      local: false,
      livePosts: 0,
      slugs: [],
      ping,
    })
  }

  return {
    rankedProjectCount: projects.length,
    mappedCount: targets.length,
    unmappedCount: unmapped.length,
    unmapped,
    published,
  }
}
