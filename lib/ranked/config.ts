export const SITE_ORIGIN = (process.env.SITE_ORIGIN || 'https://yhnhealth.com').replace(/\/$/, '')

export const DEFAULT_COVER = '/images/blog/default-cover.jpg'
export const DEFAULT_COVER_ALT = 'Your Health Now wellness article'

export const DEFAULT_CTA = {
  label: 'Book an appointment',
  href: '/contact-us',
}

/** Cover must depict THIS article’s title — chiropractic / functional medicine clinic, no patient faces. */
export function coverPrompt(title: string): string {
  const topic = title.slice(0, 160).trim()
  return [
    'Photorealistic editorial photograph, 16:9 landscape, premium healthcare brand photography.',
    `The image MUST clearly illustrate this exact article topic: "${topic}".`,
    'Match the subject of the title literally (if the title is about gut health, show digestion/nutrition wellness; pregnancy, a prenatal wellness setting; back pain, spine/posture care; children, pediatric wellness — always the title’s subject).',
    'Setting: calm modern chiropractic and functional medicine clinic, natural window light, warm wood and cream tones, clinical but welcoming.',
    'Cinematic lighting, sharp focus, no grain, no watermark.',
    'No text, no letters, no logos, no captions, no readable signage, no charts.',
    'No patient faces, no identifiable people looking at camera, no medical gore, no needles, no blood, no graphic anatomy.',
  ].join(' ')
}

/**
 * Committed cover URL per slug. String map only — do not fs.stat public/.
 * Used for Ranked posts that already have a local image in this repo.
 */
export const COMMITTED_COVERS: Record<string, string> = {
  'chronic-lyme-vs-mold-illness-symptoms-testing-and-next-steps':
    '/images/blog/nguy-n-hi-p-2rNHliX6XHk-unsplash.jpg',
}

/** Slugs that already have a committed cover file. */
export const COMMITTED_COVER_SLUGS: readonly string[] = Object.keys(COMMITTED_COVERS)
