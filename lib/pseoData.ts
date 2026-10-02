/**
 * Programmatic SEO data, cities × services matrix.
 *
 * Two real YHN clinics:
 *   • Merchantville, NJ (Camden County) , anchors NJ-side cities
 *   • Chalfont, PA     (Bucks County)   , anchors PA-side cities
 *
 * Each city has its own population, ZIPs, neighborhoods, county, and the
 * "nearest" clinic so the generated copy is genuinely localized, not boilerplate.
 *
 * Each service carries condition lists, benefits, FAQs, and process steps
 * so a service × city template can compose ~1,800 words of unique content
 * per page.
 */

export type Clinic = {
  key: "merchantville" | "chalfont";
  name: string;
  address: string;
  zip: string;
  phone: string;
  tel: string;
  state: "NJ" | "PA";
};

export const CLINICS: Record<Clinic["key"], Clinic> = {
  merchantville: {
    key: "merchantville",
    name: "Merchantville, NJ",
    address: "5 W Chestnut Ave, Merchantville, NJ 08109",
    zip: "08109",
    phone: "(856) 532-2063",
    tel: "tel:8565322063",
    state: "NJ",
  },
  chalfont: {
    key: "chalfont",
    name: "Chalfont, PA",
    address: "350 N Main St #201, Chalfont, PA 18914",
    zip: "18914",
    phone: "(609) 651-7436",
    tel: "tel:6096517436",
    state: "PA",
  },
};

export type City = {
  slug: string;
  name: string;
  state: "NJ" | "PA";
  county: string;
  population: string;
  zips: string[];
  neighborhoods: string[];
  landmarks: string[];
  /** Approximate drive minutes to the nearest YHN clinic. */
  driveMin: number;
  /** Which clinic anchors this city. */
  clinic: Clinic["key"];
  /** A short scene-setter unique to the city (used in hero subhead). */
  vibe: string;
};

export const CITIES: City[] = [
  // NJ side, anchored to Merchantville clinic
  {
    slug: "merchantville-nj",
    name: "Merchantville",
    state: "NJ",
    county: "Camden",
    population: "3,825",
    zips: ["08109"],
    neighborhoods: ["Maple Square", "Center Street", "Chestnut Ave Corridor", "Park Avenue"],
    landmarks: ["Wellwood Park", "Borough Hall", "Pennypacker Field"],
    driveMin: 0,
    clinic: "merchantville",
    vibe: "tree-lined Victorian streets just over the Cooper River from Camden",
  },
  {
    slug: "pennsauken-nj",
    name: "Pennsauken",
    state: "NJ",
    county: "Camden",
    population: "37,074",
    zips: ["08109", "08110"],
    neighborhoods: ["Delair", "Bethel Park", "Fairview", "Wrightsville"],
    landmarks: ["Pennsauken Mart", "Cooper River Park"],
    driveMin: 5,
    clinic: "merchantville",
    vibe: "a working township that hugs the Cooper River and Route 130",
  },
  {
    slug: "cherry-hill-nj",
    name: "Cherry Hill",
    state: "NJ",
    county: "Camden",
    population: "74,553",
    zips: ["08002", "08003", "08034"],
    neighborhoods: ["Barclay Farm", "Old Orchard", "Erlton", "Woodcrest"],
    landmarks: ["Cherry Hill Mall", "Croft Farm", "Garden State Discovery Museum"],
    driveMin: 10,
    clinic: "merchantville",
    vibe: "South Jersey's flagship suburb anchored by Route 70 and the Cherry Hill Mall",
  },
  {
    slug: "camden-nj",
    name: "Camden",
    state: "NJ",
    county: "Camden",
    population: "71,791",
    zips: ["08102", "08103", "08104", "08105"],
    neighborhoods: ["Cooper Grant", "Fairview", "Cramer Hill", "Parkside"],
    landmarks: ["Adventure Aquarium", "Rutgers–Camden", "Campbell's Field"],
    driveMin: 8,
    clinic: "merchantville",
    vibe: "an old port city on the Delaware that still drives the South Jersey economy",
  },
  {
    slug: "collingswood-nj",
    name: "Collingswood",
    state: "NJ",
    county: "Camden",
    population: "14,261",
    zips: ["08108"],
    neighborhoods: ["Knight Park", "Haddon Avenue", "Newton Lake"],
    landmarks: ["Scottish Rite Auditorium", "Collingswood Farmers Market"],
    driveMin: 6,
    clinic: "merchantville",
    vibe: "a walkable arts borough with a thriving Haddon Ave restaurant scene",
  },
  {
    slug: "haddonfield-nj",
    name: "Haddonfield",
    state: "NJ",
    county: "Camden",
    population: "12,550",
    zips: ["08033"],
    neighborhoods: ["Tavistock", "Bancroft", "Elizabeth Haddon"],
    landmarks: ["Indian King Tavern", "Kings Highway Historic District"],
    driveMin: 9,
    clinic: "merchantville",
    vibe: "a colonial-era borough whose Kings Highway is on the National Register",
  },
  {
    slug: "haddon-township-nj",
    name: "Haddon Township",
    state: "NJ",
    county: "Camden",
    population: "14,996",
    zips: ["08107", "08033"],
    neighborhoods: ["Westmont", "Saddler's Run", "Crystal Lake"],
    landmarks: ["Crystal Lake Park", "Westmont Theater"],
    driveMin: 7,
    clinic: "merchantville",
    vibe: "a tightly-knit Camden County township along the PATCO line",
  },
  {
    slug: "voorhees-nj",
    name: "Voorhees",
    state: "NJ",
    county: "Camden",
    population: "30,143",
    zips: ["08043"],
    neighborhoods: ["Lions Head", "Centennial Mill", "Sturbridge Lakes"],
    landmarks: ["Voorhees Town Center", "Flyers Skate Zone"],
    driveMin: 14,
    clinic: "merchantville",
    vibe: "a sprawling Camden County suburb built around the old Echelon Mall",
  },
  {
    slug: "maple-shade-nj",
    name: "Maple Shade",
    state: "NJ",
    county: "Burlington",
    population: "20,461",
    zips: ["08052"],
    neighborhoods: ["Fellowship Village", "Brookfield", "Forklanding"],
    landmarks: ["Maple Shade Park", "Steinhauser Field"],
    driveMin: 8,
    clinic: "merchantville",
    vibe: "a Route 38 township on the Burlington–Camden county line",
  },
  {
    slug: "moorestown-nj",
    name: "Moorestown",
    state: "NJ",
    county: "Burlington",
    population: "21,355",
    zips: ["08057"],
    neighborhoods: ["Lenola", "Centerton", "Moorestown Hunt"],
    landmarks: ["Moorestown Mall", "Strawbridge Lake"],
    driveMin: 12,
    clinic: "merchantville",
    vibe: "an affluent Quaker-rooted town often ranked among America's best places to live",
  },
  {
    slug: "mount-laurel-nj",
    name: "Mount Laurel",
    state: "NJ",
    county: "Burlington",
    population: "44,633",
    zips: ["08054"],
    neighborhoods: ["Larchmont", "Holiday Village", "Ramblewood"],
    landmarks: ["Laurel Acres Park", "Centerton Square"],
    driveMin: 15,
    clinic: "merchantville",
    vibe: "a corporate suburb at the I-295 / NJ-73 cross",
  },
  {
    slug: "marlton-nj",
    name: "Marlton",
    state: "NJ",
    county: "Burlington",
    population: "10,464",
    zips: ["08053"],
    neighborhoods: ["Sanctuary", "Kings Grant", "Heritage Village"],
    landmarks: ["Promenade at Sagemore", "Memorial Park"],
    driveMin: 18,
    clinic: "merchantville",
    vibe: "an Evesham community known for the Promenade at Sagemore",
  },
  {
    slug: "medford-nj",
    name: "Medford",
    state: "NJ",
    county: "Burlington",
    population: "23,795",
    zips: ["08055"],
    neighborhoods: ["Medford Lakes", "Tabernacle Border", "Hartford"],
    landmarks: ["Freedom Park", "Kirby's Mill"],
    driveMin: 22,
    clinic: "merchantville",
    vibe: "the gateway to the Pinelands with a lake-village core",
  },
  {
    slug: "willingboro-nj",
    name: "Willingboro",
    state: "NJ",
    county: "Burlington",
    population: "31,889",
    zips: ["08046"],
    neighborhoods: ["Country Club Ridge", "Buckingham", "Twin Hills"],
    landmarks: ["Willingboro Town Center", "Olympia Lakes"],
    driveMin: 18,
    clinic: "merchantville",
    vibe: "a planned Levittown-era township in Burlington County",
  },
  {
    slug: "burlington-nj",
    name: "Burlington",
    state: "NJ",
    county: "Burlington",
    population: "26,393",
    zips: ["08016"],
    neighborhoods: ["Burlington Township", "Steeplechase", "Sunbury Village"],
    landmarks: ["Smithville Park", "High Street Historic District"],
    driveMin: 22,
    clinic: "merchantville",
    vibe: "a historic Delaware-River town with a colonial High Street",
  },

  // PA side, anchored to Chalfont clinic
  {
    slug: "chalfont-pa",
    name: "Chalfont",
    state: "PA",
    county: "Bucks",
    population: "4,341",
    zips: ["18914"],
    neighborhoods: ["West Branch", "Park Avenue", "Main Street Corridor"],
    landmarks: ["Chalfont Train Station", "Liberty Park"],
    driveMin: 0,
    clinic: "chalfont",
    vibe: "a small Bucks County borough on the Neshaminy Creek with SEPTA service",
  },
  {
    slug: "doylestown-pa",
    name: "Doylestown",
    state: "PA",
    county: "Bucks",
    population: "8,389",
    zips: ["18901"],
    neighborhoods: ["Doylestown Township", "Cross Keys", "Buckingham Border"],
    landmarks: ["Mercer Museum", "Fonthill Castle", "Doylestown Hospital"],
    driveMin: 9,
    clinic: "chalfont",
    vibe: "the Bucks County seat with castles, hospitals, and a college-town feel",
  },
  {
    slug: "new-britain-pa",
    name: "New Britain",
    state: "PA",
    county: "Bucks",
    population: "3,084",
    zips: ["18901"],
    neighborhoods: ["Pine Run", "Tamenend Park area", "Iron Hill"],
    landmarks: ["Delaware Valley University", "Tamenend Park"],
    driveMin: 5,
    clinic: "chalfont",
    vibe: "a college-anchored borough next to Delaware Valley University",
  },
  {
    slug: "warrington-pa",
    name: "Warrington",
    state: "PA",
    county: "Bucks",
    population: "23,418",
    zips: ["18976"],
    neighborhoods: ["Lamb's Gate", "Hidden Springs", "Mill Creek"],
    landmarks: ["Valley Square", "Warrington Community Park"],
    driveMin: 10,
    clinic: "chalfont",
    vibe: "a Route 611 township anchored by Valley Square shopping",
  },
  {
    slug: "warminster-pa",
    name: "Warminster",
    state: "PA",
    county: "Bucks",
    population: "32,682",
    zips: ["18974"],
    neighborhoods: ["Speedway Estates", "Warminster Heights", "Hartsville"],
    landmarks: ["Warminster Community Park", "Five Ponds Golf"],
    driveMin: 14,
    clinic: "chalfont",
    vibe: "a former NAS Willow Grove community on the Bucks–Montco line",
  },
  {
    slug: "lansdale-pa",
    name: "Lansdale",
    state: "PA",
    county: "Montgomery",
    population: "19,007",
    zips: ["19446"],
    neighborhoods: ["Wedgewood", "Forrest Hills", "West Ward"],
    landmarks: ["Lansdale Train Station", "Memorial Park"],
    driveMin: 10,
    clinic: "chalfont",
    vibe: "a Lansdale-line SEPTA hub with a busy small-business Main Street",
  },
  {
    slug: "hatfield-pa",
    name: "Hatfield",
    state: "PA",
    county: "Montgomery",
    population: "3,277",
    zips: ["19440"],
    neighborhoods: ["Hatfield Borough", "Cowpath Road", "Townsend Court"],
    landmarks: ["Hatfield Aquatic Center", "School Road Park"],
    driveMin: 8,
    clinic: "chalfont",
    vibe: "a quiet Montgomery County borough north of Lansdale",
  },
  {
    slug: "montgomeryville-pa",
    name: "Montgomeryville",
    state: "PA",
    county: "Montgomery",
    population: "12,624",
    zips: ["18936"],
    neighborhoods: ["Knapp Acres", "Montgomery Square", "Stump Road"],
    landmarks: ["Montgomery Mall", "Promenade at Upper Dublin"],
    driveMin: 7,
    clinic: "chalfont",
    vibe: "the Route 309 retail corridor centered on Montgomery Mall",
  },
  {
    slug: "north-wales-pa",
    name: "North Wales",
    state: "PA",
    county: "Montgomery",
    population: "3,242",
    zips: ["19454"],
    neighborhoods: ["Center Street", "Walnut Street", "Weldon"],
    landmarks: ["Weingartner Park", "North Wales Train Station"],
    driveMin: 11,
    clinic: "chalfont",
    vibe: "a tight little borough on the Lansdale SEPTA line",
  },
  {
    slug: "souderton-pa",
    name: "Souderton",
    state: "PA",
    county: "Montgomery",
    population: "7,024",
    zips: ["18964"],
    neighborhoods: ["Indian Valley", "Main Street Souderton", "Reliance Road"],
    landmarks: ["Souderton Community Park", "Main Street Theater"],
    driveMin: 12,
    clinic: "chalfont",
    vibe: "an Indian Valley borough with a revived Main Street arts district",
  },
  {
    slug: "telford-pa",
    name: "Telford",
    state: "PA",
    county: "Montgomery",
    population: "4,872",
    zips: ["18969"],
    neighborhoods: ["Telford Borough", "Souderton Border", "West Broad"],
    landmarks: ["Telford Station", "Freed's Corner"],
    driveMin: 14,
    clinic: "chalfont",
    vibe: "a Bucks–Montco split borough on the SEPTA Lansdale line",
  },
  {
    slug: "perkasie-pa",
    name: "Perkasie",
    state: "PA",
    county: "Bucks",
    population: "9,272",
    zips: ["18944"],
    neighborhoods: ["Menlo Park", "Lenape Park", "South Perkasie"],
    landmarks: ["Menlo Aquatics Center", "South Perkasie Covered Bridge"],
    driveMin: 13,
    clinic: "chalfont",
    vibe: "an Upper Bucks borough that still strings the country's oldest Christmas tree lights",
  },
  {
    slug: "sellersville-pa",
    name: "Sellersville",
    state: "PA",
    county: "Bucks",
    population: "4,287",
    zips: ["18960"],
    neighborhoods: ["Lake Lenape area", "Walnut Street", "Park Avenue"],
    landmarks: ["Sellersville Theater 1894", "Lake Lenape"],
    driveMin: 15,
    clinic: "chalfont",
    vibe: "a music-venue town built around the historic Sellersville Theater",
  },
  {
    slug: "quakertown-pa",
    name: "Quakertown",
    state: "PA",
    county: "Bucks",
    population: "9,360",
    zips: ["18951"],
    neighborhoods: ["Quaker Village", "Borough Park", "Krupp Heights"],
    landmarks: ["Memorial Park", "Quakertown Train Station"],
    driveMin: 20,
    clinic: "chalfont",
    vibe: "the Upper Bucks hub town with a classic Quaker-era core",
  },
  {
    slug: "horsham-pa",
    name: "Horsham",
    state: "PA",
    county: "Montgomery",
    population: "26,295",
    zips: ["19044"],
    neighborhoods: ["Maple Glen", "Blair Mill", "Prospectville"],
    landmarks: ["Horsham Power Center", "Graeme Park"],
    driveMin: 16,
    clinic: "chalfont",
    vibe: "a corporate-heavy Montgomery County township around the old NAS Willow Grove",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   SERVICES, 35 entries
   Each carries everything the template needs to compose a unique page:
     • plainName, h1Verb, summary  (~3 sentences)
     • conditions (8)              (icon grid)
     • benefits (6)                (icon grid)
     • process (4)                 (numbered steps)
     • faq (5)                     (q/a, with {city} interpolations)
   ────────────────────────────────────────────────────────────────────── */

export type ServiceFaq = { q: string; a: string };
export type ServiceData = {
  slug: string;
  name: string;
  shortName: string;
  category: "Chiropractic" | "Pain Relief" | "Physiotherapy" | "Functional" | "Specialty";
  /** Two-three sentence service-only summary (no city). */
  summary: string;
  /** Conditions this service treats, used in icon grid. */
  conditions: string[];
  /** Patient benefits, used in icon grid. */
  benefits: string[];
  /** What to expect, 4 step process. */
  process: { title: string; body: string }[];
  faq: ServiceFaq[];
  /** Map to existing service slug (for linking back to the parent page). */
  parentSlug?: string;
};

export const SERVICES: ServiceData[] = [
  {
    slug: "chiropractic-care",
    name: "Chiropractic Care",
    shortName: "chiropractic care",
    category: "Chiropractic",
    summary:
      "Patient-specific chiropractic care identifies the joints that move too little, and the ones that move too much, and restores normal motion through precise, low-force adjustments. Care is paired with rehab, soft-tissue work, and posture coaching so improvements last.",
    conditions: [
      "Spinal joint restriction",
      "Disc-related back pain",
      "Whiplash injuries",
      "Tension headaches",
      "Sciatic nerve pain",
      "Postural fatigue",
      "Sports-related strain",
      "Work-from-home neck stiffness",
    ],
    benefits: [
      "Restored joint motion",
      "Less reliance on pain meds",
      "Improved posture",
      "Better sleep quality",
      "Faster recovery from strain",
      "Long-term spine health",
    ],
    process: [
      { title: "Functional exam", body: "We test movement, neurology and posture before we adjust anything." },
      { title: "Plain-language plan", body: "You leave the first visit knowing what's wrong, what we'll do, and how many visits it will take." },
      { title: "Patient-specific adjustments", body: "Hands-on or instrument adjustments matched to your spine, never generic 'crack everyone the same way' care." },
      { title: "Active rehab", body: "We pair adjustments with rehab and posture work so you stop needing them." },
    ],
    faq: [
      { q: "Is chiropractic care safe?", a: "Yes. Chiropractic adjustments performed by a licensed DC are one of the safest, most-studied conservative options for spine and joint pain." },
      { q: "Do I need a referral?", a: "No referral is required to see our chiropractors at YHN, patients in {city} can self-refer." },
      { q: "How many visits will I need?", a: "Most {city} patients see meaningful change inside 4–6 visits; corrective plans run longer for chronic cases." },
      { q: "Do you accept insurance?", a: "We're in-network with most major plans and verify your benefits before your first adjustment." },
      { q: "Will the adjustment hurt?", a: "Adjustments are not painful. Most patients describe immediate relief, though sore muscles around the area can ache mildly the next day." },
    ],
    parentSlug: "/family-chiropractic-care",
  },
  {
    slug: "family-chiropractic",
    name: "Family Chiropractic",
    shortName: "family chiropractic",
    category: "Chiropractic",
    summary:
      "One practice for the whole household, kids, parents, athletes, expecting moms, and grandparents. We tailor force, technique and frequency to every age so every family member gets care that fits their body.",
    conditions: ["Childhood postural issues", "Adult back & neck pain", "Pregnancy-related pain", "Senior mobility loss", "Sports injuries", "Sciatica", "Headaches", "Repetitive-strain pain"],
    benefits: ["Care for every age under one roof", "Consistent family records", "Discounted family plans", "Same-day scheduling", "Predictable, drug-free relief", "Better daily function"],
    process: [
      { title: "Family intake", body: "We learn each family member's history, sports schedule, school posture issues and goals." },
      { title: "Age-matched exam", body: "Pediatric, adult, prenatal and geriatric exams are not the same, ours match the patient." },
      { title: "Coordinated plan", body: "When several family members need care, we sync your visits so you only drive once." },
      { title: "Whole-family follow-up", body: "Quarterly check-ins keep growing kids, working parents and aging grandparents on track." },
    ],
    faq: [
      { q: "Can my whole family be seen the same day?", a: "Yes, we routinely schedule families back-to-back so {city} patients only make one trip." },
      { q: "How young can my child start?", a: "We see infants from days old when there's a clinical reason; routine pediatric care typically starts when kids begin sitting up." },
      { q: "Do you treat pregnant women?", a: "Yes, we're Webster Technique trained and care for prenatal patients through every trimester." },
      { q: "Is care safe for my parents?", a: "Senior care uses lower-force, instrument-assisted adjustments matched to bone density and medical history." },
      { q: "Do you offer family plans?", a: "Yes. Multi-member households in {city} qualify for our family wellness plan pricing." },
    ],
    parentSlug: "/family-chiropractic-care",
  },
  {
    slug: "pediatric-chiropractic",
    name: "Pediatric Chiropractic",
    shortName: "pediatric chiropractic",
    category: "Chiropractic",
    summary:
      "Gentle, age-matched chiropractic for infants, children, and teens. Force is dialed down to a fingertip; the goal is healthy nervous-system development and good posture habits before adult patterns set in.",
    conditions: ["Colic & latching issues", "Torticollis", "Plagiocephaly support", "School-bag posture", "Growing pains", "Sports injuries (youth)", "Scoliosis screening", "Tech-neck in teens"],
    benefits: ["Better sleep for the whole family", "Improved focus at school", "Healthy posture early", "Drug-free option for kids", "Athletic recovery", "Calmer, more regulated nervous system"],
    process: [
      { title: "Parent-led intake", body: "Birth history, feeding, milestones, sport, we listen first, then examine." },
      { title: "Pediatric-specific exam", body: "Gait, primitive reflexes, posture and cranial palpation matched to age." },
      { title: "Featherlight adjustments", body: "The pressure used is roughly what you'd use to test a ripe peach, never the same as adult care." },
      { title: "At-home tools", body: "Feeding posture, tummy-time progressions and screen-time tweaks for {city} families." },
    ],
    faq: [
      { q: "Is pediatric chiropractic safe?", a: "Yes, pediatric adjustments use a fraction of the force of adult care and have an excellent safety record in licensed hands." },
      { q: "Why would a baby need chiropractic?", a: "Birth itself is mechanically demanding. Many infants benefit from gentle care for latching, turning their head, or reflux-style fussiness." },
      { q: "Do I stay with my child?", a: "Always. Parents are next to their child for every minute of care at our {city}-area clinic." },
      { q: "How often will my child be seen?", a: "Pediatric plans are typically much shorter than adult plans, often 4–6 visits, then check-ins." },
      { q: "Will my child be 'cracked'?", a: "No, pediatric care does not produce the audible release of adult adjustments." },
    ],
    parentSlug: "/pediatric-care",
  },
  {
    slug: "pregnancy-chiropractic",
    name: "Pregnancy Chiropractic",
    shortName: "pregnancy chiropractic",
    category: "Chiropractic",
    summary:
      "Webster-Technique-trained prenatal care designed to keep the pelvis balanced as your baby grows. Adjustments support better fetal positioning, reduce low-back and round-ligament pain, and use a pregnancy table that comfortably supports a full belly.",
    conditions: ["Low-back pain in pregnancy", "SI joint pain", "Round-ligament pain", "Pubic-symphysis pain", "Sciatica during pregnancy", "Breech-positioning concerns", "Postural fatigue", "Postpartum back pain"],
    benefits: ["More comfortable pregnancy", "Better pelvic alignment", "Reduced labor complications (in many studies)", "Lower reliance on pain meds", "Continued safe care into postpartum", "Belly-supportive pregnancy table"],
    process: [
      { title: "Trimester-aware intake", body: "Where you are in pregnancy changes every part of the visit." },
      { title: "Webster Technique assessment", body: "We assess pelvic balance, sacral motion and round-ligament tension." },
      { title: "Gentle, side-lying or pregnancy-table adjustments", body: "No pressure on your belly, ever." },
      { title: "Postpartum continuation", body: "Many {city} moms continue care after delivery to recover from labor and feeding posture." },
    ],
    faq: [
      { q: "Is chiropractic safe during pregnancy?", a: "Yes. Pregnancy chiropractic with a Webster-trained DC is widely considered safe and is endorsed by midwifery organizations." },
      { q: "Will I lie on my belly?", a: "Never. We use a pregnancy table or side-lying positions that fully support your belly." },
      { q: "Will care help a breech baby turn?", a: "The Webster Technique is a sacral analysis, not a turn. Many studies note an associated improvement in fetal position when pelvic balance is restored." },
      { q: "Can I still come in third trimester?", a: "Absolutely, most patients increase visit frequency leading up to delivery." },
      { q: "How soon postpartum can I return?", a: "Most {city} moms come back within 1–2 weeks; we adjust force based on delivery type and recovery." },
    ],
    parentSlug: "/pregnancy-care",
  },
  {
    slug: "webster-technique",
    name: "Webster Technique",
    shortName: "the Webster Technique",
    category: "Chiropractic",
    summary:
      "A specific chiropractic analysis of the sacrum and pelvis used during pregnancy to reduce nerve interference and balance pelvic ligaments. Care is gentle, comfort-positioned, and Webster-certified.",
    conditions: ["Pelvic imbalance", "Round-ligament tension", "Pubic-symphysis pain", "Sciatica in pregnancy", "Breech-position concerns", "Posterior baby positioning", "Low-back pain in pregnancy", "Postural compensations"],
    benefits: ["Improved pelvic balance", "Reduced ligament tension", "Better fetal-position environment", "Comfort during third trimester", "Smoother labor experience reported by many patients", "Continued postpartum support"],
    process: [
      { title: "Pelvic-balance assessment", body: "Bilateral SI joint and sacral motion testing." },
      { title: "Round-ligament work", body: "Gentle release of any uneven tension." },
      { title: "Specific sacral adjustment", body: "Low-force, comfort-positioned for pregnancy." },
      { title: "Re-check & cadence", body: "Visit cadence rises as your due date approaches in {city}." },
    ],
    faq: [
      { q: "What makes the Webster Technique different?", a: "It's not a generic adjustment, it's a specific sacral analysis designed for pregnancy." },
      { q: "How early can I start?", a: "Patients often begin in the first trimester for back pain and continue throughout pregnancy." },
      { q: "Are you Webster-certified?", a: "Yes, our doctors carry current certification through the International Chiropractic Pediatric Association." },
      { q: "Will the technique turn my baby?", a: "It does not 'turn' a baby. It restores pelvic balance, which can give a malpositioned baby room to move." },
      { q: "Do you take pregnancy patients in {city}?", a: "Yes, many of our pregnancy patients drive in from {city} every week." },
    ],
    parentSlug: "/webster-technique",
  },
  {
    slug: "sports-chiropractic",
    name: "Sports Chiropractic",
    shortName: "sports chiropractic",
    category: "Chiropractic",
    summary:
      "Performance-focused chiropractic for athletes at every level, youth travel teams to masters competitors. We blend adjustments with ART, IASTM, and sport-specific rehab so you don't just feel better, you move better.",
    conditions: ["Running injuries", "Golfer's elbow", "Pitcher's shoulder", "ACL recovery support", "Hamstring strains", "Plantar fasciitis", "Concussion recovery support", "Jumper's knee"],
    benefits: ["Faster return to play", "Better movement quality", "Stronger core stability", "Reduced re-injury risk", "Pre-season screens", "Performance-based assessment"],
    process: [
      { title: "Sport intake", body: "We learn the sport, position, training load and goal event." },
      { title: "Movement screen", body: "Functional movement testing identifies the link in the chain that's failing." },
      { title: "Combined treatment", body: "Adjustments + ART + IASTM in the same visit when indicated." },
      { title: "Return-to-sport rehab", body: "{city} athletes don't just rest, they rehab progressively back to competition." },
    ],
    faq: [
      { q: "Do you work with high-school athletes?", a: "Yes, many of our {city} patients are youth and high-school athletes." },
      { q: "Will I have to stop my sport?", a: "Rarely. Most patients keep training with modifications while we work on the cause." },
      { q: "How is this different from PT?", a: "Sports chiropractic and PT overlap, we add manual joint care that PT clinics typically don't perform." },
      { q: "Do you treat post-surgical athletes?", a: "Yes, alongside (not instead of) the surgeon's protocol." },
      { q: "Can you help with running form?", a: "Yes, gait video plus rehab is a routine part of runner care here." },
    ],
    parentSlug: "/athletic-care",
  },
  {
    slug: "geriatric-chiropractic",
    name: "Geriatric Chiropractic",
    shortName: "geriatric chiropractic",
    category: "Chiropractic",
    summary:
      "Lower-force, instrument-assisted, fall-prevention-focused care for adults 65+. We respect bone density, joint replacements and medication histories, and prioritize keeping you upright, mobile and independent.",
    conditions: ["Spinal stenosis", "Arthritic neck pain", "Hip joint pain", "Postural kyphosis", "Balance loss", "Post-surgical stiffness", "Sciatica", "General mobility decline"],
    benefits: ["Better balance & fall prevention", "Less reliance on pain meds", "Improved walking endurance", "Joint-replacement-safe care", "Drug-free pain management", "Independence at home"],
    process: [
      { title: "Medical-aware intake", body: "We review every medication, surgery and implant before we touch you." },
      { title: "Bone-density-aware exam", body: "Care is dialed up or down based on density, not age alone." },
      { title: "Low-force adjustments", body: "Mostly instrument-assisted, never the heavy manipulation a 25-year-old gets." },
      { title: "Balance & mobility rehab", body: "Falls are the #1 risk for {city}'s older adults; we train balance, strength, and gait." },
    ],
    faq: [
      { q: "I have osteoporosis, am I a candidate?", a: "Often, yes. We use low-force instrument adjustments and rehab that respect bone density." },
      { q: "I had a hip replacement. Can you still treat me?", a: "Yes, joint-replacement patients are common in our {city}-area practice." },
      { q: "Will Medicare cover my visits?", a: "Medicare covers medically necessary chiropractic adjustments. We'll verify your specific plan up front." },
      { q: "How long does each visit take?", a: "Geriatric visits are paced longer, usually 25–35 minutes, to allow careful, unhurried care." },
      { q: "Can you help me with balance?", a: "Yes, balance and fall-prevention training is built into senior plans here." },
    ],
    parentSlug: "/geriatric-care",
  },
  {
    slug: "back-pain-relief",
    name: "Back Pain Relief",
    shortName: "back pain relief",
    category: "Pain Relief",
    summary:
      "Most back pain is mechanical, a joint, disc, muscle or nerve issue, not a mystery. We diagnose precisely, treat the cause, and rebuild the spine that let pain happen in the first place.",
    conditions: ["Lumbar disc bulges", "Facet joint pain", "Muscle spasm", "Pinched nerves", "Hip-driven back pain", "Sacroiliac (SI) joint pain", "Postural overload", "Old-injury flare-ups"],
    benefits: ["Targeted, not generic, relief", "Avoidance of unnecessary imaging", "Drug-free options", "Long-term posture rebuild", "Faster return to work", "Personalized at-home program"],
    process: [
      { title: "Find the actual pain generator", body: "We use orthopedic, neurological, and movement testing, not guesses." },
      { title: "Decompress, mobilize, calm", body: "Adjustments, decompression and soft-tissue work calm the symptom in week one." },
      { title: "Reload the spine", body: "Core, hip and posture rehab so the pain doesn't come back." },
      { title: "Maintenance check-ins", body: "Periodic visits keep {city} patients on top of flare-ups before they explode." },
    ],
    faq: [
      { q: "Do I need an MRI first?", a: "Usually not. We'll order imaging if our exam findings call for it, but most cases don't need it." },
      { q: "How long until my back stops hurting?", a: "Most {city} patients feel meaningful change within 1–3 visits. Full corrective care is longer." },
      { q: "Is bed rest a good idea?", a: "Rarely. Modified movement beats bed rest for most non-traumatic back pain." },
      { q: "Are adjustments safe for a herniated disc?", a: "Yes, when matched correctly to the disc and patient." },
      { q: "Do you treat sciatica?", a: "Yes, sciatica is one of the conditions we see most often." },
    ],
    parentSlug: "/lower-back",
  },
  {
    slug: "neck-pain-relief",
    name: "Neck Pain Relief",
    shortName: "neck pain relief",
    category: "Pain Relief",
    summary:
      "Modern necks live tilted forward over phones and laptops. We diagnose the joint, disc, or muscle generating your pain, restore motion, and rebuild posture so the pain doesn't come back tomorrow.",
    conditions: ["Tech neck", "Whiplash", "Cervical disc pain", "Tension headaches", "Shoulder-blade pain", "Stiff mornings", "Pinched nerves (radiculopathy)", "Pillow-related pain"],
    benefits: ["Restored neck motion", "Fewer headaches", "Better sleep", "Reduced screen-time pain", "Improved posture", "Less medication use"],
    process: [
      { title: "Cervical exam", body: "Range of motion, neurological screen, palpation and posture analysis." },
      { title: "Targeted adjustment + soft tissue", body: "Combined cervical adjustment with suboccipital release." },
      { title: "Posture & screen-setup coaching", body: "Most {city} patients spend 6+ hours daily at a screen, we fix the setup." },
      { title: "Strengthening & maintenance", body: "Deep-neck flexor training is the missing piece for most chronic necks." },
    ],
    faq: [
      { q: "I'm scared of neck adjustments, do I have to have one?", a: "No. We have low-force, drop-table and instrument options for patients who prefer them." },
      { q: "Do you treat headaches that start in the neck?", a: "Yes, cervicogenic headaches are one of our most-treated conditions." },
      { q: "Can you help my whiplash from a {city} accident?", a: "Yes. We treat motor-vehicle whiplash patients regularly and document for legal/insurance needs." },
      { q: "Is my pillow making it worse?", a: "Often, yes. We'll review your sleep setup at the first visit." },
      { q: "How fast will I feel relief?", a: "Most patients feel meaningful change inside 2–3 visits." },
    ],
    parentSlug: "/head-and-neck",
  },
  {
    slug: "lower-back-pain",
    name: "Lower Back Pain",
    shortName: "lower back pain care",
    category: "Pain Relief",
    summary:
      "Lower back pain is the #1 reason adults miss work. We pinpoint whether it's a disc, a joint, the SI, or a nerve, and treat the actual driver instead of throwing relaxers at every patient.",
    conditions: ["Lumbar disc herniation", "SI joint dysfunction", "Lumbar facet pain", "Sciatica", "Piriformis syndrome", "Spinal stenosis", "Postural lumbar pain", "Lifting injuries"],
    benefits: ["Precise diagnosis", "Drug-free relief", "Decompression for discs", "Hip-mobility rebuild", "Return to lifting", "Long-term spine health"],
    process: [
      { title: "Pain-generator testing", body: "Specific orthopedic tests separate disc, joint, and nerve cases." },
      { title: "Phase-one relief", body: "Adjustments, decompression and soft-tissue work in the first week." },
      { title: "Hip & core rebuild", body: "Most lumbar pain comes from weak hips and a weak core, we fix both." },
      { title: "Lifting return", body: "{city} patients who lift for work go through a return-to-load progression." },
    ],
    faq: [
      { q: "Will I need an MRI?", a: "Most don't. We image when exam findings call for it, not by default." },
      { q: "Should I get an injection first?", a: "Usually not. Conservative care should be tried first per most guidelines." },
      { q: "Can chiropractic help a herniated disc?", a: "Yes, flexion-distraction decompression and specific adjustments are well-supported for disc patients." },
      { q: "How many visits until I'm back to work?", a: "Most {city} patients return to work inside 2 weeks; lifting jobs take a touch longer." },
      { q: "Do you treat post-surgical low backs?", a: "Yes, alongside your surgeon's protocol." },
    ],
    parentSlug: "/lower-back",
  },
  {
    slug: "upper-back-pain",
    name: "Upper Back Pain",
    shortName: "upper back pain care",
    category: "Pain Relief",
    summary:
      "Upper-back pain almost always traces back to thoracic mobility, shoulder mechanics, and breathing patterns. We treat all three, not just the spot between your shoulder blades.",
    conditions: ["Mid-back stiffness", "Rib head dysfunction", "T4 syndrome", "Postural fatigue", "Breathing-pattern pain", "Shoulder-blade pain", "Knot between shoulder blades", "Thoracic outlet symptoms"],
    benefits: ["Restored thoracic motion", "Easier breathing", "Better posture under load", "Reduced shoulder strain", "Long-term desk-work durability", "Drug-free care"],
    process: [
      { title: "Thoracic exam", body: "Mobility, rib mechanics and breathing pattern testing." },
      { title: "Mobilization + adjustment", body: "Manual mobilization, drop-table and instrument adjustment options." },
      { title: "Breathing & posture rehab", body: "Diaphragm and posterior chain work for {city} desk workers." },
      { title: "Workstation correction", body: "Real-life screen height, monitor distance, chair fixes, not generic ergonomics." },
    ],
    faq: [
      { q: "Why does my upper back ache by 2 PM every day?", a: "Almost always: thoracic stiffness from desk posture. It's the most common cause we see." },
      { q: "Could it be my heart?", a: "We screen for red flags first. Most upper-back pain is mechanical, but we never assume." },
      { q: "Can a rib actually be 'out'?", a: "Rib-head dysfunction is real and very treatable, patients often feel relief immediately." },
      { q: "Is foam rolling enough?", a: "It helps but rarely fixes the cause. Joint mobility usually needs hands-on work." },
      { q: "Do you serve {city}?", a: "Yes. We see {city} patients regularly at our nearest clinic." },
    ],
    parentSlug: "/upper-back",
  },
  {
    slug: "shoulder-pain-relief",
    name: "Shoulder Pain Relief",
    shortName: "shoulder pain care",
    category: "Pain Relief",
    summary:
      "Shoulders are not just shoulders, they're a partnership of the scapula, thoracic spine, rotator cuff, and neck. We diagnose the real driver of your pain instead of stretching the shoulder forever.",
    conditions: ["Rotator cuff strain", "Frozen shoulder", "Impingement", "Bicep tendinitis", "Labral irritation", "Thoracic-driven shoulder pain", "Post-surgical stiffness", "Throwing-shoulder pain"],
    benefits: ["Restored overhead motion", "Less night pain", "Improved scapular control", "Drug-free relief", "Avoidance of unnecessary surgery in many cases", "Sport-specific recovery"],
    process: [
      { title: "Whole-shoulder exam", body: "We assess the cuff, scap, thoracic spine and neck, not just the shoulder." },
      { title: "Soft-tissue release", body: "ART or IASTM on the cuff, pec minor and lats." },
      { title: "Targeted adjustments", body: "Thoracic and AC-joint work to free the shoulder above." },
      { title: "Cuff & scap rehab", body: "Specific banded rehab so {city} patients don't re-injure." },
    ],
    faq: [
      { q: "I tore my rotator cuff. Can chiropractic help?", a: "Many partial cuff tears do beautifully with conservative care; full tears often still benefit from rehab around the surgery." },
      { q: "I can't sleep on my shoulder, how soon will that improve?", a: "Most patients see night-pain improvement within 2–3 weeks." },
      { q: "Should I get a cortisone shot?", a: "Sometimes, yes, but conservative care is generally tried first per most guidelines." },
      { q: "How is this different from PT?", a: "We add joint work and soft-tissue tools that most PT clinics don't perform." },
      { q: "Do you treat post-op shoulders?", a: "Yes, alongside your surgeon's plan." },
    ],
    parentSlug: "/shoulder-and-clavicle",
  },
  {
    slug: "headache-relief",
    name: "Headache Relief",
    shortName: "headache relief",
    category: "Pain Relief",
    summary:
      "Most chronic headaches start in the upper neck. We diagnose the cervical, postural, and trigger-point drivers behind your pain, and most patients leave their reliever bottles on the shelf within weeks.",
    conditions: ["Tension headaches", "Cervicogenic headaches", "Migraine support", "Cluster-pattern pain", "TMJ-driven headache", "Post-concussion headaches", "Eye-strain headaches", "Sleep-driven headache"],
    benefits: ["Fewer headache days", "Less medication use", "Better sleep", "Reduced screen sensitivity", "Long-term posture rebuild", "Drug-free care"],
    process: [
      { title: "Headache mapping", body: "We log location, frequency, time of day, and triggers, most patterns reveal themselves quickly." },
      { title: "Upper-cervical work", body: "Specific C1–C2 adjustments and suboccipital release." },
      { title: "Trigger-point therapy", body: "IASTM on tight cervical extensors, traps and SCM." },
      { title: "Trigger removal", body: "Sleep, screen, hydration and posture changes that make {city} patients headache-free." },
    ],
    faq: [
      { q: "Will adjustments help my migraines?", a: "Many migraine patients see substantial reduction in frequency and intensity, even though the mechanism differs from tension headaches." },
      { q: "Do I have to crack my neck?", a: "No, we offer low-force and instrument options if you prefer." },
      { q: "How long before I notice fewer headaches?", a: "Most patients see meaningful change within 4–6 visits." },
      { q: "Is screen time really making me worse?", a: "Often, yes. We'll fix your setup at the first visit." },
      { q: "Can my child be treated?", a: "Yes, youth tension headaches are very treatable with gentler care." },
    ],
    parentSlug: "/head-and-neck",
  },
  {
    slug: "migraine-relief",
    name: "Migraine Relief",
    shortName: "migraine care",
    category: "Pain Relief",
    summary:
      "Migraines aren't just bad headaches, they're a neurological event with a clear set of triggers. Care here combines upper-cervical work, nutrition, sleep coaching, and trigger-tracking so flares get rarer and less intense.",
    conditions: ["Classic migraine with aura", "Common migraine", "Vestibular migraine", "Menstrual migraine", "Stress-trigger migraine", "Post-concussion migraine", "Cervicogenic-overlap migraine", "Light/sound-sensitive migraine"],
    benefits: ["Fewer migraine days", "Less medication reliance", "Better sleep & hydration habits", "Identified triggers", "Drug-free care option", "Whole-person approach"],
    process: [
      { title: "Trigger journal", body: "We map sleep, food, hormones, stress, and posture patterns." },
      { title: "Upper-cervical care", body: "Specific gentle adjustments where indicated." },
      { title: "Functional support", body: "Magnesium status, hydration, blood sugar, the basics matter." },
      { title: "Lifestyle integration", body: "{city} migraine patients leave with a written prevention plan, not a prescription." },
    ],
    faq: [
      { q: "Will chiropractic replace my neurologist?", a: "No. We work alongside your medical care, not instead of it." },
      { q: "How many visits before I know it's working?", a: "Most patients can judge after 6–8 visits over 4 weeks." },
      { q: "Is there research?", a: "Yes, multiple trials show reductions in migraine frequency with chiropractic care." },
      { q: "Do you take patients with chronic migraine?", a: "Yes. {city} migraine patients are common in our practice." },
      { q: "Do I have to come in during a flare?", a: "Not unless you want to, most care is done between flares to reduce them." },
    ],
    parentSlug: "/head-and-neck",
  },
  {
    slug: "sciatica-relief",
    name: "Sciatica Relief",
    shortName: "sciatica relief",
    category: "Pain Relief",
    summary:
      "Sciatica is a symptom, not a diagnosis. We identify whether your leg pain is from a disc, the piriformis, the SI joint, or stenosis, and treat the actual source.",
    conditions: ["Lumbar disc herniation", "Piriformis syndrome", "Lumbar stenosis", "SI joint referral", "Pregnancy-related sciatica", "Post-injury sciatica", "Lifting-onset sciatica", "Sit-too-long sciatica"],
    benefits: ["Pinpoint diagnosis", "Decompression for discs", "Drug-free relief", "Avoidance of unnecessary injections", "Return to walking & sitting", "Long-term low-back rebuild"],
    process: [
      { title: "Differential exam", body: "Disc, piriformis, SI and stenosis each test differently, we sort it out." },
      { title: "Decompression where indicated", body: "Flexion-distraction decompression for discogenic cases." },
      { title: "Targeted soft tissue", body: "ART/IASTM for piriformis-driven cases." },
      { title: "Walk-back-to-life rehab", body: "{city} sciatica patients walk farther, longer, every visit." },
    ],
    faq: [
      { q: "How long does sciatica usually last?", a: "Untreated, it can linger for months. With targeted care, most patients are dramatically better in 3–4 weeks." },
      { q: "Will I need surgery?", a: "Most sciatica resolves without surgery. We refer when red flags are present." },
      { q: "Can decompression fix me?", a: "It is one tool, most plans combine decompression with specific adjustments and rehab." },
      { q: "Is it safe to walk during sciatica?", a: "Usually yes, gentle walking often helps. Sitting hurts more for most." },
      { q: "Do you treat pregnancy sciatica?", a: "Yes, Webster-trained care is comfortable for prenatal patients." },
    ],
    parentSlug: "/lower-back",
  },
  {
    slug: "spinal-decompression",
    name: "Spinal Decompression",
    shortName: "spinal decompression",
    category: "Physiotherapy",
    summary:
      "Computer-controlled traction creates a vacuum effect that pulls bulged disc material back toward center and rehydrates the disc. Care is comfortable, table-based, and pairs naturally with chiropractic.",
    conditions: ["Disc bulges", "Herniated discs", "Pinched nerves", "Sciatica", "Degenerative disc disease", "Failed-back syndrome (in many cases)", "Facet pain (mixed)", "Stenosis (select cases)"],
    benefits: ["Disc rehydration", "Decreased nerve pressure", "Drug-free pain reduction", "Surgery-avoidance option for many", "Painless, table-based session", "Pairs with adjustments"],
    process: [
      { title: "Imaging review", body: "We review your existing MRI/X-ray and decide whether decompression is the right tool." },
      { title: "Custom traction setup", body: "Angle, force and cycle are dialed to your specific disc level." },
      { title: "20-minute sessions", body: "Sessions are comfortable; most {city} patients read or rest through the cycle." },
      { title: "Stabilization rehab", body: "Decompression without rehab is half the answer, we add core stability work." },
    ],
    faq: [
      { q: "Is decompression the same as inversion tables?", a: "No. Decompression is computer-controlled at a specific angle, force, and cycle. Inversion is unfocused." },
      { q: "How many sessions are typical?", a: "Most plans run 12–24 sessions over 6–10 weeks." },
      { q: "Does it hurt?", a: "No. Most patients describe it as a gentle stretch and a relief." },
      { q: "Can I avoid surgery?", a: "Many patients do. Decompression is one of the strongest non-surgical disc options." },
      { q: "Do you offer it in {city}?", a: "Decompression is provided at our nearest clinic to {city}, typically a short drive." },
    ],
    parentSlug: "/decompression-therapy",
  },
  {
    slug: "iastm-therapy",
    name: "IASTM Therapy",
    shortName: "IASTM therapy",
    category: "Physiotherapy",
    summary:
      "Instrument-Assisted Soft Tissue Mobilization uses specially-designed steel tools to find and remodel scar tissue, fascial adhesions, and chronic tightness, faster than hands alone.",
    conditions: ["Plantar fasciitis", "Tennis & golfer's elbow", "Achilles tendinopathy", "Patellar tendinopathy", "Rotator cuff strain", "IT-band tightness", "Post-surgical scarring", "Chronic muscle knots"],
    benefits: ["Faster soft-tissue change", "Improved range of motion", "Reduced chronic tightness", "Pairs with adjustments and ART", "Drug-free", "Athlete-friendly"],
    process: [
      { title: "Tissue scan", body: "Tools find adhesions you can't see, they 'read' tissue density quickly." },
      { title: "Targeted treatment", body: "Stroke direction, depth and pressure matched to fiber direction." },
      { title: "Mobility re-test", body: "We re-test motion immediately, change should be obvious in the room." },
      { title: "Loading rehab", body: "{city} patients load the area progressively so the change sticks." },
    ],
    faq: [
      { q: "Will I bruise?", a: "Sometimes, minor surface response is normal. We dial pressure to your tolerance." },
      { q: "Is it the same as Graston?", a: "Same family of techniques, the tools and training differ, but the principle is shared." },
      { q: "How many sessions?", a: "Most soft-tissue cases take 4–8 sessions in combination with chiropractic." },
      { q: "Does it work for plantar fasciitis?", a: "Plantar fasciitis is one of IASTM's strongest indications." },
      { q: "Do you offer it near {city}?", a: "Yes, IASTM is part of routine treatment at our nearest clinic to {city}." },
    ],
    parentSlug: "/iastm",
  },
  {
    slug: "art-therapy",
    name: "Active Release Technique (ART)",
    shortName: "ART (Active Release Technique)",
    category: "Physiotherapy",
    summary:
      "ART is a hands-on, movement-based soft-tissue technique that finds the precise spot a muscle, tendon, or nerve is stuck, and releases it under specific tension. It's the technique pro athletes credit by name.",
    conditions: ["Carpal tunnel", "Sciatica (piriformis)", "Plantar fasciitis", "Tennis elbow", "Rotator cuff strain", "Hip-flexor tightness", "IT-band syndrome", "Headaches"],
    benefits: ["Precise soft-tissue release", "Quick mobility change", "Drug-free", "Athletic recovery", "Avoidance of unnecessary procedures", "Pairs with chiropractic"],
    process: [
      { title: "Assessment", body: "Hands-on palpation finds the exact restriction, not a 'general area'." },
      { title: "Tension under motion", body: "Patient moves while the doctor pins tissue, this is what makes ART different." },
      { title: "Re-test instantly", body: "Mobility re-tested in the room; change is usually felt immediately." },
      { title: "Daily homework", body: "{city} patients leave with movements that reinforce the release." },
    ],
    faq: [
      { q: "Why is ART different from massage?", a: "Massage is generally generalized; ART is precise, motion-based, and targets specific structures." },
      { q: "Does ART hurt?", a: "It can be uncomfortable for short bursts, the release is usually felt as relief." },
      { q: "How many sessions are typical?", a: "Most soft-tissue cases take 4–6 sessions; chronic cases longer." },
      { q: "Are your doctors ART-credentialed?", a: "Yes, including ELITE-level providers." },
      { q: "Is ART covered by insurance?", a: "It's typically billed under manual therapy codes; we'll verify your specific plan." },
    ],
    parentSlug: "/art",
  },
  {
    slug: "percussion-therapy",
    name: "Percussion Therapy",
    shortName: "percussion therapy",
    category: "Physiotherapy",
    summary:
      "Clinical percussion uses rapid, controlled mechanical impulses to relax overactive muscle, increase blood flow, and prep tissue for adjustment or rehab. It's not a consumer massage gun, it's a calibrated clinical tool.",
    conditions: ["Chronic muscle tightness", "Post-workout soreness", "Trigger points", "Fibromyalgia tension", "Lower-back tightness", "Calf tightness", "Forearm tightness in laptop users", "Plantar fascia tension"],
    benefits: ["Quick muscular relaxation", "Improved blood flow", "Pre-adjustment prep", "Better recovery between sessions", "Reduced trigger-point pain", "Pairs with rehab"],
    process: [
      { title: "Tissue scan", body: "We find overactive muscle and trigger points." },
      { title: "Calibrated treatment", body: "Frequency and head are matched to the structure, not one-size-fits-all." },
      { title: "Joint care after", body: "Percussion is most effective when paired with adjustments." },
      { title: "Home tool guidance", body: "{city} patients with home percussion devices get coached on how to use them safely." },
    ],
    faq: [
      { q: "Is this the same as my home massage gun?", a: "No, clinical percussion uses calibrated tools and is delivered by a trained provider." },
      { q: "Will it bruise me?", a: "Rarely, pressure is controlled to your tolerance." },
      { q: "How long is a session?", a: "Most percussion sessions are 5–10 minutes within a regular visit." },
      { q: "Can I use my own device at home?", a: "Yes, we'll teach you what to do and what to avoid." },
      { q: "Do you offer it in {city}?", a: "Yes, at our nearest clinic to {city}." },
    ],
    parentSlug: "/percussion-therapy",
  },
  {
    slug: "arthrostimulation-therapy",
    name: "Arthrostimulation Therapy",
    shortName: "arthrostimulation therapy",
    category: "Physiotherapy",
    summary:
      "A specific instrument-assisted technique that delivers gentle, repetitive impulses into joints, stimulating proprioceptors, easing restriction, and providing an adjustment-style result without manual thrust. Excellent for sensitive patients.",
    conditions: ["Sensitive-spine patients", "Osteoporosis-aware care", "Post-surgical joints", "Pediatric spinal care", "Geriatric joint stiffness", "Anxious-about-cracking patients", "Chronic neck stiffness", "TMJ"],
    benefits: ["Low-force adjustment-style results", "Comfortable for sensitive patients", "Bone-density-aware", "Pediatric-friendly", "Geriatric-friendly", "Pairs with rehab"],
    process: [
      { title: "Joint testing", body: "We identify the segment that's not moving correctly." },
      { title: "Calibrated impulse", body: "The instrument delivers specific frequency and amplitude." },
      { title: "Re-test", body: "Range of motion is re-tested in the room." },
      { title: "Home plan", body: "{city} patients receive home stretching tied directly to what we treated." },
    ],
    faq: [
      { q: "Is this an adjustment?", a: "It's a chiropractic technique that achieves similar joint goals without manual thrust." },
      { q: "Will I hear a 'pop'?", a: "Usually not, that's part of why patients with sensitive necks prefer it." },
      { q: "Is it safe for osteoporosis?", a: "Yes, it's one of our preferred tools for bone-density-aware care." },
      { q: "Can my child be treated this way?", a: "Yes, it's pediatric-friendly." },
      { q: "Is it offered near {city}?", a: "Yes, available at our nearest clinic to {city}." },
    ],
    parentSlug: "/arthrostimulation-therapy",
  },
  {
    slug: "vibracussion-therapy",
    name: "Vibracussion Therapy",
    shortName: "vibracussion therapy",
    category: "Physiotherapy",
    summary:
      "A clinical vibration-and-percussion combination tool that loosens fascial layers, increases lymphatic flow, and prepares tissue for hands-on care. Often deployed before adjustments and ART.",
    conditions: ["Fascial restriction", "Post-injury swelling", "Chronic muscle bracing", "Pre-adjustment muscle guard", "Neck and shoulder tightness", "Lower-back tightness", "Quadriceps tightness", "Calf tightness"],
    benefits: ["Improved lymphatic flow", "Better tissue glide", "Faster recovery", "Pre-adjustment prep", "Drug-free", "Comfortable session"],
    process: [
      { title: "Tissue scan", body: "We map fascial restriction by hand." },
      { title: "Vibracussion delivery", body: "Frequency is dialed in based on tissue type." },
      { title: "Hands-on follow-up", body: "Vibracussion is a setup tool, not the whole session." },
      { title: "Movement re-load", body: "{city} patients re-load the tissue to lock in the change." },
    ],
    faq: [
      { q: "Is this the same as percussion?", a: "It overlaps, vibracussion adds vibration, percussion adds impulse. We choose by tissue need." },
      { q: "Will it hurt?", a: "Rarely, most patients find it pleasant." },
      { q: "How long is a session?", a: "5–10 minutes inside a regular visit." },
      { q: "Can it bruise me?", a: "Almost never at clinical settings." },
      { q: "Available in {city}?", a: "Yes, at our nearest clinic." },
    ],
    parentSlug: "/vibracussion-therapy",
  },
  {
    slug: "functional-medicine",
    name: "Functional Medicine",
    shortName: "functional medicine",
    category: "Functional",
    summary:
      "A root-cause approach to fatigue, hormone, gut, autoimmune, and inflammation symptoms. We use a personalized care plan, history, and a systems lens, not a 15-minute prescription pad.",
    conditions: ["Chronic fatigue", "Hormone imbalance", "Gut dysfunction", "Autoimmune support", "Inflammation", "Chronic Lyme support", "Brain fog", "Weight loss resistance"],
    benefits: ["Root-cause investigation", "Personalized care plan", "Personalized supplementation", "Lifestyle-first plans", "Doctor-level oversight", "Long-term wellness"],
    process: [
      { title: "Deep-dive intake", body: "First visit is 45–60 minutes, we listen to your story, not just your chief complaint." },
      { title: "Personalized care plan", body: "A targeted plan built around your case, not a fishing expedition." },
      { title: "Plain-language results review", body: "We sit down with your results and explain everything, not 'everything looks normal.'" },
      { title: "Layered protocol", body: "{city} patients leave with a written, sequenced lifestyle, food, and supplement plan." },
    ],
    faq: [
      { q: "Is functional medicine covered by insurance?", a: "Visits and care plans vary, some are covered, some are cash. We'll be straightforward about cost up front." },
      { q: "Do I have to stop my medications?", a: "No, we coordinate with your medical doctor and never tell you to stop a prescription." },
      { q: "How long until I feel better?", a: "Most {city} patients feel real change inside 8–12 weeks." },
      { q: "What does the care plan involve?", a: "It depends on the case, common areas we address are gut, hormone, full thyroid, and inflammatory markers." },
      { q: "Can I do telehealth?", a: "Yes for most follow-ups; the first visit is in-person." },
    ],
    parentSlug: "/functional-medicine",
  },
  {
    slug: "functional-kinesiology",
    name: "Functional Kinesiology",
    shortName: "functional kinesiology",
    category: "Functional",
    summary:
      "A muscle-testing-based assessment that maps how your body's systems respond to mechanical, nutritional, and emotional stressors. Findings drive a hands-on, root-cause plan.",
    conditions: ["Unexplained fatigue", "Stress-driven physical symptoms", "Functional gut symptoms", "Chronic inflammation", "Supplement-overwhelmed patients", "Postural compensation patterns", "Athletic performance gaps", "General wellness"],
    benefits: ["A real diagnostic conversation", "Body-system mapping", "Targeted intervention", "Supplement de-cluttering", "Performance gains", "Whole-person care"],
    process: [
      { title: "Story-first intake", body: "We listen for the pattern under the symptom." },
      { title: "Muscle-testing assessment", body: "Specific muscles are tested under specific stressors." },
      { title: "Layered plan", body: "Hands-on care, food, supplements, lifestyle, sequenced." },
      { title: "Re-test", body: "{city} patients are re-tested on revisits, we don't 'just keep going'." },
    ],
    faq: [
      { q: "Is this 'real' medicine?", a: "It's a clinical assessment system, not a replacement for medical care, but a useful complement." },
      { q: "Do I have to stop seeing my doctor?", a: "Never. We work with your medical team." },
      { q: "How long is the first visit?", a: "60–75 minutes." },
      { q: "Will I be sold a lot of supplements?", a: "No, many patients leave with fewer supplements than they came in with." },
      { q: "Is it offered near {city}?", a: "Yes, at our nearest clinic to {city}." },
    ],
    parentSlug: "/functional-kinesiology",
  },
  {
    slug: "functional-postural-analysis",
    name: "Functional Postural Analysis",
    shortName: "functional postural analysis",
    category: "Functional",
    summary:
      "A measurement-based posture assessment that quantifies how far your head, shoulders, and pelvis are from neutral, and the pain price your body is paying for it.",
    conditions: ["Forward-head posture", "Rounded shoulders", "Pelvic tilt", "Functional scoliosis", "Tech-neck", "Postural fatigue", "Chronic upper-back pain", "Headaches"],
    benefits: ["Measured posture, not estimated", "Specific corrective plan", "Photo-based progress tracking", "Pain reduction", "Long-term spine health", "Workstation correction"],
    process: [
      { title: "Photo + measurement", body: "We capture posture from four angles using clinical reference points." },
      { title: "Plain-language report", body: "You see exactly what's tilted and by how much." },
      { title: "Targeted correction", body: "Adjustments + rehab matched to your specific deviations." },
      { title: "Re-photo every 6 weeks", body: "{city} patients see measured progress, not 'I think you look better'." },
    ],
    faq: [
      { q: "Is this the same as a spine X-ray?", a: "No, postural analysis is non-X-ray surface measurement. Imaging is ordered separately when needed." },
      { q: "Can adults change posture?", a: "Yes, adult posture is changeable in months, not years, with the right plan." },
      { q: "Will I see progress photos?", a: "Yes, that's the point. We re-photo every 6 weeks." },
      { q: "Do you do this for kids?", a: "Yes, kid postural screens catch issues early before scoliosis becomes structural." },
      { q: "Available near {city}?", a: "Yes, at our nearest clinic." },
    ],
    parentSlug: "/functional-postural-analysis",
  },
  {
    slug: "functional-movement-restoration",
    name: "Functional Movement Restoration",
    shortName: "functional movement restoration",
    category: "Functional",
    summary:
      "A rehab protocol that maps your weakest movement patterns and rebuilds them in order, from basic stability through compound athletic patterns. It's why patients stay better, not just feel better.",
    conditions: ["Post-injury weakness", "Recurring back pain", "Recurring neck pain", "Athletic plateau", "Post-surgical rehab", "Senior strength loss", "Sedentary deconditioning", "Pre-event preparation"],
    benefits: ["Permanent change, not symptom chasing", "Athletic gains", "Reduced re-injury", "Better daily function", "Senior-fall prevention", "Confidence in movement"],
    process: [
      { title: "Movement screen", body: "Clinical screens grade each pattern objectively." },
      { title: "Weak-link plan", body: "Rehab is sequenced so the weakest pattern is fixed first." },
      { title: "Progressive loading", body: "Patterns are loaded only when stability is earned." },
      { title: "Return-to-life testing", body: "{city} patients leave with measurable gains, not just 'go work out at home.'" },
    ],
    faq: [
      { q: "Is this physical therapy?", a: "It overlaps, but our team is also chiropractic, so adjustments and rehab happen together." },
      { q: "Do I need to be an athlete?", a: "No, most patients are everyday people whose backs went out lifting groceries." },
      { q: "How many visits?", a: "Most plans run 6–12 visits over 6–10 weeks." },
      { q: "Will I get exercises at home?", a: "Yes, short, targeted ones, not 30-minute marathons." },
      { q: "Available near {city}?", a: "Yes." },
    ],
    parentSlug: "/functional-movement-restoration",
  },
  {
    slug: "nutritional-counseling",
    name: "Nutritional Counseling",
    shortName: "nutritional counseling",
    category: "Functional",
    summary:
      "Practical, food-first guidance from a doctor with a master's in applied nutrition. No fad diets, no shopping-list dogma, just personalized, repeatable habits that fit your real schedule.",
    conditions: ["Weight management", "Energy & fatigue", "Inflammation", "GI symptoms", "Athletic fueling", "Hormone-aware eating", "Cardiometabolic risk", "Family-meal planning"],
    benefits: ["Doctor-level guidance", "Real-life food plans", "Macros and micros", "Supplement clarity", "Family-friendly menus", "Long-term sustainability"],
    process: [
      { title: "Food + life intake", body: "What you eat, when, why, and what gets in the way." },
      { title: "Targeted plan", body: "Three to five high-leverage changes, not 30." },
      { title: "Re-check at 3 weeks", body: "Plans get adjusted to your real life, not the textbook's." },
      { title: "Family integration", body: "{city} families learn how to feed the household, not just the patient." },
    ],
    faq: [
      { q: "Is this a meal plan?", a: "It can be, but most patients prefer principles + a few sample days." },
      { q: "Will you sell me supplements?", a: "Only when they make sense. Many patients leave with none." },
      { q: "Will I have to give up X?", a: "Rarely all-or-nothing, usually frequency or pairing changes." },
      { q: "Is this a diet?", a: "No, it's habit work that scales for life." },
      { q: "Available in {city}?", a: "Yes." },
    ],
    parentSlug: "/lifestyle-and-nutritional-advice",
  },
  {
    slug: "integrative-nutrition",
    name: "Integrative Nutrition",
    shortName: "integrative nutrition",
    category: "Functional",
    summary:
      "Personalized, individualized nutrition built around how your body actually responds. We use food, targeted supplements, and lifestyle layered together, not one-tool answers.",
    conditions: ["GI dysfunction", "Hormone imbalance", "Autoimmune support", "Cardiometabolic risk", "Chronic fatigue", "Inflammation", "Performance nutrition", "Weight loss resistance"],
    benefits: ["Personalized care plan", "Doctor-led oversight", "Practical food plans", "Pharma-grade supplements when needed", "Whole-family thinking", "Measurable outcomes"],
    process: [
      { title: "Functional intake", body: "History, symptoms, family medical context." },
      { title: "Personalized care plan", body: "Only what's needed, not a kitchen-sink panel." },
      { title: "Layered protocol", body: "Food, supplements, lifestyle, sequenced and explained." },
      { title: "Progress check-in", body: "{city} patients check in at 8–12 weeks to see real movement on the plan." },
    ],
    faq: [
      { q: "Is this covered by insurance?", a: "Some is, much isn't. We'll quote you up front." },
      { q: "Do I have to take a lot of supplements?", a: "Almost never. The goal is fewer, better-targeted ones." },
      { q: "Is this safe with my medications?", a: "Yes, we screen for interactions and coordinate with your doctor." },
      { q: "How is this different from a dietitian?", a: "We layer functional medicine and clinical care, dietitians are typically food-only." },
      { q: "Available near {city}?", a: "Yes." },
    ],
    parentSlug: "/integrative-nutrition",
  },
  {
    slug: "ergonomics-consultation",
    name: "Ergonomics Consultation",
    shortName: "ergonomics consultation",
    category: "Specialty",
    summary:
      "On-site or virtual workstation correction for the laptop, desk, and chair you actually use. We measure, adjust, and document, and if you have a team, we run group sessions for HR.",
    conditions: ["Tech-neck", "Forearm tightness in keyboard users", "Lower-back pain at desk", "Eye-strain headaches", "Shoulder pain in mouse users", "Hip stiffness", "Standing-desk transitions", "Hybrid-work setup"],
    benefits: ["Pain reduction at work", "Better focus", "Documentation for HR", "Group rates available", "Practical setup tips", "Fewer sick days"],
    process: [
      { title: "Workstation audit", body: "Monitor height, chair, keyboard, distance, lighting." },
      { title: "Targeted fixes", body: "We use what you have first, purchases are last resort." },
      { title: "Movement habits", body: "Two-minute movement breaks beat any chair." },
      { title: "Documentation", body: "{city} employers receive a written audit and rec list." },
    ],
    faq: [
      { q: "Do you come on-site?", a: "Yes, to homes and offices in our service area." },
      { q: "Do you do groups?", a: "Yes, group rates and HR-focused presentations available." },
      { q: "Will I have to buy a new chair?", a: "Usually not, most setups can be improved with what you have." },
      { q: "Is virtual setup a real thing?", a: "Yes, video calls work well for remote-worker setups." },
      { q: "Do you serve {city}?", a: "Yes, {city} is in our regular service area." },
    ],
    parentSlug: "/ergonomics",
  },
  {
    slug: "dot-physicals",
    name: "DOT Physicals",
    shortName: "DOT physicals",
    category: "Specialty",
    summary:
      "FMCSA-compliant DOT exams performed by a Nationally Registered Certified Medical Examiner (NRCME). Same-day appointments are common; you walk out with your medical card.",
    conditions: ["CDL holders", "New CDL applicants", "School-bus drivers", "DOT-regulated drivers", "Annual recertifications", "Diabetes-managed drivers", "Sleep-apnea drivers (with documentation)", "Medication-managed drivers"],
    benefits: ["NRCME-credentialed examiner", "Same-day medical card", "Drug-free clinic environment", "Fast appointments", "Affordable", "Local & convenient"],
    process: [
      { title: "Vitals & vision", body: "Standard FMCSA panel." },
      { title: "Medical-history review", body: "We review your meds, conditions, and any provider letters." },
      { title: "Physical exam", body: "Per FMCSA standard, no surprises." },
      { title: "Card on the spot", body: "{city} drivers walk out with the medical card the same visit when qualifying." },
    ],
    faq: [
      { q: "Is your examiner NRCME-certified?", a: "Yes, we're listed on the FMCSA National Registry." },
      { q: "How long is the appointment?", a: "30–45 minutes for most drivers." },
      { q: "Do I need to bring anything?", a: "Glasses/contacts, hearing aids, and any specialist letters (sleep apnea CPAP compliance, diabetes A1c, etc.)." },
      { q: "Will I get my card today?", a: "If you qualify, yes." },
      { q: "Do you serve drivers from {city}?", a: "Yes, {city}-area drivers are common at our nearest clinic." },
    ],
    parentSlug: "/dot-physicals",
  },
  {
    slug: "lyme-disease-care",
    name: "Lyme Disease Care",
    shortName: "Lyme disease care",
    category: "Specialty",
    summary:
      "Functional support for patients dealing with active or chronic Lyme symptoms, fatigue, joint pain, neurological complaints. We work alongside your medical team with a personalized care plan, nutrition, and targeted protocols.",
    conditions: ["Acute Lyme support", "Chronic Lyme symptoms", "Post-treatment fatigue", "Joint and muscle pain", "Neurological symptoms", "Co-infection support", "Inflammation management", "Immune resilience"],
    benefits: ["Functional-medicine layered care", "Personalized care plan", "Lifestyle and nutrition support", "Whole-family thinking", "Coordination with your MD", "Long-term resilience"],
    process: [
      { title: "Detailed history", body: "Tick exposure, symptoms, prior history, prior treatment." },
      { title: "Personalized care plan", body: "Conventional plus functional considerations when relevant." },
      { title: "Layered protocol", body: "Sleep, food, supplements, and stress, sequenced." },
      { title: "Long-arc tracking", body: "{city} Lyme patients track symptoms in writing, progress is real and measurable." },
    ],
    faq: [
      { q: "Are you replacing my infectious-disease doctor?", a: "No, we layer functional care alongside conventional care." },
      { q: "Do you treat chronic Lyme?", a: "Yes, with a focus on inflammation, sleep, food, and resilience." },
      { q: "How long is the first visit?", a: "60–75 minutes." },
      { q: "Is this covered by insurance?", a: "Some care plans and visits are; we'll be transparent up front." },
      { q: "Available near {city}?", a: "Yes." },
    ],
    parentSlug: "/lyme-disease-solutions",
  },
  {
    slug: "athletic-care",
    name: "Athletic Care",
    shortName: "athletic care",
    category: "Specialty",
    summary:
      "Performance care for active patients, runners, lifters, weekend tennis players, and youth-sport families. We treat injuries, rebuild movement, and tune performance with sport-specific tools.",
    conditions: ["Running injuries", "Lifting injuries", "Tennis / golf elbow", "Plantar fasciitis", "Hip mobility", "Shoulder mobility", "Pre-event tune-ups", "Concussion recovery support"],
    benefits: ["Faster return to sport", "Better movement quality", "Injury-prevention plans", "Pre-event tune-ups", "ART + IASTM in-house", "Performance focus, not just pain"],
    process: [
      { title: "Sport intake", body: "Sport, position, training load, goal event." },
      { title: "Movement screen", body: "Functional screen for the link in the chain that's failing." },
      { title: "Combined treatment", body: "Adjustments + ART + IASTM + rehab in one visit." },
      { title: "Return-to-sport plan", body: "{city} athletes don't just rest, we rebuild." },
    ],
    faq: [
      { q: "Do you treat youth athletes?", a: "Yes, youth and high-school athletes are a big part of our practice." },
      { q: "Do I have to stop training?", a: "Usually not, we modify load while we treat." },
      { q: "Will I get exercises?", a: "Yes, short, targeted, sport-specific." },
      { q: "Do you treat masters athletes?", a: "Absolutely, many of our {city} patients are masters competitors." },
      { q: "Available near {city}?", a: "Yes." },
    ],
    parentSlug: "/athletic-care",
  },
  {
    slug: "corporate-wellness",
    name: "Corporate Wellness",
    shortName: "corporate wellness programs",
    category: "Specialty",
    summary:
      "On-site speaking, screenings, and wellness programs designed for employers who care about their team's musculoskeletal health. Lunch-and-learns, ergonomics audits, and wellness fairs available.",
    conditions: ["Desk-pain teams", "Manufacturing & lifting teams", "Hybrid-work fatigue", "Injury-rate reduction", "Wellness-fair programming", "HR-led prevention", "Ergonomics rollout", "DOT-regulated workforces"],
    benefits: ["On-site speakers", "Lunch-and-learns", "Group ergonomics audits", "Reduced sick days", "Insurance-cost-aware programming", "Tailored to your team"],
    process: [
      { title: "Discovery call", body: "We learn your team, pain points, and goal." },
      { title: "Custom program", body: "Lunch-and-learn, audit, fair, or recurring sessions." },
      { title: "On-site execution", body: "Our doctors come to your office, including {city} employers." },
      { title: "Follow-up & metrics", body: "We track participation and outcomes for HR." },
    ],
    faq: [
      { q: "Do you travel to offices?", a: "Yes, we travel to employers in our service area." },
      { q: "How much does it cost?", a: "Quoted to your scope. Lunch-and-learns are flat-rate; programs scale." },
      { q: "Can you do hybrid teams?", a: "Yes, virtual sessions or hybrid recordings available." },
      { q: "Do you support HR documentation?", a: "Yes, we provide write-ups and recommendations." },
      { q: "Do you serve {city} employers?", a: "Yes." },
    ],
    parentSlug: "/health-talks",
  },
  {
    slug: "worksite-care",
    name: "Worksite Care",
    shortName: "on-site worksite chiropractic",
    category: "Specialty",
    summary:
      "Recurring on-site chiropractic and rehab visits for employers who want to keep their workforce out of pain and at work. Programs scale from monthly to weekly, single-site to multi-site.",
    conditions: ["Manufacturing teams", "Distribution & lifting teams", "Office desk teams", "Hybrid-work teams", "Multi-site operations", "Healthcare workforces", "Construction crews", "Public safety teams"],
    benefits: ["Reduced lost-time injuries", "Higher employee retention", "On-site, no waiting room", "HR-friendly reporting", "Custom cadence", "Scalable programs"],
    process: [
      { title: "Site walk-through", body: "We see the actual jobs your team does." },
      { title: "Custom cadence", body: "Weekly, monthly, multi-site, designed for your size." },
      { title: "Documented care", body: "HR-friendly reports without breaching individual privacy." },
      { title: "Outcome tracking", body: "{city} employers see measurable change, not just a wellness photo op." },
    ],
    faq: [
      { q: "Is this insurance-billable?", a: "Often, yes, but many employers pay flat program fees." },
      { q: "What size company is right for this?", a: "Anything from a 50-person plant to a multi-site enterprise." },
      { q: "Do you replace OSHA programs?", a: "No, we complement them." },
      { q: "Can our remote employees join?", a: "We can layer virtual sessions for hybrid teams." },
      { q: "Do you serve {city} employers?", a: "Yes." },
    ],
    parentSlug: "/worksite-care",
  },
  {
    slug: "knee-pain-relief",
    name: "Knee Pain Relief",
    shortName: "knee pain care",
    category: "Pain Relief",
    summary:
      "Most knee pain is hips and ankles in disguise. We diagnose what's actually driving your knee, joint, tendon, hip mobility, ankle stability, and treat the chain, not the spot.",
    conditions: ["Patellofemoral pain", "Patellar tendinopathy", "IT-band-driven knee pain", "Post-meniscus rehab", "ACL post-surgical", "Hip-driven knee pain", "Runner's knee", "Arthritic knee support"],
    benefits: ["Whole-chain approach", "Drug-free relief", "Avoidance of unnecessary procedures", "Sport-specific rehab", "Senior-friendly options", "Long-term durability"],
    process: [
      { title: "Hip-to-ankle exam", body: "We test the chain, not just the knee." },
      { title: "Soft-tissue & joint care", body: "ART, IASTM and joint mobilization in the same visit." },
      { title: "Strength rebuild", body: "Glutes, hips, calves, the structures that protect the knee." },
      { title: "Return-to-stairs", body: "{city} patients regain stairs, sit-to-stand, and squat patterns measurably." },
    ],
    faq: [
      { q: "Will I need an MRI?", a: "Most don't. We image when exam findings call for it." },
      { q: "Can you avoid knee surgery?", a: "Many patients can avoid or delay it, depends on the structure involved." },
      { q: "Do you treat post-op knees?", a: "Yes, alongside the surgeon's protocol." },
      { q: "Will I have to stop running?", a: "Usually not, we'll modify load while we treat." },
      { q: "Available near {city}?", a: "Yes." },
    ],
    parentSlug: "/lower-back",
  },
  {
    slug: "car-accident-recovery",
    name: "Car Accident Recovery",
    shortName: "auto-injury & whiplash care",
    category: "Specialty",
    summary:
      "Whiplash, post-MVA neck and back pain, headaches, and concussion symptoms, diagnosed and treated with proper documentation for insurance and legal needs.",
    conditions: ["Whiplash", "Post-MVA headaches", "Concussion symptoms", "Mid-back / rib pain", "Lumbar disc injury", "Shoulder injury (seatbelt)", "TMJ from impact", "Anxiety-driven muscle guarding"],
    benefits: ["Same-week appointments", "Insurance & legal documentation", "Drug-free care", "Coordinated with your attorney", "PIP-friendly", "Comprehensive whiplash protocol"],
    process: [
      { title: "Injury intake", body: "Mechanism of injury, prior care, current symptoms, in detail." },
      { title: "Imaging review", body: "We review existing imaging and order more only if findings call for it." },
      { title: "Phased treatment", body: "Acute, sub-acute, and rehab, not 'just adjust them forever'." },
      { title: "Documentation", body: "{city} patients receive proper PIP and legal-grade notes." },
    ],
    faq: [
      { q: "Will my PIP cover this?", a: "Usually yes, we verify your specific policy up front." },
      { q: "Can you write a report for my attorney?", a: "Yes." },
      { q: "How soon should I come in after an accident?", a: "As soon as possible, within 1–2 weeks ideally." },
      { q: "Do you treat concussion?", a: "We treat concussion-related neck and posture issues; we co-manage with neurology when indicated." },
      { q: "Available near {city}?", a: "Yes." },
    ],
    parentSlug: "/head-and-neck",
  },
];

/* ──────────────────────────────────────────────────────────────────────────
   LOOKUPS / HELPERS
   ────────────────────────────────────────────────────────────────────── */

export const CITY_BY_SLUG = Object.fromEntries(CITIES.map((c) => [c.slug, c])) as Record<string, City>;
export const SERVICE_BY_SLUG = Object.fromEntries(SERVICES.map((s) => [s.slug, s])) as Record<string, ServiceData>;

/** All combos, used by sitemap + the index page. */
export function allPseoPaths(): { city: string; service: string }[] {
  const out: { city: string; service: string }[] = [];
  for (const c of CITIES) for (const s of SERVICES) out.push({ city: c.slug, service: s.slug });
  return out;
}

/** Nearby cities = cities sharing the same anchor clinic (sorted by drive time). */
export function nearbyCities(citySlug: string, n = 8): City[] {
  const c = CITY_BY_SLUG[citySlug];
  if (!c) return [];
  return CITIES
    .filter((x) => x.clinic === c.clinic && x.slug !== c.slug)
    .sort((a, b) => Math.abs(a.driveMin - c.driveMin) - Math.abs(b.driveMin - c.driveMin))
    .slice(0, n);
}

/** Related services = same category first, then any others. */
export function relatedServices(serviceSlug: string, n = 8): ServiceData[] {
  const s = SERVICE_BY_SLUG[serviceSlug];
  if (!s) return [];
  const same = SERVICES.filter((x) => x.category === s.category && x.slug !== s.slug);
  const rest = SERVICES.filter((x) => x.category !== s.category && x.slug !== s.slug);
  return [...same, ...rest].slice(0, n);
}

/**
 * Silo link-back: pSEO services whose `parentSlug` points at a given real
 * money/pillar page (e.g. "/lower-back"). Used to link the pillar page down
 * into its local city x service leaf pages, closing the hub -> leaf -> pillar loop.
 */
export function pseoChildrenForParent(parentSlug: string): ServiceData[] {
  return SERVICES.filter((s) => s.parentSlug === parentSlug);
}

/** A small, curated set of cities (both clinic anchors first) for cross-linking from pillar pages. */
export function representativeCities(n = 8): City[] {
  return [...CITIES].sort((a, b) => a.driveMin - b.driveMin).slice(0, n);
}
