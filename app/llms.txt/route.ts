import { SITE_URL } from "@/lib/siteUrl";
import { TELEHEALTH_STATES } from "@/data/telehealth-states";

/** Plain-text crawler guide for AI assistants (ChatGPT, Perplexity, Claude, etc). See GEO section of the SEO strategy guide. */
export async function GET() {
  const stateLines = TELEHEALTH_STATES.map(
    (s) => `- ${s.name} telehealth: ${SITE_URL}/functional-medicine/${s.slug}`,
  ).join("\n");

  const body = `# Your Health Now

> Doctor-led chiropractic and functional medicine clinic with two offices (Merchantville, NJ and Chalfont, PA) and functional medicine telehealth available in ${TELEHEALTH_STATES.length} states.

## Pillars
- Functional Medicine: ${SITE_URL}/functional-medicine
- Chiropractic Care: ${SITE_URL}/family-chiropractic-care
- Family & Specialty Care: ${SITE_URL}/pediatric-care, ${SITE_URL}/pregnancy-care, ${SITE_URL}/athletic-care, ${SITE_URL}/dot-physicals

## Offices
- Merchantville, NJ: ${SITE_URL}/locations#merchantville
- Chalfont, PA: ${SITE_URL}/locations#chalfont
- All locations: ${SITE_URL}/locations

## Doctors
- Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP: ${SITE_URL}/meet-the-doctor#dr-chris
- Dr. Marc Chianese, MS, DC: ${SITE_URL}/meet-the-doctor#dr-marc
- Dr. Lillee Chianese, DC, ART, CPSC, NRCME: ${SITE_URL}/meet-the-doctor#dr-lillee

## Functional Medicine Telehealth, by State
${stateLines}

## Booking
- Free 30-minute functional medicine consult (Jane App): https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2
- Contact: ${SITE_URL}/contact-us
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
