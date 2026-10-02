/**
 * Service detail content cloned verbatim from yhnhealth.com.
 * Every paragraph and subheading is preserved word-for-word from the live site.
 * Hero image filenames mirror the slug under /public/images/services/.
 */
import {
  Activity,
  Bone,
  Brain,
  Briefcase,
  CheckCircle2,
  Cpu,
  Frown,
  Heart,
  Keyboard,
  Lightbulb,
  Mic2,
  Monitor,
  Moon,
  Mouse,
  PersonStanding,
  Pill,
  Repeat,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Users,
  Utensils,
  Workflow,
  Zap,
} from "lucide-react";
import type { ServiceConfig } from "@/components/page/ServicePage";

const RELATED: Record<string, { slug: string; label: string }[]> = {
  chiropractic: [
    { slug: "family-chiropractic-care", label: "Family Chiropractic Care" },
    { slug: "functional-postural-analysis", label: "Functional Postural Analysis" },
    { slug: "functional-movement-restoration", label: "Functional Movement Restoration" },
    { slug: "functional-kinesiology", label: "Functional Kinesiology" },
    { slug: "webster-technique", label: "Webster Technique" },
    { slug: "pregnancy-care", label: "Pregnancy Care" },
    { slug: "pediatric-care", label: "Pediatric Care" },
    { slug: "geriatric-care", label: "Geriatric Care" },
    { slug: "athletic-care", label: "Athletic Care" },
  ],
  physio: [
    { slug: "art", label: "ART" },
    { slug: "iastm", label: "IASTM" },
    { slug: "percussion-therapy", label: "Percussion Therapy" },
    { slug: "arthrostimulation-therapy", label: "Arthrostimulation Therapy" },
    { slug: "vibracussion-therapy", label: "Vibracussion Therapy" },
    { slug: "decompression-therapy", label: "Decompression Therapy" },
  ],
  other: [
    { slug: "lyme-disease-solutions", label: "Lyme Disease Solutions" },
    { slug: "physician-grade-supplementation", label: "Physician Grade Supplementation" },
    { slug: "dot-physicals", label: "DOT Physicals" },
    { slug: "ergonomics", label: "Ergonomics" },
    { slug: "health-talks", label: "Health Talks" },
    { slug: "integrative-nutrition", label: "Integrative Nutrition" },
    { slug: "lifestyle-and-nutritional-advice", label: "Lifestyle & Nutritional Advice" },
    { slug: "worksite-care", label: "Worksite Care" },
  ],
};

function pickRelated(group: keyof typeof RELATED, exclude: string, count = 4) {
  return RELATED[group].filter((r) => r.slug !== exclude).slice(0, count);
}

function img(slug: string) {
  return `/images/services/${slug}.webp`;
}

export const SERVICE_CONTENT: Record<string, ServiceConfig> = {
  "family-chiropractic-care": {
    slug: "family-chiropractic-care",
    title: "Family Chiropractic Care",
    eyebrow: "Chiropractic Medicine",
    intro:
      "Modern, evidence-based chiropractic care for every member of your family - from infants and athletes to expectant mothers and grandparents.",
    imageSrc: img("family-chiropractic-care"),
    imageAlt: "Chiropractor performing an adjustment",
    sections: [
      {
        heading: "What is HEALTH?",
        body:
          "Health is much more than just the absence of pain or sickness. Health is the state where every cell, tissue, and organ in our body, are functioning the way they were designed to. When this is occurring, our body produces vitality, energy, and dynamic mental and physical performance. The brain, nervous system, immune system, organs, muscles, and tendons, all are working in harmony to provide us with optimal health and wellness. We sleep well, our digestion is great, we have lots of energy, and we feel and look great. Common Symptoms when health is compromised:\nPain, Fatigue, Irritability, Sleeplessness, Headaches, Digestive problems, Stress, Inattentiveness, Sickness.",
      },
      {
        heading: "What is CHIROPRACTIC MEDICINE?",
        body:
          "Modern Chiropractic Medicine is a clinical approach to your overall health, focusing on optimizing the body's ability to heal, prevent injury, and live with absolute vitality. We focus on optimizing the function of the central and peripheral nervous system, restoring full functional movement, eliminating pain syndromes, increasing flexibility, building strength, eliminating chronic pain, decreasing chronic stress, and providing optimization of the body. Our doctors are extensively trained in advanced clinical examinations, evaluations, and care that go far beyond the standards held by today's healthcare in terms of effectiveness and value to the patient.",
      },
    ],
    benefits: {
      eyebrow: "Common Symptoms When Health Is Compromised",
      title: "Signs your nervous system needs attention",
      items: [
        { icon: Activity, title: "Pain", body: "Acute or chronic discomfort that limits daily life." },
        { icon: Moon, title: "Fatigue", body: "Constant low energy despite rest." },
        { icon: Frown, title: "Irritability", body: "Mood swings driven by stress and tension." },
        { icon: Moon, title: "Sleeplessness", body: "Trouble falling or staying asleep." },
        { icon: Brain, title: "Headaches", body: "Tension and migraine headaches that recur." },
        { icon: Utensils, title: "Digestive problems", body: "Nervous system dysregulation often shows up here first." },
        { icon: Zap, title: "Stress", body: "Persistent fight-or-flight overload." },
        { icon: Lightbulb, title: "Inattentiveness", body: "Brain fog, poor focus, slowed reactions." },
        { icon: Shield, title: "Sickness", body: "An immune system that can't keep up." },
      ],
    },
    related: pickRelated("chiropractic", "family-chiropractic-care"),
  },

  "functional-postural-analysis": {
    slug: "functional-postural-analysis",
    title: "Functional Postural Analysis",
    eyebrow: "Chiropractic Medicine",
    intro:
      "Comprehensive postural assessments that uncover the root cause of pain, dysfunction, and chronic compensation patterns.",
    imageSrc: img("functional-postural-analysis"),
    imageAlt: "Doctor evaluating posture",
    sections: [
      {
        body:
          "Functional Postural Analysis is part of every patient's clinical evaluation. Our Doctors are trained to identify and treat dysfunctional postural patterns from acute or chronic injuries, repetitive use injuries, the consequences of habit, structural issues, and dysfunctional adaptive patterns. Our Doctors complete advanced post-graduate training in clinical biomechanics, kinesiology, ergonomics, and rehabilitation, providing them with the necessary expertise to provide optimal care for the patient.",
      },
    ],
    related: pickRelated("chiropractic", "functional-postural-analysis"),
  },

  "functional-movement-restoration": {
    slug: "functional-movement-restoration",
    title: "Functional Movement Restoration",
    eyebrow: "Chiropractic Medicine",
    intro:
      "Restoring full, pain-free, functional movement through advanced rehabilitation and corrective exercise.",
    imageSrc: img("functional-movement-restoration"),
    imageAlt: "Patient performing movement restoration exercise",
    sections: [
      {
        body:
          "Functional Movement Restoration is part of every patient's clinical care plan. Our Doctors are trained to identify and treat dysfunctional movement patterns at the root cause from acute or chronic injuries, repetitive use injuries, the consequences of habit, structural issues, and dysfunctional adaptive patterns. Functional movement is restored providing optimal joint mobility, optimal flexibility, optimal strength, optimal endurance, and optimal performance for the patient. Our Doctors complete advanced post-graduate training in clinical biomechanics, kinesiology, ergonomics, and rehabilitation, providing them with the necessary expertise to provide optimal care for the patient.",
      },
    ],
    related: pickRelated("chiropractic", "functional-movement-restoration"),
  },

  "functional-kinesiology": {
    slug: "functional-kinesiology",
    title: "Functional Kinesiology",
    eyebrow: "Chiropractic Medicine",
    intro:
      "Hands-on kinesiology assessment that pinpoints the neurological and muscular drivers of dysfunction.",
    imageSrc: img("functional-kinesiology"),
    imageAlt: "Kinesiology muscle testing",
    sections: [
      {
        body:
          "Functional Kinesiology is part of every patient's clinical evaluation. Our Doctors are trained to identify and treat dysfunctional muscle patterns from acute or chronic injuries, repetitive use injuries, the consequences of habit, structural issues, and dysfunctional adaptive patterns. Functional Kinesiology helps identify the root cause of dysfunction in the body, which is critical to providing the most effective and efficient care possible. Our Doctors complete advanced post-graduate training in clinical biomechanics, kinesiology, ergonomics, and rehabilitation, providing them with the necessary expertise to provide optimal care for the patient.",
      },
    ],
    related: pickRelated("chiropractic", "functional-kinesiology"),
  },

  "webster-technique": {
    slug: "webster-technique",
    title: "Webster Technique",
    eyebrow: "Chiropractic Medicine",
    intro:
      "ICPA-certified specialized chiropractic analysis and adjustment that supports a healthier pregnancy and birth.",
    imageSrc: img("webster-technique"),
    imageAlt: "Pregnant woman receiving Webster Technique",
    sections: [
      {
        body:
          "The Webster Technique is a specialized chiropractic analysis and adjustment that reduces nervous system stress, balances the pelvic bones, muscles, and ligaments, and helps optimize pelvic function during pregnancy and birth. At Your Health Now, our doctors are fully Certified in this advanced post-graduate technique through the prestigious International Chiropractic Pediatric Association (ICPA), a leading organization in perinatal and pediatric chiropractic care.",
      },
      {
        heading: "ICPA Find a Practitioner",
        body:
          "Verify our doctors and find ICPA-certified Webster providers nationwide at icpa4kids.com/find-a-pediatric-chiropractor.",
      },
    ],
    related: pickRelated("chiropractic", "webster-technique"),
  },

  "pregnancy-care": {
    slug: "pregnancy-care",
    title: "Pregnancy Care",
    eyebrow: "Chiropractic Medicine",
    intro:
      "Gentle, safe chiropractic care that supports your body's natural ability to adapt through every trimester.",
    imageSrc: img("pregnancy-care"),
    imageAlt: "Expectant mother receiving prenatal chiropractic care",
    sections: [
      {
        body:
          "Pregnancy brings significant changes to a woman's body, often resulting in discomfort and misalignment. Chiropractic care helps expectant mothers maintain optimal health, alleviate pain, and support the body's natural ability to adapt to these changes. The Webster Technique, a gentle chiropractic approach, specifically addresses pelvic balance and alignment during pregnancy. By reducing stress on the pelvis and surrounding muscles, this technique not only helps create a more comfortable pregnancy experience but can also improve pelvic function, leading to a safer and easier delivery. Safe and effective, it's an ideal choice for promoting maternal well-being, fetal health, and supporting optimal fetal positioning throughout pregnancy. Pregnancy care contributes to a healthier environment for your growing baby and leads to a smoother and more natural birthing experience.",
      },
    ],
    related: pickRelated("chiropractic", "pregnancy-care"),
  },

  "pediatric-care": {
    slug: "pediatric-care",
    title: "Pediatric Care",
    eyebrow: "Chiropractic Medicine",
    intro:
      "Specialized pediatric chiropractic services tailored to the unique needs of infants, children and adolescents.",
    imageSrc: img("pediatric-care"),
    imageAlt: "Pediatric chiropractor with child patient",
    sections: [
      {
        body:
          "At Your Health Now, we believe that every child deserves the best start in life, and chiropractic care plays a vital role in supporting their growth and well-being. Our pediatric chiropractic services are specially tailored to address the unique needs of infants, children, and adolescents. From promoting proper spinal alignment to easing discomfort from colic, ear infections, or growing pains, our gentle, non-invasive techniques help ensure your child's body functions at its best. We all want our children to be healthy and chiropractic plays a critical role in the proper overall development of their brain, immune system, athletic performance, proper sleep, ability to fight common illnesses, and so much more. Invest in your child's health, they will thank you later when they are living with the vibrant quality of life they deserve.",
      },
    ],
    related: pickRelated("chiropractic", "pediatric-care"),
  },

  "geriatric-care": {
    slug: "geriatric-care",
    title: "Geriatric Care",
    eyebrow: "Chiropractic Medicine",
    intro:
      "Gentle, non-invasive care that helps seniors stay mobile, independent and active.",
    imageSrc: img("geriatric-care"),
    imageAlt: "Senior patient enjoying active lifestyle",
    sections: [
      {
        body:
          "As we age, maintaining mobility and managing pain become essential to preserving quality of life. Chiropractic care offers a gentle, non-invasive approach to address common age-related conditions, such as joint stiffness, arthritis, and balance issues. Through targeted adjustments and personalized treatment plans, chiropractic care can help alleviate pain, improve range of motion, and support overall well-being in seniors. Our specialized approach in geriatric chiropractic care is designed to enhance mobility, promote healthy aging, and enable seniors to stay active and independent. Whether it be preventing falls, riding bikes, playing pickle ball, or playing with the grandkids, our Doctors are here to make sure you can keep on doing the things you love.",
      },
    ],
    related: pickRelated("chiropractic", "geriatric-care"),
  },

  "athletic-care": {
    slug: "athletic-care",
    title: "Athletic Care",
    eyebrow: "Chiropractic Medicine",
    intro:
      "Sports chiropractic for high school, collegiate and professional athletes - perform at your best, recover faster, prevent injury.",
    imageSrc: img("athletic-care"),
    imageAlt: "Athlete training",
    sections: [
      {
        body:
          "Athletic care, or Sports Chiropractic, specializes in helping athletes of all levels achieve optimal physical performance, prevent injuries, and achieve faster recovery. This is why every collegiate and professional athlete is under regular chiropractic care. At Your Health Now, we utilize a comprehensive approach that combines advanced chiropractic techniques, rehabilitation, and personalized treatment plans. We address the unique needs, goals, athletic demands, and peak performance levels of each individual. Whether the patient wants to win a high school championship, a college scholarship, or maintain their weekend competitive level for many years to come, our Doctors stay with you every step of the way. We work closely with our patients to optimize mobility, enhance flexibility, increase strength, promote resilience, and push existing limits safely. Injuries in any area are addressed, while unnecessary injuries in the future are prevented. Perform at your best.",
      },
    ],
    related: pickRelated("chiropractic", "athletic-care"),
  },

  art: {
    slug: "art",
    title: "Active Release Technique (ART)",
    eyebrow: "Physiotherapy Services",
    intro:
      "Advanced soft-tissue and nerve treatment that reduces pain, restores range of motion, and corrects the root movement dysfunction.",
    imageSrc: img("art"),
    imageAlt: "Active Release Technique soft-tissue therapy",
    sections: [
      {
        heading: "What is ART?",
        body:
          "Doctors at YHN have received advanced training in Active Release Technique® (ART) which is a non-invasive soft-tissue and nerve treatment, specifically designed to reduce pain and restore function quickly and safely. It works by releasing muscles, ligaments, tendons, nerves, and fascia that no longer function properly due to overuse or injury. When body systems responsible for movement stop working as designed, you feel pain. ART corrects the root movement dysfunction and the resulting pain. It is designed to restore free and unimpeded motion, release entrapped nerves, vasculature and lymphatics, and re-establish optimal texture, resilience and function of all soft tissues in the body.",
      },
      {
        heading: "Benefits of ART?",
        body:
          "ART gets to the root of the problem, offering quick results and lasting pain relief. This technique provides relief for people from all walks of life who are experiencing acute or chronic pain. ART treatment is effective against signs and symptoms of muscle and nerve dysfunction - including tightness, pain, tingling, inflammation, restricted range of motion, muscle ache, and related symptoms. It helps treat a wide range of musculoskeletal problems including carpal tunnel, frozen shoulder, plantar fasciitis, tennis/golfer's elbow, sciatica, and more. ART improves range of motion, increases flexibility, improve sports performance, and decreases the chance of injury.",
      },
    ],
    related: pickRelated("physio", "art"),
  },

  iastm: {
    slug: "iastm",
    title: "IASTM",
    eyebrow: "Physiotherapy Services",
    intro:
      "Instrument-Assisted Soft Tissue Mobilization - a precise, non-invasive treatment for chronic musculoskeletal problems.",
    imageSrc: img("iastm"),
    imageAlt: "IASTM stainless steel instrument",
    sections: [
      {
        heading: "WHAT IS IASTM?",
        body:
          "Doctors at YHN have received advanced training in Instrument-Assisted Soft Tissue Mobilization (IASTM) which is a non-invasive, soft tissue technique that uses specially designed stainless-steel instruments to help the Doctor identify and treat areas of the body exhibiting soft tissue fibrosis or adhesions. Areas of fibrosis or adhesions are found in the muscles and connective tissues that cause or contribute to a range of chronic musculoskeletal problems. IASTM allows healthcare providers to treat tissues as necessary to invoke change, getting to the cause of the problem, while being sensitive to patient's pain and tolerance. As the instruments are moved over the affected area and contact the soft tissue, the action helps restore the tissue's ability to slide over each other for normal movement and range of motion, decreasing adhesions between layers of tissue.",
      },
      {
        heading: "BENEFITS OF IASTM?",
        body:
          "This treatment safely and effectively reduces the adhered fibers, restoring range of motion and eliminating the associated pain. IASTM helps transform soft tissue dysfunction or injury into healthy functioning tissue once again. It impacts physiological change by providing an increase in blood flow, reduction in tissue viscosity, myofascial release, interruption of pain receptors, and improvement of flexibility of the underlying tissues of concern.",
      },
    ],
    related: pickRelated("physio", "iastm"),
  },

  "percussion-therapy": {
    slug: "percussion-therapy",
    title: "Percussion Therapy",
    eyebrow: "Physiotherapy Services",
    intro:
      "State-of-the-art percussion treatment that targets pain, releases fascia, and accelerates tissue healing.",
    imageSrc: img("percussion-therapy"),
    imageAlt: "Percussion therapy device in clinic",
    sections: [
      {
        body:
          "Percussion therapy is a method of inducing blood flow in a rapid manner to soft tissue in the muscles, tendons, and ligaments throughout the body. The technology used is state-of-the-art, with an innovative design created to specifically target pain and promote healing. The instrument utilizes unique \"Galvanic Wave\" action that reduces muscle spasms, desensitizes painful tissue, increases circulation, releases fascia restrictions, drains the lymphatic system, elongates muscle fibers, helps to restore functional range of motion, provides joint relief, and more. It is very effective in restoring tissue \"glide\" and restoring tissue elasticity.",
      },
    ],
    related: pickRelated("physio", "percussion-therapy"),
  },

  "arthrostimulation-therapy": {
    slug: "arthrostimulation-therapy",
    title: "Arthrostimulation Therapy",
    eyebrow: "Physiotherapy Services",
    intro:
      "Modifies and corrects dysfunctional movement patterns by normalizing neuromuscular feedback loops in the central and peripheral nervous system.",
    imageSrc: img("arthrostimulation-therapy"),
    imageAlt: "Arthrostimulation therapy treatment",
    sections: [
      {
        body:
          "Arthrostimulation therapy is a method of modifying and correcting dysfunctional movement patterns by normalizing neuromuscular feedback loops within the central and peripheral nervous system. The technology used is state-of-the-art, specifically restoring the neural control between the brain and soft tissues in the muscle, tendons, and ligament throughout the body. The instrument utilizes \"Betasomatomotor\" rhythm rate which helps produce a neurological state of health and wellbeing. These actions increase tissue extensibility, remove chronic trigger points, correct injured tissues, desensitize painful tissues, release fascial restrictions, restore functional range of motion, optimize neurological integrity, and more.",
      },
    ],
    related: pickRelated("physio", "arthrostimulation-therapy"),
  },

  "vibracussion-therapy": {
    slug: "vibracussion-therapy",
    title: "Vibracussion Therapy",
    eyebrow: "Physiotherapy Services",
    intro:
      "High-velocity vibrational therapy that reaches the deepest tissue layers and restores fascial glide.",
    imageSrc: img("vibracussion-therapy"),
    imageAlt: "Vibracussion therapy device",
    sections: [
      {
        body:
          "Vibracussion therapy is method of sending targeted, high-velocity vibrations into the soft tissue of muscles, tendons, and ligaments throughout the body, reaching the deepest tissue layers. The technology used is state-of-the-art, specifically facilitating natural healing processes, flushing out toxins, boosting nutrient delivery, repairing and regenerating tissue, increasing mobility, restoring range of motion, providing joint relief, and more. It is especially effective in treating dysfunctional fascia, which is the \"glue\" tissue connecting every part of the body, restoring the \"glide\" of all tissue layers. Also, it is effective in reducing scar tissue, boosting tissue elasticity, helping in surgical recovery, and speeding up injury recovery.",
      },
    ],
    related: pickRelated("physio", "vibracussion-therapy"),
  },

  "decompression-therapy": {
    slug: "decompression-therapy",
    title: "Decompression Therapy",
    eyebrow: "Physiotherapy Services",
    intro:
      "Clinical-grade cupping and tissue distraction that lifts adhesions, restores glide and eliminates chronic trigger points.",
    imageSrc: img("decompression-therapy"),
    imageAlt: "Decompression cupping therapy",
    sections: [
      {
        body:
          "Decompression Therapy, commonly known as \"cupping\", is a method of creating negative pressure or tissue \"distraction\" throughout every soft tissue layer of muscles, tendons, and ligaments throughout the body. The technology used is state-of-the-art clinical grade, specifically designed to lift or separate tissues which enhances the release of the interfaces between the neural tissue, fascia, and soft tissue structures. Chronic trigger points are released, lymphatic drainage is increased, dynamic movement is restored, proper circulation is reintroduced, critical tissue glide is produced, tissue tension is cleared, functional mobility is restored, pain is eliminated, soft tissue performance is optimized, and more. The treatment is highly versatile whether used for professional athletes or the fibromyalgia patient.",
      },
    ],
    related: pickRelated("physio", "decompression-therapy"),
  },

  "lyme-disease-solutions": {
    slug: "lyme-disease-solutions",
    title: "Lyme Disease Solutions",
    eyebrow: "Other Services",
    intro:
      "Effective Lyme disease treatment delivered at the lowest possible cost, by doctors who have personally walked the path.",
    imageSrc: img("lyme-disease-solutions"),
    imageAlt: "Tick on a leaf",
    sections: [
      {
        body:
          "Lyme Disease is endemic to Northeast America and is now spreading across the country. At Your Health Now, we passionately believe that effective treatment should not bankrupt the patient with excessive cost and unnecessary debt. Nor do we believe that only the rich should be able to receive and benefit from proper treatment.",
      },
      {
        body:
          "Our Doctors specialize in treating Lyme Disease safely and effectively, at the lowest cost possible to the patient. We have treated hundreds of those chronically ill with this terrible disease, watching them regain their health and quality of life, for good.",
      },
      {
        body:
          "Conventional medicine has utterly failed in diagnosing and treating this disease. At Your Health Now, we have a passion for those chronically ill with Lyme. Our President, Dr. Chris Chianese, suffered with chronic Lyme for nearly 20 years. He was finally diagnosed and treated, and lives Lyme-free today. Dr. Chris has focused much of his life's work on finding and establishing the most effective treatment at the lowest cost possible. Our passion is to see ALL PEOPLE that suffer from this disease regain their health and lives.",
      },
      {
        body:
          "Whether you have been told that you have Lyme or not, whether you are at the point of despair and hopelessness, no matter what testing or imaging has or has not told you, not matter how much medication you have or have not been given, please contact us and we will provide you with the solutions to heal and regain your life.",
      },
    ],
    related: pickRelated("other", "lyme-disease-solutions"),
  },

  "physician-grade-supplementation": {
    slug: "physician-grade-supplementation",
    title: "Physician Grade Supplementation",
    eyebrow: "Other Services",
    intro:
      "Pharmaceutical-grade supplementation that meets the same FDA-regulated standards as drugs - sold only through licensed practitioners.",
    imageSrc: img("physician-grade-supplementation"),
    imageAlt: "Physician grade supplements",
    sections: [
      {
        body:
          "Biochemical supplementation support is critically important to our health. The majority of the supplementation found over the counter is not regulated, effective, or bioavailable. Physician grade supplements, also known as pharmaceutical grade supplements, are held to the same high standards as FDA-regulated drugs. Physician grade supplements are typically only sold by licensed healthcare practitioners. They are manufactured and processed by the United States Pharmacopeia (USP) to ensure they meet the following criteria:",
      },
      {
        body:
          "At Your Health Now, we provide our patients with our discounts on their individualized and recommended supplementation that come from our professional relationships with all the top supplement companies.",
      },
    ],
    benefits: {
      eyebrow: "USP Standards",
      title: "Five non-negotiable quality standards",
      items: [
        {
          icon: Sparkles,
          title: "Purity",
          body:
            "They must be at least 99% pure and contain no fillers, binders, dyes, or other unknown additives.",
        },
        {
          icon: ShieldCheck,
          title: "Safety & Effectiveness",
          body:
            "They must be safe and effective, and their ingredients must be third-party tested for purity.",
        },
        {
          icon: Pill,
          title: "Bioavailability",
          body:
            "They are formulated to be fully bioavailable, meaning the body can absorb nutrients more quickly and for longer.",
        },
        {
          icon: Workflow,
          title: "Manufacturing",
          body:
            "Strict guidelines are present to ensure all product processing provides only the intended formulations and support.",
        },
        {
          icon: CheckCircle2,
          title: "Sourcing",
          body:
            "They must adhere to guidelines that ensure the ingredients and compositions are only obtained from pure, non-toxic, and organic sources.",
        },
      ],
    },
    related: pickRelated("other", "physician-grade-supplementation"),
  },

  "dot-physicals": {
    slug: "dot-physicals",
    title: "DOT Physicals",
    eyebrow: "Other Services",
    intro:
      "On-site CME certifications and DOT physicals for Commercial Motor Vehicle drivers and fitness-for-duty employees.",
    imageSrc: img("dot-physicals"),
    imageAlt: "Truck driver next to commercial vehicle",
    sections: [
      {
        heading: "Get Your CME Certification Today!",
        body:
          "Tired of your employees missing a whole day of work (or more) to get their CME Certification? Tired of draining management's time and resources staying on top of employees to get their Cert done? Tired of your employees waiting in an express care waiting room for 3 hours, for a 15-minute exam? Tired of being concerned with delays leading to expired certifications, invalidating your employees' licenses? Tired of the headache for you and inconvenience for them?",
      },
      {
        heading: "We Provide Your Solution",
        body:
          "We offer CME Certs for the DOT On-Site at Your Worksite for all Commercial Vehicle drivers (truck drivers, bus drivers, etc.) and fitness-for-duty employee physical exams (firefighters, police, power line workers, crane operators, and more). We also provide timely DOT Physicals in our office locations. Contact us for information and scheduling!\n\nNATIONAL REGISTRY NUMBER: 6684144190",
      },
    ],
    related: pickRelated("other", "dot-physicals"),
  },

  ergonomics: {
    slug: "ergonomics",
    title: "Ergonomics",
    eyebrow: "Other Services",
    intro:
      "Workplace ergonomic assessments and patient-specific solutions, because over 87% of health problems are caused by habitual behaviors.",
    imageSrc: img("ergonomics"),
    imageAlt: "Person at workstation evaluating posture",
    sections: [
      {
        body:
          "Did you know that over 87% of health problems are caused by our habitual behaviors? Since we spend most of our waking hours at work, our work habits cause most of our health issues. Our doctors help you form better daily habits at work and in life providing ergonomic assessments and patient-specific solutions, as part of a comprehensive plan of care.",
      },
      {
        heading: "FOR EMPLOYERS",
        body:
          "Before the team at Your Health Now can help you make new habits for better workplace health, we need to find out what your current ones are. Our ergonomic assessment will determine:\n\n*All YHN ergonomic evaluations and solutions are determined by our doctors who specialize in workplace health.",
      },
    ],
    benefits: {
      eyebrow: "Our Ergonomic Assessment Determines",
      title: "Six factors that shape your daily health",
      items: [
        { icon: Monitor, title: "How your computer is positioned" },
        { icon: Keyboard, title: "Where your keyboard is located" },
        { icon: Briefcase, title: "How high your desk is" },
        { icon: PersonStanding, title: "What type of chair you use" },
        { icon: Mouse, title: "How you interact with your environment" },
        { icon: Repeat, title: "What recurring body patterns you have adapted" },
      ],
    },
    related: pickRelated("other", "ergonomics"),
  },

  "health-talks": {
    slug: "health-talks",
    title: "Health Talks",
    eyebrow: "Other Services",
    intro:
      "Hour-long workplace health & wellness talks delivered by doctors who specialize in workplace health.",
    imageSrc: img("health-talks"),
    imageAlt: "Doctor giving health talk to organization",
    sections: [
      {
        heading: "Organizations",
        body:
          "When your employees neglect their health, your company suffers. Your Health Now LLC's health and wellness speaker will visit your workplace monthly to deliver an hour-long talk on the health topic of your choice. We recommend crowdsourcing a topic from your employees to ensure it addresses their needs. Company-wide digital Health & Wellness education is also provided, cultivating an Employer community of health and convenience.",
      },
      {
        heading: "3 Benefits Of Hosting A Doctor",
        body:
          "Looking for a way to create a better work environment in your organization? Your Health Now offers health talks to businesses in Princeton, Ewing Township, NJ and all surrounding areas including Pennsylvania. Listening to a wellness professional can improve:\n\n*All YHN Health Talks are given by our doctors who specialize in workplace health.",
      },
    ],
    benefits: {
      eyebrow: "Why Host a Health Talk",
      title: "Three measurable wins for your team",
      items: [
        {
          icon: TrendingUp,
          title: "1. Productivity",
          body:
            "Performance improves when employees are present and engaged, rather than home sick or slowed by illness.",
        },
        {
          icon: Zap,
          title: "2. Motivation",
          body:
            "Wellness talks empower workers to take their health seriously and make active, health-conscious choices.",
        },
        {
          icon: Heart,
          title: "3. Morale",
          body: "Workplace positivity improves when workers are happy and healthy.",
        },
      ],
    },
    related: pickRelated("other", "health-talks"),
  },

  "integrative-nutrition": {
    slug: "integrative-nutrition",
    title: "Integrative Nutrition",
    eyebrow: "Other Services",
    intro:
      "Personalized nutritional prescription and dietary education that helps each patient reach their best level of health.",
    imageSrc: img("integrative-nutrition"),
    imageAlt: "Fresh fruits and vegetables",
    sections: [
      {
        heading: "Did You Know?",
        body:
          "Doctors of Chiropractic have the most extensive nutrition education of all primary health care providers? In addition, some of our doctors also hold Masters Degrees in Nutrition as well. The doctors at YHN offer the most superior nutritional services available today.",
      },
      {
        heading: "Real Nutrition",
        body:
          "'Diets' and 'Programs', popular in public media, have injured and disappointed millions upon millions of people who have looked to lose weight, learn to eat healthy, and better their lives. You will not hear those terms from our doctors. Instead, the scientific principles of healthy eating are taught according to individual patient needs so they are enabled to make permanent lifestyle changes. Healthy eating and weight loss instruction are provided. Personalized nutritional prescription and dietary education are given and established as part of a comprehensive plan of care, helping each patient reach their very best level of health.",
      },
    ],
    related: pickRelated("other", "integrative-nutrition"),
  },

  "lifestyle-and-nutritional-advice": {
    slug: "lifestyle-and-nutritional-advice",
    title: "Lifestyle & Nutritional Advice",
    eyebrow: "Other Services",
    intro:
      "A coordinated, whole-body approach to physical wellness - diet, exercise, sleep, mindset and lasting lifestyle change.",
    imageSrc: img("lifestyle-and-nutritional-advice"),
    imageAlt: "Woman cooking nutritious meal",
    sections: [
      {
        body:
          "Our Chiropractic offices near Merchantville & Chalfont are available for nutritional advice.\n\nIn this day and age, specialization seems to be the norm. However, Your Health Now believes that a broader approach to health actually produces better results.\n\nDr. Chris Chianese tends toward an integrated approach to physical wellness, with \"whole body\" treatment that encourages lifestyle and nutritional changes, meditation, and relaxation, physical and mental exercise, and positive reinforcement. In addition to non-invasive and drug-free treatment Dr. Chianese promotes necessary healing from accidents or injury with small changes in lifestyle and diet that can be life-changing.",
      },
      {
        heading: "A Coordinated Approach to Wellness",
        body:
          "Dr. Chianese knows that life is busy and stressful. While we cannot adequately stress the importance of regular exercise and proper diet, we understand that major change is difficult. But, in addition to helping our patients with posture and corrective exercises to promote healing, we emphasize diet, regular exercise, sleep, and a positive mindset.\n\nOur culture has become increasingly sedentary. Along with job stress, modern habits can take a toll on both physical and mental health. We see the results. A growing number of younger people are now overweight or obese. The number of people with diabetes and heart problems has grown steadily in the past couple of decades. As a society, we now consume more pills than ever before. We are, in some ways, less fit than previous generations.",
      },
      {
        heading: "Finding Better Ways to Fitness and Health",
        body:
          "However, that can all change. Dr. Chianese recommends a regular program of exercise for 20 to 30 minutes at least three or four times a week. A gym membership isn't necessary. A brisk walk or Modern dance moves are great ways to reap the benefits! Play a game of pickup basketball, or touch football, go canoeing with the family or take up yoga to reap the dual benefits or stretching and meditation.\n\nEat simple meals that are heavy on fruit, vegetables, and fiber; include whole grains, nuts, and legumes. Lessen your dependence on coffee and sweets. Limit alcohol and soda consumption. If you still smoke, quit. Take brown bag lunches to work or school, and skip the drive-through lanes -- your budget will stretch further as well. Cook at home.",
      },
      {
        heading: "Let Your Chiropractor Guide You",
        body:
          "Visit local farmers markets, or plan a \"kitchen garden\" to experience true fresh flavors and the great taste of just-picked tomatoes or fruits. Spend a few weekend hours cooking meals to freeze if your weekday schedules are jammed.\n\nFor additional ideas, simply schedule a consultation with Dr. Chianese at (856) 532-2063 who is always available to help you reclaim your vitality and set you on the path to lasting wellness.",
      },
    ],
    related: pickRelated("other", "lifestyle-and-nutritional-advice"),
  },

  "worksite-care": {
    slug: "worksite-care",
    title: "Worksite Care",
    eyebrow: "Other Services",
    intro:
      "On-site corporate chiropractic that delivers a $6:1 ROI in preventable healthcare costs - at zero cost to the company.",
    imageSrc: img("worksite-care"),
    imageAlt: "On-site corporate chiropractic care",
    sections: [
      {
        heading: "Patients",
        body:
          "Providing you with the highest quality Health Care Available Today, at the Most Affordable Price.",
      },
      {
        heading: "Employers / Employees",
        body:
          "High Employer Health Care Costs Are No Longer a Cost of Doing Business. Eliminate Employee Chronic Pain, Chronic Stress, & Optimize Productivity. Providing patient health at multiple locations and employee optimization at your facility in Princeton NJ, Ewing Township NJ, Philadelphia PA, Eastern Pa, & all surrounding areas.",
      },
      {
        heading: "What Makes Your Health Now So Valuable to You?",
        body:
          "After the First Employee Visit, the Employer Profits ~$570. 1 Employee Under Regular Care Profits the Employer ~$11,000 Annually. Our Services Deliver the Employer a $6-1 ROI in Preventable Healthcare Costs, at NO COST TO THE COMPANY.\n\nOne Chiropractic Adjustment BOOSTS Your Immune System up to 200%, Making Your Workforce Much Less Vulnerable to Illness.",
      },
      {
        heading: "The Annual Breakdown",
        body:
          "Employers spend more on musculoskeletal disorders (MSD) than on any other condition or chronic disease. Direct and Indirect costs to the Employer total approximately $100 billion/year. The majority of these costs are preventable.\n\nWorkers Compensation: $8,650 / Lowest Claim - ↓88% in Total Direct Costs with YHN.\nAbsenteeism / Presenteeism (Productivity): $1,359 + $1,685 / Employee - ↓73% Respectively.\nPharmaceuticals / Opioids Usage: $1,030 / Employee - ↓85% / ↓49%.\nHospital Admissions: $4,679 / Employee - ↓60%.\nEmployee Engagement & Retirement: $9,828 / Employee (21% of Salary) - ↑93% Engagement / ↓61% Turnover.\nOffsite Provider MSD Costs: $7,800 / Employee - ↓63%.",
      },
      {
        heading: "Simple As Simple Gets",
        body:
          "Zero Work for you; Zero Cost to your organization. All you do is show us the room. Your organization saves money with us. No Pain, Stress, Traffic, Waiting Rooms, or Wasted Lunches for your employees. They pay with HSA, FSA, or Debit/Credit - we are not involved with insurance. A Common Sense, Win-Win benefit - which is as Simple as Simple gets.",
      },
    ],
    benefits: {
      eyebrow: "The YHN Difference",
      title: "Why employers choose Worksite Care",
      items: [
        { icon: CheckCircle2, title: "ZERO COST to the Organization" },
        { icon: Shield, title: "ZERO LIABILITY to the Organization" },
        { icon: Sparkles, title: "ZERO WORK for You - All you do is Show us the Room" },
        { icon: Heart, title: "ONLY Safe, Natural, Effective, Drug-Free, & Surgery-Free care" },
        { icon: Briefcase, title: "NO Dedicated on-site Space needed" },
        { icon: TrendingUp, title: "INCREASE Employee Productivity & Engagement" },
        { icon: Users, title: "ENHANCE Participation in Other Health Initiatives" },
      ],
    },
    related: pickRelated("other", "worksite-care"),
  },

  "lower-back": {
    slug: "lower-back",
    title: "Back Pain & Sciatica Relief",
    eyebrow: "Pain Relief",
    intro:
      "Precise diagnosis and hands-on care for lumbar disc, joint, and sciatic pain - built around the actual pain generator, not a generic protocol.",
    imageSrc: img("decompression-therapy"),
    imageAlt: "Chiropractor evaluating a patient's lower back",
    sections: [
      {
        heading: "Why back pain needs a real diagnosis",
        body:
          "Lower back pain is rarely one thing. A disc bulge, a locked facet joint, an irritated sacroiliac joint, and a pinched sciatic nerve can all produce similar symptoms but need different treatment. Before we adjust anything, our doctors run orthopedic, neurological, and movement testing to identify which structure is actually generating your pain - so the plan targets the cause, not just the ache.",
      },
      {
        heading: "How we treat it",
        body:
          "Most patients start with a combination of chiropractic adjustments, spinal decompression, and soft-tissue work to calm the acute pain within the first one to two weeks. From there, we rebuild the hip and core strength that let the pain happen in the first place, so the relief holds instead of resetting to zero after every flare-up. Most patients don't need an MRI before starting conservative care, and we'll only order imaging when our exam findings call for it.",
      },
    ],
    benefits: {
      eyebrow: "What Sets Our Approach Apart",
      title: "Back pain care built around the actual cause",
      items: [
        { icon: Stethoscope, title: "Exam-driven diagnosis", body: "Orthopedic and neurological testing before any adjustment." },
        { icon: Activity, title: "Decompression for discs", body: "Flexion-distraction traction for herniated and bulging discs." },
        { icon: ShieldCheck, title: "Sciatica-specific care", body: "We differentiate disc, piriformis, SI, and stenosis cases." },
        { icon: Zap, title: "Fast phase-one relief", body: "Most patients feel meaningful change in 1-3 visits." },
        { icon: Heart, title: "Hip & core rebuild", body: "Long-term correction, not just symptom chasing." },
        { icon: CheckCircle2, title: "Imaging only when indicated", body: "We avoid unnecessary MRIs and scans." },
      ],
    },
    related: [
      { slug: "family-chiropractic-care", label: "Family Chiropractic Care" },
      { slug: "decompression-therapy", label: "Decompression Therapy" },
      { slug: "athletic-care", label: "Athletic Care" },
      { slug: "geriatric-care", label: "Geriatric Care" },
    ],
  },

  "head-and-neck": {
    slug: "head-and-neck",
    title: "Neck Pain, Headache & Whiplash Care",
    eyebrow: "Pain Relief",
    intro:
      "Cervical and upper-cervical care for tech neck, tension headaches, migraines, and whiplash - diagnosed precisely, treated at the source.",
    imageSrc: img("family-chiropractic-care"),
    imageAlt: "Chiropractor treating a patient's neck",
    sections: [
      {
        heading: "The neck-headache connection",
        body:
          "Most chronic headaches, including many migraines, trace back to restriction in the upper cervical spine - the joints at the base of the skull. Screen time, poor sleep posture, and old whiplash injuries all load that area over time. We map your specific pattern (location, frequency, triggers) before treating, so care targets your actual driver instead of a generic neck adjustment.",
      },
      {
        heading: "Whiplash and post-accident care",
        body:
          "Motor-vehicle whiplash, concussion-related neck pain, and post-accident headaches are treated with a phased protocol - acute care first, then progressive rehab - along with the documentation most insurance and legal claims require. We coordinate with your medical team when concussion symptoms are present and never skip a red-flag screen before treating.",
      },
    ],
    benefits: {
      eyebrow: "Conditions We Treat Most Often",
      title: "From tech neck to whiplash",
      items: [
        { icon: Brain, title: "Cervicogenic headaches", body: "Upper-cervical adjustments and suboccipital release." },
        { icon: Zap, title: "Tension & migraine support", body: "Trigger mapping paired with hands-on care." },
        { icon: ShieldCheck, title: "Whiplash protocols", body: "Phased acute-to-rehab care with proper documentation." },
        { icon: Monitor, title: "Tech-neck correction", body: "Posture and screen-setup coaching that actually sticks." },
        { icon: Stethoscope, title: "Red-flag screening", body: "We rule out serious causes before every treatment plan." },
        { icon: Heart, title: "Low-force options available", body: "Instrument-assisted care for patients who prefer it." },
      ],
    },
    related: [
      { slug: "family-chiropractic-care", label: "Family Chiropractic Care" },
      { slug: "decompression-therapy", label: "Decompression Therapy" },
      { slug: "arthrostimulation-therapy", label: "Arthrostimulation Therapy" },
      { slug: "ergonomics", label: "Ergonomics" },
    ],
  },

  "upper-back": {
    slug: "upper-back",
    title: "Upper Back & Mid-Spine Pain Relief",
    eyebrow: "Pain Relief",
    intro:
      "Thoracic mobility, rib mechanics, and posture-driven pain relief for the mid-back ache that shows up every afternoon at a desk.",
    imageSrc: img("functional-postural-analysis"),
    imageAlt: "Doctor assessing upper back posture",
    sections: [
      {
        heading: "Why your upper back aches by 2pm",
        body:
          "Upper-back pain almost always traces back to thoracic spine stiffness, restricted rib mechanics, and shallow breathing patterns built up from hours at a screen. Foam rolling and stretching provide temporary relief because they don't restore joint mobility - that takes hands-on mobilization and a corrected workstation, not just a looser muscle.",
      },
      {
        heading: "Our approach",
        body:
          "We start with a thoracic mobility and rib-mechanics exam, then combine manual mobilization, chiropractic adjustment, and breathing-pattern rehab. For patients whose pain is desk-driven, we also review your actual monitor height, chair, and keyboard distance - real fixes, not generic ergonomics advice - so the improvement holds between visits.",
      },
    ],
    benefits: {
      eyebrow: "What Patients Gain",
      title: "Relief that outlasts the visit",
      items: [
        { icon: Activity, title: "Restored thoracic motion", body: "Manual mobilization and adjustment of stiff segments." },
        { icon: Heart, title: "Easier breathing", body: "Diaphragm and posterior-chain rehab for shallow breathers." },
        { icon: ShieldCheck, title: "Red-flag screening first", body: "We rule out cardiac and other non-mechanical causes." },
        { icon: Monitor, title: "Real workstation fixes", body: "Screen height and chair adjustments matched to you." },
        { icon: Stethoscope, title: "Rib-mechanics testing", body: "Rib-head dysfunction is common and very treatable." },
        { icon: CheckCircle2, title: "Long-term durability", body: "Posture rebuild, not a one-visit fix." },
      ],
    },
    related: [
      { slug: "functional-postural-analysis", label: "Functional Postural Analysis" },
      { slug: "ergonomics", label: "Ergonomics" },
      { slug: "iastm", label: "IASTM" },
      { slug: "percussion-therapy", label: "Percussion Therapy" },
    ],
  },

  "shoulder-and-clavicle": {
    slug: "shoulder-and-clavicle",
    title: "Shoulder Pain Relief",
    eyebrow: "Pain Relief",
    intro:
      "Whole-shoulder care that treats the scapula, thoracic spine, and rotator cuff together - not just the joint that hurts.",
    imageSrc: img("iastm"),
    imageAlt: "Therapist working on a patient's shoulder",
    sections: [
      {
        heading: "Shoulders don't work alone",
        body:
          "A painful shoulder is often a scapular control problem, a thoracic mobility problem, or a rotator-cuff problem wearing a shoulder-pain disguise. Treating only the joint that hurts explains why stretching alone rarely fixes it. We assess the cuff, scapula, thoracic spine, and neck together before building a plan.",
      },
      {
        heading: "Our approach",
        body:
          "Care typically combines ART or IASTM soft-tissue release on the cuff, pec minor, and lats with targeted thoracic and AC-joint adjustments, followed by banded rotator-cuff and scapular rehab so the shoulder doesn't re-injure once symptoms settle. Many partial rotator-cuff tears respond well to this conservative approach; when surgery is the right call, we coordinate rehab around it.",
      },
    ],
    benefits: {
      eyebrow: "What We Address",
      title: "The whole shoulder complex, not just the ache",
      items: [
        { icon: Activity, title: "Restored overhead motion", body: "Combined joint and soft-tissue treatment." },
        { icon: Heart, title: "Less night pain", body: "Most patients notice improved sleep within 2-3 weeks." },
        { icon: Stethoscope, title: "Whole-chain assessment", body: "Cuff, scapula, thoracic spine, and neck evaluated together." },
        { icon: ShieldCheck, title: "Post-op friendly", body: "Rehab coordinated alongside your surgeon's protocol." },
        { icon: Zap, title: "ART & IASTM in-house", body: "Precise soft-tissue tools most PT clinics don't offer." },
        { icon: CheckCircle2, title: "Sport-specific recovery", body: "Return-to-throw and return-to-lift progressions." },
      ],
    },
    related: [
      { slug: "art", label: "ART" },
      { slug: "iastm", label: "IASTM" },
      { slug: "athletic-care", label: "Athletic Care" },
      { slug: "functional-movement-restoration", label: "Functional Movement Restoration" },
    ],
  },
};

// Quietly reference unused icons so tree-shaking still picks them, and TS doesn't warn:
void Bone; void Cpu; void Mic2; void Stethoscope;
