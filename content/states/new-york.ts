import {
  CDC_OBESITY_2024_HREF,
  CDC_OBESITY_2024_LABEL,
  CENSUS_AGE_65_2024_HREF,
  CENSUS_AGE_65_2024_LABEL,
} from "./citations";
import type { HoStatePage } from "./types";

/**
 * Final New York copy, Nov 13, 2026.
 * Dropped 404s: /articles/functional-medicine-for-busy-professionals and
 * /articles/chronic-fatigue-vs-burnout-vs-depression. The sentence now links
 * the existing fatigue article instead.
 */
const newYork: HoStatePage = {
  slug: "new-york",
  name: "New York",
  abbreviation: "NY",
  presence: "ho-telehealth",
  title: "Health Optimization Telehealth in New York | YHN",
  metaDescription:
    "Health optimization telehealth in New York is a secure video visit with Dr. Chris Chianese, from the city to Buffalo. There is no YHN clinic in the state.",
  h1: "Health Optimization Programs by Telehealth in New York",
  primaryKeyword: "health optimization telehealth in New York",
  blocks: [
    {
      type: "p",
      text: "A lot of people in New York search for a functional medicine doctor as if the only door that matters is an office in Manhattan. Your Health Now does not have a New York clinic — not in New York City, not in Westchester, not in Albany, Buffalo, Rochester, or on Long Island — and we will not pretend otherwise.",
    },
    {
      type: "p",
      text: "What is open to New York residents is a Health Optimization Program with Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP, by secure video. These are structured, doctor-led 6- or 12-month pathways that use a functional medicine approach for people who want a plan around energy, hormones, metabolism, longevity, and related goals, even if they are not dealing with a major or complex illness. They start with a complimentary 30-minute consult and, if you continue, a 90-minute telehealth visit.",
    },
    {
      type: "p",
      text: "What is not currently listed for New York is Personalized Clinical Care, the functional medicine telehealth pathway Your Health Now offers for more complex or ongoing illness. That clinical pathway is open today in nine places listed on the [Functional Medicine](/functional-medicine) page: New Jersey, Pennsylvania, Florida, Delaware, Vermont, Arizona, Idaho, Washington, and Washington, D.C. If you live in New York and your situation is chronic, multi-system, or has not improved with conventional care, say so on the consult. We will not enroll you in a Health Optimization Program just to have a New York listing, and we will not imply that the nine-state clinical pathway is already available here.",
    },
    { type: "h2", text: "What is available in New York — and what is not" },
    { type: "p", text: "Available to New York residents:" },
    {
      type: "ul",
      items: [
        "All twelve [Health Optimization Programs](/health-optimization-programs), by secure video, from anywhere in the state, including New York City, Long Island, the Hudson Valley, and upstate.",
        "A complimentary 30-minute fit-check consult with Dr. Chris, booked through Jane App or by calling (609) 651-7436.",
      ],
    },
    { type: "p", text: "Not available in New York:" },
    {
      type: "ul",
      items: [
        "A Your Health Now clinic, waiting room, physical exam, or chiropractic adjustment. Hands-on care is only at 5 W Chestnut Ave, Merchantville, NJ, and 350 N Main St #201, Chalfont, PA. If you will not be traveling to either office, do not expect a local in-person visit to be part of this program.",
        "Personalized Clinical Care / functional medicine telehealth for complex or chronic illness, unless and until the practice confirms that pathway is open in New York. It is not listed on the live site today.",
        "A prediction of a particular result. Program details for a New York resident are covered in the consult, not assumed from a search result.",
        "A statement that Dr. Chris is licensed to practice every form of care in New York. Telehealth licensing rules vary by state and by provider type. The team confirms licensing and scope of practice before a first visit.",
      ],
    },
    {
      type: "p",
      text: "If you live in New Jersey or Pennsylvania and you want both video programs and a nearby clinic — and, in those two states, the functional medicine clinical pathway as well — use [Health Optimization in New Jersey](/health-optimization-programs/new-jersey) or [Health Optimization in Pennsylvania](/health-optimization-programs/pennsylvania).",
    },
    { type: "h2", text: "How care works from New York" },
    {
      type: "p",
      text: "New York is on Eastern time, the same clock as the Merchantville and Chalfont clinics. A time on the booking calendar is the time on your clock, whether you are in Brooklyn or Buffalo.",
    },
    {
      type: "p",
      text: "The first conversation is the free 30-minute consult. It is not a treatment visit and not a diagnosis. You talk through why you are calling and whether a Health Optimization Program is a fit. If it is, the program begins with a 90-minute telehealth visit: intake, goal setting, and the choice of a 6-month or 12-month pathway. Professional supplements, when recommended, are purchased separately.",
    },
    {
      type: "p",
      text: "There is no “New York City track” and no “upstate track.” The program is the program. The only geography that changes the logistics is whether you also intend to travel to one of the two clinics for hands-on care, which most New York residents will not.",
    },
    { type: "h2", text: "New York health picture, and which programs are most relevant here" },
    {
      type: "p",
      text: "These figures are public statistics about the state, not results we claim for patients.",
    },
    {
      type: "p",
      text: "The CDC’s 2024 BRFSS adult obesity maps put New York at 29.5% — close to the figures for California (29.1%) and Florida (29.6%) on the same table. For residents whose goals involve weight change, cravings, or a slower metabolism, the [Healthy Weight & Metabolism Program](/health-optimization-programs) is the pathway designed for that work.",
    },
    {
      type: "p",
      text: "A second pattern we take seriously is the stacked New York workday: people who feel drained, foggy, or off, without a single clear diagnosis. Two programs are written for that picture. The [Energy Restoration Program](/health-optimization-programs) is for ongoing fatigue, burnout, low motivation, poor recovery, or brain fog. The [Brain Health & Cognitive Performance Program](/health-optimization-programs) is for brain fog, poor concentration, memory concerns, or a wish to support focus and healthy aging. Our article on [why fatigue persists](/articles/functional-medicine-fatigue-root-causes) is a companion for that conversation, not a stand-in for a clinical visit.",
    },
    {
      type: "p",
      text: "The [Hormone Balance & Vitality Program](/health-optimization-programs) is the third pathway we highlight for New York. It is designed for symptoms that may be related to hormone imbalance — fatigue, weight changes, poor sleep, mood changes, low libido, brain fog, or decreased energy — and pairs naturally with the [functional medicine, hormones, and thyroid](/articles/functional-medicine-hormone-thyroid) article if that is the set of concerns you want to discuss.",
    },
    {
      type: "p",
      text: "Tick-borne illness is also part of New York’s public-health picture, especially outside New York City. The New York State Department of Health’s 2025 tickborne disease surveillance report counted 18,704 confirmed or probable Lyme disease cases in 2024 in New York State excluding New York City, with cases reported in all 57 counties outside the city, and an incidence of 164.8 per 100,000. The report notes that a 2022 change in the national surveillance case definition contributed to the higher counts, so the number should be read with that in mind. A Health Optimization Program is not a Lyme pathway. If Lyme disease or a complicated, lingering illness is why you are searching, say so on the consult. We will not stretch a proactive program to cover a kind of care that is not currently listed for New York.",
    },
    {
      type: "p",
      text: "The Census Bureau’s 2024 ACS 1-year estimates put 18.9% of New York’s population at age 65 or older, slightly above the U.S. figure of 18.0%. The [Longevity & Healthy Aging Program](/health-optimization-programs) remains open to New York residents who want that longer view; it is not the only program we emphasize here, because the search and day-to-day pattern in this state is at least as much about energy and hormones as it is about age.",
    },
    { type: "h2", text: "Who you see, and questions we will answer plainly" },
    {
      type: "p",
      text: "Telehealth visits are with Dr. Chris Chianese. He is a Doctor of Chiropractic with a Master of Science in Applied Nutrition, the CPSC credential he founded, and the IFM FMCP credential through the Institute for Functional Medicine. He is not an MD. His full training is on [Meet the Doctor](/meet-the-doctor).",
    },
    {
      type: "p",
      text: "Two questions show up often in New York People Also Ask results: whether functional medicine doctors go to medical school, and whether a “functional doctor” can prescribe medication. Training is the credential list above, not a medical-school degree we do not have. Prescribing authority is a scope-of-practice question; it is not something we will claim or hint at. If it matters to your case, ask on the consult, where licensing and scope are confirmed.",
    },
    { type: "h2", text: "How to start" },
    {
      type: "p",
      text: "Book a complimentary 30-minute consult through Jane App, or call (609) 651-7436. Published states are listed on the [states hub](/states). If you want to read about the clinics even though they are not in New York, see [Locations](/locations).",
    },
    {
      type: "p",
      text: "Educational information on this website is not a diagnosis or a substitute for an in-person exam. See the [medical disclaimer](/medical-disclaimer).",
    },
  ],
  faqs: [
    {
      q: "Is functional medicine telehealth available in New York, or only Health Optimization Programs?",
      a: "Only the Health Optimization Programs are currently listed as open to New York residents. Personalized Clinical Care, the functional medicine telehealth pathway for more complex or ongoing illness, is offered today in nine other states and Washington, D.C., not in New York. The free consult is where we keep that distinction honest.",
    },
    {
      q: "Is there a Your Health Now office in New York City?",
      a: "No. There is no YHN clinic anywhere in New York. The two physical offices are in Merchantville, New Jersey, and Chalfont, Pennsylvania.",
    },
    {
      q: "I live in New York City. Is the program any different from upstate?",
      a: "No. The program is by secure video statewide. New York City, Long Island, and upstate residents use the same consult and the same 90-minute visit. The booking calendar is Eastern time for the entire state.",
    },
    {
      q: "Can Dr. Chris prescribe medication in New York?",
      a: "We do not make prescribing claims. Licensing and scope of practice are confirmed before a first visit. If prescribing is part of what you need, ask that question on the consult rather than assuming it from a title.",
    },
    {
      q: "Do functional medicine doctors go to medical school?",
      a: "Not always, and Dr. Chris did not. He is a chiropractic physician with a master’s in applied nutrition and the IFM FMCP credential. Details are on [Meet the Doctor](/meet-the-doctor).",
    },
    {
      q: "Can I get a chiropractic adjustment as part of this New York visit?",
      a: "No. Adjustments and physical exams are only at the New Jersey and Pennsylvania clinics. New York program visits are video only.",
    },
    {
      q: "What if my situation is more complex than a Health Optimization Program?",
      a: "Tell Dr. Chris that on the free consult. Do not choose a proactive program just because it is the offer currently listed for New York. If Personalized Clinical Care is not open in the state, the honest next step may be a different kind of local care, not a stretched program.",
    },
  ],
  sources: [
    {
      href: CDC_OBESITY_2024_HREF,
      text: `${CDC_OBESITY_2024_LABEL}. New York adult obesity 29.5%; California 29.1% and Florida 29.6% on the same table.`,
    },
    {
      href: CENSUS_AGE_65_2024_HREF,
      text: `${CENSUS_AGE_65_2024_LABEL}. New York 18.9%; United States 18.0%.`,
    },
    {
      text: "Lyme disease, New York State excluding New York City, 2024: 18,704 confirmed or probable cases; incidence 164.8 per 100,000; cases in all 57 counties outside New York City. New York State Department of Health, Tickborne Disease Surveillance Report 2025. The report notes that the 2022 national case-definition change contributed to higher counts.",
    },
  ],
};

export default newYork;
