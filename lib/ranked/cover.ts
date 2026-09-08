import { BlobNotFoundError, head, put } from '@vercel/blob'
import { COMMITTED_COVER_SLUGS, coverPrompt } from './config'

const FALLBACK_UNSPLASH = [
  'photo-1576091160399-112ba8d25d1d',
  'photo-1563986768609-322da13575f3',
  'photo-1559757148-5c350d0d3c56',
  'photo-1551836022-d5d88e9218df',
  'photo-1582750433449-648ed127bb54',
  'photo-1518770660439-4636190af475',
  'photo-1554224155-6726b3ff858f',
  'photo-1600880292203-757bb62b4baf',
  'photo-1606811841689-23dfddce3e95',
  'photo-1677442135703-1787eea5ce01',
  'photo-1551434678-e076c223a692',
  'photo-1552664730-d307ca884978',
  'photo-1600880292089-90a7e086ee0c',
  'photo-1554224154-26032ffc0d07',
  'photo-1497366216548-37526070297c',
  'photo-1450101499163-c8848c66ca85',
  'photo-1573496359142-b8d87734a5a2',
  'photo-1485827404703-89b55fcc595e',
  'photo-1542744173-8e7e53415bb0',
  'photo-1573497019940-1c28c88b4f3e',
  'photo-1522202176988-66273c2fd55f',
  'photo-1581595220892-b0739db3ba8c',
  'photo-1579684385127-1ef15d508118',
  'photo-1582719478250-c89cae4dc85b',
  'photo-1559757175-0eb30cd8c063',
  'photo-1584982751601-97dcc096659c',
] as const

/** Title-topic → Unsplash IDs so web fallbacks still match the article subject. */
const THEMED_UNSPLASH: { test: RegExp; ids: readonly string[] }[] = [
  {
    test: /pregnan|postpartum|pelvic|trimester|webster|prenatal/i,
    ids: [
      'photo-1555252333-9f8e92e65df9',
      'photo-1584583570840-0d3d68164049',
      'photo-1515488044360-fb630269b4be',
      'photo-1492725764893-90b379c2b6e7',
    ],
  },
  {
    test: /child|pediatric|kid|infant|baby|family chiropractor/i,
    ids: [
      'photo-1503454537195-1f4aaa63533c',
      'photo-1476703993599-0035a21b2896',
      'photo-1503453341500-6241bdd22d4a',
      'photo-1516627145497-ae6968895b74',
    ],
  },
  {
    test: /lyme|tick|co-infection/i,
    ids: [
      'photo-1441974231531-c6227db76b6e',
      'photo-1500382017468-9049fed747ef',
      'photo-1470071459604-3b5ec3a7fe05',
      'photo-1502082553048-f009c37129b9',
    ],
  },
  {
    test: /gut|digest|intestin|ibs|microbiome/i,
    ids: [
      'photo-1490645935967-10de6ba17061',
      'photo-1512621776951-a57141f2eefd',
      'photo-1498837167922-ddd27525d352',
      'photo-1546069901-ba9599a7e63c',
    ],
  },
  {
    test: /thyroid|hormone|fatigue|metabol|inflammation/i,
    ids: [
      'photo-1576091160399-112ba8d25d1d',
      'photo-1579684385127-1ef15d508118',
      'photo-1582719478250-c89cae4dc85b',
      'photo-1576678927484-cc907957088c',
    ],
  },
  {
    test: /spine|back pain|sciatica|disc|neck|posture|stiff/i,
    ids: [
      'photo-1571019613454-1cb2f99b2d8b',
      'photo-1544367567-0f2fcb009e0b',
      'photo-1518611012118-696072aa579a',
      'photo-1571019614242-c5c5dee9f50b',
    ],
  },
  {
    test: /holistic|pain management|active adult|neuromuscular/i,
    ids: [
      'photo-1571019613454-1cb2f99b2d8b',
      'photo-1544367567-0f2fcb009e0b',
      'photo-1517836357463-d25dfeac3438',
      'photo-1506126613408-eca07ce68773',
    ],
  },
  {
    test: /shoulder|knee|ankle|sport|athletic|running|sprain/i,
    ids: [
      'photo-1461896836934-ffe607ba6851',
      'photo-1476480862126-209bfaa8edc8',
      'photo-1517836357463-d25dfeac3438',
      'photo-1571008887538-b36bb32f4571',
    ],
  },
  {
    test: /nutrition|food|diet|supplement|integrative/i,
    ids: [
      'photo-1490645935967-10de6ba17061',
      'photo-1498837167922-ddd27525d352',
      'photo-1512621776951-a57141f2eefd',
      'photo-1546069901-ba9599a7e63c',
    ],
  },
  {
    test: /sleep|stress/i,
    ids: [
      'photo-1541781774459-bb2af2f05b55',
      'photo-1520206183501-b94df92ebd71',
      'photo-1511295742362-92c96b1cf484',
      'photo-1506126613408-eca07ce68773',
    ],
  },
  {
    test: /chiropract|adjustment|decompression|iastm|percussion/i,
    ids: [
      'photo-1576091160550-2173dba999ef',
      'photo-1666214280557-f1b5022eb634',
      'photo-1579684453423-f84349ef60b0',
      'photo-1559757175-0eb30cd8c063',
    ],
  },
]

function coverPngPath(contentId: string): string {
  return `blog-covers/${contentId}.png`
}

function coverJpgPath(contentId: string): string {
  return `blog-covers/${contentId}.jpg`
}

function committedCoverUrl(slug?: string): string | null {
  if (!slug) return null
  return COMMITTED_COVER_SLUGS.includes(slug) ? `/images/blog/covers/${slug}.png` : null
}

function hashSlug(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  return hash
}

function unsplashUrl(photoId: string): string {
  return `https://images.unsplash.com/${photoId}?w=1200&q=80&fit=crop`
}

function picsumUrl(slug: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(`yhn-${slug}`)}/1200/630`
}

function themedIdsForTitle(title: string): readonly string[] {
  for (const row of THEMED_UNSPLASH) {
    if (row.test.test(title)) return row.ids
  }
  return FALLBACK_UNSPLASH
}

export function uniqueWebCoverUrl(
  slug: string,
  reserved: Set<string> = new Set(),
  title?: string,
): string {
  const themed = title ? [...themedIdsForTitle(title)] : []
  const rest = FALLBACK_UNSPLASH.filter((id) => !themed.includes(id))
  const pools = [themed, rest].filter((p) => p.length > 0)
  for (const pool of pools) {
    const start = hashSlug(slug) % pool.length
    for (let i = 0; i < pool.length; i++) {
      const url = unsplashUrl(pool[(start + i) % pool.length])
      if (!reserved.has(url)) return url
    }
  }
  let seed = slug
  let n = 0
  let url = picsumUrl(seed)
  while (reserved.has(url) && n < 50) {
    n += 1
    seed = `${slug}-${n}`
    url = picsumUrl(seed)
  }
  return url
}

function imageModels(): string[] {
  const preferred = process.env.OPENAI_IMAGE_MODEL?.trim()
  const models = [preferred, 'gpt-image-2', 'gpt-image-1'].filter((m): m is string => Boolean(m))
  return [...new Set(models)]
}

async function existingBlobUrl(contentId: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL) return null
  for (const pathname of [coverPngPath(contentId), coverJpgPath(contentId)]) {
    try {
      const meta = await head(pathname)
      if (meta.url) return meta.url
    } catch (err) {
      if (!(err instanceof BlobNotFoundError)) return null
    }
  }
  return null
}

async function persistBuffer(pathname: string, bytes: Buffer, contentType: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL) return null
  const blob = await put(pathname, bytes, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType,
  })
  return blob.url
}

async function generatePng(title: string): Promise<Buffer | null> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  const prompt = coverPrompt(title)
  let lastError = ''
  for (const model of imageModels()) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, prompt, size: '1536x1024', quality: 'medium', n: 1 }),
    })
    const text = await res.text()
    if (!res.ok) {
      lastError = `${model} ${res.status}: ${text.slice(0, 240)}`
      continue
    }
    const json = JSON.parse(text) as { data?: Array<{ url?: string; b64_json?: string }> }
    const row = json.data?.[0]
    if (row?.b64_json) return Buffer.from(row.b64_json, 'base64')
    if (row?.url) {
      const img = await fetch(row.url)
      if (img.ok) return Buffer.from(await img.arrayBuffer())
    }
  }
  console.error(`[ranked] OpenAI cover generation exhausted: ${lastError}`)
  return null
}

export async function getRankedCoverImage(input: {
  contentId: string
  title: string
  generate: boolean
  slug?: string
  reservedUrls?: Set<string>
}): Promise<string> {
  const slug = input.slug ?? input.contentId
  const reserved = input.reservedUrls ?? new Set<string>()

  const committed = committedCoverUrl(input.slug)
  if (committed) {
    reserved.add(committed)
    return committed
  }

  const cached = await existingBlobUrl(input.contentId)
  if (cached) {
    reserved.add(cached)
    return cached
  }

  const webUrl = uniqueWebCoverUrl(slug, reserved, input.title)
  if (!input.generate) {
    reserved.add(webUrl)
    return webUrl
  }

  try {
    const png = await generatePng(input.title)
    if (png) {
      const url = await persistBuffer(coverPngPath(input.contentId), png, 'image/png')
      if (url) {
        reserved.add(url)
        return url
      }
    }

    const sourceUrl = uniqueWebCoverUrl(slug, reserved, input.title)
    const img = await fetch(sourceUrl)
    if (img.ok) {
      const bytes = Buffer.from(await img.arrayBuffer())
      const persisted = await persistBuffer(coverJpgPath(input.contentId), bytes, 'image/jpeg')
      const url = persisted || sourceUrl
      reserved.add(url)
      return url
    }
  } catch (err) {
    console.error(`[ranked] cover failed for ${input.contentId}`, err)
  }

  reserved.add(webUrl)
  return webUrl
}

export function ensureUniqueCoverImages<T extends { slug: string; coverImage: string; title?: string }>(
  posts: T[],
): T[] {
  const used = new Set<string>()
  return posts.map((post) => {
    let cover = post.coverImage
    if (!cover || used.has(cover)) cover = uniqueWebCoverUrl(post.slug, used, post.title)
    used.add(cover)
    return cover === post.coverImage ? post : { ...post, coverImage: cover }
  })
}
