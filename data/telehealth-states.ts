/**
 * Functional medicine telehealth coverage, one entry per state Dr. Chris
 * Chianese (MS, DC, CPSC, IFM FMCP) sees patients in via secure video visit.
 *
 * Only New Jersey and Pennsylvania have a physical YHN clinic (Merchantville,
 * NJ and Chalfont, PA). Every other state is telehealth-only. State-specific
 * legal/licensing, lab-partner, and pricing facts are not yet confirmed by
 * the client - those fields are intentionally left blank/generic in the copy
 * and flagged with a `{/* TODO: needs client info *}/` comment in
 * components/page/StateTelehealthPage.tsx rather than guessed at here.
 */

export type TelehealthState = {
  slug: string;
  /** Full display name, e.g. "New Jersey". */
  name: string;
  /** Postal abbreviation, e.g. "NJ". Used for title tags and schema. */
  abbreviation: string;
  /** True only for the two states with a physical YHN clinic. */
  hasOffice: boolean;
  /** Clinic city name, only set when hasOffice is true. */
  officeCity?: string;
  /** Title tag, kept under 60 characters. */
  title: string;
  /** Meta description, ~150-160 characters. */
  metaDescription: string;
  /** 40-60 word direct-answer paragraph placed right under the H1. */
  directAnswer: string;
  /**
   * Paragraphs that stay true if you delete the state name from a sibling page.
   * Geography and scheduling only. No licensing, lab-network, or price claims.
   */
  localGuide: string[];
  /** One scheduling fact that is true for this state and not copy-pasted. */
  scheduling: string;
  faq: { q: string; a: string }[];
};

export const TELEHEALTH_STATES: TelehealthState[] = [
  {
    slug: "new-jersey",
    name: "New Jersey",
    abbreviation: "NJ",
    hasOffice: true,
    officeCity: "Merchantville",
    title: "Functional Medicine NJ | Dr. Chianese, IFM Certified",
    metaDescription:
      "Get root-cause care from an IFM-certified functional medicine doctor in NJ. Telehealth statewide, plus our Merchantville clinic. Book a free 30-min consult.",
    directAnswer:
      "Your Health Now offers functional medicine telehealth to residents anywhere in New Jersey, led by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. Visits happen over secure video and focus on root-cause testing and a personalized care plan. New Jersey patients can also visit our in-person clinic in Merchantville for exams, adjustments, or in-office labs.",
    localGuide: [
      "Merchantville is a working clinic, not a mailing address: 5 W Chestnut Ave, Merchantville, NJ 08109, (856) 532-2063. Functional medicine visits can happen by secure video from anywhere in New Jersey. The clinic is the place for a physical exam, a chiropractic adjustment, or an in-office lab draw.",
      "You do not have to live in Camden County to be a patient. Someone in North Jersey can do the consult and the ongoing case review by video and never come in. If you want both functional medicine and chiropractic, they are booked separately: the functional medicine case on video or at the office, and the adjustment as its own clinic visit.",
      "The free 30-minute call is a fit check with Dr. Chris. It is not the treatment visit and it is not a diagnosis. Whether your case belongs in Personalized Clinical Care, or in one of the 12 Health Optimization Programs, is part of that conversation.",
    ],
    scheduling:
      "New Jersey and both clinics are on Eastern time, so a time on the booking calendar is the same time on your clock.",
    faq: [
      {
        q: "Do I need to live near Merchantville to do functional medicine telehealth in NJ?",
        a: "No. Telehealth visits with Dr. Chris are open to residents anywhere in New Jersey. The Merchantville clinic is available if you ever want or need an in-person visit, but it is not required.",
      },
      {
        q: "Can I combine telehealth functional medicine with in-person chiropractic care?",
        a: "Yes. Many New Jersey patients see Dr. Chris for functional medicine by video and also visit the Merchantville clinic for chiropractic care. The two are scheduled separately.",
      },
      {
        q: "What happens on the first telehealth visit?",
        a: "You'll talk through your health history, current symptoms, and goals with Dr. Chris, then discuss whether functional lab testing makes sense for your case.",
      },
      {
        q: "Can I do functional medicine by video if I live nowhere near Merchantville?",
        a: "Yes. The Merchantville clinic is optional. Video visits are open to New Jersey residents statewide. Come in only if you want an exam, an adjustment, or an in-office lab draw.",
      },
    ],
  },
  {
    slug: "pennsylvania",
    name: "Pennsylvania",
    abbreviation: "PA",
    hasOffice: true,
    officeCity: "Chalfont",
    title: "Functional Medicine PA | Dr. Chianese Telehealth & Chalfont",
    metaDescription:
      "Doctor-led functional medicine in PA via secure video or our Chalfont clinic. Root-cause labs and personalized protocols. Book a free 30-min consult.",
    directAnswer:
      "Your Health Now offers functional medicine telehealth to residents anywhere in Pennsylvania, led by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. Visits happen over secure video and focus on root-cause testing and a personalized care plan. Pennsylvania patients can also visit our in-person clinic in Chalfont for exams, adjustments, or in-office labs.",
    localGuide: [
      "The Pennsylvania clinic is in Bucks County: 350 N Main St #201, Chalfont, PA 18914, (609) 651-7436. It is one office in the eastern part of the state. Living in Pittsburgh, Erie, Scranton, or anywhere else in Pennsylvania does not block a video visit, and it does not mean you are expected to drive to Chalfont for the functional medicine case.",
      "Use Chalfont when you want a physical exam, a chiropractic adjustment, or an in-office lab draw. Those are separate from the video visit. A patient who only wants the functional medicine work can stay on video for the consult, the history and symptom review, the decision about labs, and follow-up.",
      "Pennsylvania is on Eastern time, the same clock as the Chalfont and Merchantville clinics. The free 30-minute call is where you learn whether this pathway fits, before any paid visit.",
    ],
    scheduling:
      "Chalfont hours and the booking calendar are Eastern time. That matches the whole state, so you do not convert.",
    faq: [
      {
        q: "Do I need to live near Chalfont to do functional medicine telehealth in PA?",
        a: "No. Telehealth visits with Dr. Chris are open to residents anywhere in Pennsylvania. The Chalfont clinic is available if you ever want or need an in-person visit, but it is not required.",
      },
      {
        q: "Can I combine telehealth functional medicine with in-person chiropractic care?",
        a: "Yes. Many Pennsylvania patients see Dr. Chris for functional medicine by video and also visit the Chalfont clinic for chiropractic care. The two are scheduled separately.",
      },
      {
        q: "What happens on the first telehealth visit?",
        a: "You'll talk through your health history, current symptoms, and goals with Dr. Chris, then discuss whether functional lab testing makes sense for your case.",
      },
      {
        q: "I live in western Pennsylvania. Do I still have to come to Chalfont?",
        a: "No. Chalfont is optional. Functional medicine visits are by secure video for Pennsylvania residents anywhere in the state. The office is for an exam, an adjustment, or an in-office lab draw if you want one.",
      },
    ],
  },
  {
    slug: "florida",
    name: "Florida",
    abbreviation: "FL",
    hasOffice: false,
    title: "Functional Medicine Telehealth Florida | Dr. Chianese",
    metaDescription:
      "Florida residents: get root-cause functional medicine care via secure video visit with Dr. Chianese, IFM FMCP. Book a free 30-minute consult today.",
    directAnswer:
      "Your Health Now offers functional medicine telehealth to residents of Florida, led by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. There is no physical YHN office in Florida - every visit happens over secure video, starting with a free 30-minute consult to talk through your symptoms and goals.",
    localGuide: [
      "There is no Your Health Now clinic in Florida, and the functional medicine plan is built to be finished by video. That includes the free consult, the review of your history, symptoms, and goals, the decision about whether functional lab testing makes sense, and later follow-up conversations with Dr. Chris.",
      "A chiropractic adjustment, a physical exam, and an in-office lab draw are not available in Florida. Those happen only at Merchantville, NJ or Chalfont, PA. If you will not be traveling to either clinic, do not expect a local hands-on visit to be part of this program.",
      "Most of Florida, including Miami, Orlando, Tampa, Jacksonville, and Tallahassee, is on Eastern time, the same clock as our clinics. The western panhandle, including Pensacola and Panama City, is on Central time, one hour behind. Book the slot that matches your side of the state.",
    ],
    scheduling:
      "Eastern Florida matches our clinics. Western-panhandle cities on Central time should subtract one hour from the booking calendar.",
    faq: [
      {
        q: "Is functional medicine telehealth available across all of Florida?",
        a: "Yes, video visits with Dr. Chris are open to Florida residents statewide.",
      },
      {
        q: "Is there a YHN office in Florida?",
        a: "No. Your Health Now has two physical clinics, in Merchantville, NJ and Chalfont, PA. Florida patients are seen by telehealth only.",
      },
      {
        q: "What happens on the first telehealth visit?",
        a: "You'll talk through your health history, current symptoms, and goals with Dr. Chris, then discuss whether functional lab testing makes sense for your case.",
      },
      {
        q: "Can I get a chiropractic adjustment in Florida through this visit?",
        a: "No. Adjustments, physical exams, and in-office lab draws are only at our Merchantville, NJ and Chalfont, PA clinics. Florida functional medicine visits are video only.",
      },
    ],
  },
  {
    slug: "delaware",
    name: "Delaware",
    abbreviation: "DE",
    hasOffice: false,
    title: "Functional Medicine Telehealth Delaware | Dr. Chianese",
    metaDescription:
      "Delaware residents: get root-cause functional medicine care via secure video visit with Dr. Chianese, IFM FMCP. Book a free 30-minute consult today.",
    directAnswer:
      "Your Health Now offers functional medicine telehealth to residents of Delaware, led by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. There is no physical YHN office in Delaware - every visit happens over secure video, starting with a free 30-minute consult to talk through your symptoms and goals.",
    localGuide: [
      "Delaware has no Your Health Now office. The functional medicine visit is a secure video visit with Dr. Chris, from Wilmington, Dover, or anywhere else in the state. You do not need to cross the state line for the consult, the case review, or follow-up.",
      "If you later want a physical exam, an adjustment, or an in-office lab draw, Merchantville, NJ is the nearer of our two clinics for most Delaware patients. It is in Camden County, just across the river from the Philadelphia side. Chalfont, PA is the Bucks County office, farther north. Neither trip is required to start or continue functional medicine care.",
      "Delaware is on Eastern time, the same clock as both clinics. A 10:00 a.m. booking is 10:00 a.m. for you.",
    ],
    scheduling:
      "No time conversion. Delaware and both clinics are Eastern time.",
    faq: [
      {
        q: "Is functional medicine telehealth available across all of Delaware?",
        a: "Yes, video visits with Dr. Chris are open to Delaware residents statewide.",
      },
      {
        q: "Is there a YHN office in Delaware?",
        a: "No. Your Health Now has two physical clinics, in Merchantville, NJ and Chalfont, PA. Delaware patients are seen by telehealth only.",
      },
      {
        q: "What happens on the first telehealth visit?",
        a: "You'll talk through your health history, current symptoms, and goals with Dr. Chris, then discuss whether functional lab testing makes sense for your case.",
      },
      {
        q: "Which office is closer if I want to be seen in person?",
        a: "Merchantville, NJ is the nearer clinic for most Delaware patients. Chalfont, PA is farther north in Bucks County. An in-person visit is optional. Functional medicine care itself is by video.",
      },
    ],
  },
  {
    slug: "vermont",
    name: "Vermont",
    abbreviation: "VT",
    hasOffice: false,
    title: "Functional Medicine Telehealth Vermont | Dr. Chianese",
    metaDescription:
      "Vermont residents: get root-cause functional medicine care via secure video visit with Dr. Chianese, IFM FMCP. Book a free 30-minute consult today.",
    directAnswer:
      "Your Health Now offers functional medicine telehealth to residents of Vermont, led by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. There is no physical YHN office in Vermont - every visit happens over secure video, starting with a free 30-minute consult to talk through your symptoms and goals.",
    localGuide: [
      "There is no clinic in Vermont, and both of our offices are a long trip from the state. Video is the functional medicine relationship, not a holdover until you can drive down. The consult, the history and symptom review, the decision about labs, and follow-up all happen on secure video with Dr. Chris.",
      "An in-person exam, a chiropractic adjustment, or an in-office lab draw means a separate trip to Merchantville, NJ or Chalfont, PA. We do not treat that trip as part of the default Vermont plan. If you will never travel, say so on the free consult so the plan stays inside what video can do.",
      "Vermont is on Eastern time, the same clock as the clinics. A rural address does not change eligibility. Residency in Vermont is what this page covers.",
    ],
    scheduling:
      "Vermont matches our Eastern-time calendar. Distance from the clinics does not change the clock.",
    faq: [
      {
        q: "Is functional medicine telehealth available across all of Vermont?",
        a: "Yes, video visits with Dr. Chris are open to Vermont residents statewide.",
      },
      {
        q: "Is there a YHN office in Vermont?",
        a: "No. Your Health Now has two physical clinics, in Merchantville, NJ and Chalfont, PA. Vermont patients are seen by telehealth only.",
      },
      {
        q: "What happens on the first telehealth visit?",
        a: "You'll talk through your health history, current symptoms, and goals with Dr. Chris, then discuss whether functional lab testing makes sense for your case.",
      },
      {
        q: "Do I need to travel to New Jersey or Pennsylvania for functional medicine?",
        a: "No. Vermont functional medicine visits are by video. Travel to Merchantville or Chalfont only if you specifically want a physical exam, an adjustment, or an in-office lab draw.",
      },
    ],
  },
  {
    slug: "arizona",
    name: "Arizona",
    abbreviation: "AZ",
    hasOffice: false,
    title: "Functional Medicine Telehealth Arizona | Dr. Chianese",
    metaDescription:
      "Arizona residents: get root-cause functional medicine care via secure video visit with Dr. Chianese, IFM FMCP. Book a free 30-minute consult today.",
    directAnswer:
      "Your Health Now offers functional medicine telehealth to residents of Arizona, led by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. There is no physical YHN office in Arizona - every visit happens over secure video, starting with a free 30-minute consult to talk through your symptoms and goals.",
    localGuide: [
      "Arizona care is video only. There is no local clinic, and a same-week trip to Merchantville or Chalfont is not part of the plan. What video covers is the consult, your history, symptoms, and goals, the decision about whether functional lab testing makes sense, and follow-up with Dr. Chris.",
      "Most of Arizona stays on Mountain Standard Time all year and does not move the clocks. Our clinics observe Eastern daylight time, so the gap is three hours in summer and two hours in winter. A 9:00 a.m. Eastern booking is 6:00 a.m. in Phoenix in the summer and 7:00 a.m. in the winter. The Navajo Nation does observe daylight saving time, so that part of the state tracks Mountain time with the seasonal shift.",
      "Pick a slot you will actually be awake for. The free consult is a conversation about whether this care fits, not a form you can click through half asleep.",
    ],
    scheduling:
      "Most of Arizona is two hours behind our clinics in winter and three hours behind in summer. The Navajo Nation observes daylight saving time.",
    faq: [
      {
        q: "Is functional medicine telehealth available across all of Arizona?",
        a: "Yes, video visits with Dr. Chris are open to Arizona residents statewide.",
      },
      {
        q: "Is there a YHN office in Arizona?",
        a: "No. Your Health Now has two physical clinics, in Merchantville, NJ and Chalfont, PA. Arizona patients are seen by telehealth only.",
      },
      {
        q: "What happens on the first telehealth visit?",
        a: "You'll talk through your health history, current symptoms, and goals with Dr. Chris, then discuss whether functional lab testing makes sense for your case.",
      },
      {
        q: "What time is my video visit if I am in Phoenix?",
        a: "Most of Arizona, including Phoenix, stays on Mountain Standard Time all year. Subtract three hours from an Eastern booking in summer and two hours in winter. The Navajo Nation observes daylight saving time, so that area is different.",
      },
    ],
  },
  {
    slug: "idaho",
    name: "Idaho",
    abbreviation: "ID",
    hasOffice: false,
    title: "Functional Medicine Telehealth Idaho | Dr. Chianese",
    metaDescription:
      "Idaho residents: get root-cause functional medicine care via secure video visit with Dr. Chianese, IFM FMCP. Book a free 30-minute consult today.",
    directAnswer:
      "Your Health Now offers functional medicine telehealth to residents of Idaho, led by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. There is no physical YHN office in Idaho - every visit happens over secure video, starting with a free 30-minute consult to talk through your symptoms and goals.",
    localGuide: [
      "Idaho is telehealth only, north and south. There is no clinic in Boise, Coeur d'Alene, or anywhere else in the state. Access does not depend on which half of Idaho you live in. The difference is the clock.",
      "Southern Idaho, including Boise, Nampa, Twin Falls, Pocatello, and Idaho Falls, is on Mountain time. Northern Idaho, including Coeur d'Alene, Post Falls, Sandpoint, and Lewiston, is on Pacific time. Our clinics are on Eastern time. A southern patient is two hours behind the calendar. A northern patient is three hours behind.",
      "Convert before you book, then treat the video visit as the full functional medicine visit. An exam, an adjustment, or an in-office lab draw still means traveling to Merchantville, NJ or Chalfont, PA.",
    ],
    scheduling:
      "Boise and the south are Mountain time, two hours behind our clinics. Coeur d'Alene and the north are Pacific time, three hours behind.",
    faq: [
      {
        q: "Is functional medicine telehealth available across all of Idaho?",
        a: "Yes, video visits with Dr. Chris are open to Idaho residents statewide.",
      },
      {
        q: "Is there a YHN office in Idaho?",
        a: "No. Your Health Now has two physical clinics, in Merchantville, NJ and Chalfont, PA. Idaho patients are seen by telehealth only.",
      },
      {
        q: "What happens on the first telehealth visit?",
        a: "You'll talk through your health history, current symptoms, and goals with Dr. Chris, then discuss whether functional lab testing makes sense for your case.",
      },
      {
        q: "Is Boise on a different clock from Coeur d'Alene for these visits?",
        a: "Yes. Boise and southern Idaho are Mountain time, two hours behind our Eastern-time clinics. Coeur d'Alene and northern Idaho are Pacific time, three hours behind. Both are video-only.",
      },
    ],
  },
  {
    slug: "washington",
    name: "Washington",
    abbreviation: "WA",
    hasOffice: false,
    title: "Functional Medicine Telehealth Washington | Dr. Chianese",
    metaDescription:
      "Washington State residents: get root-cause functional medicine care via secure video visit with Dr. Chianese, IFM FMCP. Book a free 30-min consult.",
    directAnswer:
      "Your Health Now offers functional medicine telehealth to residents of Washington State, led by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. There is no physical YHN office in Washington - every visit happens over secure video, starting with a free 30-minute consult to talk through your symptoms and goals.",
    localGuide: [
      "This page is Washington State, not Washington, D.C. Seattle, Spokane, Vancouver, and the rest of the state are on Pacific time, three hours behind our Eastern-time clinics, all year. A 4:00 p.m. Eastern booking is 1:00 p.m. for you, whether you are on the coast or in the east of the state.",
      "There is no Your Health Now office in Washington. The functional medicine visit is video: the free consult, the review of history, symptoms, and goals, the decision about labs, and follow-up. A physical exam, an adjustment, or an in-office lab draw is only at Merchantville, NJ or Chalfont, PA.",
      "If you live in the District of Columbia, use the Washington, D.C. page instead. Maryland and Virginia are not among the nine states served by this telehealth program.",
    ],
    scheduling:
      "The whole state is Pacific time, three hours behind the clinics. Unlike Idaho, Seattle and Spokane use the same conversion.",
    faq: [
      {
        q: "Is functional medicine telehealth available across all of Washington State?",
        a: "Yes, video visits with Dr. Chris are open to Washington residents statewide.",
      },
      {
        q: "Is there a YHN office in Washington State?",
        a: "No. Your Health Now has two physical clinics, in Merchantville, NJ and Chalfont, PA. Washington patients are seen by telehealth only.",
      },
      {
        q: "What happens on the first telehealth visit?",
        a: "You'll talk through your health history, current symptoms, and goals with Dr. Chris, then discuss whether functional lab testing makes sense for your case.",
      },
      {
        q: "Is this the Washington, D.C. page?",
        a: "No. This page is for Washington State. District residents should use the Washington, D.C. telehealth page. A 4:00 p.m. Eastern booking is 1:00 p.m. Pacific everywhere in Washington State.",
      },
    ],
  },
  {
    slug: "washington-dc",
    name: "Washington, D.C.",
    abbreviation: "DC",
    hasOffice: false,
    title: "Functional Medicine Telehealth Washington DC | Dr. Chianese",
    metaDescription:
      "Washington DC residents: get root-cause functional medicine care via secure video visit with Dr. Chianese, IFM FMCP. Book a free 30-minute consult.",
    directAnswer:
      "Your Health Now offers functional medicine telehealth to residents of Washington, D.C., led by Dr. Chris Chianese, MS, DC, CPSC, IFM FMCP. There is no physical YHN office in D.C. - every visit happens over secure video, starting with a free 30-minute consult to talk through your symptoms and goals.",
    localGuide: [
      "This page is for residents of the District of Columbia. Maryland and Virginia are not on the nine-state telehealth list, even if you commute into the District. Washington State has its own page and is a different place, three time zones away.",
      "There is no clinic in D.C. Functional medicine visits are secure video with Dr. Chris. The District is on Eastern time, the same clock as Merchantville and Chalfont, so you do not convert the booking time.",
      "If you want a physical exam, a chiropractic adjustment, or an in-office lab draw, Merchantville, NJ is the nearer of the two clinics. Chalfont, PA is farther. That trip is optional. The functional medicine plan does not require it.",
    ],
    scheduling:
      "Washington, D.C. is Eastern time, the same clock as both clinics. This is not the Washington State page.",
    faq: [
      {
        q: "Is functional medicine telehealth available across all of Washington, D.C.?",
        a: "Yes, video visits with Dr. Chris are open to D.C. residents district-wide.",
      },
      {
        q: "Is there a YHN office in Washington, D.C.?",
        a: "No. Your Health Now has two physical clinics, in Merchantville, NJ and Chalfont, PA. D.C. patients are seen by telehealth only.",
      },
      {
        q: "What happens on the first telehealth visit?",
        a: "You'll talk through your health history, current symptoms, and goals with Dr. Chris, then discuss whether functional lab testing makes sense for your case.",
      },
      {
        q: "Does this page cover Maryland or Virginia?",
        a: "No. It covers District of Columbia residents. Maryland and Virginia are not among the nine telehealth states. Washington State has a separate page.",
      },
    ],
  },
];

export const TELEHEALTH_STATE_BY_SLUG: Record<string, TelehealthState> =
  Object.fromEntries(TELEHEALTH_STATES.map((s) => [s.slug, s]));
