import {
  CDC_OBESITY_2024_HREF,
  CDC_OBESITY_2024_LABEL,
  CENSUS_AGE_65_2024_HREF,
  CENSUS_AGE_65_2024_LABEL,
} from "./citations";
import type { HoStatePage } from "./types";

/** Final Oregon copy, Nov 13, 2026. Copy kept as written. */
const oregon: HoStatePage = {
  slug: "oregon",
  name: "Oregon",
  abbreviation: "OR",
  presence: "ho-telehealth",
  title: "Health Optimization Telehealth in Oregon | YHN",
  metaDescription: "Oregon residents can start a Health Optimization Program by video with Dr. Chris Chianese. There is no YHN clinic in Oregon. Book against Pacific time.",
  h1: "Health Optimization Programs by Telehealth in Oregon",
  primaryKeyword: "health optimization telehealth in Oregon",
  blocks: [
    {
      type: "p",
      text: "Oregon is three hours behind the clocks in our New Jersey and Pennsylvania clinics. That one fact should change how you book. The Your Health Now calendar and the posted clinic hours \u2014 Monday through Friday, 7:30 a.m. to 8:00 p.m. Eastern \u2014 are 4:30 a.m. to 5:00 p.m. Pacific. An early Eastern slot is still the middle of the night in Portland, Eugene, Salem, or Bend. A late-afternoon Pacific slot is already evening in Merchantville. Pick the time that exists on your clock, not the time that looks convenient on an East Coast calendar.",
    },
    {
      type: "p",
      text: "Most of Oregon is on Pacific time. The majority of Malheur County, in the far east of the state, is on Mountain time, two hours behind Eastern rather than three. If that is where you live, convert by two hours, not three.",
    },
    {
      type: "p",
      text: "What you are booking is a Health Optimization Program with Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP, by secure video. Your Health Now does not have an Oregon clinic, and Personalized Clinical Care \u2014 the functional medicine telehealth pathway for more complex or ongoing illness \u2014 is not currently listed for Oregon. Both of those limits are intentional on this page. The programs are open to Oregon residents because the site states that Health Optimization consults are open to residents of every state. The clinical pathway is open today in nine other places listed on the [Functional Medicine](/functional-medicine) page, including Washington, next door, but not here. Living in Portland does not open the Washington pathway. If you live in Washington, that state\u2019s functional medicine page is a separate offer, and it is not this one. If you live in California, use [Health Optimization in California](/health-optimization-programs/california).",
    },
    {
      type: "p",
      text: "Portland searches for functional medicine are as strong as the statewide phrase \u2014 about 320 US searches a month for each, per DataForSEO. That is useful context, and it is not a reason to pretend we have a waiting room in Portland, Eugene, or Bend. This remains one statewide page.",
    },
    {
      type: "h2",
      text: "What is open in Oregon \u2014 and what is not",
    },
    {
      type: "p",
      text: "Open to Oregon residents:",
    },
    {
      type: "ul",
      items: [
        "All twelve [Health Optimization Programs](/health-optimization-programs), by secure video, from anywhere in the state.",
        "A complimentary 30-minute consult with Dr. Chris, booked through Jane App or by calling (609) 651-7436, as a fit check before a first visit.",
      ],
    },
    {
      type: "p",
      text: "Not offered in Oregon:",
    },
    {
      type: "ul",
      items: [
        "A Your Health Now office, a physical exam, or a chiropractic adjustment. Hands-on care is only at 5 W Chestnut Ave, Merchantville, NJ, and 350 N Main St #201, Chalfont, PA. If you are not traveling to one of those clinics, the entire program is video.",
        "Personalized Clinical Care / functional medicine telehealth for complex or chronic illness. It is listed today in New Jersey, Pennsylvania, Florida, Delaware, Vermont, Arizona, Idaho, Washington, and Washington, D.C., not in Oregon.",
        "A statement that Dr. Chris is licensed for every service in Oregon. Telehealth rules vary by state and by provider type. The team confirms licensing and scope of practice before a first visit.",
      ],
    },
    {
      type: "p",
      text: "People Also Ask results for Oregon sometimes ask what naturopaths may do in the state, or where to get mental health help. Your Health Now is not a naturopathic clinic, and this page is not a mental-health crisis resource. Telehealth for these programs is with Dr. Chris, a chiropractic physician with a master\u2019s in applied nutrition and the IFM FMCP credential. His training is on [Meet the Doctor](/meet-the-doctor). If you need urgent mental-health support, use local emergency services or a local clinician; do not use this program as a stand-in for that care.",
    },
    {
      type: "h2",
      text: "How care works from Oregon, including the time change",
    },
    {
      type: "p",
      text: "The first conversation is the complimentary 30-minute consult. It is not a treatment visit and not a diagnosis. You talk through why you are calling and whether a Health Optimization Program is appropriate. If you continue, the program starts with a 90-minute telehealth visit: intake, goal setting, and the choice of a 6-month or 12-month pathway. Professional supplements, when recommended, are purchased separately.",
    },
    {
      type: "p",
      text: "Because the calendar is Eastern, it helps to translate a few anchors before you confirm a slot (Pacific time):",
    },
    {
      type: "ul",
      items: [
        "10:00 a.m. Eastern is 7:00 a.m. Pacific.",
        "1:00 p.m. Eastern is 10:00 a.m. Pacific.",
        "4:00 p.m. Eastern is 1:00 p.m. Pacific.",
        "8:00 p.m. Eastern, the close of posted clinic hours, is 5:00 p.m. Pacific.",
      ],
    },
    {
      type: "p",
      text: "There is no separate Portland or Bend version of the program. Distance to our clinics is measured in a cross-country trip, not in a drive down I-5, so the work is designed to be finished by video whether you live in the Portland metro, the Willamette Valley, the coast, Central Oregon, or the east.",
    },
    {
      type: "h2",
      text: "Oregon health picture, and which programs are most relevant here",
    },
    {
      type: "p",
      text: "These figures describe the state. They are not testimonials, and they are not a diagnosis.",
    },
    {
      type: "p",
      text: "Oregon is older than the country as a whole. The Census Bureau\u2019s 2024 ACS 1-year estimates put 19.9% of Oregon\u2019s population at age 65 or older, compared with 18.0% nationally \u2014 older than Texas (14.0%) and Georgia (15.8%) in this same batch, and close to Michigan and Ohio. That is why this page leads with the [Longevity & Healthy Aging Program](/health-optimization-programs), for people who want a proactive plan around energy, cognitive function, and longer-term wellness, and the [Heart Health Optimization Program](/health-optimization-programs), for people whose focus is cardiovascular wellness or family history. Neither program is emergency care, and neither replaces a local physician when urgent symptoms appear.",
    },
    {
      type: "p",
      text: "The CDC\u2019s 2024 BRFSS adult obesity maps put Oregon at 33.5%. That is lower than Michigan, Ohio, Texas, and Georgia on the same table, and it is still more than one in three adults. For residents whose goals involve weight change, cravings, low energy, or a slower metabolism, the [Healthy Weight & Metabolism Program](/health-optimization-programs) is the pathway designed for that work.",
    },
    {
      type: "p",
      text: "The [Hormone Balance & Vitality Program](/health-optimization-programs) is the fourth pathway we highlight here, for symptoms that may be related to hormone imbalance such as fatigue, weight changes, poor sleep, mood changes, or low energy. The article on [functional medicine, hormones, and thyroid](/articles/functional-medicine-hormone-thyroid) is a useful briefing before the consult. If inflammation or nutrition is more of the picture, [inflammation and chronic illness](/articles/inflammation-chronic-illness) and [personalized nutrition and functional medicine](/articles/personalized-nutrition-functional-medicine) are the closer reads.",
    },
    {
      type: "h2",
      text: "Limits of this offer, stated plainly",
    },
    {
      type: "p",
      text: "What we do, on this offer, is a structured Health Optimization Program: a documented intake, a 90-minute visit with Dr. Chris, a 6- or 12-month pathway, and follow-up, using a functional medicine approach. What we do not do from Oregon is provide a local physical exam, an adjustment, urgent or emergency care, or Personalized Clinical Care for complex illness. We also do not present Dr. Chris as a medical doctor or as a naturopathic physician. A Health Optimization Program is not a replacement for your Oregon primary care relationship.",
    },
    {
      type: "p",
      text: "If the consult shows that your case is more complex than a program, the honest answer may be that the clinical pathway is not listed in Oregon and that another kind of local care is the better next step.",
    },
    {
      type: "h2",
      text: "How to start",
    },
    {
      type: "p",
      text: "Book a complimentary 30-minute consult through Jane App, or call (609) 651-7436, and convert the slot to Pacific time \u2014 or to Mountain time if you live in the part of Malheur County that uses it \u2014 before you confirm it. You can also [contact us](/contact-us) if you need help with the time conversion. Published states are listed on the [states hub](/states). Clinic addresses, if you ever need them, are on [Locations](/locations). In-person [family chiropractic care](/family-chiropractic-care) is only at those two offices, not in Oregon.",
    },
    {
      type: "p",
      text: "Educational information on this website is not a diagnosis or a substitute for an in-person exam. See the [medical disclaimer](/medical-disclaimer).",
    },
  ],
  faqs: [
    {
      q: "Is there a Your Health Now clinic in Portland, Eugene, or Bend?",
      a: "No. There is no YHN office anywhere in Oregon. Program visits are by secure video statewide. The two physical clinics are in Merchantville, New Jersey, and Chalfont, Pennsylvania.",
    },
    {
      q: "Is functional medicine telehealth offered in Oregon? What about Washington, next door?",
      a: "Personalized Clinical Care is not currently listed for Oregon. Oregon residents can use Health Optimization Programs by video. Washington is one of the nine places where the clinical pathway is already listed, but living in Oregon does not open that pathway. The complimentary consult is where we keep that distinction honest.",
    },
    {
      q: "What time should I book if I live in Oregon?",
      a: "The calendar is Eastern time. Most of Oregon is Pacific time, so subtract three hours. Posted hours that run until 8:00 p.m. Eastern close at 5:00 p.m. Pacific. If you live in the part of Malheur County that uses Mountain time, subtract two hours.",
    },
    {
      q: "Is Dr. Chris a medical doctor or a naturopathic physician?",
      a: "No. He is a Doctor of Chiropractic with a master\u2019s in applied nutrition and the IFM FMCP credential. His training is listed on [Meet the Doctor](/meet-the-doctor). Your Health Now is not a naturopathic clinic.",
    },
    {
      q: "Can I get a chiropractic adjustment in Oregon through this visit?",
      a: "No. Adjustments and physical exams are only at the New Jersey and Pennsylvania clinics. Oregon program visits are video only.",
    },
    {
      q: "Is this a mental-health clinic?",
      a: "No. If you need urgent mental-health support, contact local emergency services or a local clinician. A Health Optimization Program is not a substitute for that care.",
    },
    {
      q: "I live in southern Oregon, near California. Is there a different program?",
      a: "No. Oregon residents use this statewide video program. If you live in California, use [Health Optimization in California](/health-optimization-programs/california).",
    },
  ],
  sources: [
    {
      href: CDC_OBESITY_2024_HREF,
      text: `${CDC_OBESITY_2024_LABEL}. Oregon adult obesity 33.5%.`,
    },
    {
      href: CENSUS_AGE_65_2024_HREF,
      text: `${CENSUS_AGE_65_2024_LABEL}. Oregon 19.9%; United States 18.0%.`,
    },
  ],
};

export default oregon;
