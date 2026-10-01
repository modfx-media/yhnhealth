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
    ],
  },
];

export const TELEHEALTH_STATE_BY_SLUG: Record<string, TelehealthState> =
  Object.fromEntries(TELEHEALTH_STATES.map((s) => [s.slug, s]));
