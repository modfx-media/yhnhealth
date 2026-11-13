import {
  CDC_OBESITY_2024_HREF,
  CDC_OBESITY_2024_LABEL,
  CENSUS_AGE_65_2024_HREF,
  CENSUS_AGE_65_2024_LABEL,
  CDC_NNDSS_2023_HREF,
  CDC_NNDSS_2023_LABEL,
} from "./citations";
import type { HoStatePage } from "./types";

/** Final Ohio copy, Nov 13, 2026. Copy kept as written. */
const ohio: HoStatePage = {
  slug: "ohio",
  name: "Ohio",
  abbreviation: "OH",
  presence: "ho-telehealth",
  title: "Health Optimization Telehealth in Ohio | YHN",
  metaDescription: "Ohio residents can start a Health Optimization Program by video with Dr. Chris Chianese. There is no YHN clinic in Ohio, including Columbus and Cleveland.",
  h1: "Health Optimization Programs by Telehealth in Ohio",
  primaryKeyword: "health optimization telehealth in Ohio",
  blocks: [
    {
      type: "p",
      text: "Ohio has three large metros that people often treat as if they were three different health systems \u2014 Columbus, Cleveland, and Cincinnati \u2014 and none of them has a Your Health Now clinic. There is no office in Toledo, Dayton, or Akron either. This page will not invent one.",
    },
    {
      type: "p",
      text: "What is open to Ohio residents is a Health Optimization Program with Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP, by secure video, from anywhere in the state. These are structured, doctor-led 6- or 12-month pathways that use a functional medicine approach for people who want a plan around energy, hormones, metabolism, longevity, and related goals, even if they are not dealing with a major or complex illness. They start with a complimentary 30-minute consult and, if you continue, a 90-minute telehealth visit.",
    },
    {
      type: "p",
      text: "What is not currently listed for Ohio is Personalized Clinical Care, the functional medicine telehealth pathway for more complex or ongoing illness. That clinical pathway is open today in nine places listed on the [Functional Medicine](/functional-medicine) page. Pennsylvania, next door, is one of those nine, and Pennsylvania also has an in-person clinic in Chalfont and a live Health Optimization page. If you live in Ohio, those Pennsylvania pages are not your offer. Living in Youngstown or Toledo does not turn you into a Pennsylvania patient. If you live in Pennsylvania, use [Health Optimization in Pennsylvania](/health-optimization-programs/pennsylvania) or [Functional Medicine Telehealth in Pennsylvania](/functional-medicine/pennsylvania) instead of this one. If you live in Michigan, use [Health Optimization in Michigan](/health-optimization-programs/michigan).",
    },
    {
      type: "p",
      text: "Columbus currently leads Ohio city searches for functional medicine \u2014 about 480 US searches a month, with Cleveland at 320 and Cincinnati at 210, per DataForSEO. The statewide phrase \u201cfunctional medicine ohio\u201d is only 50. That pattern is useful context, and it is not a reason to launch a Columbus, Cleveland, or Cincinnati URL in this batch. This remains one statewide page.",
    },
    {
      type: "p",
      text: "People Also Ask results for Ohio sometimes ask for a list of major healthcare companies in the state, or how a naturopath differs from a functional medicine doctor. We will not publish a ranking of Ohio health systems. Your Health Now is not a naturopathic clinic. Telehealth for these programs is with Dr. Chris.",
    },
    {
      type: "h2",
      text: "What is open in Ohio \u2014 and what is not",
    },
    {
      type: "p",
      text: "Open to Ohio residents:",
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
      text: "Not offered in Ohio:",
    },
    {
      type: "ul",
      items: [
        "A Your Health Now office, a physical exam, or a chiropractic adjustment. Hands-on care is only at 5 W Chestnut Ave, Merchantville, NJ, and 350 N Main St #201, Chalfont, PA. If you are not traveling to one of those clinics, the entire program is video.",
        "Personalized Clinical Care / functional medicine telehealth for complex or chronic illness, unless and until the practice confirms that pathway is open in Ohio. It is not listed on the live site today.",
        "A statement that Dr. Chris is licensed for every service in Ohio. Telehealth rules vary by state and by provider type. The team confirms licensing and scope of practice before a first visit.",
      ],
    },
    {
      type: "h2",
      text: "How care works from Ohio",
    },
    {
      type: "p",
      text: "The entire state is on Eastern time, the same clock as the Merchantville and Chalfont clinics. A time on the booking calendar is the time on your clock, whether you are in Cincinnati, Cleveland, or along the Indiana or West Virginia line. You do not convert.",
    },
    {
      type: "p",
      text: "The first conversation is the complimentary 30-minute consult. It is not a treatment visit and not a diagnosis. You talk through why you are calling and whether a Health Optimization Program is appropriate. If you continue, the program starts with a 90-minute telehealth visit: intake, goal setting, and the choice of a 6-month or 12-month pathway. Professional supplements, when recommended, are purchased separately.",
    },
    {
      type: "p",
      text: "There is no separate Columbus, Cleveland, or Cincinnati version of the program. The distance from Cincinnati to Chalfont, or from Cleveland to Merchantville, is not a short drive, and it is not required. The work is designed to be finished by video.",
    },
    {
      type: "h2",
      text: "Ohio health picture, and which programs are most relevant here",
    },
    {
      type: "p",
      text: "These figures describe the state. They are not testimonials, and they are not a diagnosis.",
    },
    {
      type: "p",
      text: "On the CDC\u2019s 2024 BRFSS adult obesity maps, Ohio\u2019s prevalence is 36.9% \u2014 the highest figure among the five states in this batch, and higher than Texas (35.6%), Georgia (35.4%), Michigan (36.1%), and Oregon (33.5%) on the same table. That is one reason this page puts the [Healthy Weight & Metabolism Program](/health-optimization-programs) first among the programs we highlight here. The program is designed for people dealing with weight gain, difficulty losing weight, cravings, low energy, or a sense that metabolism has slowed. It is not a claim that we treat a particular diagnosis, and it is not a promise of a particular result.",
    },
    {
      type: "p",
      text: "Ohio is also older than the country as a whole. The Census Bureau\u2019s 2024 ACS 1-year estimates put 19.1% of Ohio\u2019s population at age 65 or older, compared with 18.0% nationally. For residents whose goal is to stay capable as they age, the [Longevity & Healthy Aging Program](/health-optimization-programs) and the [Heart Health Optimization Program](/health-optimization-programs) are the pathways written for that work \u2014 energy, cognitive function, cardiovascular wellness, or family history. Neither program is emergency care, and neither replaces a local physician when urgent symptoms appear.",
    },
    {
      type: "p",
      text: "The third public fact that belongs on an Ohio page is tick-borne illness. CDC\u2019s 2023 National Notifiable Diseases Surveillance System tables report 1,307 Lyme disease cases in Ohio (940 confirmed and 367 probable). A Health Optimization Program is not a Lyme pathway. If Lyme disease, a suspected tick-borne illness, or a long, complicated recovery is why you are calling, say so on the consult. We will not stretch a proactive program to cover a kind of care that is not currently listed for Ohio. The site\u2019s articles on [chronic Lyme and functional medicine](/articles/chronic-lyme-functional-medicine) and [chronic Lyme vs. mold illness](/articles/chronic-lyme-vs-mold-illness-symptoms-and-testing), and the [Lyme disease solutions](/lyme-disease-solutions) page, are useful background; they are not a substitute for Personalized Clinical Care in a state where that pathway is not yet listed.",
    },
    {
      type: "p",
      text: "The [Energy Restoration Program](/health-optimization-programs) and the [Hormone Balance & Vitality Program](/health-optimization-programs) remain open to Ohio residents as well. Articles on [functional medicine and fatigue](/articles/functional-medicine-fatigue-root-causes) and [functional medicine, hormones, and thyroid](/articles/functional-medicine-hormone-thyroid) are useful briefings before the consult.",
    },
    {
      type: "h2",
      text: "Who you see",
    },
    {
      type: "p",
      text: "Telehealth visits are with Dr. Chris Chianese. He is a Doctor of Chiropractic with a Master of Science in Applied Nutrition, the CPSC credential he founded, and the IFM FMCP credential through the Institute for Functional Medicine. He is not an MD, and he is not a naturopathic physician. His biography is on [Meet the Doctor](/meet-the-doctor). A Health Optimization Program is not a replacement for your Ohio primary care relationship.",
    },
    {
      type: "p",
      text: "If the consult shows that your case is more complex than a program, the honest answer may be that the clinical pathway is not listed in Ohio and that another kind of local care is the better next step.",
    },
    {
      type: "h2",
      text: "How to start",
    },
    {
      type: "p",
      text: "Book a complimentary 30-minute consult through Jane App, or call (609) 651-7436. You do not convert the time. You can also [contact us](/contact-us) if you have a question that is not the consult itself. Published states are listed on the [states hub](/states). Clinic addresses, if you ever need them, are on [Locations](/locations). In-person [family chiropractic care](/family-chiropractic-care) is only at those two offices, not in Ohio.",
    },
    {
      type: "p",
      text: "Educational information on this website is not a diagnosis or a substitute for an in-person exam. See the [medical disclaimer](/medical-disclaimer).",
    },
  ],
  faqs: [
    {
      q: "Is there a Your Health Now clinic in Columbus, Cleveland, or Cincinnati?",
      a: "No. There is no YHN office anywhere in Ohio. Program visits are by secure video statewide. The two physical clinics are in Merchantville, New Jersey, and Chalfont, Pennsylvania.",
    },
    {
      q: "Is functional medicine telehealth offered in Ohio, or only Health Optimization Programs?",
      a: "Only the Health Optimization Programs are currently listed as open to Ohio residents. Personalized Clinical Care is offered today in nine other states and Washington, D.C., not in Ohio.",
    },
    {
      q: "I live in eastern Ohio, near Pennsylvania. Can I use the Chalfont clinic or the Pennsylvania functional medicine page?",
      a: "Those pages are for Pennsylvania residents. If you live in Ohio, this Health Optimization page is the offer currently listed for you. If you live in Pennsylvania, use [Health Optimization in Pennsylvania](/health-optimization-programs/pennsylvania) or [Functional Medicine Telehealth in Pennsylvania](/functional-medicine/pennsylvania).",
    },
    {
      q: "What time zone is the booking calendar on?",
      a: "Eastern time, which is Ohio\u2019s time zone statewide. A slot at 7:30 a.m. is 7:30 a.m. on your clock.",
    },
    {
      q: "Is Dr. Chris a medical doctor or a naturopathic physician?",
      a: "No. He is a Doctor of Chiropractic with a master\u2019s in applied nutrition and the IFM FMCP credential. His training is listed on [Meet the Doctor](/meet-the-doctor). Your Health Now is not a naturopathic clinic.",
    },
    {
      q: "Can I get a chiropractic adjustment in Ohio through this visit?",
      a: "No. Adjustments and physical exams are only at the New Jersey and Pennsylvania clinics. Ohio program visits are video only.",
    },
    {
      q: "I have questions about Lyme disease. Is this the right page?",
      a: "A Health Optimization Program is not the Lyme pathway, and Personalized Clinical Care is not currently listed for Ohio. Tell Dr. Chris why you are calling on the complimentary consult so you are not placed in the wrong type of care.",
    },
    {
      q: "Is the program different in Columbus than it is in Cleveland or Cincinnati?",
      a: "No. Care is statewide. We are not launching city pages in this batch.",
    },
  ],
  sources: [
    {
      href: CDC_OBESITY_2024_HREF,
      text: `${CDC_OBESITY_2024_LABEL}. Ohio adult obesity 36.9%.`,
    },
    {
      href: CENSUS_AGE_65_2024_HREF,
      text: `${CENSUS_AGE_65_2024_LABEL}. Ohio 19.1%; United States 18.0%.`,
    },
    {
      href: CDC_NNDSS_2023_HREF,
      text: `${CDC_NNDSS_2023_LABEL}. Ohio, 2023: 1,307 reported Lyme disease cases (940 confirmed, 367 probable).`,
    },
  ],
};

export default ohio;
