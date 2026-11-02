import { images, type SiteImage } from "@/lib/images";

export const disclaimer =
  "Vastu guidance on this website is traditional advice about a building and how it is used. It does not replace a doctor, a financial adviser, a lawyer, or an engineer. If someone describes a change after a visit, that is their own experience. It is not proof, and no result is promised.";

export type NavItem = { href: string; label: string };

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Sanjeev Jain" },
  { href: "/approach", label: "Vastu Approach" },
  { href: "/expertise", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export const propertyTypeValues = [
  "residential_home",
  "apartment",
  "commercial",
  "industrial",
  "plot",
] as const;

export const propertyTypes: { value: (typeof propertyTypeValues)[number]; label: string }[] = [
  { value: "residential_home", label: "Residential home" },
  { value: "apartment", label: "Apartment" },
  { value: "commercial", label: "Commercial property" },
  { value: "industrial", label: "Industrial property" },
  { value: "plot", label: "Plot / Under construction" },
];

export const concernValues = [
  "financial_business",
  "health_wellbeing",
  "family_residential",
  "property_planning",
  "multiple",
  "other",
] as const;

export const concernCategories: { value: (typeof concernValues)[number]; label: string }[] = [
  { value: "financial_business", label: "Financial and business concerns" },
  { value: "health_wellbeing", label: "Health and wellbeing" },
  { value: "family_residential", label: "Family and residential concerns" },
  { value: "property_planning", label: "Property planning" },
  { value: "multiple", label: "Multiple concerns" },
  { value: "other", label: "Other" },
];

export const modeValues = ["on_site", "online", "initial_discussion"] as const;

export const consultationModes: { value: (typeof modeValues)[number]; label: string }[] = [
  { value: "on_site", label: "On-site visit" },
  { value: "online", label: "Online consultation" },
  { value: "initial_discussion", label: "Initial discussion" },
];

export const leadStatusValues = [
  "new",
  "contacted",
  "qualified",
  "consultation_scheduled",
  "assessment_completed",
  "recommendations_provided",
  "closed",
] as const;

export const leadStatuses: { value: (typeof leadStatusValues)[number]; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "consultation_scheduled", label: "Consultation scheduled" },
  { value: "assessment_completed", label: "Assessment completed" },
  { value: "recommendations_provided", label: "Recommendations provided" },
  { value: "closed", label: "Closed" },
];

export const caseCategoryValues = [
  "residential",
  "business",
  "financial",
  "health",
  "structural",
] as const;

export const caseCategories: { value: (typeof caseCategoryValues)[number]; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "business", label: "Business" },
  { value: "financial", label: "Financial concerns" },
  { value: "health", label: "Health and wellbeing" },
  { value: "structural", label: "Structural corrections" },
];

export const consentValues = ["pending", "granted", "declined"] as const;

export type ProcessStep = {
  number: string;
  title: string;
  direction: "N" | "E" | "S" | "W";
  text: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Share Your Concern",
    direction: "N",
    text: "Tell us what is on your mind, and a little about the property. The conversation starts before any suggestion.",
  },
  {
    number: "02",
    title: "Discuss Your Property",
    direction: "E",
    text: "We talk through the layout, how the place is used, and any plans you already have.",
  },
  {
    number: "03",
    title: "Personal Property Visit",
    direction: "S",
    text: "Mr. Sanjeev Jain visits the property and studies it himself. A diagram on a screen cannot do this.",
  },
  {
    number: "04",
    title: "Receive Practical Guidance",
    direction: "W",
    text: "You receive suggestions for that property, explained in plain language, including what a builder may need to check.",
  },
];

export type Service = {
  slug: string;
  title: string;
  cardTitle: string;
  summary: string;
  image: SiteImage;
  lead: string;
  paragraphs: string[];
  points: { title: string; text: string }[];
  boundary: string;
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "residential-vastu",
    title: "Residential Vastu",
    cardTitle: "Residential Vastu",
    summary: "Individualised assessment of homes and residential properties.",
    image: images.residence,
    lead: "A home is read through the way it is oriented, entered, and inhabited. The consultation looks at that particular house, apartment, or plot.",
    paragraphs: [
      "Residential work begins with the household’s questions and the plan of the property. Two homes on the same street can ask for different attention because their entrances, room relationships, and daily use are not the same.",
      "During a visit, Sanjeev Jain looks at orientation, the sequence of spaces, and the parts of the home connected to the concern you bring. Suggestions are then explained in ordinary language, with a preference for measures that can actually be carried out.",
      "If you are planning a new home or altering an existing one, bring whatever drawings you have. A north-marked floor plan is useful. The visit still matters, because a drawing alone does not show how the place is lived in.",
    ],
    points: [
      {
        title: "Homes and apartments",
        text: "Occupied houses and flats are assessed as they are used, not as a generic floor-plan type.",
      },
      {
        title: "Plots and houses under construction",
        text: "Early planning can be discussed on site so later changes are considered while they are still possible.",
      },
      {
        title: "Family life",
        text: "The conversation can include how rooms are shared, where people spend time, and which part of the home feels unresolved.",
      },
    ],
    boundary:
      "Residential guidance is spatial. Building alterations should be checked with an architect or structural engineer before any wall, beam, or service is changed.",
    seoTitle: "Residential Vastu",
    seoDescription:
      "Personal Vastu assessment for homes, apartments, and residential plots by Sanjeev Jain.",
  },
  {
    slug: "business-vastu",
    title: "Business & Commercial Vastu",
    cardTitle: "Business & Commercial Vastu",
    summary: "Guidance for offices, commercial spaces, and business properties.",
    image: images.commercial,
    lead: "A workplace has its own entrance, circulation, and rooms where decisions are made. Commercial guidance starts from that plan and from the concern the business brings.",
    paragraphs: [
      "Offices, shops, clinics, and other commercial premises are assessed as working environments. The visit considers orientation and layout alongside how staff, clients, and goods actually move.",
      "Recommendations may concern an entrance, the placement of a cabin or cash desk, storage, or the relationship between public and private rooms. They are specific to the premises. A suggestion made for one office is not a template for the next.",
      "This consultation does not forecast turnover, and it does not replace commercial, tax, or legal advice. It offers a traditional spatial reading of the property you use for work.",
    ],
    points: [
      {
        title: "Offices",
        text: "Cabins, meeting rooms, and the path from the entrance can be discussed in relation to the way the team works.",
      },
      {
        title: "Retail and client-facing rooms",
        text: "Shops and reception spaces are looked at for approach, display, and the rooms behind them.",
      },
      {
        title: "Premises you already occupy",
        text: "An existing fit-out can be reviewed before money is spent on a further alteration.",
      },
    ],
    boundary:
      "Commercial Vastu guidance is not a business-performance guarantee. Financial and legal decisions belong with the professionals qualified to give them.",
    seoTitle: "Business & Commercial Vastu",
    seoDescription:
      "On-site Vastu guidance for offices, shops, and other commercial properties.",
  },
  {
    slug: "health-wellbeing",
    title: "Health & Wellbeing",
    cardTitle: "Health & Wellbeing",
    summary: "Traditional spatial guidance for people seeking a more considered living environment.",
    image: images.courtyard,
    lead: "Some clients ask for a more settled home environment while they are also looking after their health. The consultation can consider the spaces they live in. It does not treat illness.",
    paragraphs: [
      "Health-related enquiries are heard with care and kept within the limits of spatial guidance. The visit looks at the rooms, light, placement, and orientation of the property connected to the concern.",
      "Suggestions, when they are made, concern the environment: how a room is used, what might be adjusted, and whether a modest change is preferable to building work. They are not prescriptions, therapies, or diagnoses.",
      "If you are unwell, continue with your physician. Tell the consultancy only what you are comfortable sharing about the spaces involved. Private health details sent with an enquiry are stored so the visit can be prepared, and they are not published.",
    ],
    points: [
      {
        title: "The living environment",
        text: "Bedrooms, kitchens, and rooms where someone spends long hours can be part of the assessment.",
      },
      {
        title: "A careful brief",
        text: "You decide how much personal context to share. The property remains the subject of the consultation.",
      },
      {
        title: "Practical measures",
        text: "Where a change is suggested, it is explained so you can judge whether it is feasible.",
      },
    ],
    boundary:
      "This consultation does not diagnose, treat, or cure any condition. It does not replace medical care.",
    seoTitle: "Health & Wellbeing",
    seoDescription:
      "Traditional spatial guidance for a more considered living environment. Not a medical service.",
  },
  {
    slug: "financial-professional-guidance",
    title: "Financial & Professional Concerns",
    cardTitle: "Financial & Professional Concerns",
    summary: "Personalised Vastu assessment for clients seeking guidance regarding financial and professional concerns.",
    image: images.modernHome,
    lead: "Clients sometimes arrive with a question about work, business stability, or the rooms in which money and decisions are handled. The response is a property assessment, not financial advice.",
    paragraphs: [
      "Sanjeev Jain’s consultations include people who want the premises connected to their work or finances to be looked at individually. The visit identifies spatial points that relate to the concern and suggests measures for that property.",
      "A recommendation may be modest, such as a change in how a room is used, or it may involve building work. Remedy costs are separate from the consultation fee and are known only after the assessment. There is no promised ceiling, and there is no promised financial result.",
      "Bring the question you actually have, and the plans of the property it relates to. The consultation will not tell you where to invest, how to file tax, or what a business decision should be.",
    ],
    points: [
      {
        title: "Work and money rooms",
        text: "Studies, accounts areas, shops, and home offices can be included when they belong to the concern.",
      },
      {
        title: "An individual reading",
        text: "The same worry in two different buildings does not produce a copied remedy.",
      },
      {
        title: "Clear limits",
        text: "You leave with spatial guidance. Financial decisions stay with you and your advisers.",
      },
    ],
    boundary:
      "This consultation does not provide investment, tax, lending, or legal advice, and it does not promise wealth or professional success.",
    seoTitle: "Financial & Professional Guidance",
    seoDescription:
      "A personal Vastu assessment for financial and professional concerns. Spatial guidance, not financial advice.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
};

export const fallbackFaqs: Faq[] = [
  {
    id: "what-is-vastu",
    question: "What is Vastu Shastra?",
    answer:
      "Vastu Shastra is a traditional Indian body of knowledge concerned with how a building sits on its site, how it is oriented, and how its rooms and entrances are arranged. In this practice it is offered as architectural and spatial guidance for an individual property. It is not a medical treatment, a financial product, or a substitute for engineering advice.",
    sortOrder: 1,
  },
  {
    id: "how-consultation-works",
    question: "How does a personal Vastu consultation work?",
    answer:
      "It begins with your concern and the property itself. Sanjeev Jain discusses the situation with you, assesses the relevant layout and directions in person, and suggests measures suited to that property. Recommendations are prepared from the visit. They are not taken from a fixed menu applied to every home.",
    sortOrder: 2,
  },
  {
    id: "on-site-visit",
    question: "What happens during an on-site visit?",
    answer:
      "The visit is a personal assessment. You can walk through the spaces related to your concern, explain how the place is used, and review drawings if you have them. Observations and suggestions are then explained in practical terms. A minute-by-minute script is not fixed, because properties differ.",
    sortOrder: 3,
  },
  {
    id: "fee",
    question: "What is the consultation fee?",
    answer:
      "The fee for a one-time personal property visit is ₹10,000. Travel charges, where a visit requires them, may be quoted separately. The cost of any remedy is independent of the consultation fee and is known only after the assessment.",
    sortOrder: 4,
  },
  {
    id: "structural",
    question: "Do all Vastu corrections require structural changes?",
    answer:
      "No. Some suggestions concern how a space is used or furnished. Others may involve building work. You are told which is which. Structural changes are suggested only when the assessment indicates them, and any building work should be reviewed by a qualified engineer or architect before it is carried out.",
    sortOrder: 5,
  },
  {
    id: "affordable",
    question: "Can Vastu recommendations be practical and affordable?",
    answer:
      "The practice looks first for measures that are practical to carry out. Clients often hope for modest corrections, and that hope is taken seriously. It is not a promise that every property can be addressed within a particular budget. Structural work can cost more. Remedy costs vary with the recommendation and are separate from the ₹10,000 visit.",
    sortOrder: 6,
  },
  {
    id: "floor-plan",
    question: "Do I need an architectural floor plan?",
    answer:
      "A floor plan is helpful, especially when it shows north. It is not required in order to enquire. If you do not have one, say so on the form and bring whatever drawings or photographs you do have. You may also attach plans and property photographs to the enquiry.",
    sortOrder: 7,
  },
  {
    id: "remote",
    question: "Can I book a consultation remotely?",
    answer:
      "The primary consultation is an on-site visit, because the property is assessed in person. You can request an initial discussion through the form. An online consultation is available only when the consultancy has enabled it. An online conversation is not offered as a full substitute for seeing a property that needs to be visited.",
    sortOrder: 8,
  },
  {
    id: "duration",
    question: "How long does the assessment take?",
    answer:
      "A single duration is not published, because it depends on the property and the concerns being discussed. The likely length of the visit is confirmed when the consultation is arranged.",
    sortOrder: 9,
  },
];

export type SiteSettings = {
  brandName: string;
  practiceName: string;
  tagline: string;
  coreMessage: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagramUrl: string;
  linkedinUrl: string;
  serviceAreas: string;
  address: string;
  consultationFee: number;
  feeNote: string;
  remedyNote: string;
  onlineConsultationEnabled: boolean;
  deliverables: string[];
  founderSummary: string;
  founderPortraitUrl: string;
  heroSanskrit: string;
  heroTranslation: string;
  bookingNote: string;
};

export const defaultDeliverables = [
  "Individual property assessment",
  "Discussion of relevant concerns",
  "Identification of areas requiring attention",
  "Personalised recommendations",
  "Practical implementation guidance",
];

export const defaultSettings: SiteSettings = {
  brandName: "Sanjeev Jain",
  practiceName: "Vedic Vastu Consultancy",
  tagline: "Ancient Knowledge. Personal Insight. Practical Guidance.",
  coreMessage: "Every Space Is Different. Every Vastu Solution Should Be Personal.",
  phone: "",
  whatsapp: "",
  email: "",
  instagramUrl: "",
  linkedinUrl: "",
  serviceAreas: "",
  address: "",
  consultationFee: 10000,
  feeNote: "Travel charges, where applicable, may be separate.",
  remedyNote:
    "Remedy costs are independent of the consultation fee and vary with the recommendations. A fixed maximum is not guaranteed. The practice aims for practical measures. Significant structural changes can cost more.",
  onlineConsultationEnabled: false,
  deliverables: defaultDeliverables,
  founderSummary: "",
  founderPortraitUrl: "",
  heroSanskrit: "",
  heroTranslation: "",
  bookingNote:
    "Enquiries are reviewed personally. A visit is confirmed only after the consultancy has been in touch.",
};

export function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}
